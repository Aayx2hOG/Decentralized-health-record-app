import { NextResponse } from 'next/server';

const PINATA_JWT = process.env.PINATA_JWT;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const payloadBase64 = body?.payload;
        if (!payloadBase64) return NextResponse.json({ error: 'missing payload' }, { status: 400 });

        const bytes = Buffer.from(payloadBase64, 'base64');

        if (PINATA_JWT) {
            const formData = new FormData();
            const blob = new Blob([bytes]);
            formData.append('file', blob);

            const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PINATA_JWT}`
                },
                body: formData
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Pinata upload failed: ${error}`);
            }

            const result = await response.json();
            return NextResponse.json({ cid: result.IpfsHash });
        } else {
            const { create } = await import('ipfs-http-client');
            const client = create({ url: 'http://127.0.0.1:5001' });
            const result = await client.add(bytes);
            const cid = result.cid.toString();
            return NextResponse.json({ cid });
        }
    } catch (err: any) {
        console.error('IPFS add error:', err);
        const errorMessage = err?.message || String(err);
        return NextResponse.json({
            error: `IPFS add failed: ${errorMessage}. Check IPFS configuration.`
        }, { status: 500 });
    }
}
