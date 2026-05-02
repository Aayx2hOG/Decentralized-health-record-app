import { NextResponse } from 'next/server';
import { backfillMerkleLeavesFromAnchors } from '@/lib/merkle-workflow';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const ownerPubkey = typeof body?.ownerPubkey === 'string' ? body.ownerPubkey : undefined;

        const result = await backfillMerkleLeavesFromAnchors(ownerPubkey);

        return NextResponse.json({
            success: true,
            ...result,
        });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e?.message || 'Failed to backfill Merkle leaves',
        }, { status: 500 });
    }
}
