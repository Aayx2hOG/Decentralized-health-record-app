-- Remove any historical duplicate owner/CID leaves before enforcing uniqueness.
DELETE FROM "merkle_leaves" newer
USING "merkle_leaves" older
WHERE newer."ownerPubkey" = older."ownerPubkey"
  AND newer."recordCid" = older."recordCid"
  AND newer."id" > older."id";

-- CreateIndex
CREATE UNIQUE INDEX "merkle_leaves_owner_record_key" ON "merkle_leaves"("ownerPubkey", "recordCid");

-- CreateTable
CREATE TABLE "merkle_root_snapshots" (
    "id" SERIAL NOT NULL,
    "ownerPubkey" VARCHAR(44) NOT NULL,
    "rootHex" VARCHAR(64) NOT NULL,
    "leafCount" INTEGER NOT NULL,
    "anchorTxSignature" TEXT,
    "anchorPda" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merkle_root_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "merkle_root_snapshots_owner_root_count_key" ON "merkle_root_snapshots"("ownerPubkey", "rootHex", "leafCount");

-- CreateIndex
CREATE INDEX "idx_merkle_root_snapshot_owner" ON "merkle_root_snapshots"("ownerPubkey");

-- CreateIndex
CREATE INDEX "idx_merkle_root_snapshot_root" ON "merkle_root_snapshots"("rootHex");
