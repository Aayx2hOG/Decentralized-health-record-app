import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import IDL from "@/anchor/target/idl/compressed_health.json";

const PROGRAM_ID = new PublicKey('73bxU5B3qZV1UwnMPj4EZQJehSa2ka8vz7DE8WDwA8Lp');

async function hashString(str: string): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return new Uint8Array(hashBuffer);
}

export async function logConsentGranted(
    provider: AnchorProvider,
    consentCid: string,
    recordCid: string,
    recipientPubkey: string,
): Promise<string> {
    const program = new Program(IDL as any, provider);
    const consentCidHash = await hashString(consentCid);
    const recordCidHash = await hashString(recordCid);
    const recipient = new PublicKey(recipientPubkey);

    const signature = await program.methods
        .logConsentGranted(
            Array.from(consentCidHash),
            Array.from(recordCidHash),
            recipient
        )
        .accounts({
            issuer: provider.wallet.publicKey,
        })
        .rpc();

    return signature;
}

export async function logConsentRevoked(
    provider: AnchorProvider,
    consentCid: string,
    reason: string = ''
): Promise<string> {
    const program = new Program(IDL as any, provider);
    const consentCidHash = await hashString(consentCid);
    const reasonHash = await hashString(reason);

    const signature = await program.methods
        .logConsentRevoked(
            Array.from(consentCidHash),
            Array.from(reasonHash)
        )
        .accounts({
            issuer: provider.wallet.publicKey,
        })
        .rpc();

    return signature;
}

export async function logRecordCreated(
    provider: AnchorProvider,
    recordCid: string,
    title: string
): Promise<string> {
    const program = new Program(IDL as any, provider);
    const cidHash = await hashString(recordCid);

    const [recordAnchorPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('anchor'), cidHash],
        PROGRAM_ID
    );

    const signature = await program.methods
        .anchorRecord(recordCid)
        .accounts({
            recordAnchor: recordAnchorPda,
            payer: provider.wallet.publicKey,
        })
        .rpc();

    return signature;
}