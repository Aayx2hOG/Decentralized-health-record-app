-- CreateTable
CREATE TABLE "merkle_leaves" (
    "id" SERIAL NOT NULL,
    "ownerPubkey" VARCHAR(44) NOT NULL,
    "recordCid" TEXT NOT NULL,
    "leafHash" VARCHAR(128) NOT NULL,
    "leafIndex" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merkle_leaves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_merkle_owner" ON "merkle_leaves"("ownerPubkey");

-- CreateIndex
CREATE INDEX "idx_merkle_record" ON "merkle_leaves"("recordCid");
