'use client';

import { useEffect, useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { X, Search, Calendar, Filter } from 'lucide-react';
import { AnalyticsData, RewrapKey, AccessLog, Stats, IssuedConsent } from '@/lib/types';

export default function AdminPage() {
    const wallet = useWallet();
    const [createdKeys, setCreatedKeys] = useState<RewrapKey[]>([]);
    const [accessibleKeys, setAccessibleKeys] = useState<RewrapKey[]>([]);
    const [issuedConsents, setIssuedConsents] = useState<IssuedConsent[]>([]);
    const [logs, setLogs] = useState<AccessLog[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSuccess, setFilterSuccess] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterConsentStatus, setFilterConsentStatus] = useState<string>('all');
    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [keysPage, setKeysPage] = useState(1);
    const [logsPage, setLogsPage] = useState(1);
    const [consentsPage, setConsentsPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const fetchingRef = useRef(false);
    const lastWalletRef = useRef<string | null>(null);

    const hasActiveFilters = searchTerm || filterType !== 'all' || filterSuccess !== 'all' || filterConsentStatus !== 'all' || dateFrom || dateTo;

    const clearAllFilters = () => {
        setSearchTerm('');
        setFilterType('all');
        setFilterSuccess('all');
        setFilterConsentStatus('all');
        setDateFrom('');
        setDateTo('');
    };

    useEffect(() => {
        const currentWallet = wallet.publicKey?.toBase58() || null;

        if (wallet.publicKey && wallet.signMessage && currentWallet !== lastWalletRef.current) {
            lastWalletRef.current = currentWallet;
            fetchingRef.current = false;
            setCreatedKeys([]);
            setAccessibleKeys([]);
            setIssuedConsents([]);
            setLogs([]);
            setStats(null);
            setAnalytics(null);
            setAuthError('');
            fetchData();
        } else if (!wallet.publicKey) {
            lastWalletRef.current = null;
            setLoading(false);
        }
    }, [wallet.publicKey]);

    useEffect(() => {
        setKeysPage(1);
        setLogsPage(1);
    }, [searchTerm, filterType, filterSuccess]);

    async function fetchData() {
        if (!wallet.publicKey || !wallet.signMessage || fetchingRef.current) {
            if (!wallet.publicKey || !wallet.signMessage) {
                setAuthError('Please connect your wallet');
                setLoading(false);
            }
            return;
        }

        fetchingRef.current = true;
        setLoading(true);
        setAuthError('');
        try {
            const { signAdminAuth } = await import('@/lib/admin-client');
            const authToken = await signAdminAuth(wallet);

            if (!authToken) {
                throw new Error('Failed to generate authentication token');
            }

            const authHeaders = {
                'Authorization': `Bearer ${authToken}`
            };

            const [keysRes, logsRes, statsRes, analyticsRes] = await Promise.all([
                fetch('/api/admin/keys', { headers: authHeaders }),
                fetch('/api/admin/logs', { headers: authHeaders }),
                fetch('/api/admin/stats', { headers: authHeaders }),
                fetch('/api/admin/analytics', { headers: authHeaders }),
            ]);

            if (keysRes.ok) {
                const keysData = await keysRes.json();
                setCreatedKeys(keysData.created || []);
                setAccessibleKeys(keysData.accessible || []);
                setIssuedConsents(keysData.issuedConsents || []);
            } else if (keysRes.status === 401) {
                const errorData = await keysRes.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Auth error:', errorData);
                setAuthError(errorData.error || 'You can only view your own records');
            } else {
                console.error('Failed to fetch keys:', keysRes.status);
            }

            if (logsRes.ok) setLogs(await logsRes.json());
            else console.error('Failed to fetch logs:', logsRes.status);

            if (statsRes.ok) setStats(await statsRes.json());
            else console.error('Failed to fetch stats:', statsRes.status);

            if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
            else console.error('Failed to fetch analytics:', analyticsRes.status);
        } catch (e: any) {
            console.error('Failed to fetch admin data:', e);
            setAuthError(e.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }
    }

    const filterKeysBySearch = (keys: RewrapKey[]) => keys.filter((key) => {
        const matchesSearch =
            key.recordCid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.recipientPubkey.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (key.creatorPubkey && key.creatorPubkey.toLowerCase().includes(searchTerm.toLowerCase()));

        const keyDate = new Date(key.createdAt);
        const matchesDateFrom = !dateFrom || keyDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || keyDate <= new Date(dateTo + 'T23:59:59');
        const matchesDateRange = matchesDateFrom && matchesDateTo;

        if (filterType === 'expired') {
            return matchesSearch && matchesDateRange && key.expiresAt && new Date(key.expiresAt) < new Date();
        }
        if (filterType === 'active') {
            return matchesSearch && matchesDateRange && (!key.expiresAt || new Date(key.expiresAt) >= new Date());
        }
        return matchesSearch && matchesDateRange;
    });

    const filteredCreatedKeys = filterKeysBySearch(createdKeys);
    const filteredAccessibleKeys = filterKeysBySearch(accessibleKeys);

    const filteredConsents = issuedConsents.filter((consent) => {
        const matchesSearch =
            consent.recordCid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consent.recipientPubkey.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consent.consentCid.toLowerCase().includes(searchTerm.toLowerCase());

        const consentDate = new Date(consent.createdAt);
        const matchesDateFrom = !dateFrom || consentDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || consentDate <= new Date(dateTo + 'T23:59:59');
        const matchesDateRange = matchesDateFrom && matchesDateTo;

        const isRevoked = !!consent.revokedAt;
        const isExpired = consent.expiresAt && new Date(consent.expiresAt) < new Date();
        const isActive = !isRevoked && !isExpired;

        if (filterConsentStatus === 'active') return matchesSearch && matchesDateRange && isActive;
        if (filterConsentStatus === 'revoked') return matchesSearch && matchesDateRange && isRevoked;
        if (filterConsentStatus === 'expired') return matchesSearch && matchesDateRange && isExpired;

        return matchesSearch && matchesDateRange;
    });

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.recordCid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.recipientPubkey.toLowerCase().includes(searchTerm.toLowerCase());

        const logDate = new Date(log.accessedAt);
        const matchesDateFrom = !dateFrom || logDate >= new Date(dateFrom);
        const matchesDateTo = !dateTo || logDate <= new Date(dateTo + 'T23:59:59');
        const matchesDateRange = matchesDateFrom && matchesDateTo;

        if (filterSuccess === 'success') return matchesSearch && matchesDateRange && log.success;
        if (filterSuccess === 'failed') return matchesSearch && matchesDateRange && !log.success;
        return matchesSearch && matchesDateRange;
    });

    const totalCreatedKeysPages = Math.ceil(filteredCreatedKeys.length / itemsPerPage);
    const totalAccessibleKeysPages = Math.ceil(filteredAccessibleKeys.length / itemsPerPage);
    const totalConsentsPages = Math.ceil(filteredConsents.length / itemsPerPage);
    const totalLogsPages = Math.ceil(filteredLogs.length / itemsPerPage);

    const paginatedCreatedKeys = filteredCreatedKeys.slice(
        (keysPage - 1) * itemsPerPage,
        keysPage * itemsPerPage
    );

    const paginatedAccessibleKeys = filteredAccessibleKeys.slice(
        (keysPage - 1) * itemsPerPage,
        keysPage * itemsPerPage
    );

    const paginatedLogs = filteredLogs.slice(
        (logsPage - 1) * itemsPerPage,
        logsPage * itemsPerPage
    );

    const paginatedConsents = filteredConsents.slice(
        (consentsPage - 1) * itemsPerPage,
        consentsPage * itemsPerPage
    );

    function formatDate(date: string | null) {
        if (!date) return 'Never';
        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function truncate(str: string, length: number = 12) {
        if (str.length <= length) return str;
        return `${str.slice(0, length)}...${str.slice(-4)}`;
    }

    function isExpired(expiresAt: string | null) {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
    }

    async function revokeKey(id: number) {
        if (!confirm('Are you sure you want to revoke this key?')) return;

        try {
            const res = await fetch(`/api/admin/revoke/${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchData();
                alert('Key revoked successfully');
            } else {
                alert('Failed to revoke key');
            }
        } catch (e) {
            alert('Error revoking key');
        }
    }

    async function revokeConsent(id: number) {
        if (!confirm('Are you sure you want to revoke this consent? The recipient will immediately lose access.')) return;

        try {
            const { signAdminAuth } = await import('@/lib/admin-client');
            const authToken = await signAdminAuth(wallet);

            const res = await fetch('/api/consent/revoke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ consentId: id })
            });

            if (res.ok) {
                await fetchData();
                alert('Consent revoked successfully');
            } else {
                const error = await res.json();
                alert('Failed to revoke consent: ' + (error.error || 'Unknown error'));
            }
        } catch (e: any) {
            alert('Error revoking consent: ' + e.message);
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-muted-foreground">Loading admin data...</div>
                </div>
            </div>
        );
    }

    if (!wallet.publicKey) {
        return (
            <div className="container mx-auto py-12">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Wallet Connection Required</CardTitle>
                        <CardDescription>Please connect your wallet to view your health records dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="text-6xl">🔐</div>
                            <p className="text-center text-muted-foreground">
                                Connect your wallet using the button in the header
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (authError) {
        return (
            <div className="container mx-auto py-12">
                <Card className="max-w-md mx-auto border-red-200 dark:border-red-800">
                    <CardHeader>
                        <CardTitle className="text-red-600 dark:text-red-400">Authentication Error</CardTitle>
                        <CardDescription>{authError}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="text-6xl">❌</div>
                            <p className="text-center text-muted-foreground">
                                Wallet: {wallet.publicKey.toBase58().slice(0, 8)}...{wallet.publicKey.toBase58().slice(-4)}
                            </p>
                            <Button onClick={() => {
                                fetchingRef.current = false;
                                fetchData();
                            }} variant="outline">
                                Retry Authentication
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">My Health Records Dashboard</h1>
                <p className="text-muted-foreground mt-2">Monitor and manage access to your health records</p>
            </div>

            {stats && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalRecords}</div>
                            <p className="text-xs text-muted-foreground">Unique record CIDs</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.activeKeys}</div>
                            <p className="text-xs text-muted-foreground">{stats.expiredKeys} expired</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Accesses</CardTitle>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalAccesses}</div>
                            <p className="text-xs text-muted-foreground">{stats.failedAccesses} failed attempts</p>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Tabs defaultValue="keys" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="keys">Rewrap Keys</TabsTrigger>
                    <TabsTrigger value="consents">Issued Consents</TabsTrigger>
                    <TabsTrigger value="logs">Access Logs</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="keys" className="space-y-4">
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Records You Created</CardTitle>
                            <CardDescription>Health records you have created and their access permissions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex flex-wrap gap-3">
                                    <div className="relative flex-1 min-w-[200px] max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by CID, recipient, or creator..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                    <Select value={filterType} onValueChange={setFilterType}>
                                        <SelectTrigger className="w-[140px]">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Keys</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="expired">Expired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={fetchData} variant="outline" size="icon" title="Refresh">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </Button>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">From:</span>
                                        <Input
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            className="w-[150px]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">To:</span>
                                        <Input
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            className="w-[150px]"
                                        />
                                    </div>
                                    {hasActiveFilters && (
                                        <Button onClick={clearAllFilters} variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                            <X className="h-4 w-4 mr-1" />
                                            Clear Filters
                                        </Button>
                                    )}
                                </div>

                                {hasActiveFilters && (
                                    <div className="text-sm text-muted-foreground">
                                        Showing {filteredCreatedKeys.length} of {createdKeys.length} records
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-muted-foreground">Show:</span>
                                <Select value={itemsPerPage.toString()} onValueChange={(val) => setItemsPerPage(Number(val))}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">per page</span>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Record CID</TableHead>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>Creator</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Expires</TableHead>
                                            <TableHead>Accesses</TableHead>
                                            <TableHead>Last Access</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedCreatedKeys.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p>No records created yet</p>
                                                        <p className="text-sm">Create a new health record to get started</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedCreatedKeys.map((key) => (
                                                <TableRow key={key.id}>
                                                    <TableCell className="font-mono text-xs">
                                                        {truncate(key.recordCid)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {truncate(key.recipientPubkey)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {key.creatorPubkey ? truncate(key.creatorPubkey) : '-'}
                                                    </TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.createdAt)}</TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.expiresAt)}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{key.accessCount}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.lastAccessedAt)}</TableCell>
                                                    <TableCell>
                                                        {isExpired(key.expiresAt) ? (
                                                            <Badge variant="destructive">Expired</Badge>
                                                        ) : (
                                                            <Badge variant="default">Active</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => revokeKey(key.id)}
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-destructive"
                                                        >
                                                            Revoke
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            {totalCreatedKeysPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((keysPage - 1) * itemsPerPage) + 1} to {Math.min(keysPage * itemsPerPage, filteredCreatedKeys.length)} of {filteredCreatedKeys.length} results
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setKeysPage(p => Math.max(1, p - 1))}
                                            disabled={keysPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <div className="text-sm">
                                            Page {keysPage} of {totalCreatedKeysPages}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setKeysPage(p => Math.min(totalCreatedKeysPages, p + 1))}
                                            disabled={keysPage === totalCreatedKeysPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Records You Can Access
                                <Badge variant="secondary">via Consent</Badge>
                            </CardTitle>
                            <CardDescription>Health records shared with you by other creators</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Record CID</TableHead>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>Creator</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Expires</TableHead>
                                            <TableHead>Accesses</TableHead>
                                            <TableHead>Last Access</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedAccessibleKeys.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <p>No accessible records</p>
                                                        <p className="text-sm">Records shared with you via consent will appear here</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedAccessibleKeys.map((key) => (
                                                <TableRow key={key.id}>
                                                    <TableCell className="font-mono text-xs">
                                                        <div className="flex items-center gap-2">
                                                            {truncate(key.recordCid)}
                                                            {key.isConsent && (
                                                                <Badge variant="secondary" className="text-xs">Consent</Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {truncate(key.recipientPubkey)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {key.creatorPubkey ? truncate(key.creatorPubkey) : '-'}
                                                    </TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.createdAt)}</TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.expiresAt)}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{key.accessCount}</Badge>
                                                    </TableCell>
                                                    <TableCell className="text-xs">{formatDate(key.lastAccessedAt)}</TableCell>
                                                    <TableCell>
                                                        {isExpired(key.expiresAt) ? (
                                                            <Badge variant="destructive">Expired</Badge>
                                                        ) : (
                                                            <Badge variant="default">Active</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="text-xs text-muted-foreground">Read-only</span>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            {totalAccessibleKeysPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((keysPage - 1) * itemsPerPage) + 1} to {Math.min(keysPage * itemsPerPage, filteredAccessibleKeys.length)} of {filteredAccessibleKeys.length} results
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setKeysPage(p => Math.max(1, p - 1))}
                                            disabled={keysPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <div className="text-sm">
                                            Page {keysPage} of {totalAccessibleKeysPages}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setKeysPage(p => Math.min(totalAccessibleKeysPages, p + 1))}
                                            disabled={keysPage === totalAccessibleKeysPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="consents" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Consents You&apos;ve Issued</CardTitle>
                            <CardDescription>
                                Manage access permissions you&apos;ve granted to others. Revoking a consent will immediately prevent the recipient from accessing the record.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mb-6">
                                <div className="flex flex-wrap gap-3">
                                    <div className="relative flex-1 min-w-[200px] max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search by CID, recipient, or consent CID..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                    <Select value={filterConsentStatus} onValueChange={setFilterConsentStatus}>
                                        <SelectTrigger className="w-[140px]">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Consents</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="revoked">Revoked</SelectItem>
                                            <SelectItem value="expired">Expired</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">From:</span>
                                        <Input
                                            type="date"
                                            value={dateFrom}
                                            onChange={(e) => setDateFrom(e.target.value)}
                                            className="w-[150px]"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">To:</span>
                                        <Input
                                            type="date"
                                            value={dateTo}
                                            onChange={(e) => setDateTo(e.target.value)}
                                            className="w-[150px]"
                                        />
                                    </div>
                                    {hasActiveFilters && (
                                        <Button onClick={clearAllFilters} variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                            <X className="h-4 w-4 mr-1" />
                                            Clear Filters
                                        </Button>
                                    )}
                                </div>

                                {hasActiveFilters && (
                                    <div className="text-sm text-muted-foreground">
                                        Showing {filteredConsents.length} of {issuedConsents.length} consents
                                    </div>
                                )}
                            </div>

                            {filteredConsents.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    {issuedConsents.length === 0 ? (
                                        <>
                                            <p>You haven&apos;t issued any consents yet.</p>
                                            <Link href="/consent" className="text-primary hover:underline mt-2 inline-block">
                                                Issue a consent →
                                            </Link>
                                        </>
                                    ) : (
                                        <p>No consents match your filters.</p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Record CID</TableHead>
                                                <TableHead>Recipient</TableHead>
                                                <TableHead>Issued</TableHead>
                                                <TableHead>Expires</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {paginatedConsents.map((consent) => (
                                                <TableRow key={consent.id}>
                                                    <TableCell className="font-mono text-sm">
                                                        {truncate(consent.recordCid, 16)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-sm">
                                                        {truncate(consent.recipientPubkey, 12)}
                                                    </TableCell>
                                                    <TableCell className="text-sm">
                                                        {formatDate(consent.createdAt)}
                                                    </TableCell>
                                                    <TableCell className="text-sm">
                                                        {consent.expiresAt ? formatDate(consent.expiresAt) : 'Never'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {consent.revokedAt ? (
                                                            <Badge variant="destructive">Revoked</Badge>
                                                        ) : consent.expiresAt && new Date(consent.expiresAt) < new Date() ? (
                                                            <Badge variant="secondary">Expired</Badge>
                                                        ) : (
                                                            <Badge variant="default">Active</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {!consent.revokedAt && (!consent.expiresAt || new Date(consent.expiresAt) >= new Date()) && (
                                                            <Button
                                                                onClick={() => revokeConsent(consent.id)}
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-destructive hover:text-destructive"
                                                            >
                                                                Revoke
                                                            </Button>
                                                        )}
                                                        {consent.revokedAt && consent.revokedReason && (
                                                            <span className="text-xs text-muted-foreground">
                                                                {consent.revokedReason}
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    {totalConsentsPages > 1 && (
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-sm text-muted-foreground">
                                                Page {consentsPage} of {totalConsentsPages}
                                            </span>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setConsentsPage(p => Math.max(1, p - 1))}
                                                    disabled={consentsPage === 1}
                                                >
                                                    Previous
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setConsentsPage(p => Math.min(totalConsentsPages, p + 1))}
                                                    disabled={consentsPage === totalConsentsPages}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="logs" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Access Logs</CardTitle>
                            <CardDescription>Complete audit trail of all access attempts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-6">
                                <Input
                                    placeholder="Search by CID or recipient..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-md"
                                />
                                <Select value={filterSuccess} onValueChange={setFilterSuccess}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by result" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Attempts</SelectItem>
                                        <SelectItem value="success">Successful</SelectItem>
                                        <SelectItem value="failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={fetchData} variant="outline">Refresh</Button>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-muted-foreground">Show:</span>
                                <Select value={itemsPerPage.toString()} onValueChange={(val) => setItemsPerPage(Number(val))}>
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">per page</span>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>Record CID</TableHead>
                                            <TableHead>Recipient</TableHead>
                                            <TableHead>IP Address</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Error</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedLogs.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                    No access logs found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedLogs.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell className="text-xs">{formatDate(log.accessedAt)}</TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {truncate(log.recordCid)}
                                                    </TableCell>
                                                    <TableCell className="font-mono text-xs">
                                                        {truncate(log.recipientPubkey)}
                                                    </TableCell>
                                                    <TableCell className="text-xs">{log.ipAddress || '-'}</TableCell>
                                                    <TableCell>
                                                        {log.success ? (
                                                            <Badge variant="default">Success</Badge>
                                                        ) : (
                                                            <Badge variant="destructive">Failed</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-xs max-w-xs truncate">
                                                        {log.errorMessage || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            {totalLogsPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((logsPage - 1) * itemsPerPage) + 1} to {Math.min(logsPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} results
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setLogsPage(p => Math.max(1, p - 1))}
                                            disabled={logsPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <div className="text-sm">
                                            Page {logsPage} of {totalLogsPages}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setLogsPage(p => Math.min(totalLogsPages, p + 1))}
                                            disabled={logsPage === totalLogsPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    {loading ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">Loading analytics...</div>
                            </CardContent>
                        </Card>
                    ) : !analytics ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">No analytics data available</div>
                            </CardContent>
                        </Card>
                    ) : (analytics.timeSeriesData.length === 0 && analytics.topRecords.length === 0) ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <p className="text-muted-foreground mb-2">No data to display yet</p>
                                    <p className="text-sm text-muted-foreground">Create some health records and they will appear here</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Access Trends (Last 30 Days)</CardTitle>
                                    <CardDescription>Daily access attempts over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={analytics.timeSeriesData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="successful" stroke="#22c55e" name="Successful" strokeWidth={2} />
                                            <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" strokeWidth={2} />
                                            <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Success vs Failed</CardTitle>
                                        <CardDescription>Overall access attempt results</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={[
                                                        { name: 'Successful', value: analytics.successVsFailed.successful },
                                                        { name: 'Failed', value: analytics.successVsFailed.failed },
                                                    ]}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent = 0 }: { name?: string; percent?: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    <Cell fill="#22c55e" />
                                                    <Cell fill="#ef4444" />
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Hourly Access Pattern</CardTitle>
                                        <CardDescription>Access attempts by hour of day</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={analytics.hourlyPattern}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="hour" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="count" fill="#3b82f6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Most Accessed Records</CardTitle>
                                    <CardDescription>Top 10 records by access count</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={analytics.topRecords} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis dataKey="cid" type="category" width={150} tickFormatter={(cid) => `${cid.slice(0, 8)}...`} />
                                            <Tooltip />
                                            <Bar dataKey="count" fill="#8b5cf6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {analytics.errorDistribution.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Error Distribution</CardTitle>
                                        <CardDescription>Common error messages</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {analytics.errorDistribution.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 rounded border">
                                                    <span className="text-sm text-muted-foreground truncate flex-1">{item.error}</span>
                                                    <Badge variant="destructive">{item.count}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div >
    );
}