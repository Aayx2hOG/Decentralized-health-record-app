import { create } from "ipfs-http-client";
import crypto from "crypto";

const QUICKNODE_IPFS_URL = process.env.QUICKNODE_IPFS_URL || process.env.QUICKNODE_URL;

const mockStore = new Map<string, Buffer>();

function makeFakeCid(buf: Buffer) {
    const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 32);
    return `mock-${hash}`;
}

let client: any | null = null;
let useMock = false;

if (QUICKNODE_IPFS_URL) {
    const lower = QUICKNODE_IPFS_URL.toLowerCase();
    if (lower.includes('solana') || lower.includes('/rpc') || lower.includes('solana-devnet')) {
        console.warn('[ipfs_quicknode] QUICKNODE_IPFS_URL looks like a Solana RPC endpoint; using in-memory mock IPFS for tests. Set QUICKNODE_IPFS_URL to a real IPFS HTTP API to use QuickNode IPFS.');
        useMock = true;
    } else {
        try {
            client = create({ url: QUICKNODE_IPFS_URL });
        } catch (err) {
            console.warn('[ipfs_quicknode] failed to create ipfs client, falling back to mock:', (err as any)?.message || err);
            useMock = true;
        }
    }
} else {
    console.warn('[ipfs_quicknode] QUICKNODE_IPFS_URL not set; using in-memory mock IPFS for tests.');
    useMock = true;
}

export async function uploadToIpfs(data: Uint8Array | Buffer | string) {
    if (useMock || !client) {
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data as any);
        const cid = makeFakeCid(buf);
        mockStore.set(cid, buf);
        return cid;
    }

    const { cid } = await client.add(data as any);
    return cid.toString();
}

export async function fetchFromIpfs(cid: string) {
    if (useMock || !client) {
        const buf = mockStore.get(cid);
        if (!buf) throw new Error(`mock IPFS: cid not found: ${cid}`);
        return buf;
    }

    const chunks: Uint8Array[] = [];
    for await (const chunk of client.cat(cid)) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks as any);
}