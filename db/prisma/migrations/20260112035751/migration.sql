-- AlterTable
ALTER TABLE "consent_credentials" ADD COLUMN     "revokedAt" TIMESTAMP(3),
ADD COLUMN     "revokedReason" TEXT;
