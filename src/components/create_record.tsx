'use client';

import { encryptPayloadAESGCM, generateSymmetricKey, encryptSymmetricKeyForRecipientSealed } from "../lib/crypto";
import { ed25519PubkeyToDidKey } from "../lib/ssi";
import { PublicKey } from "@solana/web3.js";
import React, { useState, useRef } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileCheck2, AlertCircle } from "lucide-react";

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

function fromBase64(b64: string): Uint8Array {
    if (typeof Buffer !== "undefined" && Buffer.from) {
        return new Uint8Array(Buffer.from(b64, "base64"));
    }
    const binary = (globalThis as any).atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

export default function CreateRecord() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [cid, setCid] = useState<string | null>(null);
    const [packedKeys, setPackedKeys] = useState<Array<{ recipient: string; packedB64?: string; packedCid?: string }>>([]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [enableRewrap, setEnableRewrap] = useState(true);
    const [loadedRecordSymKey, setLoadedRecordSymKey] = useState<string | null>(null);
    const [newRecipientsInput, setNewRecipientsInput] = useState("");
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
            if (!file) {
                throw new Error('Please select a file to upload');
            }
            const buffer = await file.arrayBuffer();
            const raw = new Uint8Array(buffer);

            const sym = generateSymmetricKey();
            const symU8 = sym instanceof Uint8Array ? sym : new Uint8Array(sym as any);

            const enc = await encryptPayloadAESGCM(raw, symU8);
            const payloadJson = JSON.stringify(enc);
            const payloadBuf = typeof Buffer !== "undefined" ? Buffer.from(payloadJson) : new TextEncoder().encode(payloadJson);
            const payloadBase64 = toBase64(payloadBuf as any);
            const res = await fetch('/api/ipfs/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: payloadBase64 }) });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errorData.error || 'IPFS add failed');
            }
            const j = await res.json();
            const myCid = j.cid as string;
            setCid(myCid);

            const recipients: string[] = [];
            if (wallet.publicKey) {
                recipients.push(wallet.publicKey.toBase58());
            }

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

            const symKeyB64 = toBase64(symU8);
            setLoadedRecordSymKey(symKeyB64);

            if (enableRewrap && myCid && recipients.length > 0) {
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
                description,
                packedKeys: packedKeys.map(p => ({ recipient: p.recipient, packedCid: p.packedCid })),
                exportedAt: new Date().toISOString(),
            };

            const messageStr = canonicalize(metadata);
            const message = new TextEncoder().encode(messageStr);

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
            if (obj.description) setDescription(obj.description);
            if (obj.cid) setCid(obj.cid);
            if (Array.isArray(obj.packedKeys)) {
                setPackedKeys(obj.packedKeys.map((p: any) => ({ recipient: p.recipient, packedB64: p.packedB64, packedCid: p.packedCid })));
            }
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
            return result;
        } catch (e) {
            console.error('Failed to upload rewrap API: ', e);
            throw e;
        }
    }

    async function decryptAndLoadSymmetricKey() {
        if (!cid) {
            setError('No record CID available');
            return;
        }
        if (!wallet.publicKey || !wallet.signMessage) {
            setError('Wallet not connected');
            return;
        }

        setError(null);
        setBusy(true);

        try {
            const myPubkey = wallet.publicKey.toBase58();

            const isRecipient = packedKeys.some(pk => pk.recipient === myPubkey);
            if (!isRecipient) {
                throw new Error('You are not a recipient of this record');
            }

            const messageToSign = JSON.stringify({
                recordCid: cid,
                requesterPubkey: myPubkey,
            });
            const messageBytes = new TextEncoder().encode(messageToSign);
            const signature = await wallet.signMessage(messageBytes);
            const requesterSignature = Buffer.from(signature).toString('base64');

            const res = await fetch('/api/rewrap/decrypt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recordCid: cid,
                    requesterPubkey: myPubkey,
                    requesterSignature,
                }),
            });

            if (!res.ok) {
                const e = await res.json();
                throw new Error(e.error || 'Failed to decrypt symmetric key');
            }

            const result = await res.json();
            if (result.symKey) {
                setLoadedRecordSymKey(result.symKey);
                alert('Successfully decrypted record! You can now add new recipients.');
            } else {
                throw new Error('No symmetric key returned from server');
            }
        } catch (e: any) {
            console.error('Failed to decrypt symmetric key:', e);
            setError(e?.message || String(e));
        } finally {
            setBusy(false);
        }
    }

    async function addRecipientsToExistingRecord() {
        if (!cid) {
            setError('No record loaded. Please upload an existing record first.');
            return;
        }
        if (!loadedRecordSymKey) {
            setError('Cannot add recipients: symmetric key not available. You must be the original creator and have access to decrypt the record first.');
            return;
        }

        setError(null);
        setBusy(true);

        try {
            const newRecipients = newRecipientsInput.split(",").map((s) => s.trim()).filter(Boolean);
            if (!newRecipients.length) {
                throw new Error('Please enter at least one recipient address');
            }

            const existingRecipients = packedKeys.map(pk => pk.recipient);

            const uniqueNewRecipients = newRecipients.filter(r => !existingRecipients.includes(r));

            if (uniqueNewRecipients.length === 0) {
                setError('All recipients already exist for this record. No new recipients to add.');
                setBusy(false);
                return;
            }

            const symU8 = fromBase64(loadedRecordSymKey);
            const newResults: Array<{ recipient: string; packedB64?: string; packedCid?: string }> = [];

            for (const r of uniqueNewRecipients) {
                const pub = new PublicKey(r);
                const recipientPkBytes = pub.toBuffer();

                const encForRecipient = await encryptSymmetricKeyForRecipientSealed(symU8 as Uint8Array, recipientPkBytes as Uint8Array);

                const packed = (encForRecipient.packed as any) instanceof Uint8Array ? encForRecipient.packed as Uint8Array : new Uint8Array(encForRecipient.packed as Buffer);
                const packedB64 = toBase64(packed as any);

                const addRes = await fetch('/api/ipfs/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: packedB64 }) });
                if (!addRes.ok) throw new Error('IPFS add for packed key failed');
                const addJson = await addRes.json();
                const packedCid = addJson.cid as string;

                newResults.push({ recipient: r, packedB64, packedCid });
            }

            setPackedKeys([...packedKeys, ...newResults]);

            if (enableRewrap) {
                try {
                    await uploadToRewrapAPI(cid, loadedRecordSymKey, uniqueNewRecipients);
                    alert(`Successfully added ${uniqueNewRecipients.length} new recipient(s)!`);
                } catch (rewrapErr: any) {
                    setError('Packed keys created but rewrap key storage failed: ' + (rewrapErr?.message || String(rewrapErr)));
                }
            }

            setNewRecipientsInput('');
        } catch (e: any) {
            console.error("Error adding recipients:", e);
            setError(e?.message || String(e));
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Record Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter record title..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a description for this record..."
                            className="min-h-[80px]"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="file">Health Record File</Label>
                    <div className="flex items-center gap-3">
                        <input
                            ref={(el) => { fileInputRef.current = el; }}
                            type="file"
                            className="hidden"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            Choose File
                        </Button>
                        {file ? (
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="gap-1">
                                    <FileCheck2 className="h-3 w-3" />
                                    {file.name}
                                </Badge>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFile(null)}
                                >
                                    Clear
                                </Button>
                            </div>
                        ) : (
                            <span className="text-sm text-muted-foreground italic">No file selected</span>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">Upload medical documents, lab reports, images, or any health-related files</p>
                </div>

                <Alert>
                    <AlertDescription className="text-sm">
                        Your record will be encrypted and stored on IPFS. Use the Consent page to grant access to specific recipients.
                    </AlertDescription>
                </Alert>

                <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/30">
                    <Checkbox
                        id="enable-rewrap"
                        checked={enableRewrap}
                        onCheckedChange={(checked: boolean) => setEnableRewrap(checked)}
                    />
                    <div className="flex-1">
                        <Label htmlFor="enable-rewrap" className="cursor-pointer font-medium">
                            Enable Proxy Re-encryption
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                            Allow recipients to request access using wallet signatures (key stored encrypted on server)
                        </p>
                    </div>
                </div>

                <Button
                    type={wallet.connected ? "submit" : "button"}
                    onClick={(e: React.MouseEvent) => {
                        if (!wallet.connected) {
                            e.preventDefault();
                            const walletButton = document.querySelector('.wallet-adapter-button') as HTMLElement;
                            if (walletButton) {
                                walletButton.click();
                            } else {
                                alert("Please connect your wallet using the button in the navigation bar.");
                            }
                        }
                    }}
                    disabled={busy}
                    className="w-full"
                    size="lg"
                >
                    {busy ? 'Encrypting & Uploading...' : wallet.connected ? 'Encrypt & Upload to IPFS' : 'Connect Wallet'}
                </Button>

                <div className="flex justify-center gap-3 p-4 bg-muted/30 rounded-lg border-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={signAndDownload}
                        disabled={!cid && packedKeys.length === 0}
                        className="gap-2"
                        size="lg"
                    >
                        <FileCheck2 className="h-4 w-4" />
                        Sign & Download Record
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'application/json';
                            input.onchange = (e) => loadRecordJsonFile((e.target as HTMLInputElement).files?.[0] ?? null);
                            input.click();
                        }}
                        className="gap-2"
                        size="lg"
                    >
                        <Upload className="h-4 w-4" />
                        Upload Record
                    </Button>
                </div>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {cid && (
                <div className="p-4 rounded-lg border bg-muted/30 space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="default">Success</Badge>
                        <Label className="font-semibold">IPFS CID</Label>
                    </div>
                    <code className="block text-sm font-mono bg-background px-3 py-2 rounded border break-all">
                        {cid}
                    </code>
                    <a
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        href={`https://ipfs.io/ipfs/${cid}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        View on IPFS Gateway →
                    </a>
                </div>
            )}

            {packedKeys.length > 0 && (
                <div className="space-y-4">
                    <div>
                        <Label className="text-base font-semibold">Encrypted Keys per Recipient</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                            Each recipient has a unique encrypted key stored on IPFS
                        </p>
                    </div>
                    <div className="space-y-3">
                        {packedKeys.map((p) => (
                            <div key={p.recipient} className="rounded-lg border p-4 space-y-3 bg-muted/20">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <Label className="text-xs text-muted-foreground">Recipient Address</Label>
                                        <code className="block text-xs font-mono break-all mt-1">{p.recipient}</code>
                                    </div>
                                </div>
                                {p.packedCid && (
                                    <div>
                                        <Label className="text-xs text-muted-foreground">Encrypted Key CID</Label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <code className="text-xs font-mono break-all flex-1">{p.packedCid}</code>
                                            <a
                                                className="text-xs text-primary hover:underline shrink-0"
                                                href={`https://ipfs.io/ipfs/${p.packedCid}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View
                                            </a>
                                        </div>
                                    </div>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => downloadPacked(p.recipient, p.packedB64, p.packedCid)}
                                    className="gap-2"
                                >
                                    <Download className="h-3 w-3" />
                                    Download Key
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Alert>
                        <AlertDescription className="text-xs">
                            These encrypted keys are stored as binary data (nonce||sealed_box). Recipients can use them to decrypt the health record.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}