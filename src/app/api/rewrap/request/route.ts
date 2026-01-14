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
      });
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
      });
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

    if (!stored) {
      if (consentCid) {
        const consentResult = await fetchAndVerifyConsent(consentCid);

        if (!consentResult.valid) {
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: `Invalid consent credential: ${consentResult.error}`,
              ipAddress,
              userAgent
            },
          });

          return NextResponse.json({
            error: `Invalid consent credential: ${consentResult.error}`
          }, { status: 403 });
        }

        if (consentResult.recordCid !== recordCid) {
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Consent credential is for a different record",
              ipAddress,
              userAgent
            },
          });

          return NextResponse.json({
            error: 'Consent credential is for a different record'
          }, { status: 403 });
        }

        if (consentResult.recipient !== recipientPub) {
          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Consent credential is for a different recipient",
              ipAddress,
              userAgent
            },
          });

          return NextResponse.json({
            error: 'Consent credential is for a different recipient'
          }, { status: 403 });
        }

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
          });

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
            });

            return NextResponse.json({
              error: 'Consent issuer is not authorized for this record'
            }, { status: 403 });
          }

          await prismaClient.accessLog.create({
            data: {
              recordCid,
              recipientPubkey: recipientPub,
              success: false,
              errorMessage: "Valid consent but no symmetric key available for rewrapping",
              ipAddress,
              userAgent
            },
          });

          return NextResponse.json({
            error: 'Valid consent credential, but the record creator has not enabled consent-based access. Please ask the creator to add you directly.'
          }, { status: 503 });
        }

        const consent = await prismaClient.consentCredential.findFirst({
          where: {
            consentCid: consentCid,
          }
        });

        if (consent) {
          if (consent.revokedAt) {
            await prismaClient.accessLog.create({
              data: {
                recordCid,
                recipientPubkey: recipientPub,
                success: false,
                errorMessage: "Consent has been revoked",
                ipAddress,
                userAgent
              },
            });
            return NextResponse.json({
              error: 'This consent has been revoked by the issuer'
            }, { status: 403 });
          }

          if (consent.expiresAt && new Date() > consent.expiresAt) {
            await prismaClient.accessLog.create({
              data: {
                recordCid,
                recipientPubkey: recipientPub,
                success: false,
                errorMessage: "Consent has expired",
                ipAddress,
                userAgent
              },
            });
            return NextResponse.json({
              error: 'Consent has expired'
            }, { status: 403 });
          }
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
            ipAddress,
            userAgent
          },
        });

        return NextResponse.json({ rewrappedKey: sealedB64, viaConsent: true });
      }

      const allKeysForRecord = await prismaClient.rewrapKey.findMany({
        where: { recordCid },
        select: { recipientPubkey: true, creatorPubkey: true }
      });

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
      });

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
      });

      await prismaClient.rewrapKey.delete({
        where: {
          id: stored.id
        },
      });

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
    try {
      await prismaClient.accessLog.create({
        data: {
          recordCid: 'unknown',
          recipientPubkey: 'unknown',
          success: false,
          errorMessage: e?.message || 'Rewrap failed',
          ipAddress,
          userAgent
        },
      });
    } catch {
    }
    return NextResponse.json({ error: e?.message || 'Rewrap failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { recordCid, symKey, recipients, creatorPubkey, creatorSignature } = body;

    if (!recordCid || !symKey || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'Missing recordCid, symKey, or recipients' }, { status: 400 });
    }

    if (!creatorPubkey || !creatorSignature) {
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
      return NextResponse.json({ error: 'Invalid creator signature - unauthorized' }, { status: 403 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

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

    return NextResponse.json({
      success: true,
      stored: successful,
      failed,
      message: `Stored ${successful} rewrap keys for ${recipients.length} recipients${failed > 0 ? `, ${failed} failed` : ''}.`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Store failed' }, { status: 500 });
  }
}