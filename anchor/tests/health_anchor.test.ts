import * as anchor from '@coral-xyz/anchor'

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
    const encryptedKey = new Uint8Array([1, 2, 3, 4, 5]);
    const cid = "cid_test";

    await program.methods.createRecord(
      cid,
      tile,
      [recipient],
      [Buffer.from(encryptedKey)]
    ).accounts({
      record: recordKeypair.publicKey,
      owner: owner.publicKey,
    }).signers([owner, recordKeypair]).rpc();

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
})
