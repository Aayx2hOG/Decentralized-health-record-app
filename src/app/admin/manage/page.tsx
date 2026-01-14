'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { signAdminAuth } from '@/lib/admin-client';
import { UserPlus, Trash2, Shield, AlertCircle, Users } from 'lucide-react';

export default function ManageAdminsPage() {
    const wallet = useWallet();
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function addAdmin() {
        if (!newAdmin || !wallet.publicKey) return;

        setLoading(true);
        setError('');

        try {
            const authToken = await signAdminAuth(wallet);
            if (!authToken) {
                setError('Failed to authenticate');
                return;
            }

            const res = await fetch('/api/admin/manage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ pubkey: newAdmin })
            });

            if (res.ok) {
                setNewAdmin('');
                await fetchAdmins();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to add admin');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to add admin');
        } finally {
            setLoading(false);
        }
    }

    async function removeAdmin(pubkey: string) {
        if (!wallet.publicKey) return;

        setLoading(true);
        setError('');

        try {
            const authToken = await signAdminAuth(wallet);
            if (!authToken) {
                setError('Failed to authenticate');
                return;
            }

            const res = await fetch('/api/admin/manage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ pubkey })
            });

            if (res.ok) {
                await fetchAdmins();
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to remove admin');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to remove admin');
        } finally {
            setLoading(false);
        }
    }

    async function fetchAdmins() {
        if (!wallet.publicKey) return;

        try {
            const authToken = await signAdminAuth(wallet);
            if (!authToken) return;

            const res = await fetch('/api/admin/list', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (res.ok) {
                setAdmins(await res.json());
            }
        } catch (err) {
            console.error('Failed to fetch admins:', err);
        }
    }

    useEffect(() => {
        if (wallet.publicKey) {
            fetchAdmins();
        }
    }, [wallet.publicKey]);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Manage Admins</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Add or remove admin users who can access the dashboard and analytics
                    </p>
                </div>

                {!wallet.publicKey && (
                    <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                            Please connect your wallet to manage admins
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Add New Admin
                        </CardTitle>
                        <CardDescription>
                            Enter the Solana wallet public key of the user you want to grant admin access
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-3">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="newAdmin">Wallet Public Key</Label>
                                <Input
                                    id="newAdmin"
                                    placeholder="Enter base58 encoded public key..."
                                    value={newAdmin}
                                    onChange={(e) => setNewAdmin(e.target.value)}
                                    disabled={loading || !wallet.publicKey}
                                    className="font-mono"
                                />
                            </div>
                            <div className="flex items-end">
                                <Button
                                    onClick={addAdmin}
                                    disabled={loading || !wallet.publicKey || !newAdmin}
                                    className="gap-2"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    {loading ? 'Adding...' : 'Add Admin'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Current Admins
                                </CardTitle>
                                <CardDescription>
                                    List of users with admin access to the dashboard
                                </CardDescription>
                            </div>
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                                {admins.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {admins.length === 0 && wallet.publicKey ? (
                            <div className="text-center py-12">
                                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <p className="text-muted-foreground">No admins found</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {admins.map((admin: any, index: number) => (
                                    <div key={admin.id}>
                                        {index > 0 && <Separator className="my-3" />}
                                        <div className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Shield className="h-4 w-4 text-primary shrink-0" />
                                                    <code className="text-sm font-mono truncate">{admin.pubkey}</code>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Added: {new Date(admin.addedAt).toLocaleDateString()} at {new Date(admin.addedAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeAdmin(admin.pubkey)}
                                                disabled={loading}
                                                className="gap-2 shrink-0"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}