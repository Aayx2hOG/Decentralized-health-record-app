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

        const [totalKeys, totalRecords, totalAccesses, failedAccesses, expiredKeys] = await Promise.all([
            prismaClient.rewrapKey.count({ where: { creatorPubkey: authResult.pubkey } }),
            Promise.resolve(recordCids.length),
            prismaClient.accessLog.count({ where: { success: true, recordCid: { in: recordCids } } }),
            prismaClient.accessLog.count({ where: { success: false, recordCid: { in: recordCids } } }),
            prismaClient.rewrapKey.count({
                where: {
                    creatorPubkey: authResult.pubkey,
                    expiresAt: { lt: new Date() }
                }
            }),
        ]);

        const activeKeys = totalKeys - expiredKeys;

        return NextResponse.json({
            totalKeys,
            totalRecords,
            totalAccesses,
            failedAccesses,
            expiredKeys,
            activeKeys,
        });
    } catch (e: any) {
        console.error('Failed to fetch stats:', e);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
