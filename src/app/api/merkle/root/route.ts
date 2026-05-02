import { NextRequest, NextResponse } from 'next/server';
import { getOwnerMerkleSnapshot } from '@/lib/merkle-workflow';

export async function GET(req: NextRequest) {
    try {
        const ownerPubkey = req.nextUrl.searchParams.get('ownerPubkey');

        if (!ownerPubkey) {
            return NextResponse.json({ error: 'ownerPubkey is required' }, { status: 400 });
        }

        const snapshot = await getOwnerMerkleSnapshot(ownerPubkey);
        return NextResponse.json({ success: true, ...snapshot });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e?.message || 'Failed to load Merkle root',
        }, { status: 500 });
    }
}
