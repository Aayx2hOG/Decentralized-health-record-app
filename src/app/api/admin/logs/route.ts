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
        const userRecords = await prismaClient.rewrapKey.findMany({
            where: { creatorPubkey: authResult.pubkey },
            select: { recordCid: true },
            distinct: ['recordCid']
        });
        const recordCids = userRecords.map(r => r.recordCid);

        const logs = await prismaClient.accessLog.findMany({
            where: {
                recordCid: { in: recordCids }
            },
            orderBy: { accessedAt: 'desc' },
            take: 1000,
        });
        return NextResponse.json(logs);
    } catch (e: any) {
        console.error('Failed to fetch logs:', e);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
