'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    ScrollText, Search, Shield, CheckCircle, XCircle, Send, Eye,
    Ban, Loader2, ExternalLink, Clock
} from 'lucide-react';

interface AuditEvent {
    id: number;
    action: string;
    actorPubkey: string;
    recordCid: string | null;
    targetPubkey: string | null;
    metadata: string | null;
    txSignature: string | null;
    createdAt: string;
}

const ACTION_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    REQUEST_CREATED: {
        label: 'Access Requested',
        icon: <Send className="h-4 w-4" />,
        color: 'bg-blue-500',
    },
    REQUEST_APPROVED: {
        label: 'Request Approved',
        icon: <CheckCircle className="h-4 w-4" />,
        color: 'bg-green-500',
    },
    REQUEST_DENIED: {
        label: 'Request Denied',
        icon: <XCircle className="h-4 w-4" />,
        color: 'bg-red-500',
    },
    CONSENT_GRANTED: {
        label: 'Consent Granted',
        icon: <Shield className="h-4 w-4" />,
        color: 'bg-emerald-500',
    },
    CONSENT_REVOKED: {
        label: 'Consent Revoked',
        icon: <Ban className="h-4 w-4" />,
        color: 'bg-orange-500',
    },
    RECORD_ACCESSED: {
        label: 'Record Accessed',
        icon: <Eye className="h-4 w-4" />,
        color: 'bg-purple-500',
    },
};

export default function AuditPage() {
    const wallet = useWallet();
    const [events, setEvents] = useState<AuditEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterCid, setFilterCid] = useState('');

    useEffect(() => {
        if (wallet.publicKey) {
            fetchAuditTrail();
        }
    }, [wallet.publicKey]);

    const fetchAuditTrail = async (recordCid?: string) => {
        if (!wallet.publicKey) return;
        setLoading(true);
        try {
            let url = `/api/audit/trail?pubkey=${wallet.publicKey.toBase58()}`;
            if (recordCid) url += `&recordCid=${recordCid}`;

            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setEvents(data.events || []);
            }
        } catch (e) {
            console.error('Failed to fetch audit trail:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAuditTrail(filterCid || undefined);
    };

    const clearFilter = () => {
        setFilterCid('');
        fetchAuditTrail();
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
    };

    const getActionConfig = (action: string) => {
        return ACTION_CONFIG[action] || {
            label: action,
            icon: <Clock className="h-4 w-4" />,
            color: 'bg-gray-500',
        };
    };

    const parseMetadata = (metadata: string | null): Record<string, any> => {
        if (!metadata) return {};
        try { return JSON.parse(metadata); } catch { return {}; }
    };

    if (!wallet.connected) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="pt-6 text-center">
                        <ScrollText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                        <p className="text-muted-foreground">
                            Please connect your wallet to view the audit trail
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <ScrollText className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Audit Trail</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Immutable log of all access requests, consent actions, and record interactions — ensuring non-repudiation
                    </p>
                </div>

                {/* Filter */}
                <Card className="border-2">
                    <CardContent className="pt-6">
                        <form onSubmit={handleFilter} className="flex gap-3 items-end">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="filterCid">Filter by Record CID</Label>
                                <Input
                                    id="filterCid"
                                    value={filterCid}
                                    onChange={(e) => setFilterCid(e.target.value)}
                                    placeholder="Qm... or bafy... (leave empty for all events)"
                                />
                            </div>
                            <Button type="submit" variant="secondary" className="gap-2">
                                <Search className="h-4 w-4" />Filter
                            </Button>
                            {filterCid && (
                                <Button type="button" variant="outline" onClick={clearFilter}>
                                    Clear
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Info cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Card className="border">
                        <CardContent className="pt-4 pb-4 text-center">
                            <div className="text-2xl font-bold">{events.length}</div>
                            <p className="text-xs text-muted-foreground">Total Events</p>
                        </CardContent>
                    </Card>
                    <Card className="border">
                        <CardContent className="pt-4 pb-4 text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {events.filter(e => e.action === 'CONSENT_GRANTED' || e.action === 'REQUEST_APPROVED').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Approvals</p>
                        </CardContent>
                    </Card>
                    <Card className="border">
                        <CardContent className="pt-4 pb-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {events.filter(e => e.txSignature).length}
                            </div>
                            <p className="text-xs text-muted-foreground">On-Chain Anchored</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Timeline */}
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle>Event Timeline</CardTitle>
                        <CardDescription>
                            Chronological log of every action — each event is tamper-proof and signed
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        ) : events.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                No audit events found
                            </p>
                        ) : (
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                                <div className="space-y-6">
                                    {events.map((event) => {
                                        const config = getActionConfig(event.action);
                                        const meta = parseMetadata(event.metadata);

                                        return (
                                            <div key={event.id} className="relative pl-12">
                                                {/* Timeline dot */}
                                                <div className={`absolute left-2 w-5 h-5 rounded-full ${config.color} flex items-center justify-center text-white ring-4 ring-background`}>
                                                    {config.icon}
                                                </div>

                                                <Card className="border">
                                                    <CardContent className="pt-4 pb-4 space-y-2">
                                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                                            <Badge variant="outline" className="gap-1 font-semibold">
                                                                {config.icon}
                                                                {config.label}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">
                                                                {formatDate(event.createdAt)}
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                            <div>
                                                                <span className="text-muted-foreground">Actor: </span>
                                                                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                                                    {event.actorPubkey.substring(0, 12)}...
                                                                </code>
                                                            </div>
                                                            {event.targetPubkey && (
                                                                <div>
                                                                    <span className="text-muted-foreground">Target: </span>
                                                                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                                                        {event.targetPubkey.substring(0, 12)}...
                                                                    </code>
                                                                </div>
                                                            )}
                                                            {event.recordCid && (
                                                                <div>
                                                                    <span className="text-muted-foreground">Record: </span>
                                                                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                                                        {event.recordCid.substring(0, 16)}...
                                                                    </code>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Metadata details */}
                                                        {meta.purpose && (
                                                            <div className="text-sm">
                                                                <span className="text-muted-foreground">Purpose: </span>
                                                                <span className="italic">{meta.purpose}</span>
                                                            </div>
                                                        )}
                                                        {meta.reason && (
                                                            <div className="text-sm">
                                                                <span className="text-muted-foreground">Reason: </span>
                                                                <span className="italic">{meta.reason}</span>
                                                            </div>
                                                        )}

                                                        {/* On-chain link */}
                                                        {event.txSignature && (
                                                            <div className="pt-1">
                                                                <a
                                                                    href={`https://explorer.solana.com/tx/${event.txSignature}?cluster=devnet`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                                                >
                                                                    <ExternalLink className="h-3 w-3" />
                                                                    View on Solana Explorer
                                                                </a>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
