import { PublicKey } from "@solana/web3.js";


export interface RecordAnchor {
    recordCid: string;
    creator: PublicKey;
    timestamp: number;
    bump: number;
}

export interface RecordData {
    owner: PublicKey;
    cid: string;
    title: string;
}


export interface RewrapKey {
    id: number;
    recordCid: string;
    recipientPubkey: string;
    creatorPubkey: string | null;
    createdAt: string;
    expiresAt: string | null;
    accessCount: number;
    lastAccessedAt: string | null;
    isConsent?: boolean;
}


export interface IssuedConsent {
    id: number;
    consentCid: string;
    recordCid: string;
    recipientPubkey: string;
    createdAt: string;
    expiresAt: string | null;
    revokedAt: string | null;
    revokedReason: string | null;
}

export interface Consent {
    id: number;
    consentCid: string;
    recordCid: string;
    issuerPubkey: string;
    recipientPubkey: string;
    expiresAt: string | null;
    createdAt: string;
    anchoredTxId: string | null;
}

export interface ConsentCredential {
    '@context': string[];
    type: string[];
    issuer: { id: string };
    issuanceDate: string;
    expirationDate: string;
    credentialSubject: {
        id: string;
        recordCid: string;
        scope: string;
    };
    proof: {
        type: string;
        created: string;
        proofPurpose: string;
        verificationMethod: string;
        signature: string;
    };
}

export interface ConsentVerificationResult {
    valid: boolean;
    issuer?: string;
    recipient?: string;
    recordCid?: string;
    expirationDate?: string;
    error?: string;
}


export interface AccessLog {
    id: number;
    recordCid: string;
    recipientPubkey: string;
    success: boolean;
    ipAddress: string | null;
    userAgent: string | null;
    errorMessage: string | null;
    accessedAt: string;
}


export interface AnalyticsData {
    timeSeriesData: Array<{ date: string; successful: number; failed: number; total: number }>;
    successVsFailed: { successful: number; failed: number };
    topRecords: Array<{ cid: string; count: number }>;
    hourlyPattern: Array<{ hour: number; count: number }>;
    errorDistribution: Array<{ error: string; count: number }>;
}

export interface Stats {
    totalKeys: number;
    totalRecords: number;
    totalAccesses: number;
    failedAccesses: number;
    expiredKeys: number;
    activeKeys: number;
}


export interface AdminAuthPayload {
    Pubkey: string;
    timestamp: number;
    signature: string;
    nonce: string;
}

export interface AuthResult {
    valid: boolean;
    error?: string;
    pubkey?: string;
}

export interface RateLimitEntry {
    attempts: number;
    lastAttempt: number;
    blockedUntil?: number;
}