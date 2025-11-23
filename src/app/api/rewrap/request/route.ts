import { NextRequest, NextResponse } from 'next/server';
import * as sodium from 'libsodium-wrappers';

const REWRAP_STORE = new Map<string, { symKey: string; recipients: string[] }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recordCid, recipientPub, ephemeralPub, signedRequest, timestamp } = body;

    if (!recordCid || !recipientPub || !ephemeralPub || !signedRequest || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = Date.now();
    const reqTime = new Date(timestamp).getTime();
    if (Math.abs(now - reqTime) > 5 * 60 * 1000) {
      console.error('Request expired');
      return NextResponse.json({ error: 'Request expired (timestamp too old)' }, { status: 400 });
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
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const stored = REWRAP_STORE.get(recordCid);
    if (!stored) {
      return NextResponse.json({ error: 'Record not found or symmetric key not stored' }, { status: 404 });
    }

    if (!stored.recipients.includes(recipientPub)) {
      return NextResponse.json({ error: 'You are not a recipient for this record' }, { status: 403 });
    }

    const symKeyBytes = Buffer.from(stored.symKey, 'base64');
    const ephemeralPubBytes = bs58.decode(ephemeralPub);

    const ephemeralCurvePub = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(ephemeralPubBytes);
    const sealed = sodiumLib.crypto_box_seal(symKeyBytes, ephemeralCurvePub);
    const sealedB64 = Buffer.from(sealed).toString('base64');

    return NextResponse.json({ rewrappedKey: sealedB64 });
  } catch (e: any) {
    console.error('Rewrap error:', e);
    return NextResponse.json({ error: e?.message || 'Rewrap failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { recordCid, symKey, recipients } = body;

    if (!recordCid || !symKey || !Array.isArray(recipients)) {
      return NextResponse.json({ error: 'Missing recordCid, symKey, or recipients' }, { status: 400 });
    }

    REWRAP_STORE.set(recordCid, { symKey, recipients });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Store error:', e);
    return NextResponse.json({ error: e?.message || 'Store failed' }, { status: 500 });
  }
}
