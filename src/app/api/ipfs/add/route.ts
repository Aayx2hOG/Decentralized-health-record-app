import { NextResponse } from 'next/server';
import { create } from 'ipfs-http-client';

const API_URL = process.env.IPFS_API_URL || 'http://127.0.0.1:5001';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payloadBase64 = body?.payload;
        if (!payloadBase64) return NextResponse.json({ error: 'missing payload' }, { status: 400 });

        const bytes = Buffer.from(payloadBase64, 'base64');
        const client = create({ url: API_URL });
        const result = await client.add(bytes);
        const cid = result.cid.toString();
        return NextResponse.json({ cid });
    } catch (err: any) {
        return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
    }
}
