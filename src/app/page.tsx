'use client'

import Link from 'next/link'
import { Shield, Lock, FileText, Key, Activity, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Badge variant="secondary" className="px-4 py-2 gap-2 text-sm font-medium">
                <Shield className="h-4 w-4" />
                Military-Grade Security
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Decentralized Health Records
              <span className="block text-primary mt-2 bg-clip-text">Built on Solana</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Store, manage, and share your medical records with end-to-end encryption,
              cryptographic signatures, and zero-knowledge architecture on the blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <Button asChild size="lg" className="text-lg px-8 gap-2 group">
                <Link href="/create">
                  Create Record
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/verify">Verify Record</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with security, privacy, and user control at the core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>End-to-End Encryption</CardTitle>
                <CardDescription>
                  AES-256-GCM symmetric encryption ensures your health records remain private
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Zero-Knowledge</CardTitle>
                <CardDescription>
                  Server never sees your plaintext data - true privacy by design
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>IPFS Storage</CardTitle>
                <CardDescription>
                  Immutable, decentralized content-addressed storage for your records
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cryptographic Signatures</CardTitle>
                <CardDescription>
                  Ed25519 signatures provide proof of authenticity and integrity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multi-Recipient Sharing</CardTitle>
                <CardDescription>
                  Share records securely with multiple wallets using sealed box encryption
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Access Audit Trail</CardTitle>
                <CardDescription>
                  Complete forensic logs with IP tracking and timestamps for compliance
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and decentralized health record management in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3">Create & Encrypt</h3>
                <p className="text-muted-foreground">
                  Upload your health records, encrypt them with AES-256-GCM, and sign with your wallet
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3">Store on IPFS</h3>
                <p className="text-muted-foreground">
                  Records are stored on IPFS with immutable content addressing for permanent availability
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3">Share & Verify</h3>
                <p className="text-muted-foreground">
                  Grant consent to others or verify signatures without exposing your private keys
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Security First</h2>
              <p className="text-lg text-muted-foreground">
                Your health data deserves military-grade protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Replay Attack Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Nonce-based validation with 5-minute time windows
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Rate Limiting</h4>
                  <p className="text-sm text-muted-foreground">
                    5 attempts per 15 minutes with automatic blocking
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Automatic Key Expiration</h4>
                  <p className="text-sm text-muted-foreground">
                    30-day TTL with configurable lifetimes
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Creator-Only Access Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Only record creators can manage encryption keys
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Sealed Box Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    NaCl crypto_box_seal for multi-recipient access
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Database Persistence</h4>
                  <p className="text-sm text-muted-foreground">
                    All encryption keys survive server restarts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
