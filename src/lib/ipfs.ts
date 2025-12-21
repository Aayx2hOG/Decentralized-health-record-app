const PINATA_JWT = process.env.PINATA_JWT;

export const ipfsClient = async () => {
    const { create } = await import('ipfs-http-client');
    return create({ url: 'http://localhost:5001' });
}

const makeBuffer = (u8: Uint8Array) => {
    if (typeof Buffer !== 'undefined') return Buffer.from(u8);
    return u8;
}

export const addBuffer = async (buf: Buffer): Promise<string> => {
    const client = await ipfsClient();
    const result = await client.add(buf as any);
    return result.cid.toString();
}

export const catToBuffer = async (cid: string) => {
    const client = await ipfsClient();
    const chunks: Uint8Array[] = [];
    for await (const chunk of client.cat(cid)) {
        chunks.push(chunk);
    }
    const total = chunks.reduce((acc, c) => acc + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) {
        out.set(c, offset);
        offset += c.length;
    }
    return makeBuffer(out);
}

export const isIpfsAvailable = async (): Promise<boolean> => {
    if (PINATA_JWT) {
        try {
            const res = await fetch('https://api.pinata.cloud/data/testAuthentication', {
                headers: { 'Authorization': `Bearer ${PINATA_JWT}` }
            });
            return res.ok;
        } catch {
            return false;
        }
    }

    try {
        const res = await fetch('http://localhost:5001/api/v0/id', { method: 'POST' });
        return res.ok;
    } catch {
        return false;
    }
}
