import { NextRequest, NextResponse } from 'next/server';
import { getMerkleProofForRecord } from '@/lib/merkle-workflow';

export async function GET(req: NextRequest) {
    try {
        const ownerPubkey = req.nextUrl.searchParams.get('ownerPubkey');
        const recordCid = req.nextUrl.searchParams.get('recordCid');

        if (!ownerPubkey || !recordCid) {
            return NextResponse.json({ error: 'ownerPubkey and recordCid are required' }, { status: 400 });
        }

        const proof = await getMerkleProofForRecord(ownerPubkey, recordCid);
        if (!proof) {
            return NextResponse.json({ error: 'Merkle leaf not found for owner and recordCid' }, { status: 404 });
        }

        return NextResponse.json({ success: true, ...proof });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e?.message || 'Failed to generate Merkle proof',
        }, { status: 500 });
    }
}
