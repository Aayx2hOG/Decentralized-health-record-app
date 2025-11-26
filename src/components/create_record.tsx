'use client';

import { encryptPayloadAESGCM, generateSymmetricKey, encryptSymmetricKeyForRecipientSealed } from "../lib/crypto";
import { ed25519PubkeyToDidKey } from "../lib/ssi";
import { PublicKey } from "@solana/web3.js";
import React, { useState, useRef } from "react";
import { useWallet } from '@solana/wallet-adapter-react';

export function parseSecretKeyJson(text: string): Uint8Array {
    try {
        const arr = JSON.parse(text);
        if (Array.isArray(arr)) return new Uint8Array(arr);
    } catch (e) {
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
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [recipientsInput, setRecipientsInput] = useState("");
    const [cid, setCid] = useState<string | null>(null);
    const [packedKeys, setPackedKeys] = useState<Array<{ recipient: string; packedB64?: string; packedCid?: string }>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [enableRewrap, setEnableRewrap] = useState(true);
    const wallet = useWallet();

    function canonicalize(obj: any): string {
        if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
        if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
        const keys = Object.keys(obj).sort();
        const parts = keys.map(k => JSON.stringify(k) + ':' + canonicalize(obj[k]));
        return '{' + parts.join(',') + '}';
    }

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
            const payloadBase64 = toBase64(payloadBuf as any);
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
            const results: Array<{ recipient: string; packedB64?: string; packedCid?: string }> = [];

            for (const r of recipients) {
                const pub = new PublicKey(r);
                const recipientPkBytes = pub.toBuffer();

                const encForRecipient = await encryptSymmetricKeyForRecipientSealed(symU8, recipientPkBytes as Uint8Array);

                const packed = (encForRecipient.packed as any) instanceof Uint8Array ? encForRecipient.packed as Uint8Array : new Uint8Array(encForRecipient.packed as Buffer);
                const packedB64 = toBase64(packed as any);

                const addRes = await fetch('/api/ipfs/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: packedB64 }) });
                if (!addRes.ok) throw new Error('IPFS add for packed key failed');
                const addJson = await addRes.json();
                const packedCid = addJson.cid as string;

                results.push({ recipient: r, packedB64, packedCid });
            }

            setPackedKeys(results);

            if (enableRewrap && myCid && recipients.length > 0) {
                const symKeyB64 = toBase64(symU8);
                try {
                    await uploadToRewrapAPI(myCid, symKeyB64, recipients);
                } catch (rewrapErr: any) {
                    setError('Upload succeeded but rewrap key storage failed: ' + (rewrapErr?.message || String(rewrapErr)));
                }
            }
        } catch (e: any) {
            console.error("Error creating record:", e);
            setError(e?.message || String(e));
        } finally {
            setBusy(false);
        }
    }

    async function downloadPacked(recipient: string, b64?: string, cid?: string) {
        let bytes: Uint8Array | Buffer | null = null;
        if (b64) {
            bytes = typeof Buffer !== "undefined" ? Buffer.from(b64, "base64") : Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        } else if (cid) {
            const r = await fetch(`https://ipfs.io/ipfs/${cid}`);
            if (!r.ok) throw new Error('Failed to fetch packed blob from IPFS');
            const arrBuf = await r.arrayBuffer();
            bytes = new Uint8Array(arrBuf);
        } else {
            throw new Error('No data available to download');
        }
        const blob = new Blob([bytes as any], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `encrypted_key_${recipient}.bin`;
        a.click();
        URL.revokeObjectURL(url);
    }

    async function signAndDownload() {
        setError(null);
        try {
            if (!wallet?.publicKey) throw new Error('Connect a wallet to sign');
            if (!wallet.signMessage) throw new Error('Connected wallet does not support signMessage');

            const metadata: any = {
                cid,
                title,
                packedKeys: packedKeys.map(p => ({ recipient: p.recipient, packedCid: p.packedCid })),
                exportedAt: new Date().toISOString(),
            };

            // canonicalize for deterministic signing
            const messageStr = canonicalize(metadata);
            const message = new TextEncoder().encode(messageStr);

            // signMessage may return Uint8Array
            const sig = await wallet.signMessage(message);
            const sigB64 = (typeof Buffer !== 'undefined') ? Buffer.from(sig).toString('base64') : btoa(String.fromCharCode(...(sig as Uint8Array)));

            const signerDid = ed25519PubkeyToDidKey(wallet.publicKey.toBuffer());

            const signed = {
                ...metadata,
                signer: wallet.publicKey.toBase58(),
                signerDid,
                signature: sigB64,
            };

            const blob = new Blob([JSON.stringify(signed, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `record_${cid || 'untagged'}.signed.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (e: any) {
            setError(e?.message || String(e));
        }
    }

    async function loadRecordJsonFile(file: File | null) {
        if (!file) return;
        try {
            const text = await file.text();
            const obj = JSON.parse(text);
            if (obj.title) setTitle(obj.title);
            if (obj.cid) setCid(obj.cid);
            if (Array.isArray(obj.recipients)) setRecipientsInput(obj.recipients.join(', '));
            if (Array.isArray(obj.packedKeys)) setPackedKeys(obj.packedKeys.map((p: any) => ({ recipient: p.recipient, packedB64: p.packedB64, packedCid: p.packedCid })));
        } catch (e: any) {
            setError('Failed to load record JSON: ' + (e?.message || String(e)));
        }
    }

    async function uploadToRewrapAPI(cid: string, symKey: string, recipientAddress: string[]) {
        if (!wallet.publicKey) {
            alert('Wallet not connected');
            return;
        }

        try {
            const messageToSign = JSON.stringify({
                recordCid: cid,
                recipients: [...recipientAddress].sort()
            });
            const messageBytes = new TextEncoder().encode(messageToSign);
            const signature = await wallet.signMessage!(messageBytes);
            const creatorSignature = Buffer.from(signature).toString('base64');
            const bs58 = require('bs58');
            const creatorPubkey = bs58.encode(wallet.publicKey.toBytes());

            const res = await fetch('api/rewrap/request', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recordCid: cid,
                    symKey,
                    recipients: recipientAddress,
                    creatorPubkey,
                    creatorSignature,
                }),
            });

            if (!res.ok) {
                const e = await res.json();
                throw new Error(e.error || 'Failed to store rewrap keys.');
            }
            const result = await res.json();
            console.log('Rewrap API response: ', result);
            return result;
        } catch (e) {
            console.error('Failed to upload rewrap API: ', e);
            throw e;
        }
    }

    return (
        <div className="max-w-3xl p-6">
            <h3 className="text-xl font-semibold">Create Record (dev demo)</h3>

            <form onSubmit={onSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Record title" />

                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            className="rounded bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-semibold flex items-center gap-2"
                            onClick={signAndDownload}
                            disabled={!cid && packedKeys.length === 0}
                        >
                            Sign & Download Record
                        </button>
                        <label className="inline-flex items-center rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm cursor-pointer">
                            <input type="file" accept="application/json" className="hidden" onChange={(e) => loadRecordJsonFile(e.target.files?.[0] ?? null)} />
                            Upload Record
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Text payload (or choose file)</label>
                    <textarea className="mt-1 block w-full rounded-md border px-3 py-2" value={textPayload} onChange={(e) => setTextPayload(e.target.value)} placeholder="Optional text payload" />
                    <div className="mt-2 flex items-center gap-3">
                        <input ref={(el) => { fileInputRef.current = el; }} type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                        <button type="button" className="inline-flex items-center gap-2 rounded bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 text-sm" onClick={() => fileInputRef.current?.click()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6M8 8l4-4 4 4" /></svg>
                            Choose file
                        </button>
                        <div className="text-sm text-slate-600">{file ? file.name : <span className="italic">No file selected</span>}</div>
                        {file && (
                            <button type="button" className="text-sm text-slate-500 hover:text-slate-700" onClick={() => setFile(null)}>Clear</button>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Recipients (comma-separated base58 public keys)</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={recipientsInput} onChange={(e) => setRecipientsInput(e.target.value)} placeholder="RecipientPubkey1, RecipientPubkey2" />
                </div>

                <div>
                    <p className="text-sm text-slate-600">Uploader does not need to provide a private key — we use anonymous sealed boxes so recipients can open with their own secret keys.</p>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" id="enable-rewrap" checked={enableRewrap} onChange={(e) => setEnableRewrap(e.target.checked)} />
                    <label htmlFor="enable-rewrap" className="text-sm text-slate-600">Allow recipients to request access without pasting private keys (stores encrypted key on server)</label>
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
                                {p.packedCid && (
                                    <div className="mt-2 text-xs">
                                        CID: <a className="text-sky-600" href={`https://ipfs.io/ipfs/${p.packedCid}`} target="_blank" rel="noreferrer">{p.packedCid}</a>
                                    </div>
                                )}
                                <div className="mt-2 text-xs break-all">{p.packedB64 ?? <span className="italic text-slate-500">(stored on IPFS)</span>}</div>
                                <div className="mt-2">
                                    <button className="rounded bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 text-sm" onClick={() => downloadPacked(p.recipient, p.packedB64, p.packedCid)}>Download</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">These packed buffers are nonce||boxed (binary). On-chain you should store the same packed buffer (e.g. as a bytes field).</p>
                </div>
            )}
        </div>
    );
}