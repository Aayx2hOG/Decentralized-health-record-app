-- CreateTable
CREATE TABLE "access_requests" (
    "id" SERIAL NOT NULL,
    "recordCid" TEXT NOT NULL,
    "requesterPubkey" TEXT NOT NULL,
    "ownerPubkey" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "respondedAt" TIMESTAMP(3),
    "responseNote" TEXT,
    "consentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "access_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_events" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "actorPubkey" TEXT NOT NULL,
    "recordCid" TEXT,
    "targetPubkey" TEXT,
    "metadata" TEXT,
    "ipAddress" TEXT,
    "txSignature" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "access_requests_ownerPubkey_idx" ON "access_requests"("ownerPubkey");

-- CreateIndex
CREATE INDEX "access_requests_requesterPubkey_idx" ON "access_requests"("requesterPubkey");

-- CreateIndex
CREATE INDEX "access_requests_recordCid_idx" ON "access_requests"("recordCid");

-- CreateIndex
CREATE INDEX "audit_events_recordCid_idx" ON "audit_events"("recordCid");

-- CreateIndex
CREATE INDEX "audit_events_actorPubkey_idx" ON "audit_events"("actorPubkey");

-- CreateIndex
CREATE INDEX "audit_events_targetPubkey_idx" ON "audit_events"("targetPubkey");

-- CreateIndex
CREATE INDEX "audit_events_createdAt_idx" ON "audit_events"("createdAt");
