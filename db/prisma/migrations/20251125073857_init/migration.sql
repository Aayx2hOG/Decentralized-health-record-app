-- CreateTable
CREATE TABLE "rewrap_keys" (
    "id" TEXT NOT NULL,
    "recordCid" TEXT NOT NULL,
    "recipientPubkey" TEXT NOT NULL,
    "encryptedSymKey" TEXT NOT NULL,
    "creatorPubkey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "lastAccessedAt" TIMESTAMP(3),

    CONSTRAINT "rewrap_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_logs" (
    "id" TEXT NOT NULL,
    "recordCid" TEXT NOT NULL,
    "recipientPubkey" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "errorMessage" TEXT,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rewrapKeyId" TEXT,

    CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_recipient" ON "rewrap_keys"("recipientPubkey");

-- CreateIndex
CREATE INDEX "idx_creator" ON "rewrap_keys"("creatorPubkey");

-- CreateIndex
CREATE INDEX "idx_record_cid" ON "rewrap_keys"("recordCid");

-- CreateIndex
CREATE INDEX "idx_expires_at" ON "rewrap_keys"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "rewrap_keys_recordCid_recipientPubkey_key" ON "rewrap_keys"("recordCid", "recipientPubkey");

-- CreateIndex
CREATE INDEX "idx_access_record" ON "access_logs"("recordCid");

-- CreateIndex
CREATE INDEX "idx_access_recipient" ON "access_logs"("recipientPubkey");

-- CreateIndex
CREATE INDEX "idx_access_time" ON "access_logs"("accessedAt");

-- CreateIndex
CREATE INDEX "idx_access_key" ON "access_logs"("rewrapKeyId");

-- CreateIndex
CREATE INDEX "idx_access_success" ON "access_logs"("success");

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_rewrapKeyId_fkey" FOREIGN KEY ("rewrapKeyId") REFERENCES "rewrap_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
