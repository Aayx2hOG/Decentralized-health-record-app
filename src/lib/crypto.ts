
import * as sodium from 'libsodium-wrappers';

const hasSubtle = typeof globalThis !== 'undefined' && !!(globalThis.crypto && (globalThis.crypto as any).subtle);
const hasNodeCrypto = typeof process !== 'undefined' && !!(process.versions && process.versions.node);

// Helpers to handle Buffer/Uint8Array and base64 across envs
const toUint8 = (input: Uint8Array | ArrayBuffer | Buffer) => {
    if (input instanceof Uint8Array) return input;
    if (input instanceof ArrayBuffer) return new Uint8Array(input);
    // @ts-ignore Buffer exists in Node
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(input)) return new Uint8Array(input as Uint8Array);
    return new Uint8Array(input as any);
}

const randBytes = (len: number) => {
    if (hasSubtle) {
        const arr = new Uint8Array(len);
        (globalThis.crypto as any).getRandomValues(arr);
        return arr;
    }
    // Node fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    return new Uint8Array(nodeCrypto.randomBytes(len));
}

const toBase64 = (u8: Uint8Array) => {
    if (typeof Buffer !== 'undefined') return Buffer.from(u8).toString('base64');
    // browser fallback
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < u8.length; i += chunk) {
        binary += String.fromCharCode.apply(null, Array.prototype.slice.call(u8, i, i + chunk));
    }
    return btoa(binary);
}

const fromBase64 = (s: string) => {
    if (typeof Buffer !== 'undefined') return new Uint8Array(Buffer.from(s, 'base64'));
    const binary = atob(s);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

export function generateSymmetricKey(): Buffer | Uint8Array {
    const key = randBytes(32);
    // Prefer Node Buffer when available to keep backwards compatibility
    if (typeof Buffer !== 'undefined') return Buffer.from(key);
    return key;
}

export async function encryptPayloadAESGCM(plaintext: Uint8Array | Buffer, key: Uint8Array | Buffer): Promise<{ iv: string; ciphertext: string; tag: string }> {
    const pt = toUint8(plaintext as any);
    const k = toUint8(key as any);
    const iv = randBytes(12);

    if (hasSubtle) {
        const alg = { name: 'AES-GCM', iv, tagLength: 128 } as any;
        const cryptoKey = await (globalThis.crypto as any).subtle.importKey('raw', k.buffer ? k.buffer : k, alg, false, ['encrypt']);
        const ctbuf = await (globalThis.crypto as any).subtle.encrypt(alg, cryptoKey, pt.buffer ? pt.buffer : pt);
        const ct = toUint8(ctbuf);
        // Subtle appends tag to ciphertext in browsers; last 16 bytes are tag
        const tag = ct.slice(ct.length - 16);
        const ciphertext = ct.slice(0, ct.length - 16);
        return { iv: toBase64(iv), ciphertext: toBase64(ciphertext), tag: toBase64(tag) };
    }

    // Node path
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    const cipher = nodeCrypto.createCipheriv('aes-256-gcm', Buffer.from(k), Buffer.from(iv));
    const ciphertext = Buffer.concat([cipher.update(Buffer.from(pt)), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv: toBase64(iv), ciphertext: Buffer.from(ciphertext).toString('base64'), tag: Buffer.from(tag).toString('base64') };
}

export async function decryptPayloadAESGCM(obj: { iv: string, ciphertext: string, tag: string }, key: Uint8Array | Buffer): Promise<Buffer | Uint8Array> {
    const iv = fromBase64(obj.iv);
    const ct = fromBase64(obj.ciphertext);
    const tag = fromBase64(obj.tag);
    const k = toUint8(key as any);

    if (hasSubtle) {
        const alg = { name: 'AES-GCM', iv, tagLength: 128 } as any;
        const cryptoKey = await (globalThis.crypto as any).subtle.importKey('raw', k.buffer ? k.buffer : k, alg, false, ['decrypt']);
        // Subtle expects tag appended to ciphertext
        const combined = new Uint8Array(ct.length + tag.length);
        combined.set(ct, 0);
        combined.set(tag, ct.length);
        const plainBuf = await (globalThis.crypto as any).subtle.decrypt(alg, cryptoKey, combined.buffer);
        // Prefer Node Buffer when available for compatibility
        const out = new Uint8Array(plainBuf);
        if (typeof Buffer !== 'undefined') return Buffer.from(out);
        return out;
    }

    // Node path
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require('crypto');
    const decipher = nodeCrypto.createDecipheriv('aes-256-gcm', Buffer.from(k), Buffer.from(iv));
    decipher.setAuthTag(Buffer.from(tag));
    const plain = Buffer.concat([decipher.update(Buffer.from(ct)), decipher.final()]);
    return plain;
}

export async function encryptSymmetricKeyForRecipient(
    symKey: Uint8Array,
    senderEd25519SecretKey: Uint8Array,
    recipientEd25519PublicKey: Uint8Array
): Promise<{ nonce: string; boxed: string; packed: Buffer | Uint8Array }> {
    await sodium.ready;
    // libsodium-wrappers may export as a default on some bundlers/ESM interop.
    // Normalize to the actual API object so functions like
    // crypto_sign_ed25519_pk_to_curve25519 are always available.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sodiumLib: any = (sodium && (sodium as any).default) ? (sodium as any).default : sodium;

    const recipientCurvePk = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(recipientEd25519PublicKey);
    const senderCurveSk = sodiumLib.crypto_sign_ed25519_sk_to_curve25519(senderEd25519SecretKey);

    const nonce = sodiumLib.randombytes_buf(sodiumLib.crypto_box_NONCEBYTES);
    const boxed = sodiumLib.crypto_box_easy(symKey, nonce, recipientCurvePk, senderCurveSk);

    const nonceBuf = typeof Buffer !== 'undefined' ? Buffer.from(nonce) : new Uint8Array(nonce);
    const boxedBuf = typeof Buffer !== 'undefined' ? Buffer.from(boxed) : new Uint8Array(boxed);
    const packed = typeof Buffer !== 'undefined'
        ? Buffer.concat([nonceBuf as Buffer, boxedBuf as Buffer])
        : (() => { const out = new Uint8Array(nonceBuf.length + boxedBuf.length); out.set(nonceBuf as Uint8Array, 0); out.set(boxedBuf as Uint8Array, nonceBuf.length); return out; })();

    return {
        nonce: toBase64(nonce),
        boxed: toBase64(boxed),
        packed,
    };
}

export async function decryptSymmetricKeyFromSender(
    boxedBase64: string,
    nonceBase64: string,
    senderEd25519PublicKey: Uint8Array,
    recipientEd25519SecretKey: Uint8Array
): Promise<Buffer | Uint8Array> {
    await sodium.ready;
    // Normalize default export as above
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sodiumLib: any = (sodium && (sodium as any).default) ? (sodium as any).default : sodium;

    const senderCurvePk = sodiumLib.crypto_sign_ed25519_pk_to_curve25519(senderEd25519PublicKey);
    const recipientCurveSk = sodiumLib.crypto_sign_ed25519_sk_to_curve25519(recipientEd25519SecretKey);

    const boxed = fromBase64(boxedBase64);
    const nonce = fromBase64(nonceBase64);

    const opened = sodiumLib.crypto_box_open_easy(boxed, nonce, senderCurvePk, recipientCurveSk);

    const out = Buffer.from(opened);
    if (typeof Buffer !== 'undefined') return out;
    return new Uint8Array(out);
}
