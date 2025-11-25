import { NextRequest, NextResponse } from 'next/server';
import * as sodium from 'libsodium-wrappers';
import { prismaClient } from 'db/src';

export async function POST(req: NextRequest) {

  const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    const body = await req.json();
    const { recordCid, recipientPub, ephemeralPub, signedRequest, timestamp } = body;

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

    const bs58 = require('bs58');
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

    if (!stored) {
      await prismaClient.accessLog.create({
        data: {
          recordCid,
          recipientPubkey: recipientPub,
          success: false,
          errorMessage: "No rewrap key found for recipient",
          ipAddress,
          userAgent
        },
      }).catch(e => console.error('Failed to log missing rewrap key', e));

      return NextResponse.json({ error: 'Record not found or you are not recipient.' }, { status: 404 });
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
    const { recordCid, symKey, recipients } = body;

    if (!recordCid || !symKey || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'Missing recordCid, symKey, or recipients' }, { status: 400 });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const results = await Promise.allSettled(recipients.map((recipientPubkey: string) =>
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
        },
        create: {
          recordCid,
          recipientPubkey,
          encryptedSymKey: symKey,
          expiresAt,
        }
      })
    ));

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    if (failed > 0) console.error('Some keys failed to store:', results.filter(r => r.status === 'rejected'));

    return NextResponse.json({
      success: true,
      stored: successful,
      failed,
      message: `Stored ${successful} rewrap keys for ${recipients.length} recipients, ${failed} failed.`,
    });
  } catch (e: any) {
    console.error('Store error:', e);
    return NextResponse.json({ error: e?.message || 'Store failed' }, { status: 500 });
  }
}
