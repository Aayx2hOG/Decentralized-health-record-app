import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CompressedHealth } from "../target/types/compressed_health";
import { CompressedRecordClient, RecordData } from "../src/compressed-client";
import { assert } from "chai";

describe("compressed-health", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.CompressedHealth as Program<CompressedHealth>;
    const client = new CompressedRecordClient(program, provider);

    it("Initializes config", async () => {
        const result = await client.initializeConfig();

        assert.ok(result.config);
        assert.ok(result.signature);
    });

    it("Batch creates 10 compressed records", async () => {
        const records: RecordData[] = [];

        for (let i = 0; i < 10; i++) {
            records.push({
                owner: provider.wallet.publicKey,
                cid: `QmBatch${i}`,
                title: `Batch Record ${i}`,
            });
        }

        const startCount = await client.getRecordCount();
        await client.batchCreateRecords(records);
        const endCount = await client.getRecordCount();

        assert.equal(endCount, startCount + 10);
    });

    it("Batch creates 100 compressed records", async () => {
        const records: RecordData[] = [];

        for (let i = 0; i < 100; i++) {
            records.push({
                owner: provider.wallet.publicKey,
                cid: `QmLarge${i}`,
                title: `Large Batch ${i}`,
            });
        }

        const startCount = await client.getRecordCount();
        await client.batchCreateRecords(records);
        const endCount = await client.getRecordCount();

        assert.equal(endCount, startCount + 100);
    });

    it("Estimates cost for 5000 records", async () => {
        const estimate = await CompressedRecordClient.getCostEstimate(
            provider.connection,
            5000,
            100
        );

        const uncompressedCost = 5000 * 0.0035;
        assert.ok(estimate.totalCost < uncompressedCost);
    });
});
