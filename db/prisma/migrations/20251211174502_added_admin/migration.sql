-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "pubkey" TEXT NOT NULL,
    "addedBy" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_pubkey_key" ON "Admin"("pubkey");

-- CreateIndex
CREATE INDEX "Admin_pubkey_idx" ON "Admin"("pubkey");
