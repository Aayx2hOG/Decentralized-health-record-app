import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: Request) {
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const createdKeys = await prismaClient.rewrapKey.findMany({
            where: {
                creatorPubkey: authResult.pubkey
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        const accessibleKeys = await prismaClient.rewrapKey.findMany({
            where: {
                recipientPubkey: authResult.pubkey,
                creatorPubkey: {
                    not: authResult.pubkey
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        const receivedConsents = await prismaClient.consentCredential.findMany({
            where: {
                recipientPubkey: authResult.pubkey,
                issuerPubkey: {
                    not: authResult.pubkey
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        const consentsAsKeys = receivedConsents.map(consent => ({
            id: -consent.id,
            recordCid: consent.recordCid,
            recipientPubkey: consent.recipientPubkey,
            creatorPubkey: consent.issuerPubkey,
            createdAt: consent.createdAt.toISOString(),
            expiresAt: consent.expiresAt?.toISOString() || null,
            revokedAt: consent.revokedAt?.toISOString() || null,
            revokedReason: consent.revokedReason || null,
            accessCount: 0,
            lastAccessedAt: null,
            isConsent: true,
        }));

        const combinedAccessible = [...accessibleKeys.map(k => ({ ...k, isConsent: false })), ...consentsAsKeys];
        combinedAccessible.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Get consents issued BY this user (for revocation management)
        const issuedConsents = await prismaClient.consentCredential.findMany({
            where: {
                issuerPubkey: authResult.pubkey
            },
            orderBy: { createdAt: 'desc' },
            take: 1000,
        });

        const issuedConsentsFormatted = issuedConsents.map(consent => ({
            id: consent.id,
            consentCid: consent.consentCid,
            recordCid: consent.recordCid,
            recipientPubkey: consent.recipientPubkey,
            createdAt: consent.createdAt.toISOString(),
            expiresAt: consent.expiresAt?.toISOString() || null,
            revokedAt: consent.revokedAt?.toISOString() || null,
            revokedReason: consent.revokedReason || null,
        }));

        return NextResponse.json({
            created: createdKeys,
            accessible: combinedAccessible,
            issuedConsents: issuedConsentsFormatted
        });
    } catch (e: any) {
        console.error('Failed to fetch keys:', e);
        return NextResponse.json({ error: 'Failed to fetch keys' }, { status: 500 });
    }
}
