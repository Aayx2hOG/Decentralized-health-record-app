'use client';

import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';

export function canonicalize(obj: any): string {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
    const keys = Object.keys(obj).sort();
    const parts = keys.map(k => JSON.stringify(k) + ':' + canonicalize(obj[k]));
    return '{' + parts.join(',') + '}';
}

export function verifyRecordSignature(signedRecord: any): {
    valid: boolean;
    signer?: string;
    error?: string
} {
    try {
        if (!signedRecord.signature) {
            return { valid: false, error: 'No signature found in record' };
        }
        if (!signedRecord.signer) {
            return { valid: false, error: 'No signer public key found in record' };
        }

        const sigB64 = signedRecord.signature;
        const signerPubkey = signedRecord.signer;

        const metadata = {
            cid: signedRecord.cid,
            title: signedRecord.title,
            packedKeys: signedRecord.packedKeys,
            exportedAt: signedRecord.exportedAt,
        };

        const messageStr = canonicalize(metadata);
        const messageBytes = new TextEncoder().encode(messageStr);

        const signature = typeof Buffer !== 'undefined'
            ? Buffer.from(sigB64, 'base64')
            : Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));

        const publicKey = new PublicKey(signerPubkey);
        const publicKeyBytes = publicKey.toBytes();

        const isValid = nacl.sign.detached.verify(
            messageBytes,
            signature,
            publicKeyBytes
        );

        if (isValid) {
            return { valid: true, signer: signerPubkey };
        } else {
            return { valid: false, error: 'Signature verification failed - record may have been tampered with' };
        }
    } catch (err: any) {
        return { valid: false, error: `Verification error: ${err.message}` };
    }
}
