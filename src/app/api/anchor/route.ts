import { prismaClient } from 'db/src'
import { NextRequest, NextResponse } from 'next/server'
import { ensureMerkleLeaf } from '@/lib/merkle-db'
import { snapshotCurrentOwnerRoot } from '@/lib/merkle-workflow'

export async function POST(req: NextRequest) {
  try {
    const { recordCid, txSignature, pda, walletPubkey } = await req.json()

    const anchor = await prismaClient.recordAnchor.create({
      data: {
        recordCid,
        txSignature,
        pda,
        anchoredBy: walletPubkey,
      },
    })

    await ensureMerkleLeaf(walletPubkey, recordCid)
    const merkleSnapshot = await snapshotCurrentOwnerRoot(walletPubkey, {
      txSignature,
      pda,
    })

    return NextResponse.json({
      success: true,
      id: anchor.id,
      merkleSnapshot,
    })
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        error: e,
      },
      {
        status: 500,
      },
    )
  }
}

export async function GET(req: NextRequest) {
  const cid = req.nextUrl.searchParams.get('cid')
  if (!cid) {
    return NextResponse.json(
      {
        success: false,
        error: 'No cid provided',
      },
      {
        status: 400,
      },
    )
  }
  const anchor = await prismaClient.recordAnchor.findUnique({
    where: { recordCid: cid },
  })
  return NextResponse.json({
    success: true,
    anchor,
  })
}
