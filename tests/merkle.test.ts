import { expect } from 'chai'
import { assertHex32, hashLeaf, buildMerkleTree, getProof, getRoot, verifyProof } from '../src/lib/merkle'

describe('Merkle per-user basic', () => {
  it('builds a tree and verifies proofs', () => {
    const owner = 'OwnerPublicKey1111111111111111111111111111111'
    const cids = ['cid1', 'cid2', 'cid3', 'cid4']

    const leaves = cids.map((c) => hashLeaf(owner, c))
    const tree = buildMerkleTree(leaves)
    const root = getRoot(tree)

    const leaf = leaves[2]
    const proof = getProof(tree, leaf)

    const ok = tree.verify(proof, leaf, root)
    expect(ok).to.be.true
  })

  it('rejects a proof for a different CID', () => {
    const owner = 'OwnerPublicKey1111111111111111111111111111111'
    const cids = ['cid1', 'cid2', 'cid3', 'cid4']
    const leaves = cids.map((c) => hashLeaf(owner, c))
    const tree = buildMerkleTree(leaves)
    const root = getRoot(tree)
    const proof = getProof(tree, leaves[2])
    const wrongLeaf = hashLeaf(owner, 'different-cid')

    expect(verifyProof(root, wrongLeaf, proof)).to.be.false
  })

  it('rejects malformed proof input', () => {
    expect(() => assertHex32('not-hex', 'rootHex')).to.throw('rootHex must be a 32-byte hex string')
  })
})
