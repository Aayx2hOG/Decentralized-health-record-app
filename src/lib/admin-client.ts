import { WalletContextState } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import type { AdminAuthPayload } from './admin-auth';

export async function signAdminAuth(wallet: WalletContextState): Promise<string | null> {
    if (!wallet.publicKey || !wallet.signMessage) {
        console.error('Wallet not connected or does not support message signing');
        return null;
    }

    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 15);
    const pubkey = wallet.publicKey.toBase58();
    const message = `Admin authentication: ${pubkey} at ${timestamp} (nonce: ${nonce})`;

    try {
        const messageBytes = new TextEncoder().encode(message);
        const signatureBytes = await wallet.signMessage(messageBytes);
        const signature = bs58.encode(signatureBytes);

        const payload: AdminAuthPayload = {
            Pubkey: pubkey,
            timestamp,
            signature,
            nonce
        };

        const token = Buffer.from(JSON.stringify(payload)).toString('base64');
        return token;
    } catch (error) {
        console.error('Failed to sign admin authentication:', error);
        return null;
    }
}

export async function fetchWithAdminAuth(
    url: string,
    wallet: WalletContextState,
    options: RequestInit = {}
): Promise<Response> {
    const token = await signAdminAuth(wallet);

    if (!token) {
        throw new Error('Failed to generate admin authentication token');
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });
}
