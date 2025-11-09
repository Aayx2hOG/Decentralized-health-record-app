import { create } from 'ipfs-http-client';

const API_URL = process.env.IPFS_API_URL || 'http://localhost:5001';

export const ipfsClient = () => {
    return create({ url: API_URL });
}

export const addBuffer = async (buf: Buffer): Promise<string> => {
    const client = ipfsClient();
    const result = await client.add(buf);
    return result.cid.toString();
}

export const catToBuffer = async (cid: string) => {
    const client = ipfsClient();
    const chunks: Uint8Array[] = [];
    for await (const chunk of client.cat(cid)) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks.map(c => Buffer.from(c)));
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