import { requireAdminAuth } from "@/lib/admin-auth";
import { prismaClient } from "db/src";
import { NextResponse } from "next/server";

export async function POST (req: Request){
    const authResult = await requireAdminAuth(req);
    if (!authResult.valid){
        return NextResponse.json({
            error: authResult.error || 'Unauthorized'
        }, {
            status: 401
        });
    }
    try{
        const body = await req.json();
        const {consentId, reason} = body;
        
        if (!consentId){
            return NextResponse.json({
                error: 'Consent ID is required'
            }, {
                status: 400
            });
        }
        const consent = await prismaClient.consentCredential.findUnique({
            where: {
                id: consentId
            }
        });
        if (!consent){
            return NextResponse.json({
                error: 'Consent not found'
            }, {
                status: 404
            });
        }
        if (consent.issuerPubkey !== authResult.pubkey){
            return NextResponse.json({error: 'Unauthorized'}, {
                status: 401
            });
        }
        if (consent.revokedAt){
            return NextResponse.json({error: 'Consent already revoked'}, {
                status: 400
            });
        }
        const updatedConsent = await prismaClient.consentCredential.update({
            where: {id: consentId},
            data: {
                revokedAt: new Date(),
                revokedReason: reason || null
            }
        });

        await prismaClient.auditEvent.create({
            data: {
                action: 'CONSENT_REVOKED',
                actorPubkey: consent.issuerPubkey,
                recordCid: consent.recordCid,
                targetPubkey: consent.recipientPubkey,
                metadata: JSON.stringify({
                    consentId,
                    consentCid: consent.consentCid,
                    reason: reason || null,
                }),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Consent revoked successfully",
            revokedAt: updatedConsent.revokedAt,
        });
    }catch(e){
        return NextResponse.json({
            error: e instanceof Error ? e.message : 'Internal server error',
        }, {
            status: 500
        });
    }
}