'use client';

import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { ed25519PubkeyToDidKey, pubkeyBase58ToDidKey } from '../../lib/ssi';

function canonicalize(obj: any): string {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
    const keys = Object.keys(obj).sort();
    const parts = keys.map((k) => JSON.stringify(k) + ':' + canonicalize(obj[k]));
    return '{' + parts.join(',') + '}';
}

export default function ConsentPage() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [recordCid, setRecordCid] = useState('');
    const [recipientPk, setRecipientPk] = useState('');
    const [daysValid, setDaysValid] = useState(7);
    const [anchorOnChain, setAnchorOnChain] = useState(false);
    const [busy, setBusy] = useState(false);
    const [result, setResult] = useState<{ cid?: string; tx?: string; error?: string } | null>(null);

    async function onIssue(e?: React.FormEvent) {
        e?.preventDefault();
        setBusy(true);
        setResult(null);
        try {
            if (!wallet.publicKey) throw new Error('Connect wallet');
            if (!wallet.signMessage) throw new Error('Wallet cannot sign');
            if (!recordCid) throw new Error('Provide record CID');
            if (!recipientPk) throw new Error('Provide recipient pubkey');

            const issuerDid = ed25519PubkeyToDidKey(wallet.publicKey.toBuffer());
            const recipientDid = pubkeyBase58ToDidKey(recipientPk);

            const issuanceDate = new Date().toISOString();
            const expirationDate = new Date(Date.now() + daysValid * 24 * 60 * 60 * 1000).toISOString();

            const vc: any = {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential', 'ConsentCredential'],
                issuer: { id: issuerDid },
                issuanceDate,
                expirationDate,
                credentialSubject: {
                    id: recipientDid,
                    recordCid,
                    scope: 'read',
                },
            };

            const messageStr = canonicalize(vc);
            const sig = await wallet.signMessage(new TextEncoder().encode(messageStr));
            const sigB64 = (typeof Buffer !== 'undefined') ? Buffer.from(sig).toString('base64') : btoa(String.fromCharCode(...(sig as Uint8Array)));

            const signedVc = {
                ...vc,
                proof: {
                    type: 'SolanaSignMessage',
                    created: new Date().toISOString(),
                    proofPurpose: 'assertionMethod',
                    verificationMethod: issuerDid,
                    signature: sigB64,
                },
            };

            const payloadJson = JSON.stringify(signedVc);
            const payloadBuf = typeof Buffer !== 'undefined' ? Buffer.from(payloadJson) : new TextEncoder().encode(payloadJson);
            const payloadBase64 = (typeof Buffer !== 'undefined') ? Buffer.from(payloadBuf).toString('base64') : (globalThis as any).btoa(String.fromCharCode(...new Uint8Array(payloadBuf as any)));

            const addRes = await fetch('/api/ipfs/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload: payloadBase64 }) });
            if (!addRes.ok) throw new Error('IPFS add failed');
            const j = await addRes.json();
            const cid = j.cid as string;

            let txSig: string | undefined = undefined;
            if (anchorOnChain) {
                // Memo program id
                const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
                const ix = new TransactionInstruction({ programId: MEMO_PROGRAM_ID, keys: [], data: Buffer.from(cid) });
                const tx = new Transaction().add(ix);
                const sigTx = await wallet.sendTransaction(tx, connection);
                txSig = sigTx;
            }

            setResult({ cid, tx: txSig });
        } catch (e: any) {
            setResult({ error: e?.message || String(e) });
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="max-w-3xl p-6">
            <h3 className="text-xl font-semibold">Consent Manager</h3>
            <p className="mt-2 text-sm text-slate-600">Issue a short-lived consent credential granting a recipient access to a record CID. The credential is signed by your connected wallet and uploaded to IPFS.</p>

            <form onSubmit={onIssue} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium">Record CID</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={recordCid} onChange={(e) => setRecordCid(e.target.value)} placeholder="Qm... or bafy..." />
                </div>

                <div>
                    <label className="block text-sm font-medium">Recipient pubkey (base58)</label>
                    <input className="mt-1 block w-full rounded-md border px-3 py-2" value={recipientPk} onChange={(e) => setRecipientPk(e.target.value)} placeholder="Recipient base58 pubkey" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Validity (days)</label>
                    <input type="number" min={1} className="mt-1 block w-24 rounded-md border px-3 py-2" value={String(daysValid)} onChange={(e) => setDaysValid(Number(e.target.value))} />
                </div>

                <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2">
                        <input type="checkbox" checked={anchorOnChain} onChange={(e) => setAnchorOnChain(e.target.checked)} />
                        <span className="text-sm">Anchor consent on-chain (Memo)</span>
                    </label>
                </div>

                <div>
                    <button type="submit" disabled={busy} className="inline-flex items-center rounded bg-sky-600 px-4 py-2 text-white disabled:opacity-60">{busy ? 'Issuing…' : 'Issue Consent'}</button>
                </div>
            </form>

            {result && (
                <div className="mt-6">
                    {result.error && <div className="text-red-600">Error: {result.error}</div>}
                    {result.cid && <div className="text-sm">Consent uploaded to IPFS CID: <a href={`https://ipfs.io/ipfs/${result.cid}`} target="_blank" rel="noreferrer" className="text-sky-600">{result.cid}</a></div>}
                    {result.tx && <div className="text-sm">Anchored on-chain tx: <span className="font-mono">{result.tx}</span></div>}
                </div>
            )}
        </div>
    );
}
