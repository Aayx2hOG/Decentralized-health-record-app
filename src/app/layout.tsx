import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import React from 'react'

export const metadata: Metadata = {
  title: 'MediChain - Decentralized Health Records',
  description: 'Secure, decentralized health records management on Solana with end-to-end encryption and W3C Verifiable Credentials',
}

const links: { label: string; path: string }[] = [
  { label: 'Home', path: '/' },
  { label: 'Create Record', path: '/create' },
  { label: 'Verify Record', path: '/verify' },
  { label: 'Consent', path: '/consent' },
  { label: 'Access Requests', path: '/access-requests' },
  { label: 'Audit Trail', path: '/audit' },
  { label: 'Governance', path: '/admin' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}

declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
