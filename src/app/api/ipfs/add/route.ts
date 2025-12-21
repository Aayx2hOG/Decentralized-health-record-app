import { NextResponse } from 'next/server';

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET;
const API_URL = process.env.IPFS_API_URL || 'http://127.0.0.1:5001';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payloadBase64 = body?.payload;
        if (!payloadBase64) return NextResponse.json({ error: 'missing payload' }, { status: 400 });

        const bytes = Buffer.from(payloadBase64, 'base64');

        const { create } = await import('ipfs-http-client');

        let clientConfig: any;

        if (INFURA_PROJECT_ID && INFURA_API_KEY_SECRET) {
            const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_API_KEY_SECRET).toString('base64');
            clientConfig = {
                url: `https://ipfs.infura.io:5001/api/v0`,
                headers: {
                    authorization: auth
                }
            };
        } else if (!API_URL.includes('127.0.0.1') && !API_URL.includes('localhost')) {
            clientConfig = { url: API_URL };
        } else {
            clientConfig = { url: API_URL };
        }

        const client = create(clientConfig);
        const result = await client.add(bytes);
        const cid = result.cid.toString();
        return NextResponse.json({ cid });
    } catch (err: any) {
        console.error('IPFS add error:', err);
        const errorMessage = err?.message || String(err);
        return NextResponse.json({
            error: `IPFS add failed: ${errorMessage}. Check IPFS configuration.`
        }, { status: 500 });
    }
}
