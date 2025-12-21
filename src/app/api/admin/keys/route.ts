import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: Request) {
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const createdKeys = await prismaClient.rewrapKey.findMany({
            where: {
                creatorPubkey: authResult.pubkey
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        const accessibleKeys = await prismaClient.rewrapKey.findMany({
            where: {
                recipientPubkey: authResult.pubkey,
                creatorPubkey: {
                    not: authResult.pubkey
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        return NextResponse.json({
            created: createdKeys,
            accessible: accessibleKeys
        });
    } catch (e: any) {
        console.error('Failed to fetch keys:', e);
        return NextResponse.json({ error: 'Failed to fetch keys' }, { status: 500 });
    }
}
