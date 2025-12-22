import { NextRequest, NextResponse } from 'next/server';
import * as sodium from 'libsodium-wrappers';
import { prismaClient } from 'db/src';
import bs58 from 'bs58';
import { fetchAndVerifyConsent } from '@/lib/verify-consent';

export async function POST(req: NextRequest) {
  const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    const body = await req.json();
    const { recordCid, recipientPub, ephemeralPub, signedRequest, timestamp, consentCid } = body;

    if (!recordCid || !recipientPub || !ephemeralPub || !signedRequest || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = Date.now();
    const reqTime = new Date(timestamp).getTime();
    if (Math.abs(now - reqTime) > 5 * 60 * 1000) {
      await prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: false,
          errorMessage: "Request timestamp out of range",
          ipAddress,
          userAgent,
        },
      }).catch(e => console.error('Logging error:', e));
      return NextResponse.json({ error: 'Request timestamp out of range' }, { status: 400 });
    }

    await sodium.ready;
    const sodiumLib: any = (sodium && (sodium as any).default) ? (sodium as any).default : sodium;

    const messageToSign = JSON.stringify({ ephemeralPub, timestamp });
    const message = new TextEncoder().encode(messageToSign);
    const sigBytes = Buffer.from(signedRequest, 'base64');

    const pubBytes = bs58.decode(recipientPub);

    const valid = sodiumLib.crypto_sign_verify_detached(sigBytes, message, pubBytes);
    if (!valid) {
      await prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: false,
          errorMessage: "Invalid signature",
          ipAddress,
          userAgent
        },
      }).catch(e => console.error('Failed to log invalid signature', e));
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const stored = await prismaClient.rewrapKey.findUnique({
      where: {
        recordCid_recipientPubkey: {
          recordCid,
          recipientPubkey: recipientPub
        },
      },
    });

    console.log('[Rewrap] Looking for:', { recordCid, recipientPub, consentCid });
    console.log('[Rewrap] Found in database:', stored ? 'Yes' : 'No');

    if (!stored) {
      if (consentCid) {
        console.log('[Rewrap] Checking consent credential:', consentCid);
        const consentResult = await fetchAndVerifyConsent(consentCid);

        if (!consentResult.valid) {
          console.log('[Rewrap] Invalid consent:', consentResult.error);
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: `Invalid consent credential: ${consentResult.error}`,
              ipAddress,
              userAgent
            },
          }).catch(e => console.error('Failed to log invalid consent', e));

          return NextResponse.json({
            error: `Invalid consent credential: ${consentResult.error}`
          }, { status: 403 });
        }

        if (consentResult.recordCid !== recordCid) {
          console.log('[Rewrap] Consent CID mismatch:', { expected: recordCid, got: consentResult.recordCid });
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Consent credential is for a different record",
              ipAddress,
              userAgent
            },
          }).catch(e => console.error('Failed to log consent mismatch', e));

          return NextResponse.json({
            error: 'Consent credential is for a different record'
          }, { status: 403 });
        }

        if (consentResult.recipient !== recipientPub) {
          console.log('[Rewrap] Consent recipient mismatch:', { expected: recipientPub, got: consentResult.recipient });
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Consent credential is for a different recipient",
              ipAddress,
              userAgent
            },
          }).catch(e => console.error('Failed to log consent recipient mismatch', e));

          return NextResponse.json({
            error: 'Consent credential is for a different recipient'
          }, { status: 403 });
        }

        console.log('[Rewrap] Valid consent found! Issuer:', consentResult.issuer);

        if (!consentResult.issuer) {
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Consent credential missing issuer information",
              ipAddress,
              userAgent
            },
          }).catch(e => console.error('Failed to log missing issuer', e));

          return NextResponse.json({
            error: 'Consent credential is invalid - missing issuer'
          }, { status: 403 });
        }

        const issuerKey = await prismaClient.rewrapKey.findUnique({
          where: {
            recordCid_recipientPubkey: {
              recordCid,
              recipientPubkey: consentResult.issuer
            },
          },
        });

        if (!issuerKey) {
          console.log('[Rewrap] No key found for consent issuer. Checking if issuer is the creator...');
          const anyKey = await prismaClient.rewrapKey.findFirst({
            where: { recordCid },
          });

          if (!anyKey || anyKey.creatorPubkey !== consentResult.issuer) {
            await prismaClient.accessLog.create({
              data: {
                recordCid,
                recipientPubkey: recipientPub,
                success: false,
                errorMessage: "Consent issuer is not the record creator",
                ipAddress,
                userAgent
              },
            }).catch(e => console.error('Failed to log invalid issuer', e));

            return NextResponse.json({
              error: 'Consent issuer is not authorized for this record'
            }, { status: 403 });
          }
        }


        if (!issuerKey) {
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Valid consent but no symmetric key available for rewrapping",
              ipAddress,
              userAgent
            },
          }).catch(e => console.error('Failed to log missing symmetric key', e));

          return NextResponse.json({
            error: 'Valid consent credential, but the record creator has not enabled consent-based access. Please ask the creator to add you directly.'
          }, { status: 503 });
        }


        const symKeyBytes = Buffer.from(issuerKey.encryptedSymKey, 'base64');
        const ephemeralPubBytes = bs58.decode(ephemeralPub);
        const ephemeralCurvePub = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(ephemeralPubBytes);
        const sealed = sodiumLib.crypto_box_seal(symKeyBytes, ephemeralCurvePub);
        const sealedB64 = Buffer.from(sealed).toString('base64');

        await prismaClient.accessLog.create({
          data: {
            recordCid,
            recipientPubkey: recipientPub,
            success: true,
            errorMessage: `Access granted via consent credential (issuer: ${consentResult.issuer})`,
            ipAddress,
            userAgent
          },
        }).catch(e => console.error('Failed to log consent access', e));

        console.log('[Rewrap] Access granted via consent credential');
        return NextResponse.json({ rewrappedKey: sealedB64, viaConsent: true });
      }

      const allKeysForRecord = await prismaClient.rewrapKey.findMany({
        where: { recordCid },
        select: { recipientPubkey: true, creatorPubkey: true }
      });
      console.log('[Rewrap] Available recipients for this CID:', allKeysForRecord);

      const isCreator = allKeysForRecord.some(k => k.creatorPubkey === recipientPub);
      const errorMessage = isCreator
        ? "You are the record creator but don't have access stored. Please add yourself as a recipient."
        : "No access permission found. Please obtain a consent credential CID from the record creator.";

      await prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: false,
          errorMessage,
          ipAddress,
          userAgent
        },
      }).catch(e => console.error('Failed to log missing rewrap key', e));

      return NextResponse.json({
        error: errorMessage
      }, { status: 404 });
    }

    if (stored?.expiresAt && stored?.expiresAt < new Date()) {
      await prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: false,
          errorMessage: "Rewrap key expired",
          ipAddress,
          userAgent
        },
      }).catch(e => console.error("Failed to log expired rewrap key", e));

      await prismaClient.rewrapKey.delete({
        where: {
          id: stored.id
        },
      }).catch(e => console.error('Failed to delete expired rewrap key', e));

      return NextResponse.json({ error: 'Rewrap key expired' }, { status: 410 });
    }

    const symKeyBytes = Buffer.from(stored.encryptedSymKey, 'base64');
    const ephemeralPubBytes = bs58.decode(ephemeralPub);
    const ephemeralCurvePub = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(ephemeralPubBytes);
    const sealed = sodiumLib.crypto_box_seal(symKeyBytes, ephemeralCurvePub);
    const sealedB64 = Buffer.from(sealed).toString('base64');

    await prismaClient.$transaction([
      prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: true,
          ipAddress,
          userAgent
        },
      }),
      prismaClient.rewrapKey.update({
        where: {
          id: stored.id
        },
        data: {
          accessCount: { increment: 1 },
          lastAccessedAt: new Date(),
        },
      }),
    ]);

    return NextResponse.json({ rewrappedKey: sealedB64 });
  } catch (e: any) {
    console.error('Rewrap error:', e);

    try {
      const body = await req.json();
      await prismaClient.accessLog.create({
        data: {
          recordCid: body.recordCid || 'unknown',
          recipientPubkey: body.recipientPub || 'unknown',
          success: false,
          errorMessage: e?.message || 'Rewrap failed',
          ipAddress,
          userAgent
        },
      })
    } catch (e) {
      console.error('Logging error:', e);
    }
    return NextResponse.json({ error: e?.message || 'Rewrap failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { recordCid, symKey, recipients, creatorPubkey, creatorSignature } = body;

    console.log('[PUT /api/rewrap/request] Request received:', {
      recordCid,
      symKeyLength: symKey?.length,
      recipients,
      creatorPubkey,
      hasSignature: !!creatorSignature
    });

    if (!recordCid || !symKey || !Array.isArray(recipients) || recipients.length === 0) {
      console.error('[PUT] Missing required fields');
      return NextResponse.json({ error: 'Missing recordCid, symKey, or recipients' }, { status: 400 });
    }

    if (!creatorPubkey || !creatorSignature) {
      console.error('[PUT] Missing auth fields');
      return NextResponse.json({ error: 'Missing creatorPubkey or creatorSignature' }, { status: 400 });
    }

    await sodium.ready;
    const sodiumLib: any = (sodium && (sodium as any).default) ? (sodium as any).default : sodium;

    const messageToSign = JSON.stringify({
      recordCid,
      recipients: [...recipients].sort()
    });
    const message = new TextEncoder().encode(messageToSign);
    const sigBytes = Buffer.from(creatorSignature, 'base64');

    const creatorPubBytes = bs58.decode(creatorPubkey);

    const valid = sodiumLib.crypto_sign_verify_detached(sigBytes, message, creatorPubBytes);
    if (!valid) {
      console.error('[PUT] Invalid creator signature for recordCid:', recordCid);
      return NextResponse.json({ error: 'Invalid creator signature - unauthorized' }, { status: 403 });
    }

    console.log('[PUT] Signature verified, storing rewrap keys...');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    console.log('[PUT] About to upsert keys for recipients:', recipients);

    const results = await Promise.allSettled(
      recipients.map((recipientPubkey: string) =>
        prismaClient.rewrapKey.upsert({
          where: {
            recordCid_recipientPubkey: {
              recordCid,
              recipientPubkey
            },
          },
          update: {
            encryptedSymKey: symKey,
            expiresAt,
            creatorPubkey,
          },
          create: {
            recordCid,
            recipientPubkey,
            encryptedSymKey: symKey,
            creatorPubkey,
            expiresAt,
          }
        })
      )
    );

    const adminCount = await prismaClient.admin.count();
    if (adminCount === 0) {
      await prismaClient.admin.create({
        data: {
          pubkey: creatorPubkey,
          addedBy: 'system',
          isActive: true,
        }
      });
    }

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    if (failed > 0) {
      console.error('[PUT] Some keys failed to store:', results.filter(r => r.status === 'rejected').map((r: any) => ({
        reason: r.reason?.message || r.reason
      })));
    }

    console.log('[PUT] Upsert complete:', { successful, failed, total: recipients.length });

    return NextResponse.json({
      success: true,
      stored: successful,
      failed,
      message: `Stored ${successful} rewrap keys for ${recipients.length} recipients${failed > 0 ? `, ${failed} failed` : ''}.`,
    });
  } catch (e: any) {
    console.error('[PUT] Store error:', e);
    console.error('[PUT] Error stack:', e.stack);
    return NextResponse.json({ error: e?.message || 'Store failed' }, { status: 500 });
  }
}