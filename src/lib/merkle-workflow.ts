import { buildMerkleTree, getProof, getRoot, hashLeaf, assertHex32, verifyProof } from './merkle'
import { addMerkleLeaf, getLeafByOwnerAndRecord, getLeavesByOwner } from './merkle-db'
import { prismaClient } from 'db/src'

export type OwnerMerkleSnapshot = {
  ownerPubkey: string
  leafCount: number
  rootHex: string | null
  latestSnapshot?: MerkleRootSnapshot | null
  leaves: Array<{
    id: number
    recordCid: string
    leafHash: string
    leafIndex: number
    createdAt: Date
  }>
}

export type MerkleProofResult = {
  ownerPubkey: string
  recordCid: string
  leafHex: string
  leafIndex: number
  rootHex: string
  proofHex: string[]
  leafCount: number
  snapshotId: number | null
  snapshotCreatedAt: Date | null
  anchorTxSignature: string | null
}

export type MerkleRootSnapshot = {
  id: number
  ownerPubkey: string
  rootHex: string
  leafCount: number
  anchorTxSignature: string | null
  anchorPda: string | null
  createdAt: Date
}

export async function getOwnerMerkleSnapshot(ownerPubkey: string): Promise<OwnerMerkleSnapshot> {
  const rows = await getLeavesByOwner(ownerPubkey)

  if (rows.length === 0) {
    return {
      ownerPubkey,
      leafCount: 0,
      rootHex: null,
      leaves: [],
    }
  }

  const leaves = rows.map((row) => Buffer.from(row.leafHash, 'hex'))
  const tree = buildMerkleTree(leaves)
  const rootHex = getRoot(tree).toString('hex')
  const snapshot = await getLatestRootSnapshot(ownerPubkey, rootHex, rows.length)

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
    latestSnapshot: snapshot,
  }
}

export async function getMerkleProofForRecord(
  ownerPubkey: string,
  recordCid: string,
): Promise<MerkleProofResult | null> {
  const [target, rows] = await Promise.all([
    getLeafByOwnerAndRecord(ownerPubkey, recordCid),
    getLeavesByOwner(ownerPubkey),
  ])

  if (!target || rows.length === 0) {
    return null
  }

  const targetLeaf = Buffer.from(target.leafHash, 'hex')
  const leaves = rows.map((row) => Buffer.from(row.leafHash, 'hex'))
  const tree = buildMerkleTree(leaves)
  const rootHex = getRoot(tree).toString('hex')
  const proofHex = getProof(tree, targetLeaf).map((proofNode) => proofNode.toString('hex'))
  const leafIndex = rows.findIndex((row) => row.id === target.id)
  const snapshot = await ensureRootSnapshot(ownerPubkey, rootHex, rows.length)

  return {
    ownerPubkey,
    recordCid,
    leafHex: target.leafHash,
    leafIndex,
    rootHex,
    proofHex,
    leafCount: rows.length,
    snapshotId: snapshot?.id ?? null,
    snapshotCreatedAt: snapshot?.createdAt ?? null,
    anchorTxSignature: snapshot?.anchorTxSignature ?? null,
  }
}

export function verifyMerkleProof(params: {
  rootHex: string
  proofHex: string[]
  leafHex?: string
  ownerPubkey?: string
  recordCid?: string
}) {
  const { rootHex, proofHex, leafHex, ownerPubkey, recordCid } = params

  const resolvedLeafHex =
    leafHex ?? (ownerPubkey && recordCid ? hashLeaf(ownerPubkey, recordCid).toString('hex') : null)

  if (!resolvedLeafHex) {
    throw new Error('Provide leafHex or ownerPubkey + recordCid')
  }

  assertHex32(rootHex, 'rootHex')
  assertHex32(resolvedLeafHex, 'leafHex')
  proofHex.forEach((node, index) => assertHex32(node, `proofHex[${index}]`))

  const root = Buffer.from(rootHex, 'hex')
  const leaf = Buffer.from(resolvedLeafHex, 'hex')
  const proof = proofHex.map((node) => Buffer.from(node, 'hex'))

  return {
    valid: verifyProof(root, leaf, proof),
    leafHex: resolvedLeafHex,
  }
}

export async function getLatestRootSnapshot(ownerPubkey: string, rootHex?: string, leafCount?: number) {
  const rows = await prismaClient.$queryRaw<MerkleRootSnapshot[]>`
        SELECT
            "id",
            "ownerPubkey",
            "rootHex",
            "leafCount",
            "anchorTxSignature",
            "anchorPda",
            "createdAt"
        FROM "merkle_root_snapshots"
        WHERE "ownerPubkey" = ${ownerPubkey}
          AND (${rootHex ?? null}::text IS NULL OR "rootHex" = ${rootHex ?? null})
          AND (${leafCount ?? null}::int IS NULL OR "leafCount" = ${leafCount ?? null})
        ORDER BY "createdAt" DESC, "id" DESC
        LIMIT 1
    `

  return rows[0] ?? null
}

export async function ensureRootSnapshot(
  ownerPubkey: string,
  rootHex: string,
  leafCount: number,
  anchor?: { txSignature?: string | null; pda?: string | null },
) {
  assertHex32(rootHex, 'rootHex')

  await prismaClient.$executeRaw`
        INSERT INTO "merkle_root_snapshots" (
            "ownerPubkey",
            "rootHex",
            "leafCount",
            "anchorTxSignature",
            "anchorPda"
        )
        VALUES (
            ${ownerPubkey},
            ${rootHex},
            ${leafCount},
            ${anchor?.txSignature ?? null},
            ${anchor?.pda ?? null}
        )
        ON CONFLICT ("ownerPubkey", "rootHex", "leafCount") DO UPDATE SET
            "anchorTxSignature" = COALESCE("merkle_root_snapshots"."anchorTxSignature", EXCLUDED."anchorTxSignature"),
            "anchorPda" = COALESCE("merkle_root_snapshots"."anchorPda", EXCLUDED."anchorPda")
    `

  return getLatestRootSnapshot(ownerPubkey, rootHex, leafCount)
}

export async function snapshotCurrentOwnerRoot(
  ownerPubkey: string,
  anchor?: { txSignature?: string | null; pda?: string | null },
) {
  const snapshot = await getOwnerMerkleSnapshot(ownerPubkey)
  if (!snapshot.rootHex || snapshot.leafCount === 0) {
    return null
  }

  return ensureRootSnapshot(ownerPubkey, snapshot.rootHex, snapshot.leafCount, anchor)
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
  })

  let created = 0
  let skipped = 0
  const touchedOwners = new Set<string>()

  for (const anchor of anchors) {
    const existing = await getLeafByOwnerAndRecord(anchor.anchoredBy, anchor.recordCid)
    if (existing) {
      skipped += 1
      touchedOwners.add(anchor.anchoredBy)
      continue
    }

    await addMerkleLeaf(anchor.anchoredBy, anchor.recordCid)
    touchedOwners.add(anchor.anchoredBy)
    created += 1
  }

  let snapshotsCreated = 0
  for (const owner of touchedOwners) {
    const snapshot = await snapshotCurrentOwnerRoot(owner)
    if (snapshot) {
      snapshotsCreated += 1
    }
  }

  return {
    ownerPubkey: ownerPubkey ?? null,
    anchorsScanned: anchors.length,
    created,
    skipped,
    snapshotsCreated,
  }
}
