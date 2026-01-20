'use client';

import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import { ed25519PubkeyToDidKey, pubkeyBase58ToDidKey } from '../../lib/ssi';
import { logConsentGranted } from '@/lib/consent-anchor';
import { useAnchorProvider } from '@/components/solana/solana-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { FileCheck, Shield, Clock, Link2, CheckCircle, AlertCircle } from 'lucide-react';

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
    const provider = useAnchorProvider();
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
            if (!recipientPk.trim()) throw new Error('Provide recipient pubkey');

            const issuerDid = ed25519PubkeyToDidKey(wallet.publicKey.toBuffer());
            const recipientDid = pubkeyBase58ToDidKey(recipientPk.trim());

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
                try {
                    txSig = await logConsentGranted(
                        provider,
                        cid,
                        recordCid,
                        recipientPk.trim()
                    );
                } catch (txError: any) {
                    console.error('On-chain logging failed:', txError);
                }
            }

            try {
                const storeRes = await fetch('/api/consent/store', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        consentCid: cid,
                        recordCid,
                        issuerPubkey: wallet.publicKey.toBase58(),
                        recipientPubkey: recipientPk.trim(),
                        expiresAt: expirationDate,
                        anchoredTxId: txSig || null
                    })
                });

                if (!storeRes.ok) {
                    const errorData = await storeRes.json().catch(() => ({ error: 'Unknown error' }));
                } else {
                }
            } catch (storeError) {
            }

            if (anchorOnChain && !txSig) {
                setResult({
                    cid,
                    error: `Consent created successfully but on-chain anchoring failed. This is okay - your consent is still valid.`
                });
                setBusy(false);
                return;
            }

            setResult({ cid, tx: txSig });
        } catch (e: any) {
            setResult({ error: e?.message || String(e) });
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <FileCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Consent Manager</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Issue verifiable consent credentials granting recipients time-limited access to your health records
                    </p>
                </div>

                
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Verifiable Credentials</CardTitle>
                            <CardDescription className="text-xs">
                                W3C-compliant consent credentials with cryptographic proofs
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Time-Limited</CardTitle>
                            <CardDescription className="text-xs">
                                Set custom expiration periods for granular access control
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Link2 className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">On-Chain Anchoring</CardTitle>
                            <CardDescription className="text-xs">
                                Optionally anchor consent proofs on Solana blockchain
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle>Issue Consent Credential</CardTitle>
                        <CardDescription>
                            Grant a recipient access to a specific health record with time-limited permissions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-900 dark:text-blue-300">
                                <strong>Note:</strong> Consent credentials are only required for recipients who need access to records.
                                As the record creator, you can decrypt your own records without a consent credential.
                            </p>
                        </div>
                        <form onSubmit={onIssue} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="recordCid" className="text-base">Record CID</Label>
                                <Input
                                    id="recordCid"
                                    value={recordCid}
                                    onChange={(e) => setRecordCid(e.target.value)}
                                    placeholder="Qm... or bafy..."
                                    className="h-11"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The IPFS Content Identifier of the health record to grant access to
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipientPk" className="text-base">Recipient Public Key</Label>
                                <Input
                                    id="recipientPk"
                                    value={recipientPk}
                                    onChange={(e) => setRecipientPk(e.target.value)}
                                    placeholder="Base58 encoded Solana public key"
                                    className="h-11 font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The Solana wallet address of the recipient who will receive access
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="daysValid" className="text-base">Validity Period (Days)</Label>
                                <Input
                                    id="daysValid"
                                    type="number"
                                    min={1}
                                    max={365}
                                    value={String(daysValid)}
                                    onChange={(e) => setDaysValid(Number(e.target.value))}
                                    className="h-11 max-w-32"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The credential will expire after this many days
                                </p>
                            </div>

                            <div className="flex items-center space-x-3 p-4 rounded-lg border bg-muted/30">
                                <Checkbox
                                    id="anchorOnChain"
                                    checked={anchorOnChain}
                                    onCheckedChange={(checked: boolean) => setAnchorOnChain(checked)}
                                />
                                <div className="flex-1">
                                    <Label htmlFor="anchorOnChain" className="cursor-pointer font-medium">
                                        Anchor consent on-chain
                                    </Label>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Record the consent credential CID on Solana using the Memo program (requires transaction fee)
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
                                className="w-full h-12 text-base"
                                size="lg"
                            >
                                {busy ? 'Issuing Consent...' : wallet.connected ? 'Issue Consent Credential' : 'Connect Wallet'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                
                {result && (
                    <Card className={`border-2 ${result.error ? 'border-destructive' : 'border-green-500'}`}>
                        <CardContent className="pt-6">
                            {result.error ? (
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-destructive mb-1">Error Issuing Consent</h3>
                                        <p className="text-sm text-muted-foreground">{result.error}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                        <div>
                                            <h3 className="font-semibold text-green-900 dark:text-green-300 text-xl">
                                                Consent Issued Successfully
                                            </h3>
                                            <p className="text-sm text-green-700 dark:text-green-400">
                                                The verifiable credential has been created and stored on IPFS
                                            </p>
                                        </div>
                                    </div>

                                    {result.cid && (
                                        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                                            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                Consent Credential CID
                                            </Label>
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm font-mono bg-background px-3 py-2 rounded border flex-1 break-all">
                                                    {result.cid}
                                                </code>
                                            </div>
                                            <a
                                                href={`https://ipfs.io/ipfs/${result.cid}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                            >
                                                View on IPFS <Link2 className="h-3 w-3" />
                                            </a>
                                        </div>
                                    )}

                                    {result.tx && (
                                        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                                            <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                                On-Chain Transaction
                                            </Label>
                                            <code className="text-sm font-mono bg-background px-3 py-2 rounded border block break-all">
                                                {result.tx}
                                            </code>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
