'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileCheck, Copy, ExternalLink, Loader2 } from 'lucide-react';

interface Consent {
    id: number;
    consentCid: string;
    recordCid: string;
    issuerPubkey: string;
    recipientPubkey: string;
    expiresAt: string | null;
    createdAt: string;
    anchoredTxId: string | null;
}

export default function MyConsentsPage() {
    const wallet = useWallet();
    const [issued, setIssued] = useState<Consent[]>([]);
    const [received, setReceived] = useState<Consent[]>([]);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        if (wallet.publicKey) {
            fetchConsents();
        }
    }, [wallet.publicKey]);

    const fetchConsents = async () => {
        if (!wallet.publicKey) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/consent/list?pubkey=${wallet.publicKey.toBase58()}`);
            if (res.ok) {
                const data = await res.json();
                console.log('Fetched consents:', data);
                setIssued(data.issued || []);
                setReceived(data.received || []);
            } else {
                const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Failed to fetch consents:', errorData);
            }
        } catch (e) {
            console.error('Failed to fetch consents:', e);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isExpired = (expiresAt: string | null) => {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
    };

    if (!wallet.connected) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="pt-6 text-center">
                        <FileCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                        <p className="text-muted-foreground">
                            Please connect your wallet to view your consent credentials
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <FileCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">My Consent Credentials</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        View all consent credentials you've issued to others and those you've received
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {/* Issued Consents */}
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle>Consents You've Issued</CardTitle>
                                <CardDescription>
                                    Consent credentials you've created to grant others access to your records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {issued.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        You haven't issued any consent credentials yet
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
                                                {issued.map((consent) => (
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
                                                            <Badge variant={isExpired(consent.expiresAt) ? 'destructive' : 'default'}>
                                                                {isExpired(consent.expiresAt) ? 'Expired' : 'Active'}
                                                            </Badge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Received Consents */}
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle>Consents You've Received</CardTitle>
                                <CardDescription>
                                    Consent credentials others have issued to you for accessing their records
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {received.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">
                                        You haven't received any consent credentials yet
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
                                                {received.map((consent) => (
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
                                                            <Badge variant={isExpired(consent.expiresAt) ? 'destructive' : 'default'}>
                                                                {isExpired(consent.expiresAt) ? 'Expired' : 'Active'}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    localStorage.setItem('consentCid', consent.consentCid);
                                                                    window.location.href = '/verify';
                                                                }}
                                                                disabled={isExpired(consent.expiresAt)}
                                                            >
                                                                <ExternalLink className="h-3 w-3 mr-1" />
                                                                Use
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
                    </>
                )}
            </div>
        </div>
    );
}
