import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const pubkey = searchParams.get('pubkey');
        const recordCid = searchParams.get('recordCid');
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

        if (!pubkey && !recordCid) {
            return NextResponse.json(
                { error: 'At least one of pubkey or recordCid is required' },
                { status: 400 }
            );
        }

        const where: any = {};

        if (pubkey && recordCid) {
            where.AND = [
                { recordCid },
                {
                    OR: [
                        { actorPubkey: pubkey },
                        { targetPubkey: pubkey },
                    ],
                },
            ];
        } else if (recordCid) {
            where.recordCid = recordCid;
        } else if (pubkey) {
            where.OR = [
                { actorPubkey: pubkey },
                { targetPubkey: pubkey },
            ];
        }

        const events = await prismaClient.auditEvent.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: limit,
        });

        return NextResponse.json({ events });
    } catch (e: any) {
        console.error('Failed to fetch audit trail:', e);
        return NextResponse.json(
            { error: 'Failed to fetch audit trail' },
            { status: 500 }
        );
    }
}
