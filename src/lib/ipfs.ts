const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_API_KEY_SECRET = process.env.INFURA_API_KEY_SECRET;
const API_URL = process.env.IPFS_API_URL || 'http://localhost:5001';

export const ipfsClient = async () => {
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

    return create(clientConfig);
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
    try {
        const url = API_URL.includes('@')
            ? `https://ipfs.infura.io:5001/api/v0/id`
            : `${API_URL.replace(/\/$/, '')}/api/v0/id`;

        const res = await fetch(url, { method: 'POST' });
        return res.ok;
    } catch {
        return false;
    }
}
