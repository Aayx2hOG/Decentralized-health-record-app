import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: Request) {
    // Verify admin authentication
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        );
    }

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
