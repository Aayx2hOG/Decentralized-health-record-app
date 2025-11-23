export function ed25519PubkeyToDidKey(pubkey: Uint8Array): string {
    // multicodec varint for ed25519-pub is 0xED 0x01 (LEB128)
    const prefix = new Uint8Array([0xed, 0x01]);
    const combined = new Uint8Array(prefix.length + pubkey.length);
    combined.set(prefix, 0);
    combined.set(pubkey, prefix.length);
    // lazy import bs58 to keep bundles small
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const bs58 = require('bs58');
    const b58 = bs58.encode(Buffer.from(combined));
    return `did:key:z${b58}`;
}

export function pubkeyBase58ToDidKey(base58: string, bs58Impl?: any): string {
    // helper accepting base58 string
    // lazy-require bs58 if not provided
    const bs58 = bs58Impl ?? require('bs58');
    const pub = bs58.decode(base58);
    return ed25519PubkeyToDidKey(pub);
}

export function didKeyToEd25519Pubkey(didKey: string, bs58Impl?: any): Uint8Array {
    // expects did:key:z... (multibase base58btc with leading 'z')
    if (!didKey.startsWith('did:key:z')) throw new Error('Unsupported DID format');
    const b58 = didKey.slice('did:key:z'.length);
    const bs58 = bs58Impl ?? require('bs58');
    const decoded = bs58.decode(b58);
    // strip multicodec prefix 0xed01
    if (decoded.length < 3) throw new Error('Invalid did:key encoding');
    // first two bytes are 0xed 0x01
    const prefix0 = decoded[0];
    const prefix1 = decoded[1];
    if (prefix0 !== 0xed || prefix1 !== 0x01) throw new Error('Unsupported key type in did:key');
    const pub = decoded.slice(2);
    return new Uint8Array(pub);
}
