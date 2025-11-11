import { create } from 'ipfs-http-client';

const API_URL = process.env.IPFS_API_URL || 'http://localhost:5001';

export const ipfsClient = () => {
    return create({ url: API_URL });
}

const makeBuffer = (u8: Uint8Array) => {
    // Return a Node Buffer when available, otherwise a Uint8Array
    // This keeps behavior identical for existing Node tests while
    // remaining friendly for browser bundlers that may prefer Uint8Array.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof Buffer !== 'undefined') return Buffer.from(u8);
    return u8;
}

export const addBuffer = async (buf: Buffer): Promise<string> => {
    const client = ipfsClient();
    const result = await client.add(buf as any);
    return result.cid.toString();
}

export const catToBuffer = async (cid: string) => {
    const client = ipfsClient();
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
        const res = await fetch(`${api}/api/v0/id`, { method: 'POST' });
        return res.ok;
    } catch {
        return false;
    }
}
