'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { decryptPayloadAESGCM } from '../../lib/crypto';
import { verifyRecordSignature } from '../../lib/verify-signature';
import bs58 from "bs58";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Shield, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

function fromBase64(s: string) {
    if (typeof Buffer !== 'undefined') return Buffer.from(s, 'base64');
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

export default function VerifyPage() {
    const wallet = useWallet();
    const [jsonFile, setJsonFile] = useState<any>(null);
    const [consentCid, setConsentCid] = useState<string>('');
    const [decrypted, setDecrypted] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const [signatureStatus, setSignatureStatus] = useState<{ valid: boolean; signer?: string; error?: string } | null>(null);

    useEffect(() => {
        const savedConsentCid = localStorage.getItem('consentCid');
        if (savedConsentCid) {
            setConsentCid(savedConsentCid);
        }
    }, []);

    const handleConsentCidChange = (value: string) => {
        setConsentCid(value);
        if (value) {
            localStorage.setItem('consentCid', value);
        } else {
            localStorage.removeItem('consentCid');
        }
    };

    const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const json = JSON.parse(text);
            setJsonFile(json);
            setError('');
            setDecrypted('');

            const verification = verifyRecordSignature(json);
            setSignatureStatus(verification);

            if (!verification.valid) {
                setError(`Signature verification failed: ${verification.error}`);
            }
        } catch (err: any) {
            setError('Invalid JSON file: ' + err.message);
            setSignatureStatus(null);
        }
    };

    const handleDecrypt = async () => {
        setError('');
        setDecrypted('');
        setLoading(true);

        try {
            if (!wallet.connected) {
                throw new Error('Wallet is not connected. Please connect your wallet using the button in the header.');
            }
            if (!wallet.publicKey) throw new Error('Connect your wallet first');
            if (!wallet.signMessage) {
                throw new Error('Your wallet does not support message signing. Please use a compatible wallet like Phantom or Solflare.');
            }
            if (!jsonFile?.cid) throw new Error('Load a signed record JSON first');

            const recipientPub = wallet.publicKey.toBase58();

            const sodium = require('libsodium-wrappers');
            await sodium.ready;
            const kp = sodium.crypto_sign_keypair();
            const ephemeralPub = kp.publicKey;
            const ephemeralSec = kp.privateKey;

            const ephemeralPubB58 = bs58.encode(ephemeralPub);

            const timestamp = new Date().toISOString();
            const message = JSON.stringify({ ephemeralPub: ephemeralPubB58, timestamp });

            let sig: Uint8Array;
            try {
                sig = await wallet.signMessage(new TextEncoder().encode(message));
            } catch (signError: any) {
                console.error('Signature error:', signError);
                throw new Error(`Failed to sign message: ${signError.message || 'User rejected the signature request or wallet error occurred'}`);
            }

            const sigB64 = typeof Buffer !== 'undefined'
                ? Buffer.from(sig).toString('base64')
                : btoa(String.fromCharCode(...sig));

            let rewrapResp;
            try {
                rewrapResp = await fetch('/api/rewrap/request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        recordCid: jsonFile.cid,
                        recipientPub,
                        ephemeralPub: ephemeralPubB58,
                        signedRequest: sigB64,
                        timestamp,
                        consentCid: consentCid
                    })
                });
            } catch (fetchError: any) {
                console.error('[Verify] Fetch error:', fetchError);
                throw new Error(`Network error when requesting rewrap key: ${fetchError.message}. Is the server running?`);
            }

            if (!rewrapResp.ok) {
                let errText;
                try {
                    const errJson = await rewrapResp.json();
                    errText = errJson.error || JSON.stringify(errJson);
                } catch {
                    errText = await rewrapResp.text();
                }
                console.error('[Verify] Rewrap API error:', { status: rewrapResp.status, error: errText });
                throw new Error('Rewrap failed: ' + errText);
            }

            const { rewrappedKey } = await rewrapResp.json();
            const rewrappedBytes = fromBase64(rewrappedKey);
            const ephemeralCurveSec = sodium.crypto_sign_ed25519_sk_to_curve25519(ephemeralSec);
            const ephemeralCurvePub = sodium.crypto_sign_ed25519_pk_to_curve25519(ephemeralPub);
            const opened = sodium.crypto_box_seal_open(rewrappedBytes, ephemeralCurvePub, ephemeralCurveSec);
            const symKey = new Uint8Array(opened);

            let payloadResp;
            const gateways = [
                `http://127.0.0.1:8080/ipfs/${jsonFile.cid}`,
                `https://ipfs.io/ipfs/${jsonFile.cid}`,
                `https://cloudflare-ipfs.com/ipfs/${jsonFile.cid}`,
                `https://dweb.link/ipfs/${jsonFile.cid}`
            ];

            let lastError;
            for (const gateway of gateways) {
                try {
                    payloadResp = await fetch(gateway);
                    if (payloadResp.ok) {
                        break;
                    }
                } catch (e: any) {
                    lastError = e;
                }
            }

            if (!payloadResp || !payloadResp.ok) {
                throw new Error('Failed to fetch payload from IPFS via any gateway. Error: ' + (lastError?.message || 'Unknown'));
            }

            const payloadTxt = await payloadResp.text();
            const payload = JSON.parse(payloadTxt);

            const plainBuf = await decryptPayloadAESGCM(payload, symKey);
            const plainStr = typeof Buffer !== 'undefined'
                ? Buffer.from(plainBuf).toString('utf8')
                : new TextDecoder().decode(plainBuf);

            if (!plainStr || plainStr.length === 0) {
                setDecrypted('(No payload data - record created for signature verification only)');
            } else {
                setDecrypted(plainStr);
            }

            setRenderKey(prev => prev + 1);
        } catch (err: any) {
            console.error('Decryption error:', err);
            setError(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <FileCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Verify & Decrypt Health Record</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Securely decrypt encrypted health records using your wallet signature - no private key exposure required
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Signature Verification</CardTitle>
                            <CardDescription className="text-xs">
                                Cryptographically verify record authenticity before decryption
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Lock className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Wallet Signature</CardTitle>
                            <CardDescription className="text-xs">
                                Decrypt using your connected wallet without exposing private keys
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <FileCheck className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Zero-Knowledge</CardTitle>
                            <CardDescription className="text-xs">
                                Your private keys never leave your wallet
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                {/* Step 1: Load File */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-lg px-3 py-1">1</Badge>
                            <CardTitle>Load Signed Record</CardTitle>
                        </div>
                        <CardDescription>
                            Select the JSON file exported from record creation
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="recordFile">Record File</Label>
                            <input
                                id="recordFile"
                                type="file"
                                accept=".json"
                                onChange={handleFileLoad}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                                         ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                         placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                                         focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                                         disabled:opacity-50 cursor-pointer"
                            />
                        </div>
                    </CardContent>
                </Card>

                {jsonFile && (
                    <>
                        {/* Signature Status */}
                        {signatureStatus && (
                            <Card className={`border-2 ${signatureStatus.valid ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-destructive bg-destructive/5'}`}>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        {signatureStatus.valid ? (
                                            <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                                        ) : (
                                            <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <h3 className={`font-semibold mb-1 ${signatureStatus.valid ? 'text-green-900 dark:text-green-300' : 'text-destructive'}`}>
                                                {signatureStatus.valid ? 'Signature Valid' : 'Signature Invalid'}
                                            </h3>
                                            <p className={`text-sm ${signatureStatus.valid ? 'text-green-700 dark:text-green-400' : 'text-destructive/90'}`}>
                                                {signatureStatus.valid
                                                    ? `This record was authentically signed by ${signatureStatus.signer?.substring(0, 8)}...${signatureStatus.signer?.substring(signatureStatus.signer.length - 6)}`
                                                    : signatureStatus.error
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Record Information */}
                        <Card className="border-2 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-base">Record Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <Label className="text-xs text-muted-foreground">Record CID</Label>
                                    <code className="block text-sm font-mono bg-background px-3 py-2 rounded border mt-1 break-all">
                                        {jsonFile.cid}
                                    </code>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Signer</Label>
                                    <code className="block text-sm font-mono bg-background px-3 py-2 rounded border mt-1 break-all">
                                        {jsonFile.signer || jsonFile.signerDid}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Step 2: Decrypt */}
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-lg px-3 py-1">2</Badge>
                                    <CardTitle>Decrypt with Wallet</CardTitle>
                                </div>
                                <CardDescription>
                                    Click below to securely decrypt the record using your connected wallet signature
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Consent Credential Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="consentCid" className="text-sm font-medium">
                                        Consent Credential CID <span className="text-muted-foreground">(only if you're a recipient)</span>
                                    </Label>
                                    <Input
                                        id="consentCid"
                                        type="text"
                                        value={consentCid}
                                        onChange={(e) => handleConsentCidChange(e.target.value)}
                                        placeholder="Enter consent credential CID..."
                                        className="font-mono"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {consentCid
                                            ? '✓ Consent CID saved and will be used for decryption.'
                                            : '💡 Only required for recipients without direct access. Record creators can decrypt without consent CID.'
                                        }
                                    </p>
                                </div>

                                {!wallet.connected && (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>
                                            Please connect your wallet using the button in the top-right corner
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    onClick={handleDecrypt}
                                    disabled={loading || !wallet.connected}
                                    className="w-full gap-2"
                                    size="lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>Decrypting...</span>
                                        </>
                                    ) : wallet.connected ? (
                                        <>
                                            <Lock className="h-5 w-5" />
                                            <span>Decrypt with Wallet Signature</span>
                                        </>
                                    ) : (
                                        <span>Connect Wallet First</span>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Error Display */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <strong>Decryption Failed:</strong> {error}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Success Display */}
                {decrypted && (
                    <Card key={renderKey} className="border-2 border-green-500 bg-green-50/50 dark:bg-green-950/20 shadow-lg">
                        <CardHeader>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="h-8 w-8 text-green-600 shrink-0" />
                                <div>
                                    <CardTitle className="text-green-900 dark:text-green-300">Decryption Successful</CardTitle>
                                    <CardDescription className="text-green-700 dark:text-green-400">
                                        The health record has been securely decrypted using your wallet signature
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Decrypted Health Record Data
                                </Label>
                                <div className="bg-background border rounded-lg p-4 shadow-inner">
                                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-auto max-h-96">
                                        {decrypted || '(waiting...)'}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
