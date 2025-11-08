import * as anchor from '@coral-xyz/anchor'
import { ipfsClient, addBuffer, catToBuffer } from './helpers/ipfs';
import { generateSymmetricKey, encryptPayloadAESGCM, encryptSymmetricKeyForRecipient } from './helpers/crypto';
const IPFS_INTEGRATION = process.env.RUN_IPFS_INTEGRATION === '1';

describe('health_anchor', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.HealthAnchor;
  const admin = provider.wallet;

  const [configPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId
  );

  it("Initalized the config account", async () => {
    await program.methods.initialize().accountsPartial({
      config: configPda,
      admin: admin.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    const config = await program.account.config.fetch(configPda);

    expect(config.admin.toBase58()).toBe(admin.publicKey.toBase58());
    expect(typeof config.bump).toBe("number");
  });

  it("Creates a new record", async () => {
    const owner = anchor.web3.Keypair.generate();

    const airdropSig = await provider.connection.requestAirdrop(
      owner.publicKey,
      5000000000
    );
    await provider.connection.confirmTransaction(airdropSig);

    const recordKeypair = anchor.web3.Keypair.generate();

    const tile = "Blood test";
    const recipient = anchor.web3.Keypair.generate().publicKey;

    const client = ipfsClient();

    try {
      await (client as any).id();
    } catch (err) {
      if (IPFS_INTEGRATION) {
        throw new Error('IPFS API unreachable but RUN_IPFS_INTEGRATION=1 (failing test)');
      } else {
        console.warn('IPFS API not reachable; skipping encrypted-IPFS flow in Creates a new record test');
        return;
      }
    }

    const blob = Buffer.from("test-ipfs-payload");
    const symKey: Buffer = generateSymmetricKey();
    const encryptedPayload = encryptPayloadAESGCM(blob, symKey);

    const payloadBuffer = Buffer.from(JSON.stringify(encryptedPayload));
    const cid = await addBuffer(payloadBuffer);

    const encForRecipient = await encryptSymmetricKeyForRecipient(
      Uint8Array.from(symKey),
      owner.secretKey,
      recipient.toBuffer()
    );

    const encryptedKeyPacked: Buffer = encForRecipient.packed;

    await program.methods.createRecord(
      cid,
      tile,
      [recipient],
      [encryptedKeyPacked]
    ).accounts({
      record: recordKeypair.publicKey,
      owner: owner.publicKey,
    }).signers([owner, recordKeypair]).rpc();

    // IPFS integration tests are run separately below.

    const record = await program.account.record.fetch(recordKeypair.publicKey);

    expect(record.owner.toBase58()).toBe(owner.publicKey.toBase58());
    expect(record.cid).toBe(cid);
    expect(record.title).toBe(tile);
    expect(record.accessEntries.length).toBe(1);
  });

  it("grants access to a record", async () => {
    const owner = anchor.web3.Keypair.generate();
    const recordKeypair = anchor.web3.Keypair.generate();

    const airdropSig = await provider.connection.requestAirdrop(
      owner.publicKey,
      5000000000
    );
    await provider.connection.confirmTransaction(airdropSig);

    await program.methods.createRecord(
      "cid_123",
      "MRI Resport",
      [],
      []
    ).accounts({
      record: recordKeypair.publicKey,
      owner: owner.publicKey,
    }).signers([owner, recordKeypair]).rpc();

    const newRecipient = anchor.web3.Keypair.generate().publicKey;
    const encryptedKey = Buffer.from([10, 20, 30, 40, 50]);

    await program.methods.grantAccess(newRecipient, encryptedKey).
      accounts({
        record: recordKeypair.publicKey,
        owner: owner.publicKey,
      }).signers([owner]).rpc();

    const record = await program.account.record.fetch(recordKeypair.publicKey);

    expect(record.accessEntries.some((e: any) => e.recipient.equals(newRecipient))).toBe(true);
  });

  it("revokes access to a record", async () => {
    const owner = anchor.web3.Keypair.generate();
    const recordKeypair = anchor.web3.Keypair.generate();
    const recipient = anchor.web3.Keypair.generate().publicKey;

    const airdropSig = await provider.connection.requestAirdrop(
      owner.publicKey,
      5000000000
    );
    await provider.connection.confirmTransaction(airdropSig);

    await program.methods.createRecord(
      "cid_456",
      "X-Ray Report",
      [recipient],
      [Buffer.from([5, 4, 3, 2, 1])]
    ).accounts({
      record: recordKeypair.publicKey,
      owner: owner.publicKey,
    }).signers([owner, recordKeypair]).rpc();

    await program.methods.revokeAccess(recipient).accounts({
      record: recordKeypair.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();

    const record = await program.account.record.fetch(recordKeypair.publicKey);

    const entry = record.accessEntries.find((e: any) => e.recipient.equals(recipient));

    expect(entry?.revoked).toBe(true);

  })

  it('ipfs helper smoke test', async () => {
    const client = ipfsClient();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (client as any).id();
    } catch (err) {
      // IPFS API not available locally — skip this test by returning early
      // log a short warning so CI/devs see why it was skipped
      console.warn('IPFS API not reachable; skipping ipfs helper smoke test');
      return;
    }

    const payload = Buffer.from('test-ipfs-payload');
    const cid = await addBuffer(payload);
    const fetched = await catToBuffer(cid);
    if (fetched.toString() !== payload.toString()) {
      throw new Error('Fetched data does not match uploaded data');
    }
  })
})
