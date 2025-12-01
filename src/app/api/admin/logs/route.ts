import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET() {
    try {
        const logs = await prismaClient.accessLog.findMany({
            orderBy: { accessedAt: 'desc' },
            take: 1000,
        });
        return NextResponse.json(logs);
    } catch (e: any) {
        console.error('Failed to fetch logs:', e);
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
