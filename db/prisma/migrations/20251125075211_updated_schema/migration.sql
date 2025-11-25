/*
  Warnings:

  - The primary key for the `access_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `access_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rewrapKeyId` column on the `access_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `rewrap_keys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `rewrap_keys` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "access_logs" DROP CONSTRAINT "access_logs_rewrapKeyId_fkey";

-- DropIndex
DROP INDEX "idx_access_key";

-- DropIndex
DROP INDEX "idx_access_success";

-- DropIndex
DROP INDEX "idx_creator";

-- AlterTable
ALTER TABLE "access_logs" DROP CONSTRAINT "access_logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "rewrapKeyId",
ADD COLUMN     "rewrapKeyId" INTEGER,
ADD CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rewrap_keys" DROP CONSTRAINT "rewrap_keys_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "creatorPubkey" DROP NOT NULL,
ADD CONSTRAINT "rewrap_keys_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_rewrapKeyId_fkey" FOREIGN KEY ("rewrapKeyId") REFERENCES "rewrap_keys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_access_record" RENAME TO "idx_access_record_cid";

-- RenameIndex
ALTER INDEX "idx_recipient" RENAME TO "idx_recipient_pubkey";
