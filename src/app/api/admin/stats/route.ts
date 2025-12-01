import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET() {
    try {
        const [totalKeys, totalRecords, totalAccesses, failedAccesses, expiredKeys] = await Promise.all([
            prismaClient.rewrapKey.count(),
            prismaClient.rewrapKey.findMany({ select: { recordCid: true }, distinct: ['recordCid'] }).then(r => r.length),
            prismaClient.accessLog.count({ where: { success: true } }),
            prismaClient.accessLog.count({ where: { success: false } }),
            prismaClient.rewrapKey.count({
                where: {
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
