import nacl from 'tweetnacl';
import { didKeyToEd25519Pubkey } from './ssi';
import bs58 from 'bs58';

export function canonicalize(obj: any): string {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
    const keys = Object.keys(obj).sort();
    const parts = keys.map(k => JSON.stringify(k) + ':' + canonicalize(obj[k]));
    return '{' + parts.join(',') + '}';
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

export async function fetchAndVerifyConsent(consentCid: string): Promise<ConsentVerificationResult> {
    try {
        const gateways = [
            `http://127.0.0.1:8080/ipfs/${consentCid}`,
            `https://ipfs.io/ipfs/${consentCid}`,
            `https://cloudflare-ipfs.com/ipfs/${consentCid}`,
            `https://dweb.link/ipfs/${consentCid}`
        ];

        let consentData: any = null;
        let lastError: Error | null = null;

        for (const gateway of gateways) {
            try {
                const response = await fetch(gateway, {
                    headers: { 'Accept': 'application/json' },
                    next: { revalidate: 60 }
                });
                if (response.ok) {
                    consentData = await response.json();
                    break;
                }
            } catch (err) {
                lastError = err as Error;
                continue;
            }
        }

        if (!consentData) {
            return {
                valid: false,
                error: `Failed to fetch consent credential from IPFS: ${lastError?.message || 'All gateways failed'}`
            };
        }

        return verifyConsentCredential(consentData);
    } catch (err: any) {
        return { valid: false, error: `Consent verification error: ${err.message}` };
    }
}

export async function verifyConsentCredential(consent: ConsentCredential): Promise<ConsentVerificationResult> {
    try {
        if (!consent['@context'] || !consent.type || !Array.isArray(consent.type)) {
            return { valid: false, error: 'Invalid consent credential structure' };
        }

        if (!consent.type.includes('ConsentCredential')) {
            return { valid: false, error: 'Not a consent credential' };
        }

        if (!consent.issuer?.id || !consent.credentialSubject?.id) {
            return { valid: false, error: 'Missing issuer or subject' };
        }

        if (!consent.credentialSubject.recordCid) {
            return { valid: false, error: 'Missing record CID in consent' };
        }

        if (!consent.proof?.signature || !consent.proof?.verificationMethod) {
            return { valid: false, error: 'Missing proof or signature' };
        }

        if (consent.expirationDate) {
            const expiration = new Date(consent.expirationDate);
            if (expiration < new Date()) {
                return {
                    valid: false,
                    error: `Consent expired on ${expiration.toISOString()}`
                };
            }
        }

        const credentialWithoutProof: any = {
            '@context': consent['@context'],
            type: consent.type,
            issuer: consent.issuer,
            issuanceDate: consent.issuanceDate,
            expirationDate: consent.expirationDate,
            credentialSubject: consent.credentialSubject,
        };

        const messageStr = canonicalize(credentialWithoutProof);
        const messageBytes = new TextEncoder().encode(messageStr);

        const signatureBytes = typeof Buffer !== 'undefined'
            ? Buffer.from(consent.proof.signature, 'base64')
            : Uint8Array.from(atob(consent.proof.signature), c => c.charCodeAt(0));

        const issuerDid = consent.issuer.id;
        const issuerPubkey = didKeyToEd25519Pubkey(issuerDid);

        const isValid = nacl.sign.detached.verify(
            messageBytes,
            signatureBytes,
            issuerPubkey
        );

        if (!isValid) {
            return { valid: false, error: 'Invalid signature on consent credential' };
        }

        const recipientDid = consent.credentialSubject.id;
        const recipientPubkey = didKeyToEd25519Pubkey(recipientDid);

        const recipientBase58 = bs58.encode(recipientPubkey);
        const issuerBase58 = bs58.encode(issuerPubkey);

        return {
            valid: true,
            issuer: issuerBase58,
            recipient: recipientBase58,
            recordCid: consent.credentialSubject.recordCid,
            expirationDate: consent.expirationDate,
        };
    } catch (err: any) {
        return {
            valid: false,
            error: `Verification failed: ${err.message}`
        };
    }
}
