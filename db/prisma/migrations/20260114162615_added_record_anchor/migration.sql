-- CreateTable
CREATE TABLE "record_anchors" (
    "id" SERIAL NOT NULL,
    "recordCid" TEXT NOT NULL,
    "txSignature" TEXT NOT NULL,
    "pda" TEXT NOT NULL,
    "anchoredBy" TEXT NOT NULL,
    "anchoredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "record_anchors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "record_anchors_recordCid_key" ON "record_anchors"("recordCid");
