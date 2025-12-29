import * as anchor from "@coral-xyz/anchor";
import { Program, web3 } from "@coral-xyz/anchor";
import { CompressedHealth } from "../target/types/compressed_health";
import { createHash } from "crypto";

export interface RecordData {
  owner: web3.PublicKey;
  cid: string;
  title: string;
}

export class CompressedRecordClient {
  constructor(
    private program: Program<CompressedHealth>,
    private provider: anchor.AnchorProvider
  ) { }

  async initializeConfig(): Promise<{ config: web3.PublicKey; signature: string }> {
    const [config] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    );

    const tx = await this.program.methods
      .initializeConfig()
      .accounts({
        owner: this.provider.wallet.publicKey,
      })
      .rpc();

    return { config, signature: tx };
  }

  async batchCreateRecords(records: RecordData[]): Promise<string> {
    const [config] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    );

    const MAX_BATCH = 100;
    const batches: RecordData[][] = [];

    for (let i = 0; i < records.length; i += MAX_BATCH) {
      batches.push(records.slice(i, i + MAX_BATCH));
    }

    let lastSignature = "";

    for (const batch of batches) {
      const tx = await this.program.methods
        .batchCreateRecords(batch)
        .accounts({
          owner: this.provider.wallet.publicKey,
        })
        .rpc();

      lastSignature = tx;
    }

    return lastSignature;
  }

  async getRecordCount(): Promise<number> {
    const [config] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      this.program.programId
    );

    try {
      const configAccount = await this.program.account.config.fetch(config);
      return configAccount.recordCount.toNumber();
    } catch (e) {
      return 0;
    }
  }

  static async getCostEstimate(
    connection: web3.Connection,
    numRecords: number,
    batchSize: number = 100
  ): Promise<{
    totalCost: number;
    perRecordCost: number;
    numTransactions: number;
  }> {
    const { feeCalculator } = await connection.getRecentBlockhashAndContext()
      .then(res => res.value)
      .catch(() => ({ feeCalculator: { lamportsPerSignature: 5000 } }));

    const lamportsPerSignature = feeCalculator?.lamportsPerSignature || 5000;
    const numBatches = Math.ceil(numRecords / batchSize);
    const totalCost = numBatches * lamportsPerSignature / web3.LAMPORTS_PER_SOL;
    const perRecordCost = totalCost / numRecords;

    return {
      totalCost,
      perRecordCost,
      numTransactions: numBatches,
    };
  }

  static hashRecordData(record: RecordData): string {
    const data = `${record.owner.toString()}${record.cid}${record.title}`;
    return createHash('sha256').update(data).digest('hex');
  }

  async verifyRecord(record: RecordData, eventHash: Uint8Array): Promise<boolean> {
    const computeHash = CompressedRecordClient.hashRecordData(record);
    const eventHashHex = Buffer.from(eventHash).toString();
    return computeHash === eventHashHex;
  }

}

export function createCompressedRecordClient(
  program: Program<CompressedHealth>,
  provider: anchor.AnchorProvider
): CompressedRecordClient {
  return new CompressedRecordClient(program, provider);
}
