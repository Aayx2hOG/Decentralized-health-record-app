import crypto from "crypto";
import sodium from 'libsodium-wrappers';

export function generateSymmetricKey(): Buffer {
    return crypto.randomBytes(32);
}

export function encryptPayloadAESGCM(plaintext: Buffer, key: Buffer) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();

    return { iv: iv.toString('base64'), ciphertext: ciphertext.toString('base64'), tag: tag.toString('base64') };
}

export function decryptPayloadAESGCM(obj: { iv: string, ciphertext: string, tag: string }, key: Buffer) {
    const iv = Buffer.from(obj.iv, 'base64');
    const ciphertext = Buffer.from(obj.ciphertext, 'base64');
    const tag = Buffer.from(obj.tag, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plain;
}

export async function encryptSymmetricKeyForRecipient(
    symKey: Uint8Array,
    senderEd25519SecretKey: Uint8Array,
    recipientEd25519PublicKey: Uint8Array
) {
    await sodium.ready;
    const sodiumLib = sodium;

    const recipientCurvePk = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(recipientEd25519PublicKey);
    const senderCurveSk = sodiumLib.crypto_sign_ed25519_sk_to_curve25519(senderEd25519SecretKey);

    const nonce = sodiumLib.randombytes_buf(sodiumLib.crypto_box_NONCEBYTES);
    const boxed = sodiumLib.crypto_box_easy(symKey, nonce, recipientCurvePk, senderCurveSk);

    return {
        nonce: Buffer.from(nonce).toString('base64'),
        boxed: Buffer.from(boxed).toString('base64'),
        packed: Buffer.concat([Buffer.from(nonce), Buffer.from(boxed)]),
    };
}

export async function decryptSymmetricKeyFromSender(
    boxedBase64: string,
    nonceBase64: string,
    senderEd25519PublicKey: Uint8Array,
    recipientEd25519SecretKey: Uint8Array
) {
    await sodium.ready;
    const sodiumLib = sodium;

    const senderCurvePk = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(senderEd25519PublicKey);
    const recipientCurveSk = sodiumLib.crypto_sign_ed25519_sk_to_curve25519(recipientEd25519SecretKey);

    const boxed = Uint8Array.from(Buffer.from(boxedBase64, 'base64'));
    const nonce = Uint8Array.from(Buffer.from(nonceBase64, 'base64'));

    const opened = sodiumLib.crypto_box_open_easy(boxed, nonce, senderCurvePk, recipientCurveSk);

    return Buffer.from(opened);
}