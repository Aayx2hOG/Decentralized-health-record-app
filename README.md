# Decentralized Health Records DApp

A production-ready decentralized health records management system built on Solana with military-grade end-to-end encryption, cryptographic signatures, IPFS storage, and comprehensive admin dashboard.

## Features

### Core Security Features
- **End-to-End Encryption**: AES-256-GCM symmetric encryption for health records
- **Zero-Knowledge Architecture**: Server never sees plaintext data
- **Sealed Box Encryption**: NaCl crypto_box_seal for multi-recipient access
- **Ed25519 Signatures**: Cryptographic proof of authenticity and integrity
- **Replay Attack Protection**: Nonce-based request validation with 5-minute windows
- **Rate Limiting**: 5 attempts per 15 minutes with 30-minute blocks
- **Access Audit Trail**: Complete forensic logs with IP tracking and timestamps

### Data Management
- **IPFS Storage**: Immutable, decentralized content-addressed storage
- **PostgreSQL Database**: Persistent encrypted key storage with Prisma ORM
- **Automatic Key Expiration**: 30-day TTL with configurable lifetimes
- **Creator-Only Access Control**: Only record creators can manage encryption keys
- **Multi-Recipient Support**: Share records with multiple wallets simultaneously
- **Access Count Tracking**: Monitor how many times each record is accessed

### Rewrap API (Proxy Re-encryption)
- **Private Key Protection**: Recipients decrypt without exposing secret keys
- **Ephemeral Keypair Flow**: Temporary keys for secure key exchange
- **Signature-Based Authentication**: Every request cryptographically verified
- **Request Timestamps**: Prevent replay attacks with time-bound validity
- **Database Persistence**: All encryption keys survive server restarts
- **Error Logging**: Comprehensive failure tracking for security analysis

### Admin Dashboard
- **Wallet-Based Authentication**: Admin access via Solana wallet signatures
- **Real-time Analytics**: Interactive charts and metrics
- **Access Log Viewer**: Filter and search all decrypt attempts
- **Key Management**: View all rewrap keys with expiration status
- **Security Statistics**: 24-hour success/failure rates, blocked IPs
- **Audit Logging**: Track all admin authentication attempts
- **Time-Series Data**: Daily access patterns and trends
- **Error Distribution**: Categorize and analyze failure reasons

### User Interface
- **Modern Design**: Built with Next.js 15, React, TailwindCSS, shadcn/ui
- **Dark Mode Support**: System-aware theme switching
- **Responsive Layout**: Mobile-first design for all devices
- **Real-time Feedback**: Toast notifications and loading states
- **Wallet Integration**: Support for Phantom, Solflare, and all Solana wallets
- **File Upload**: Drag-and-drop support for health record files
- **Signature Verification UI**: Visual indicators for valid/invalid signatures

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript 5
- **Styling**: TailwindCSS 3, shadcn/ui components
- **Blockchain**: Solana (Ed25519 signatures, wallet-adapter)
- **Storage**: IPFS (local daemon or public gateways)
- **Database**: PostgreSQL 16 with Prisma 7.1.0
- **Cryptography**: 
  - libsodium-wrappers (NaCl sealed boxes, Ed25519)
  - tweetnacl (signature verification)
  - Web Crypto API (AES-256-GCM)
- **Runtime**: Bun (or Node.js 18+)
- **Charts**: Recharts for analytics visualization

### Database Schema
```prisma
model RewrapKey {
  id              Int       @id @default(autoincrement())
  recordCid       String    // IPFS CID of encrypted record
  recipientPubkey String    // Recipient's Solana public key
  encryptedSymKey String    // Encrypted AES symmetric key
  creatorPubkey   String?   // Creator's Solana public key
  createdAt       DateTime  @default(now())
  expiresAt       DateTime? // Automatic expiration (30 days)
  accessCount     Int       @default(0)
  lastAccessedAt  DateTime?
  
  @@unique([recordCid, recipientPubkey])
  @@index([recordCid])
  @@index([recipientPubkey])
}

model AccessLog {
  id              Int      @id @default(autoincrement())
  recordCid       String
  recipientPubkey String
  success         Boolean
  ipAddress       String?
  userAgent       String?
  errorMessage    String?
  accessedAt      DateTime @default(now())
  
  @@index([recordCid])
  @@index([accessedAt])
}
```

### Encryption Flow
```
1. Generate AES-256-GCM symmetric key
2. Encrypt health record with symmetric key
3. Upload encrypted record to IPFS → get CID
4. For each recipient:
   - Encrypt symmetric key with recipient's public key (sealed box)
   - Store encrypted key in database (rewrap API)
5. Sign record metadata with creator's wallet
6. Download .signed.json file
```

### Decryption Flow
```
1. Upload .signed.json file
2. Verify creator's signature
3. Connect wallet (must be a recipient)
4. Request rewrapped key from API
5. Sign ephemeral request with wallet
6. Server verifies signature and rewraps key
7. Decrypt symmetric key with wallet's private key
8. Fetch encrypted payload from IPFS
9. Decrypt payload with symmetric key
10. Display health record
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- PostgreSQL 16+ (or Docker)
- IPFS daemon (optional - falls back to public gateways)
- Solana wallet browser extension (Phantom, Solflare, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Aayx2hOG/Decentralized-health-record-app.git
cd Decentralized-health-record-app
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up PostgreSQL database with Docker**
```bash
# Create and start persistent PostgreSQL container
docker run -d \
  --name health-dapp-postgres \
  -e POSTGRES_PASSWORD=mysupersecretpassword \
  -e POSTGRES_DB=health_dapp \
  -v health-dapp-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  --restart unless-stopped \
  postgres:16

# Verify container is running
docker ps | grep health-dapp-postgres
```

4. **Configure environment variables**
```bash
# Root .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:mysupersecretpassword@localhost:5432/health_dapp"
ADMIN_PUBKEYS="YOUR_SOLANA_WALLET_PUBLIC_KEY"
NEXT_PUBLIC_ADMIN_PUBKEYS="YOUR_SOLANA_WALLET_PUBLIC_KEY"
RUN_IPFS_INTEGRATION=0
IPFS_API_URL=http://127.0.0.1:5001
EOF

# Database .env file
cat > db/.env << 'EOF'
DATABASE_URL="postgresql://postgres:mysupersecretpassword@localhost:5432/health_dapp"
EOF
```

5. **Install database dependencies**
```bash
cd db
bun add @prisma/client @prisma/adapter-pg pg dotenv
bun add -D prisma
cd ..
```

6. **Run database migrations**
```bash
cd db
bunx prisma generate
bunx prisma migrate deploy
cd ..
```

7. **Start IPFS daemon** (optional)
```bash
ipfs daemon &
```

8. **Start development server**
```bash
bun dev
```

9. **Access the application**
```
http://localhost:3000
```

### Quick Start Commands

```bash
# Start database (after PC restart)
docker start health-dapp-postgres

# View database contents
cd db && bunx prisma studio

# Run migrations
cd db && bunx prisma migrate deploy

# Generate Prisma client
cd db && bunx prisma generate
```
```

8. **Start development server**
```bash
bun run dev
# or
npm run dev
```

9. **Open application**
```
http://localhost:3000
```

## Usage

### Creating a Health Record

1. Navigate to `/create`
2. Connect your Solana wallet
3. Fill in record details:
   - **Title**: Descriptive name (e.g., "Lab Results - January 2025")
   - **Payload**: Enter text or upload a file (PDF, images, etc.)
   - **Recipients**: Comma-separated list of Solana public keys
4. Enable "Allow recipients to request access" (activates rewrap API)
5. Click "Encrypt & Upload to IPFS"
6. Wait for IPFS upload to complete (CID will be displayed)
7. Click "Sign & Download Record" 
8. Approve wallet signature request
9. Save the downloaded `.signed.json` file securely

### Verifying and Decrypting a Record

1. Navigate to `/verify`
2. Upload the `.signed.json` file
3. Signature verification runs automatically:
   - Green checkmark = Valid signature from creator
   - Red X = Invalid or tampered signature
4. Connect your Solana wallet (must be listed as a recipient)
5. Click "Decrypt with Wallet"
6. Approve the ephemeral key signature request
7. View the decrypted health record content

### Admin Dashboard Access

1. Navigate to `/admin`
2. Connect your admin wallet (configured in `ADMIN_PUBKEYS`)
3. Approve the authentication signature request (only once per session)
4. View comprehensive analytics:
   - **Overview Tab**: Total records, active keys, access statistics
   - **Keys Tab**: All rewrap keys with expiration status
   - **Logs Tab**: Complete access history with filters
   - **Analytics Tab**: Charts for time-series data and error distribution

### Database Management

```bash
# View all data in Prisma Studio
cd db && bunx prisma studio

# Check rewrap keys count
docker exec health-dapp-postgres psql -U postgres -d health_dapp \
  -c "SELECT COUNT(*) FROM rewrap_keys;"

# View recent access logs
docker exec health-dapp-postgres psql -U postgres -d health_dapp \
  -c "SELECT * FROM access_logs ORDER BY \"accessedAt\" DESC LIMIT 10;"
```

## Security Features

### Cryptographic Guarantees
- **End-to-End Encryption**: AES-256-GCM ensures only recipients can decrypt records
- **Sealed Box Cryptography**: NaCl crypto_box_seal provides anonymous sender encryption
- **Ed25519 Signatures**: 256-bit elliptic curve signatures prevent tampering
- **Creator Authentication**: Signature verification ensures only creators can manage keys
- **Replay Protection**: 5-minute timestamp window with nonce tracking prevents reuse attacks
- **Comprehensive Audit Trail**: All decrypt attempts logged with IP, User-Agent, and timestamps

### Admin Authentication Security
- **Wallet-Based Access Control**: Admin privileges tied to specific Solana public keys
- **Single Sign-On Per Session**: One signature authenticates all admin API requests
- **Rate Limiting**: 5 failed attempts trigger 30-minute IP blocks
- **Nonce-Based Replay Protection**: Each authentication token is single-use
- **Audit Logging**: All authentication attempts tracked with success/failure reasons
- **Time-Bounded Tokens**: 5-minute validity window for admin auth tokens

### Attack Surface Mitigation
- **Content Integrity**: IPFS CID verification ensures data hasn't been modified
- **Access Control**: Cryptographic signature verification on all sensitive operations
- **Key Storage Security**: Database stores only encrypted symmetric keys
- **Ephemeral Key Exchange**: Temporary keypairs prevent private key exposure
- **IP-Based Rate Limiting**: Prevents brute force and DDoS attacks
- **Error Message Sanitization**: No sensitive information leaked in error responses

## API Reference

### POST `/api/rewrap/request`
Request decryption of a health record using ephemeral key exchange.

### PUT `/api/rewrap/request`
Store encrypted symmetric keys for recipients (creator only).

### GET `/api/admin/keys`
Retrieve all rewrap keys (admin authentication required).

### GET `/api/admin/logs`
Retrieve access logs with filtering capabilities (admin only).

### GET `/api/admin/stats`
Get system statistics including total records, active keys, and access metrics (admin only).

### GET `/api/admin/analytics`
Get detailed analytics including time-series data, hourly patterns, and error distribution (admin only).

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep health-dapp-postgres

# Restart database
docker restart health-dapp-postgres

# Check database logs
docker logs health-dapp-postgres
```

### Prisma Client Errors
```bash
# Regenerate Prisma Client
cd db && bunx prisma generate

# Reset database (WARNING: deletes all data)
cd db && bunx prisma migrate reset --force
```

### IPFS Connection Failed
The application automatically falls back to public IPFS gateways (ipfs.io) if local daemon is unavailable. For better performance, run a local IPFS node:
```bash
ipfs daemon
```

### Wallet Connection Issues
- Ensure you're using a Solana-compatible wallet (Phantom, Solflare)
- Check that your wallet is connected to the correct network (devnet/localhost)
- Clear browser cache and reconnect wallet

### Admin Access Denied
- Verify your wallet public key matches `ADMIN_PUBKEYS` in `.env`
- Restart dev server after changing environment variables
- Check browser console for detailed error messages

## Development

### Project Structure
```
health-dapp/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # React components
│   └── lib/             # Utilities (crypto, auth, SSI)
├── db/
│   ├── prisma/          # Database schema and migrations
│   └── src/             # Prisma client
└── public/              # Static assets
```

### Building for Production
```bash
bun run build
bun run start
```

## License

MIT License - See LICENSE file for details.

## Support

- Issues: [GitHub Issues](https://github.com/Aayx2hOG/Decentralized-health-record-app/issues)
- Repository: [Decentralized-health-record-app](https://github.com/Aayx2hOG/Decentralized-health-record-app)