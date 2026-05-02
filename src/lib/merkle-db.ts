import { prismaClient } from 'db/src';
import { hashLeaf } from './merkle';

export type MerkleLeafRecord = {
    id: number;
    ownerPubkey: string;
    recordCid: string;
    leafHash: string;
    leafIndex?: number | null;
    createdAt: Date;
};

export async function addMerkleLeaf(ownerPubkey: string, recordCid: string) {
    const leafHash = hashLeaf(ownerPubkey, recordCid).toString('hex');
    const rec = await prismaClient.merkleLeaf.create({
        data: {
            ownerPubkey,
            recordCid,
            leafHash,
        },
    });
    return rec as MerkleLeafRecord;
}

export async function ensureMerkleLeaf(ownerPubkey: string, recordCid: string) {
    const existing = await prismaClient.merkleLeaf.findFirst({
        where: { ownerPubkey, recordCid },
        orderBy: { id: 'asc' },
    });

    if (existing) {
        return existing as MerkleLeafRecord;
    }

    return addMerkleLeaf(ownerPubkey, recordCid);
}

export async function getLeavesByOwner(ownerPubkey: string) {
    const rows = await prismaClient.merkleLeaf.findMany({
        where: { ownerPubkey },
        orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });
    return rows as MerkleLeafRecord[];
}

export async function getLeafByOwnerAndRecord(ownerPubkey: string, recordCid: string) {
    const row = await prismaClient.merkleLeaf.findFirst({
        where: { ownerPubkey, recordCid },
        orderBy: { id: 'asc' },
    });
    return row as MerkleLeafRecord | null;
}

export async function getLeafById(id: number) {
    const row = await prismaClient.merkleLeaf.findUnique({ where: { id } });
    return row as MerkleLeafRecord | null;
}

export async function setLeafIndex(id: number, index: number) {
    const row = await prismaClient.merkleLeaf.update({ where: { id }, data: { leafIndex: index } });
    return row as MerkleLeafRecord;
}

export async function closePrisma() {
    await prismaClient.$disconnect();
}

export default {
    addMerkleLeaf,
    ensureMerkleLeaf,
    getLeavesByOwner,
    getLeafByOwnerAndRecord,
    getLeafById,
    setLeafIndex,
    closePrisma,
};
