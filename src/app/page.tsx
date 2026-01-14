'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackgroundBeams } from '@/components/ui/background-beams'

import { Button as MovingButton } from '@/components/ui/moving-border'
import { HoverEffect } from '@/components/ui/card-hover-effect'

const features = [
  {
    title: "End-to-End Encryption",
    description: "AES-256-GCM symmetric encryption ensures your health records remain private",
    link: "#",
  },
  {
    title: "Zero-Knowledge",
    description: "Server never sees your plaintext data - true privacy by design",
    link: "#",
  },
  {
    title: "IPFS Storage",
    description: "Immutable, decentralized content-addressed storage for your records",
    link: "#",
  },
  {
    title: "Cryptographic Signatures",
    description: "Ed25519 signatures provide proof of authenticity and integrity",
    link: "#",
  },
  {
    title: "Multi-Recipient Sharing",
    description: "Share records securely using sealed box encryption",
    link: "#",
  },
];

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const securityHighlights = [
  {
    quote: "Nonce-based validation with 5-minute time windows",
    name: "Replay Attack Protection",
    title: "Security Feature",
  },
  {
    quote: "5 attempts per 15 minutes with automatic blocking",
    name: "Rate Limiting",
    title: "Security Feature",
  },
  {
    quote: "30-day TTL with configurable lifetimes",
    name: "Automatic Key Expiration",
    title: "Security Feature",
  },
  {
    quote: "Only record creators can manage encryption keys",
    name: "Creator-Only Access Control",
    title: "Security Feature",
  },
  {
    quote: "NaCl crypto_box_seal for multi-recipient access",
    name: "Sealed Box Encryption",
    title: "Security Feature",
  },
  {
    quote: "All encryption keys survive server restarts",
    name: "Database Persistence",
    title: "Security Feature",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      
      <section className="relative py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center antialiased">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Badge variant="secondary" className="px-4 py-2 gap-2 text-sm font-medium border-primary/20 bg-primary/10">
                <Shield className="h-4 w-4" />
                Military-Grade Security
              </Badge>
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-200 dark:to-neutral-600">
              Decentralized Health Records
              <span className="block text-primary mt-2">Built on Solana</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Store, manage, and share your medical records with end-to-end encryption,
              cryptographic signatures, and zero-knowledge architecture on the blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 pt-4">
              <MovingButton
                borderRadius="0.75rem"
                className="bg-background text-foreground border-neutral-200 dark:border-slate-800 font-semibold text-lg"
                containerClassName="h-12"
                as={Link}
                href="/create"
              >
                Create Record
              </MovingButton>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-12 rounded-xl border-2">
                <Link href="/verify">Verify Record</Link>
              </Button>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </section>

      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Enterprise-Grade Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with security, privacy, and user control at the core
            </p>
          </div>

          <HoverEffect items={features} />
        </div>
      </section>

      
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

      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Security First</h2>
              <p className="text-lg text-muted-foreground">
                Your health data deserves military-grade protection
              </p>
            </div>

            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased group">
                <InfiniteMovingCards
                    items={securityHighlights}
                    direction="right"
                    speed="slow"
                />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
