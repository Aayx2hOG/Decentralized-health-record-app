# Health Records DApp

A decentralized health records management system built on Solana with end-to-end encryption, cryptographic signatures, and IPFS storage.

## Features

### Implemented
- **End-to-End Encryption**: AES-GCM encryption for health records
- **Decentralized Storage**: IPFS integration for immutable data storage
- **Multi-Recipient Access**: Sealed box encryption for multiple recipients
- **Cryptographic Signatures**: Ed25519 signatures for record authenticity
- **Persistent Key Storage**: PostgreSQL database with Prisma ORM
- **Creator Verification**: Only record creators can manage access keys
- **Access Audit Trail**: Complete logs of who accessed what and when
- **Key Expiration**: 30-day automatic key expiration
- **Modern UI**: React + TailwindCSS + shadcn/ui components
- **Solana Wallet Integration**: Connect with Phantom, Solflare, and other wallets

### Rewrap API
- **Proxy Re-encryption**: Recipients can decrypt without exposing private keys
- **Access Control**: Signature-based authentication for all operations
- **Rate Limiting Ready**: Structured for production deployment
- **Database Backed**: All keys persist across server restarts

## Architecture

### Tech Stack
- **Frontend**: Next.js 15, React, TypeScript, TailwindCSS
- **Blockchain**: Solana (Ed25519 signatures)
- **Storage**: IPFS for encrypted payloads
- **Database**: PostgreSQL with Prisma 7
- **Crypto**: libsodium-wrappers (NaCl sealed boxes, Ed25519)
- **Wallet**: @solana/wallet-adapter

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
- Node.js 18+ or Bun
- PostgreSQL 14+
- IPFS daemon (or use remote gateway)
- Solana wallet (Phantom, Solflare, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/health-dapp.git
cd health-dapp
```

2. **Install dependencies**
```bash
bun install
# or
npm install
```

3. **Set up PostgreSQL database**
```bash
# Start PostgreSQL (example with Docker)
docker run --name health-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres:14

# Create database
docker exec -it health-db psql -U postgres -c "CREATE DATABASE health_dapp;"
```

4. **Configure environment variables**
```bash
# Create db/.env
cd db
cat > .env << EOF
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/health_dapp"
EOF
cd ..
```

5. **Install Prisma adapter**
```bash
cd db
bun add @prisma/adapter-pg pg
cd ..
```

6. **Run database migrations**
```bash
cd db
bunx prisma generate
bunx prisma migrate dev --name init
cd ..
```

7. **Start IPFS daemon** (optional - app will use public gateways if not running)
```bash
ipfs daemon
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
2. Fill in record details:
   - Title (e.g., "Lab Results - Jan 2025")
   - Payload (text or file upload)
   - Recipients (comma-separated Solana public keys)
3. Check "Allow recipients to request access" (enables rewrap API)
4. Click "Encrypt & Upload to IPFS"
5. Connect your Solana wallet when prompted
6. Click "Sign & Download Record" to save `.signed.json` file

### Verifying and Decrypting a Record

1. Navigate to `/verify`
2. Upload `.signed.json` file
3. Verify signature (green checkmark indicates valid signature)
4. Connect wallet (must be one of the recipients)
5. Click "Decrypt with Wallet"
6. View decrypted health record

### Monitoring Access Logs

```bash
# Open Prisma Studio
cd db
bunx prisma studio --browser none
```
Then visit `http://localhost:5555` to view:
- `rewrap_keys` table: All stored encryption keys
- `access_logs` table: Complete audit trail

## Security Features

### Cryptographic Guarantees
- **End-to-End Encryption**: Only recipients can decrypt records
- **Sealed Boxes**: NaCl crypto_box_seal (anonymous sender)
- **Signature Verification**: Ed25519 signatures prevent tampering
- **Creator Authentication**: Only creators can store/update keys
- **Replay Protection**: 5-minute timestamp window for requests
- **Access Audit**: All decrypt attempts logged (IP, User-Agent, timestamp)

### Attack Prevention
- **Man-in-the-Middle**: IPFS CID verification ensures data integrity
- **Unauthorized Access**: Signature verification on all operations
- **Key Storage Attacks**: Only creator can store keys (signature required)
- **Replay Attacks**: Timestamp validation prevents old request reuse
- **Data Tampering**: Cryptographic signatures detect modifications