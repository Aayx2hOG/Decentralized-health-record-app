import {
    buildMerkleTree,
    getProof,
    getRoot,
    hashLeaf,
    verifyProof,
} from './merkle';
import { addMerkleLeaf, getLeafByOwnerAndRecord, getLeavesByOwner } from './merkle-db';
import { prismaClient } from 'db/src';

export type OwnerMerkleSnapshot = {
    ownerPubkey: string;
    leafCount: number;
    rootHex: string | null;
    leaves: Array<{
        id: number;
        recordCid: string;
        leafHash: string;
        leafIndex: number;
        createdAt: Date;
    }>;
};

export type MerkleProofResult = {
    ownerPubkey: string;
    recordCid: string;
    leafHex: string;
    leafIndex: number;
    rootHex: string;
    proofHex: string[];
};

export async function getOwnerMerkleSnapshot(ownerPubkey: string): Promise<OwnerMerkleSnapshot> {
    const rows = await getLeavesByOwner(ownerPubkey);

    if (rows.length === 0) {
        return {
            ownerPubkey,
            leafCount: 0,
            rootHex: null,
            leaves: [],
        };
    }

    const leaves = rows.map((row) => Buffer.from(row.leafHash, 'hex'));
    const tree = buildMerkleTree(leaves);
    const rootHex = getRoot(tree).toString('hex');

    return {
        ownerPubkey,
        leafCount: rows.length,
        rootHex,
        leaves: rows.map((row, index) => ({
            id: row.id,
            recordCid: row.recordCid,
            leafHash: row.leafHash,
            leafIndex: index,
            createdAt: row.createdAt,
        })),
    };
}

export async function getMerkleProofForRecord(ownerPubkey: string, recordCid: string): Promise<MerkleProofResult | null> {
    const [target, rows] = await Promise.all([
        getLeafByOwnerAndRecord(ownerPubkey, recordCid),
        getLeavesByOwner(ownerPubkey),
    ]);

    if (!target || rows.length === 0) {
        return null;
    }

    const targetLeaf = Buffer.from(target.leafHash, 'hex');
    const leaves = rows.map((row) => Buffer.from(row.leafHash, 'hex'));
    const tree = buildMerkleTree(leaves);
    const rootHex = getRoot(tree).toString('hex');
    const proofHex = getProof(tree, targetLeaf).map((proofNode) => proofNode.toString('hex'));
    const leafIndex = rows.findIndex((row) => row.id === target.id);

    return {
        ownerPubkey,
        recordCid,
        leafHex: target.leafHash,
        leafIndex,
        rootHex,
        proofHex,
    };
}

export function verifyMerkleProof(params: {
    rootHex: string;
    proofHex: string[];
    leafHex?: string;
    ownerPubkey?: string;
    recordCid?: string;
}) {
    const { rootHex, proofHex, leafHex, ownerPubkey, recordCid } = params;

    const resolvedLeafHex = leafHex ??
        (ownerPubkey && recordCid ? hashLeaf(ownerPubkey, recordCid).toString('hex') : null);

    if (!resolvedLeafHex) {
        throw new Error('Provide leafHex or ownerPubkey + recordCid');
    }

    const root = Buffer.from(rootHex, 'hex');
    const leaf = Buffer.from(resolvedLeafHex, 'hex');
    const proof = proofHex.map((node) => Buffer.from(node, 'hex'));

    return {
        valid: verifyProof(root, leaf, proof),
        leafHex: resolvedLeafHex,
    };
}

export async function backfillMerkleLeavesFromAnchors(ownerPubkey?: string) {
    const anchors = await prismaClient.recordAnchor.findMany({
        where: ownerPubkey ? { anchoredBy: ownerPubkey } : undefined,
        select: {
            id: true,
            anchoredBy: true,
            recordCid: true,
        },
        orderBy: { id: 'asc' },
    });

    let created = 0;
    let skipped = 0;

    for (const anchor of anchors) {
        const existing = await getLeafByOwnerAndRecord(anchor.anchoredBy, anchor.recordCid);
        if (existing) {
            skipped += 1;
            continue;
        }

        await addMerkleLeaf(anchor.anchoredBy, anchor.recordCid);
        created += 1;
    }

    return {
        ownerPubkey: ownerPubkey ?? null,
        anchorsScanned: anchors.length,
        created,
        skipped,
    };
}
