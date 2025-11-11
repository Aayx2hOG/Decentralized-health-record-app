import * as dotenv from 'dotenv';
dotenv.config();

import * as anchor from '@coral-xyz/anchor'
import { addBuffer, catToBuffer, isIpfsAvailable } from '../../src/lib/ipfs';
import { generateSymmetricKey, encryptPayloadAESGCM, encryptSymmetricKeyForRecipient } from '../../src/lib/crypto';

const IPFS_INTEGRATION = process.env.RUN_IPFS_INTEGRATION === '1';

describe('health_anchor', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider);

  const program = anchor.workspace.HealthAnchor;
  const admin = provider.wallet;

  const [configPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId
  );

  it("Initializes (or reuses) the config account", async () => {
    let config: any;
    try {
      config = await program.account.config.fetch(configPda);
    } catch {
      await program.methods.initialize().accountsPartial({
        config: configPda,
        admin: admin.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).rpc();
      config = await program.account.config.fetch(configPda);
    }

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

    const available = await isIpfsAvailable();
    if (!available) {
      if (IPFS_INTEGRATION) throw new Error('IPFS API unreachable but RUN_IPFS_INTEGRATION=1 (failing test)');
      return;
    }

    const blob = Buffer.from("test-ipfs-payload");
    const symKey: Buffer = Buffer.from(generateSymmetricKey() as Uint8Array);
    const encryptedPayload = await encryptPayloadAESGCM(blob, symKey);

    const payloadBuffer = Buffer.from(JSON.stringify(encryptedPayload));
    const cid = await addBuffer(payloadBuffer);

    const encForRecipient = await encryptSymmetricKeyForRecipient(
      Uint8Array.from(symKey),
      owner.secretKey,
      recipient.toBuffer()
    );

    const encryptedKeyPacked: Buffer = Buffer.from(encForRecipient.packed as Uint8Array);

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
    const available = await isIpfsAvailable();
    if (!available) return;

    const payload = Buffer.from('test-ipfs-payload');
    const cid = await addBuffer(payload);
    const fetched = await catToBuffer(cid);
    if (fetched.toString() !== payload.toString()) {
      throw new Error('Fetched data does not match uploaded data');
    }
  })
})
