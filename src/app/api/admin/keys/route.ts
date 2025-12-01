import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET() {
    try {
        const keys = await prismaClient.rewrapKey.findMany({
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });
        return NextResponse.json(keys);
    } catch (e: any) {
        console.error('Failed to fetch keys:', e);
        return NextResponse.json({ error: 'Failed to fetch keys' }, { status: 500 });
    }
}
