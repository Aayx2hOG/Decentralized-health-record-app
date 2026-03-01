import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { recordCid, requesterPubkey, ownerPubkey, purpose } = body;

        if (!recordCid || !requesterPubkey || !ownerPubkey || !purpose) {
            return NextResponse.json(
                { error: 'Missing required fields: recordCid, requesterPubkey, ownerPubkey, purpose' },
                { status: 400 }
            );
        }

        const existing = await prismaClient.accessRequest.findFirst({
            where: {
                recordCid,
                requesterPubkey: requesterPubkey.trim(),
                ownerPubkey: ownerPubkey.trim(),
                status: 'pending',
            },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'A pending request already exists for this record' },
                { status: 409 }
            );
        }

        const accessRequest = await prismaClient.accessRequest.create({
            data: {
                recordCid,
                requesterPubkey: requesterPubkey.trim(),
                ownerPubkey: ownerPubkey.trim(),
                purpose,
            },
        });

        await prismaClient.auditEvent.create({
            data: {
                action: 'REQUEST_CREATED',
                actorPubkey: requesterPubkey.trim(),
                recordCid,
                targetPubkey: ownerPubkey.trim(),
                metadata: JSON.stringify({
                    requestId: accessRequest.id,
                    purpose,
                }),
            },
        });

        return NextResponse.json({ success: true, id: accessRequest.id });
    } catch (e: any) {
        console.error('Failed to create access request:', e);
        return NextResponse.json(
            { error: 'Failed to create access request' },
            { status: 500 }
        );
    }
}

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

        const [incoming, outgoing] = await Promise.all([
            prismaClient.accessRequest.findMany({
                where: { ownerPubkey: pubkey },
                orderBy: { createdAt: 'desc' },
            }),
            prismaClient.accessRequest.findMany({
                where: { requesterPubkey: pubkey },
                orderBy: { createdAt: 'desc' },
            }),
        ]);

        return NextResponse.json({ incoming, outgoing });
    } catch (e: any) {
        console.error('Failed to fetch access requests:', e);
        return NextResponse.json(
            { error: 'Failed to fetch access requests' },
            { status: 500 }
        );
    }
}
