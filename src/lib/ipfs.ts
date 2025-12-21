const API_URL = process.env.IPFS_API_URL || 'http://localhost:5001';
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET;

export const ipfsClient = async () => {
    const { create } = await import('ipfs-http-client');

    // Configure IPFS client with authentication if using Infura
    const clientOptions: any = { url: API_URL };
    if (INFURA_PROJECT_ID && INFURA_API_KEY_SECRET) {
        const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_API_KEY_SECRET).toString('base64');
        clientOptions.headers = { authorization: auth };
    }

    return create(clientOptions);
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
    const api = (process.env.IPFS_API_URL || API_URL).replace(/\/$/, '');
    try {
        const headers: any = { 'Content-Type': 'application/json' };

        // Add Infura authentication if available
        if (INFURA_PROJECT_ID && INFURA_API_KEY_SECRET) {
            const auth = 'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_API_KEY_SECRET).toString('base64');
            headers.authorization = auth;
        }

        const res = await fetch(`${api}/api/v0/id`, {
            method: 'POST',
            headers
        });
        return res.ok;
    } catch {
        return false;
    }
}
