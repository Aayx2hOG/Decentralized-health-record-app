/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "addedBy" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_credentials" (
    "id" SERIAL NOT NULL,
    "consentCid" TEXT NOT NULL,
    "recordCid" TEXT NOT NULL,
    "issuerPubkey" TEXT NOT NULL,
    "recipientPubkey" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "anchoredTxId" TEXT,

    CONSTRAINT "consent_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_pubkey_key" ON "admins"("pubkey");

-- CreateIndex
CREATE INDEX "admins_pubkey_idx" ON "admins"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "consent_credentials_consentCid_key" ON "consent_credentials"("consentCid");

-- CreateIndex
CREATE INDEX "idx_issuer" ON "consent_credentials"("issuerPubkey");

-- CreateIndex
CREATE INDEX "idx_recipient" ON "consent_credentials"("recipientPubkey");

-- CreateIndex
CREATE INDEX "idx_consent_record" ON "consent_credentials"("recordCid");
