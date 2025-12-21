import { NextResponse } from 'next/server';

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET;

// Use dedicated gateway URL if using Infura
const API_URL = INFURA_PROJECT_ID && INFURA_API_KEY_SECRET
    ? `https://${INFURA_PROJECT_ID}:${INFURA_API_KEY_SECRET}@ipfs.infura.io:5001`
    : process.env.IPFS_API_URL || 'http://127.0.0.1:5001';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payloadBase64 = body?.payload;
        if (!payloadBase64) return NextResponse.json({ error: 'missing payload' }, { status: 400 });

        const bytes = Buffer.from(payloadBase64, 'base64');

        // Dynamically import ipfs-http-client to avoid build issues
        const { create } = await import('ipfs-http-client');

        const client = create({ url: API_URL });
        const result = await client.add(bytes);
        const cid = result.cid.toString();
        return NextResponse.json({ cid });
    } catch (err: any) {
        console.error('IPFS add error:', err);
        const errorMessage = err?.message || String(err);
        return NextResponse.json({
            error: `IPFS add failed: ${errorMessage}. IPFS API URL: ${API_URL.replace(/:[^:@]+@/, ':***@')}. Make sure IPFS_API_URL environment variable is set to a valid IPFS endpoint.`
        }, { status: 500 });
    }
}
