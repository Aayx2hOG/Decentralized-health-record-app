import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { requestId, decision, responseNote, ownerPubkey, consentCid, anchoredTxId } = body;

        if (!requestId || !decision || !ownerPubkey) {
            return NextResponse.json(
                { error: 'Missing required fields: requestId, decision, ownerPubkey' },
                { status: 400 }
            );
        }

        if (decision !== 'approved' && decision !== 'denied') {
            return NextResponse.json(
                { error: 'Decision must be "approved" or "denied"' },
                { status: 400 }
            );
        }

        const accessRequest = await prismaClient.accessRequest.findUnique({
            where: { id: requestId },
        });

        if (!accessRequest) {
            return NextResponse.json(
                { error: 'Access request not found' },
                { status: 404 }
            );
        }

        if (accessRequest.ownerPubkey !== ownerPubkey.trim()) {
            return NextResponse.json(
                { error: 'Unauthorized: you are not the record owner' },
                { status: 403 }
            );
        }

        if (accessRequest.status !== 'pending') {
            return NextResponse.json(
                { error: `Request already ${accessRequest.status}` },
                { status: 400 }
            );
        }

        const updated = await prismaClient.accessRequest.update({
            where: { id: requestId },
            data: {
                status: decision,
                respondedAt: new Date(),
                responseNote: responseNote || null,
            },
        });

        if (decision === 'approved' && consentCid) {
            try {
                const consent = await prismaClient.consentCredential.create({
                    data: {
                        consentCid,
                        recordCid: accessRequest.recordCid,
                        issuerPubkey: ownerPubkey.trim(),
                        recipientPubkey: accessRequest.requesterPubkey,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        anchoredTxId: anchoredTxId || null,
                    },
                });

                await prismaClient.accessRequest.update({
                    where: { id: requestId },
                    data: { consentId: consent.id },
                });
            } catch (consentErr) {
                console.error('Failed to store consent from approval:', consentErr);
            }
        }

        await prismaClient.auditEvent.create({
            data: {
                action: decision === 'approved' ? 'REQUEST_APPROVED' : 'REQUEST_DENIED',
                actorPubkey: ownerPubkey.trim(),
                recordCid: accessRequest.recordCid,
                targetPubkey: accessRequest.requesterPubkey,
                metadata: JSON.stringify({
                    requestId,
                    responseNote: responseNote || null,
                    consentCid: consentCid || null,
                }),
                txSignature: anchoredTxId || null,
            },
        });

        return NextResponse.json({
            success: true,
            status: decision,
            requestId: updated.id,
        });
    } catch (e: any) {
        console.error('Failed to respond to access request:', e);
        return NextResponse.json(
            { error: 'Failed to respond to access request' },
            { status: 500 }
        );
    }
}
