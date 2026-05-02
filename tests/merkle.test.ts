import { expect } from 'chai';
import { hashLeaf, buildMerkleTree, getProof, getRoot } from '../src/lib/merkle';

describe('Merkle per-user basic', () => {
    it('builds a tree and verifies proofs', () => {
        const owner = 'OwnerPublicKey1111111111111111111111111111111';
        const cids = ['cid1', 'cid2', 'cid3', 'cid4'];

        const leaves = cids.map(c => hashLeaf(owner, c));
        const tree = buildMerkleTree(leaves);
        const root = getRoot(tree);

        const leaf = leaves[2];
        const proof = getProof(tree, leaf);

        const ok = tree.verify(proof, leaf, root);
        expect(ok).to.be.true;
    });
});
