'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ed25519PubkeyToDidKey, pubkeyBase58ToDidKey } from '@/lib/ssi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Send, Inbox, CheckCircle, XCircle, Clock, AlertCircle, Loader2, Shield,
    FileCheck, ExternalLink, Copy, History
} from 'lucide-react';

interface AccessRequest {
    id: number;
    recordCid: string;
    requesterPubkey: string;
    ownerPubkey: string;
    purpose: string;
    status: string;
    respondedAt: string | null;
    responseNote: string | null;
    createdAt: string;
}

interface Consent {
    id: number;
    consentCid: string;
    recordCid: string;
    issuerPubkey: string;
    recipientPubkey: string;
    expiresAt: string | null;
    createdAt: string;
    revokedAt: string | null;
    anchoredTxId: string | null;
}

function canonicalize(obj: any): string {
    if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
    if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
    const keys = Object.keys(obj).sort();
    const parts = keys.map((k) => JSON.stringify(k) + ':' + canonicalize(obj[k]));
    return '{' + parts.join(',') + '}';
}

export default function AccessRequestsPage() {
    const wallet = useWallet();
    const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing' | 'consents'>('incoming');
    const [incoming, setIncoming] = useState<AccessRequest[]>([]);
    const [outgoing, setOutgoing] = useState<AccessRequest[]>([]);
    const [issuedConsents, setIssuedConsents] = useState<Consent[]>([]);
    const [receivedConsents, setReceivedConsents] = useState<Consent[]>([]);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    // New request form
    const [recordCid, setRecordCid] = useState('');
    const [ownerPubkey, setOwnerPubkey] = useState('');
    const [purpose, setPurpose] = useState('');

    useEffect(() => {
        if (wallet.publicKey) {
            fetchAll();
        }
    }, [wallet.publicKey]);

    const fetchAll = async () => {
        if (!wallet.publicKey) return;
        setLoading(true);
        try {
            const [reqRes, consentRes] = await Promise.all([
                fetch(`/api/access-request?pubkey=${wallet.publicKey.toBase58()}`),
                fetch(`/api/consent/list?pubkey=${wallet.publicKey.toBase58()}`),
            ]);

            if (reqRes.ok) {
                const data = await reqRes.json();
                setIncoming(data.incoming || []);
                setOutgoing(data.outgoing || []);
            }
            if (consentRes.ok) {
                const data = await consentRes.json();
                setIssuedConsents(data.issued || []);
                setReceivedConsents(data.received || []);
            }
        } catch (e) {
            console.error('Failed to fetch data:', e);
        } finally {
            setLoading(false);
        }
    };

    const submitRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!wallet.publicKey) return;
        setError(null);
        setSuccess(null);
        setBusy(true);

        try {
            const res = await fetch('/api/access-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recordCid,
                    requesterPubkey: wallet.publicKey.toBase58(),
                    ownerPubkey: ownerPubkey.trim(),
                    purpose,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit request');
            }

            setSuccess('Access request submitted successfully! The record owner will be notified.');
            setRecordCid('');
            setOwnerPubkey('');
            setPurpose('');
            fetchAll();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setBusy(false);
        }
    };

    const respondToRequest = async (requestId: number, decision: 'approved' | 'denied') => {
        if (!wallet.publicKey) return;
        if (!wallet.signMessage) {
            setError('Wallet does not support message signing');
            return;
        }
        setError(null);
        setBusy(true);

        try {
            let consentCid: string | undefined;

            // Auto-create a consent credential when approving
            if (decision === 'approved') {
                const req = incoming.find(r => r.id === requestId);
                if (!req) throw new Error('Request not found');

                const issuerDid = ed25519PubkeyToDidKey(wallet.publicKey.toBuffer());
                const recipientDid = pubkeyBase58ToDidKey(req.requesterPubkey);

                const issuanceDate = new Date().toISOString();
                const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

                const vc: any = {
                    '@context': ['https://www.w3.org/2018/credentials/v1'],
                    type: ['VerifiableCredential', 'ConsentCredential'],
                    issuer: { id: issuerDid },
                    issuanceDate,
                    expirationDate,
                    credentialSubject: {
                        id: recipientDid,
                        recordCid: req.recordCid,
                        scope: 'read',
                    },
                };

                const messageStr = canonicalize(vc);
                const sig = await wallet.signMessage(new TextEncoder().encode(messageStr));
                const sigB64 = Buffer.from(sig).toString('base64');

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

                // Upload to IPFS
                const payloadJson = JSON.stringify(signedVc);
                const payloadBase64 = Buffer.from(payloadJson).toString('base64');
                const addRes = await fetch('/api/ipfs/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ payload: payloadBase64 }),
                });
                if (!addRes.ok) throw new Error('Failed to upload consent to IPFS');
                const { cid } = await addRes.json();
                consentCid = cid;

                // Store consent in DB
                await fetch('/api/consent/store', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        consentCid: cid,
                        recordCid: req.recordCid,
                        issuerPubkey: wallet.publicKey.toBase58(),
                        recipientPubkey: req.requesterPubkey,
                        expiresAt: expirationDate,
                    }),
                });
            }

            const res = await fetch('/api/access-request/respond', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId,
                    decision,
                    ownerPubkey: wallet.publicKey.toBase58(),
                    consentCid,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to respond');
            }

            setSuccess(`Request ${decision} successfully!`);
            fetchAll();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setBusy(false);
        }
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    };

    const isExpired = (expiresAt: string | null) => {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
    };

    const statusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
            case 'denied':
                return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Denied</Badge>;
            default:
                return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
        }
    };

    const pendingCount = incoming.filter(r => r.status === 'pending').length;

    if (!wallet.connected) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="pt-6 text-center">
                        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                        <p className="text-muted-foreground">
                            Please connect your wallet to manage access requests and consents
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Access & Consent Manager</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Request access to health records, manage incoming requests, and view all your consent credentials
                    </p>
                </div>

                {/* Error/Success messages */}
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {success && (
                    <Alert className="border-green-500 bg-green-50 dark:bg-green-950/30">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700 dark:text-green-300">{success}</AlertDescription>
                    </Alert>
                )}

                {/* New Request Form */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Request Access to a Record
                        </CardTitle>
                        <CardDescription>
                            Submit a request to a record owner explaining why you need access. They will review and approve or deny.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submitRequest} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recordCid">Record CID</Label>
                                    <Input
                                        id="recordCid"
                                        value={recordCid}
                                        onChange={(e) => setRecordCid(e.target.value)}
                                        placeholder="Qm... or bafy..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ownerPubkey">Record Owner&apos;s Public Key</Label>
                                    <Input
                                        id="ownerPubkey"
                                        value={ownerPubkey}
                                        onChange={(e) => setOwnerPubkey(e.target.value)}
                                        placeholder="Base58 Solana public key"
                                        className="font-mono text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose of Access</Label>
                                <Textarea
                                    id="purpose"
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    placeholder="Explain why you need access (e.g., medical consultation, insurance verification, research)..."
                                    className="min-h-[80px]"
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={busy} className="w-full">
                                {busy ? (
                                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Submitting...</>
                                ) : (
                                    <><Send className="h-4 w-4 mr-2" />Submit Access Request</>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Tabs */}
                <div className="flex gap-2 flex-wrap">
                    <Button
                        variant={activeTab === 'incoming' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('incoming')}
                        className="gap-2"
                    >
                        <Inbox className="h-4 w-4" />
                        Incoming Requests
                        {pendingCount > 0 && (
                            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center rounded-full">
                                {pendingCount}
                            </Badge>
                        )}
                    </Button>
                    <Button
                        variant={activeTab === 'outgoing' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('outgoing')}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        My Requests
                    </Button>
                    <Button
                        variant={activeTab === 'consents' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('consents')}
                        className="gap-2"
                    >
                        <History className="h-4 w-4" />
                        Consent History
                    </Button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : activeTab === 'incoming' ? (
                    /* ── Incoming Requests ── */
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>Incoming Access Requests</CardTitle>
                            <CardDescription>
                                Requests from verifiers wanting to access your records. Approve to auto-generate a consent credential.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {incoming.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    No incoming access requests
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Record CID</TableHead>
                                                <TableHead>Requester</TableHead>
                                                <TableHead>Purpose</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {incoming.map((req) => (
                                                <TableRow key={req.id}>
                                                    <TableCell className="font-mono text-xs">
                                                        {req.recordCid.substring(0, 12)}...
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {req.requesterPubkey.substring(0, 8)}...
                                                    </TableCell>
                                                    <TableCell className="text-sm max-w-[200px] truncate">
                                                        {req.purpose}
                                                    </TableCell>
                                                    <TableCell className="text-xs">
                                                        {formatDate(req.createdAt)}
                                                    </TableCell>
                                                    <TableCell>{statusBadge(req.status)}</TableCell>
                                                    <TableCell>
                                                        {req.status === 'pending' ? (
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="default"
                                                                    onClick={() => respondToRequest(req.id, 'approved')}
                                                                    disabled={busy}
                                                                    className="gap-1"
                                                                >
                                                                    <CheckCircle className="h-3 w-3" />
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() => respondToRequest(req.id, 'denied')}
                                                                    disabled={busy}
                                                                    className="gap-1"
                                                                >
                                                                    <XCircle className="h-3 w-3" />
                                                                    Deny
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">
                                                                {req.respondedAt ? formatDate(req.respondedAt) : '—'}
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : activeTab === 'outgoing' ? (
                    /* ── Outgoing Requests ── */
                    <Card className="border-2">
                        <CardHeader>
                            <CardTitle>My Sent Requests</CardTitle>
                            <CardDescription>
                                Access requests you&apos;ve submitted. Once approved, use the &quot;View Record&quot; button to decrypt and view.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {outgoing.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    You haven&apos;t sent any access requests yet
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Record CID</TableHead>
                                                <TableHead>Owner</TableHead>
                                                <TableHead>Purpose</TableHead>
                                                <TableHead>Submitted</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {outgoing.map((req) => (
                                                <TableRow key={req.id}>
                                                    <TableCell className="font-mono text-xs">
                                                        {req.recordCid.substring(0, 12)}...
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {req.ownerPubkey.substring(0, 8)}...
                                                    </TableCell>
                                                    <TableCell className="text-sm max-w-[200px] truncate">
                                                        {req.purpose}
                                                    </TableCell>
                                                    <TableCell className="text-xs">
                                                        {formatDate(req.createdAt)}
                                                    </TableCell>
                                                    <TableCell>{statusBadge(req.status)}</TableCell>
                                                    <TableCell>
                                                        {req.status === 'approved' ? (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => {
                                                                    // Find the latest valid consent for this approved request
                                                                    const consent = receivedConsents
                                                                        .filter(c =>
                                                                            c.recordCid === req.recordCid &&
                                                                            c.issuerPubkey === req.ownerPubkey &&
                                                                            !c.revokedAt &&
                                                                            (!c.expiresAt || new Date(c.expiresAt) > new Date())
                                                                        )
                                                                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
                                                                    if (consent) {
                                                                        localStorage.setItem('consentCid', consent.consentCid);
                                                                    }
                                                                    window.location.href = '/verify';
                                                                }}
                                                                className="gap-1"
                                                            >
                                                                <ExternalLink className="h-3 w-3" />
                                                                View Record
                                                            </Button>
                                                        ) : req.status === 'denied' ? (
                                                            <span className="text-xs text-muted-foreground">
                                                                {req.respondedAt ? formatDate(req.respondedAt) : '—'}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">Awaiting response</span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    /* ── Consent History ── */
                    <div className="space-y-6">
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileCheck className="h-5 w-5" />
                                    Consents You&apos;ve Issued
                                </CardTitle>
                                <CardDescription>
                                    Consent credentials you&apos;ve created granting others access to your records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {issuedConsents.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        No consents issued yet
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Record CID</TableHead>
                                                    <TableHead>Recipient</TableHead>
                                                    <TableHead>Consent CID</TableHead>
                                                    <TableHead>Issued</TableHead>
                                                    <TableHead>Expires</TableHead>
                                                    <TableHead>Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {issuedConsents.map((consent) => (
                                                    <TableRow key={consent.id}>
                                                        <TableCell className="font-mono text-xs">
                                                            {consent.recordCid.substring(0, 12)}...
                                                        </TableCell>
                                                        <TableCell className="font-mono text-xs">
                                                            {consent.recipientPubkey.substring(0, 8)}...
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <code className="text-xs">
                                                                    {consent.consentCid.substring(0, 12)}...
                                                                </code>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => copyToClipboard(consent.consentCid, `issued-${consent.id}`)}
                                                                >
                                                                    {copied === `issued-${consent.id}` ? (
                                                                        <span className="text-xs text-green-600">✓</span>
                                                                    ) : (
                                                                        <Copy className="h-3 w-3" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {formatDate(consent.createdAt)}
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {consent.expiresAt ? formatDate(consent.expiresAt) : 'Never'}
                                                        </TableCell>
                                                        <TableCell>
                                                            {consent.revokedAt ? (
                                                                <Badge variant="destructive">Revoked</Badge>
                                                            ) : isExpired(consent.expiresAt) ? (
                                                                <Badge variant="destructive">Expired</Badge>
                                                            ) : (
                                                                <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileCheck className="h-5 w-5" />
                                    Consents You&apos;ve Received
                                </CardTitle>
                                <CardDescription>
                                    Consent credentials granting you access to others&apos; records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {receivedConsents.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        No consents received yet
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Record CID</TableHead>
                                                    <TableHead>Issuer</TableHead>
                                                    <TableHead>Consent CID</TableHead>
                                                    <TableHead>Received</TableHead>
                                                    <TableHead>Expires</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {receivedConsents.map((consent) => (
                                                    <TableRow key={consent.id}>
                                                        <TableCell className="font-mono text-xs">
                                                            {consent.recordCid.substring(0, 12)}...
                                                        </TableCell>
                                                        <TableCell className="font-mono text-xs">
                                                            {consent.issuerPubkey.substring(0, 8)}...
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <code className="text-xs">
                                                                    {consent.consentCid.substring(0, 12)}...
                                                                </code>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => copyToClipboard(consent.consentCid, `received-${consent.id}`)}
                                                                >
                                                                    {copied === `received-${consent.id}` ? (
                                                                        <span className="text-xs text-green-600">✓</span>
                                                                    ) : (
                                                                        <Copy className="h-3 w-3" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {formatDate(consent.createdAt)}
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {consent.expiresAt ? formatDate(consent.expiresAt) : 'Never'}
                                                        </TableCell>
                                                        <TableCell>
                                                            {consent.revokedAt ? (
                                                                <Badge variant="destructive">Revoked</Badge>
                                                            ) : isExpired(consent.expiresAt) ? (
                                                                <Badge variant="destructive">Expired</Badge>
                                                            ) : (
                                                                <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    localStorage.setItem('consentCid', consent.consentCid);
                                                                    window.location.href = '/verify';
                                                                }}
                                                                disabled={isExpired(consent.expiresAt) || !!consent.revokedAt}
                                                                className="gap-1"
                                                            >
                                                                <ExternalLink className="h-3 w-3" />
                                                                View Record
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
