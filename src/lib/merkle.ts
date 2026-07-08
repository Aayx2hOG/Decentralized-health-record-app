import { MerkleTree } from 'merkletreejs'
import crypto from 'crypto'

export type Leaf = {
  ownerPubkey: string
  recordCid: string
  leafHash: string // hex
}

function sha256(data: Buffer | string) {
  return crypto.createHash('sha256').update(data).digest()
}

const HEX_32_BYTES = /^[0-9a-fA-F]{64}$/

export function assertHex32(value: string, label: string) {
  if (!HEX_32_BYTES.test(value)) {
    throw new Error(`${label} must be a 32-byte hex string`)
  }
}

export function hashLeaf(ownerPubkey: string, recordCid: string): Buffer {
  // deterministic leaf hash: sha256(owner || '|' || recordCid)
  return sha256(Buffer.from(ownerPubkey + '|' + recordCid))
}

export function buildMerkleTree(leaves: Buffer[]): MerkleTree {
  return new MerkleTree(leaves, sha256, { sortPairs: true, duplicateOdd: true })
}

export function leafToHex(leaf: Buffer): string {
  return leaf.toString('hex')
}

export function getProof(tree: MerkleTree, leaf: Buffer): Buffer[] {
  const proof = tree.getProof(leaf).map((p) => p.data)
  return proof
}

export function verifyProof(root: Buffer, leaf: Buffer, proof: Buffer[]): boolean {
  const verifier = new MerkleTree([], sha256, { sortPairs: true, duplicateOdd: true })
  return verifier.verify(proof, leaf, root)
}

export function getRoot(tree: MerkleTree): Buffer {
  return tree.getRoot()
}

export default {
  assertHex32,
  hashLeaf,
  buildMerkleTree,
  getProof,
  verifyProof,
  getRoot,
  leafToHex,
}
