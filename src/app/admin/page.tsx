'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface AnalyticsData {
    timeSeriesData: Array<{ date: string; successful: number; failed: number; total: number }>;
    successVsFailed: { successful: number; failed: number };
    topRecords: Array<{ cid: string; count: number }>;
    hourlyPattern: Array<{ hour: number; count: number }>;
    errorDistribution: Array<{ error: string; count: number }>;
}

interface RewrapKey {
    id: number;
    recordCid: string;
    recipientPubkey: string;
    creatorPubkey: string | null;
    createdAt: string;
    expiresAt: string | null;
    accessCount: number;
    lastAccessedAt: string | null;
}

interface AccessLog {
    id: number;
    recordCid: string;
    recipientPubkey: string;
    success: boolean;
    ipAddress: string | null;
    userAgent: string | null;
    errorMessage: string | null;
    accessedAt: string;
}

interface Stats {
    totalKeys: number;
    totalRecords: number;
    totalAccesses: number;
    failedAccesses: number;
    expiredKeys: number;
    activeKeys: number;
}

export default function AdminPage() {
    const [keys, setKeys] = useState<RewrapKey[]>([]);
    const [logs, setLogs] = useState<AccessLog[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSuccess, setFilterSuccess] = useState<string>('all');
    const [filterType, setFilterType] = useState<string>('all');
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [keysPage, setKeysPage] = useState(1);
    const [logsPage, setLogsPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setKeysPage(1);
        setLogsPage(1);
    }, [searchTerm, filterType, filterSuccess]);

    async function fetchData() {
        setLoading(true);
        try {
            const [keysRes, logsRes, statsRes, analyticsRes] = await Promise.all([
                fetch('/api/admin/keys'),
                fetch('/api/admin/logs'),
                fetch('/api/admin/stats'),
                fetch('/api/admin/analytics'),
            ]);

            if (keysRes.ok) setKeys(await keysRes.json());
            if (logsRes.ok) setLogs(await logsRes.json());
            if (statsRes.ok) setStats(await statsRes.json());
            if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
        } catch (e) {
            console.error('Failed to fetch admin data:', e);
        } finally {
            setLoading(false);
        }
    }

    const filteredKeys = keys.filter((key) => {
        const matchesSearch =
            key.recordCid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            key.recipientPubkey.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (key.creatorPubkey && key.creatorPubkey.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterType === 'expired') {
            return matchesSearch && key.expiresAt && new Date(key.expiresAt) < new Date();
        }
        if (filterType === 'active') {
            return matchesSearch && (!key.expiresAt || new Date(key.expiresAt) >= new Date());
        }
        return matchesSearch;
    });

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.recordCid.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.recipientPubkey.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterSuccess === 'success') return matchesSearch && log.success;
        if (filterSuccess === 'failed') return matchesSearch && !log.success;
        return matchesSearch;
    });

    const totalKeysPages = Math.ceil(filteredKeys.length / itemsPerPage);
    const totalLogsPages = Math.ceil(filteredLogs.length / itemsPerPage);

    const paginatedKeys = filteredKeys.slice(
        (keysPage - 1) * itemsPerPage,
        keysPage * itemsPerPage
    );

    const paginatedLogs = filteredLogs.slice(
        (logsPage - 1) * itemsPerPage,
        logsPage * itemsPerPage
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

    if (loading) {
        return (
            <div className="container mx-auto py-12">
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-muted-foreground">Loading admin data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-2">Monitor and manage health record access</p>
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
                    <TabsTrigger value="logs">Access Logs</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="keys" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rewrap Keys Management</CardTitle>
                            <CardDescription>View and manage all stored encryption keys</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-6">
                                <Input
                                    placeholder="Search by CID, recipient, or creator..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-md"
                                />
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Keys</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
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
                                        {paginatedKeys.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={9} className="text-center text-muted-foreground">
                                                    No keys found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedKeys.map((key) => (
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
                            {totalKeysPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {((keysPage - 1) * itemsPerPage) + 1} to {Math.min(keysPage * itemsPerPage, filteredKeys.length)} of {filteredKeys.length} results
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
                                            Page {keysPage} of {totalKeysPages}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setKeysPage(p => Math.min(totalKeysPages, p + 1))}
                                            disabled={keysPage === totalKeysPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
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
                    {!analytics ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-center text-muted-foreground">Loading analytics...</div>
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