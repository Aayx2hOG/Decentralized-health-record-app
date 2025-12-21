import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pubkey = searchParams.get('pubkey');

        if (!pubkey) {
            return NextResponse.json(
                { error: 'Public key is required' },
                { status: 400 }
            );
        }

        const [issued, received] = await Promise.all([
            prismaClient.consentCredential.findMany({
                where: { issuerPubkey: pubkey },
                orderBy: { createdAt: 'desc' },
            }),
            prismaClient.consentCredential.findMany({
                where: { recipientPubkey: pubkey },
                orderBy: { createdAt: 'desc' },
            }),
        ]);

        return NextResponse.json({ issued, received });
    } catch (e: any) {
        console.error('Failed to fetch consents:', e);
        return NextResponse.json(
            { error: 'Failed to fetch consent credentials' },
            { status: 500 }
        );
    }
}
