/*
  Warnings:

  - The primary key for the `access_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `errorMessage` on the `access_logs` table. All the data in the column will be lost.
  - You are about to drop the column `recipientPubkey` on the `access_logs` table. All the data in the column will be lost.
  - You are about to drop the column `recordCid` on the `access_logs` table. All the data in the column will be lost.
  - The `id` column on the `access_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rewrapKeyId` column on the `access_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rewrap_keys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creatorPubkey` on the `rewrap_keys` table. All the data in the column will be lost.
  - You are about to drop the column `recipientPubkey` on the `rewrap_keys` table. All the data in the column will be lost.
  - You are about to drop the column `recordCid` on the `rewrap_keys` table. All the data in the column will be lost.
  - The `id` column on the `rewrap_keys` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[recordId,recipientId]` on the table `rewrap_keys` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientId` to the `access_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `access_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `rewrap_keys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `rewrap_keys` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "access_logs" DROP CONSTRAINT "access_logs_rewrapKeyId_fkey";

-- DropIndex
DROP INDEX "idx_access_recipient";

-- DropIndex
DROP INDEX "idx_access_record";

-- DropIndex
DROP INDEX "idx_creator";

-- DropIndex
DROP INDEX "idx_recipient";

-- DropIndex
DROP INDEX "idx_record_cid";

-- DropIndex
DROP INDEX "rewrap_keys_recordCid_recipientPubkey_key";

-- AlterTable
ALTER TABLE "access_logs" DROP CONSTRAINT "access_logs_pkey",
DROP COLUMN "errorMessage",
DROP COLUMN "recipientPubkey",
DROP COLUMN "recordCid",
ADD COLUMN     "errorMsg" TEXT,
ADD COLUMN     "recipientId" BIGINT NOT NULL,
ADD COLUMN     "recordId" BIGINT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "rewrapKeyId",
ADD COLUMN     "rewrapKeyId" BIGINT,
ADD CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rewrap_keys" DROP CONSTRAINT "rewrap_keys_pkey",
DROP COLUMN "creatorPubkey",
DROP COLUMN "recipientPubkey",
DROP COLUMN "recordCid",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recipientId" BIGINT NOT NULL,
ADD COLUMN     "recordId" BIGINT NOT NULL,
ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "shard" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ALTER COLUMN "accessCount" SET DATA TYPE BIGINT,
ADD CONSTRAINT "rewrap_keys_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" BIGSERIAL NOT NULL,
    "cid" TEXT NOT NULL,
    "creatorId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_pubkey_key" ON "users"("pubkey");

-- CreateIndex
CREATE UNIQUE INDEX "records_cid_key" ON "records"("cid");

-- CreateIndex
CREATE INDEX "idx_record_creator" ON "records"("creatorId");

-- CreateIndex
CREATE INDEX "idx_access_record" ON "access_logs"("recordId");

-- CreateIndex
CREATE INDEX "idx_access_recipient" ON "access_logs"("recipientId");

-- CreateIndex
CREATE INDEX "idx_access_key" ON "access_logs"("rewrapKeyId");

-- CreateIndex
CREATE INDEX "idx_record_recipient_time" ON "access_logs"("recordId", "recipientId", "accessedAt");

-- CreateIndex
CREATE INDEX "idx_recipient" ON "rewrap_keys"("recipientId");

-- CreateIndex
CREATE INDEX "idx_record_id" ON "rewrap_keys"("recordId");

-- CreateIndex
CREATE INDEX "idx_shard" ON "rewrap_keys"("shard");

-- CreateIndex
CREATE UNIQUE INDEX "rewrap_keys_recordId_recipientId_key" ON "rewrap_keys"("recordId", "recipientId");

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "records_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewrap_keys" ADD CONSTRAINT "rewrap_keys_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewrap_keys" ADD CONSTRAINT "rewrap_keys_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_rewrapKeyId_fkey" FOREIGN KEY ("rewrapKeyId") REFERENCES "rewrap_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
