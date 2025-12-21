# MediChain

Decentralized health records management system built on Solana with end-to-end encryption, W3C Verifiable Credentials for consent management, and IPFS storage.

## Key Features

- **End-to-End Encryption**: AES-256-GCM encryption, zero-knowledge architecture
- **Consent Management**: W3C Verifiable Credentials with time-limited, revocable access
- **Blockchain Integration**: Solana wallet signatures and optional on-chain anchoring
- **Decentralized Storage**: IPFS for immutable, content-addressed storage
- **Admin Dashboard**: Real-time analytics, access logs, and key management

## Tech Stack

- Next.js 15, React 18, TypeScript, TailwindCSS, shadcn/ui
- Solana (wallet-adapter, Ed25519 signatures)
- IPFS (local daemon or public gateways)
- PostgreSQL + Prisma ORM
- Cryptography: libsodium, tweetnacl, Web Crypto API

## Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- PostgreSQL 16+ (Docker recommended)
- Solana wallet extension (Phantom, Solflare, etc.)

### Installation

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/medichain.git
cd medichain
bun install

# Start PostgreSQL
docker run -d \
  --name health-dapp-postgres \
  -e POSTGRES_PASSWORD=mysupersecretpassword \
  -e POSTGRES_DB=health_dapp \
  -v health-dapp-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16

# Configure environment
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:mysupersecretpassword@localhost:5432/health_dapp"
ADMIN_PUBKEYS="YOUR_SOLANA_WALLET_PUBLIC_KEY"
RUN_IPFS_INTEGRATION=0
IPFS_API_URL=http://127.0.0.1:5001
EOF

cat > db/.env << 'EOF'
DATABASE_URL="postgresql://postgres:mysupersecretpassword@localhost:5432/health_dapp"
EOF

# Setup database
cd db
bun add @prisma/client @prisma/adapter-pg pg dotenv
bun add -D prisma
bunx prisma generate
bunx prisma migrate deploy
cd ..

# Start app
bun dev
```

Access at `http://localhost:3000`

## Usage

### Create Health Record
1. Navigate to `/create` and connect wallet
2. Enter title and payload (text or file)
3. Click "Encrypt & Upload to IPFS"
4. Click "Sign & Download Record" and save `.signed.json`

### Issue Consent
1. Navigate to `/consent` and connect wallet
2. Enter record CID, recipient public key, and validity period
3. Click "Issue Consent Credential"
4. Share the generated consent CID with recipient

### Decrypt Record
1. Navigate to `/verify` and upload `.signed.json`
2. Enter consent CID (if applicable)
3. Connect wallet and click "Decrypt with Wallet"

### Admin Dashboard
1. Navigate to `/admin` and connect admin wallet
2. View analytics, access logs, and manage keys

## Security

- AES-256-GCM encryption with sealed box cryptography
- Ed25519 signatures for authenticity and integrity
- W3C Verifiable Credentials for consent validation
- Replay protection with 5-minute timestamp windows
- Rate limiting and comprehensive audit logging

## Database Commands

```bash
# View data in Prisma Studio
cd db && bunx prisma studio

# Restart database
docker start health-dapp-postgres

# Regenerate Prisma Client
cd db && bunx prisma generate
```

## Troubleshooting

**Database Issues**: `docker restart health-dapp-postgres`  
**IPFS Issues**: Falls back to public gateways automatically  
**Wallet Issues**: Check network settings and clear browser cache  
**Admin Access**: Verify wallet public key in `ADMIN_PUBKEYS` env variable

## License

MIT License