import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { consentCid, recordCid, issuerPubkey, recipientPubkey, expiresAt, anchoredTxId } = body;

        if (!consentCid || !recordCid || !issuerPubkey || !recipientPubkey) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const consent = await prismaClient.consentCredential.create({
            data: {
                consentCid,
                recordCid,
                issuerPubkey,
                recipientPubkey,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
                anchoredTxId: anchoredTxId || null,
            },
        });

        return NextResponse.json({ success: true, id: consent.id });
    } catch (e: any) {
        console.error('Failed to store consent:', e);
        return NextResponse.json(
            { error: 'Failed to store consent credential' },
            { status: 500 }
        );
    }
}
