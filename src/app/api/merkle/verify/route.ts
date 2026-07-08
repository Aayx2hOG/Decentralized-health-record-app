import { NextResponse } from 'next/server'
import { verifyMerkleProof } from '@/lib/merkle-workflow'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { rootHex, proofHex, leafHex, ownerPubkey, recordCid } = body ?? {}

    if (!rootHex || !Array.isArray(proofHex)) {
      return NextResponse.json(
        {
          error: 'rootHex and proofHex[] are required',
        },
        { status: 400 },
      )
    }

    const result = verifyMerkleProof({
      rootHex,
      proofHex,
      leafHex,
      ownerPubkey,
      recordCid,
    })

    return NextResponse.json({
      success: true,
      valid: result.valid,
      leafHex: result.leafHex,
    })
  } catch (e: any) {
    const message = e?.message || 'Failed to verify Merkle proof'
    const status = message.includes('32-byte hex string') || message.includes('Provide leafHex') ? 400 : 500

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status },
    )
  }
}
