'use client';

import { encryptPayloadAESGCM, encryptSymmetricKeyForRecipient, generateSymmetricKey } from "@/lib/crypto";
import { PublicKey } from "@solana/web3.js";
import React, { useState } from "react";

export function parseSecretKeyJson(text: string): Uint8Array {
    try {
        const arr = JSON.parse(text);
        if (Array.isArray(arr)) return new Uint8Array(arr);
    } catch (e) {
        // ignore
    }
    throw new Error("Invalid secret key format");
}

function toBase64(u8: Uint8Array | Buffer) {
    if (typeof Buffer !== "undefined" && Buffer.from) return Buffer.from(u8 as any).toString("base64");
    let binary = "";
    for (let i = 0; i < u8.length; i++) binary += String.fromCharCode((u8 as Uint8Array)[i]);
    return (globalThis as any).btoa(binary);
}

export default function CreateRecord() {
    const [title, setTitle] = useState("");
    const [textPayload, setTextPayload] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [recipientsInput, setRecipientsInput] = useState("");
    const [ownerSecretJson, setOwnerSecretJson] = useState("");
    const [cid, setCid] = useState<string | null>(null);
    const [packedKeys, setPackedKeys] = useState<Array<{ recipient: string; packedB64: string }>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        setError(null);
        setBusy(true);

        try {
            let raw: Uint8Array;
            if (file) {
                const buffer = await file.arrayBuffer();
                raw = new Uint8Array(buffer);
            } else {
                raw = new TextEncoder().encode(textPayload || "");
            }

            const sym = generateSymmetricKey();
            const symU8 = sym instanceof Uint8Array ? sym : new Uint8Array(sym as any);

            const enc = await encryptPayloadAESGCM(raw, symU8);
            const payloadJson = JSON.stringify(enc);
            const payloadBuf = typeof Buffer !== "undefined" ? Buffer.from(payloadJson) : new TextEncoder().encode(payloadJson);
            // Use server API to add to IPFS (avoids bundling ipfs-http-client into the client)
            const payloadBase64 = typeof Buffer !== 'undefined' ? Buffer.from(payloadBuf).toString('base64') : btoa(String.fromCharCode(...(payloadBuf as Uint8Array)));
            const res = await fetch('/api/ipfs/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: payloadBase64 }) });
            if (!res.ok) throw new Error('IPFS add failed');
            const j = await res.json();
            const myCid = j.cid as string;
            setCid(myCid);

            const recipients = recipientsInput.split(",").map((s) => s.trim()).filter(Boolean);
            if (!recipients.length) {
                setPackedKeys([]);
                setBusy(false);
                return;
            }

            const ownerSecret = parseSecretKeyJson(ownerSecretJson);
            const results: Array<{ recipient: string; packedB64: string }> = [];

            for (const r of recipients) {
                const pub = new PublicKey(r);
                const recipientPkBytes = pub.toBuffer();

                const encForRecipient = await encryptSymmetricKeyForRecipient(symU8, ownerSecret, recipientPkBytes as Uint8Array);

                const packed = (encForRecipient.packed as any) instanceof Uint8Array ? encForRecipient.packed as Uint8Array : new Uint8Array(encForRecipient.packed as Buffer);
                const packedB64 = toBase64(packed as Uint8Array);
                results.push({ recipient: r, packedB64 });
            }

            setPackedKeys(results);
        } catch (e: any) {
            console.error("Error creating record:", e);
            setError(e?.message || String(e));
        } finally {
            setBusy(false);
        }
    }

    function downloadPacked(recipient: string, b64: string) {
        const bytes = typeof Buffer !== "undefined" ? Buffer.from(b64, "base64") : Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const blob = new Blob([bytes], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `encrypted_key_${recipient}.bin`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="max-w-3xl p-6">
            <h3 className="text-xl font-semibold">Create Record (dev demo)</h3>

            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Record title" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Text payload (or choose file)</label>
                    <textarea className="mt-1 block w-full rounded-md border px-3 py-2" value={textPayload} onChange={(e) => setTextPayload(e.target.value)} placeholder="Optional text payload" />
                    <div className="mt-2">
                        <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Recipients (comma-separated base58 public keys)</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={recipientsInput} onChange={(e) => setRecipientsInput(e.target.value)} placeholder="RecipientPubkey1, RecipientPubkey2" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Owner secret key (JSON array) — dev only</label>
                    <textarea className="mt-1 block w-full rounded-md border px-3 py-2" value={ownerSecretJson} onChange={(e) => setOwnerSecretJson(e.target.value)} placeholder='[12,34,56,...] (64 elements)' />
                </div>

                <div>
                    <button className="inline-flex items-center rounded bg-sky-600 px-4 py-2 text-white disabled:opacity-60" type="submit" disabled={busy}>{busy ? 'Working…' : 'Encrypt & Upload to IPFS'}</button>
                </div>
            </form>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {cid && (
                <div className="mt-4">
                    <h4 className="font-medium">IPFS CID</h4>
                    <div className="mt-1 break-all">{cid}</div>
                    <div className="mt-1 text-sm text-slate-600">Example cat URL: <a className="text-sky-600" href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">https://ipfs.io/ipfs/{cid}</a></div>
                </div>
            )}

            {packedKeys.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-medium">Packed encrypted keys (per recipient)</h4>
                    <ul className="mt-2 space-y-3">
                        {packedKeys.map((p) => (
                            <li key={p.recipient} className="rounded border p-3">
                                <div className="font-mono text-sm break-all">{p.recipient}</div>
                                <div className="mt-2 text-xs break-all">{p.packedB64}</div>
                                <div className="mt-2">
                                    <button className="rounded bg-gray-200 px-3 py-1 text-sm" onClick={() => downloadPacked(p.recipient, p.packedB64)}>Download</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">These packed buffers are nonce||boxed (binary). On-chain you should store the same packed buffer (e.g. as a bytes field).</p>
                </div>
            )}

            <div className="mt-6">
                <h4 className="font-medium">Optional: On-chain createRecord snippet</h4>
                <pre className="mt-2 rounded bg-slate-50 p-3 text-xs">
                    {`// Example (pseudo-code) using Anchor on the frontend (requires Anchor provider + IDL):
const recordKeypair = anchor.web3.Keypair.generate();
await program.methods.createRecord(
    "${cid}",
    "${title || 'Title'}",
    [${recipientsInput.split(',').map(s => `"${s.trim()}"`).join(', ')}],
    [/* pass Buffer.from(packed) for each recipient */]
).accounts({
    record: recordKeypair.publicKey,
    owner: wallet.publicKey,
}).signers([recordKeypair]).rpc();
`}
                </pre>
            </div>
        </div>
    );
}