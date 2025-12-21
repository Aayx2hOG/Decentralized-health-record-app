import { NextResponse } from 'next/server';

const API_URL = process.env.IPFS_API_URL || 'http://127.0.0.1:5001';
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payloadBase64 = body?.payload;
        if (!payloadBase64) return NextResponse.json({ error: 'missing payload' }, { status: 400 });

        const bytes = Buffer.from(payloadBase64, 'base64');

        // Dynamically import ipfs-http-client to avoid build issues
        const { create } = await import('ipfs-http-client');

        // Configure IPFS client with authentication if using Infura
        const clientOptions: any = { url: API_URL };
        if (INFURA_PROJECT_ID && INFURA_API_KEY_SECRET) {
            const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_API_KEY_SECRET).toString('base64');
            clientOptions.headers = { authorization: auth };
        }

        const client = create(clientOptions);
        const result = await client.add(bytes);
        const cid = result.cid.toString();
        return NextResponse.json({ cid });
    } catch (err: any) {
        console.error('IPFS add error:', err);
        const errorMessage = err?.message || String(err);
        return NextResponse.json({
            error: `IPFS add failed: ${errorMessage}. IPFS API URL: ${API_URL}. Make sure IPFS_API_URL environment variable is set to a valid IPFS endpoint.`
        }, { status: 500 });
    }
}
