import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET() {
  try {
    const keys = await prismaClient.rewrapKey.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        recordCid: true,
        recipientPubkey: true,
        creatorPubkey: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ keys, count: keys.length });
  } catch (e: any) {
    console.error('Debug query failed:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
