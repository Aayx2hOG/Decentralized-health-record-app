import { prismaClient } from 'db/src';
import { AdminAuthPayload, AuthResult, RateLimitEntry } from '@/lib/types';

const AUTH_CONFIG = {
    AUTH_WINDOW_MS: 5 * 60 * 1000,
    MAX_ATTEMPTS: 100,
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
    BLOCK_DURATION_MS: 60 * 1000,
    NONCE_EXIRY_MS: 10 * 60 * 1000,
    MAX_NONCE_CACHE_SIZE: 10000,
} as const;

const rateLimitStore = new Map<string, RateLimitEntry>();
const usedNonces = new Map<string, number>();
const authAttemptLog: Array<{
    timestamp: number,
    pubkey: string,
    success: boolean,
    ip?: string,
    reason?: string
}> = [];

export function getAdminPubkeys() {
    const pubkeys = process.env.ADMIN_PUBKEYS || " ";
    return pubkeys
        .split(',')
        .map(pk => pk.trim())
        .filter(Boolean)
}

export async function isAdminPubkey(pubkey: string): Promise<boolean> {
    try {
        const admin = await prismaClient.admin.findUnique({
            where: { pubkey },
            select: { isActive: true }
        });

        return admin?.isActive === true;
    } catch (e) {
        console.error('Error checking admin pubkey:', e);
        return false;
    }
}

export async function addAdmin(pubkey: string, addedBy?: string): Promise<boolean> {
    try {
        await prismaClient.admin.upsert({
            where: { pubkey },
            create: { pubkey, addedBy, isActive: true },
            update: { isActive: true }
        });
        return true;
    } catch (e) {
        console.error('Error adding admin pubkey:', e);
        return false;
    }
}

export async function getAllAdmins() {
    try {
        return await prismaClient.admin.findMany({
            where: { isActive: true },
            orderBy: { addedAt: 'desc' },
        });
    } catch (e) {
        console.error('Error fetching admin pubkeys:', e);
        return [];
    }
}

export function cleanupRateLimitStore() {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.blockedUntil && entry.blockedUntil < now) {
            rateLimitStore.delete(key);
        } else if (now - entry.lastAttempt > AUTH_CONFIG.RATE_LIMIT_WINDOW_MS) {
            rateLimitStore.delete(key);
        }
    }
}

export function checkRateLimit(identifier: string): AuthResult {
    cleanupRateLimitStore();
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    if (!entry) {
        rateLimitStore.set(identifier, {
            attempts: 1,
            lastAttempt: now,
        });
        return { valid: true };
    }
    if (entry.blockedUntil && entry.blockedUntil > now) {
        return {
            valid: false,
            error: `Rate limit exceeded. Blocked until ${new Date(entry.blockedUntil).toISOString()}`
        };
    }

    if (now - entry.lastAttempt < AUTH_CONFIG.RATE_LIMIT_WINDOW_MS) {
        entry.attempts++;
        entry.lastAttempt = now;

        if (entry.attempts >= AUTH_CONFIG.MAX_ATTEMPTS) {
            entry.blockedUntil = now + AUTH_CONFIG.BLOCK_DURATION_MS;
            return {
                valid: false,
                error: `Too many authentication attempts. Blocked for 30 minutes.`
            };
        }
    } else {
        entry.attempts = 1;
        entry.lastAttempt = now;
    }

    return { valid: true };
}

export function cleanupNonceCache() {
    const now = Date.now();
    for (const [nonce, timestamp] of usedNonces.entries()) {
        if (now - timestamp > AUTH_CONFIG.NONCE_EXIRY_MS) {
            usedNonces.delete(nonce);
        }
    }

    if (usedNonces.size > AUTH_CONFIG.MAX_NONCE_CACHE_SIZE) {
        const sortedEntries = Array.from(usedNonces.entries())
            .sort((a, b) => a[1] - b[1]);
        const toRemove = sortedEntries.slice(0, Math.floor(usedNonces.size / 2));
        toRemove.forEach(([nonce]) => usedNonces.delete(nonce));
    }
}

export async function verifyAdminAuth(payload: AdminAuthPayload, ip?: string): Promise<AuthResult> {
    const { default: nacl } = await import('tweetnacl');
    const { default: bs58 } = await import('bs58');

    const rateLimitResult = checkRateLimit(payload.Pubkey);
    if (!rateLimitResult.valid) {
        logAuthAttempt(payload.Pubkey, false, ip, rateLimitResult.error);
        return rateLimitResult;
    }

    const now = Date.now();
    if (Math.abs(now - payload.timestamp) > AUTH_CONFIG.AUTH_WINDOW_MS) {
        logAuthAttempt(payload.Pubkey, false, ip, 'Expired timestamp');
        return { valid: false, error: 'Authentication expired. Please sign again.' };
    }

    cleanupNonceCache();
    const nonceTimestamp = usedNonces.get(payload.nonce);
    if (nonceTimestamp) {
        const timeSinceUse = now - nonceTimestamp;
        if (timeSinceUse > 1000) {
            logAuthAttempt(payload.Pubkey, false, ip, 'Nonce reuse detected');
            return { valid: false, error: 'Invalid nonce. Possible replay attack.' };
        }
    }

    try {
        const message = `Admin authentication: ${payload.Pubkey} at ${payload.timestamp} (nonce: ${payload.nonce})`;
        const messageBytes = new TextEncoder().encode(message);
        const signatureBytes = bs58.decode(payload.signature);
        const pubkeyBytes = bs58.decode(payload.Pubkey);

        const isValid = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            pubkeyBytes
        );

        if (!isValid) {
            logAuthAttempt(payload.Pubkey, false, ip, 'Invalid signature');
            return { valid: false, error: 'Invalid signature' };
        }

        usedNonces.set(payload.nonce, now);
        logAuthAttempt(payload.Pubkey, true, ip);
        return { valid: true, pubkey: payload.Pubkey };

    } catch (error) {
        logAuthAttempt(payload.Pubkey, false, ip, 'Signature verification error');
        return { valid: false, error: 'Signature verification failed' };
    }
}

export async function requireAdminAuth(
    request: Request
): Promise<AuthResult> {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, error: 'Missing or invalid Authorization header' };
    }

    try {
        const token = authHeader.substring(7);
        const payload: AdminAuthPayload = JSON.parse(
            Buffer.from(token, 'base64').toString('utf-8')
        );

        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        return await verifyAdminAuth(payload, ip);
    } catch (error) {
        return { valid: false, error: 'Invalid authentication token format' };
    }
}

function logAuthAttempt(
    pubkey: string,
    success: boolean,
    ip?: string,
    reason?: string
) {
    authAttemptLog.push({
        timestamp: Date.now(),
        pubkey,
        success,
        ip,
        reason
    });

    if (authAttemptLog.length > 1000) {
        authAttemptLog.splice(0, authAttemptLog.length - 1000);
    }
}

export function getAuthAttemptLog(limit: number = 100) {
    return authAttemptLog.slice(-limit).reverse();
}

export function getAuthStats() {
    const now = Date.now();
    const last24h = now - (24 * 60 * 60 * 1000);
    const recent = authAttemptLog.filter(log => log.timestamp > last24h);

    return {
        total: recent.length,
        successful: recent.filter(log => log.success).length,
        failed: recent.filter(log => !log.success).length,
        blockedIPs: Array.from(rateLimitStore.entries())
            .filter(([_, entry]) => entry.blockedUntil && entry.blockedUntil > now)
            .map(([identifier]) => identifier)
    };
}