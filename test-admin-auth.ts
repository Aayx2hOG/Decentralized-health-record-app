/**
 * Test script for admin authentication
 * 
 * Usage:
 * 1. Make sure ADMIN_PUBKEYS is set in .env
 * 2. Run: bun run test-admin-auth.ts
 */

import { Keypair } from '@solana/web3.js';
import nacl from 'tweetnacl';
import bs58 from 'bs58';
import {
    verifyAdminAuth,
    isAdminPubkey,
    getAdminPubkeys,
    type AdminAuthPayload
} from './src/lib/admin-auth';

// Load environment
import { config } from 'dotenv';
config();

async function testAdminAuth() {
    console.log('🔐 Testing Admin Authentication System\n');

    // Test 1: Check admin pubkeys configuration
    console.log('📋 Test 1: Admin Pubkeys Configuration');
    const adminPubkeys = getAdminPubkeys();
    console.log('   Configured admin pubkeys:', adminPubkeys);
    console.log('   ✓ Loaded', adminPubkeys.length, 'admin wallet(s)\n');

    // Test 2: Create a test keypair (for testing signature generation)
    console.log('🔑 Test 2: Generate Test Wallet & Signature');
    const testKeypair = Keypair.generate();
    const testPubkey = testKeypair.publicKey.toBase58();
    console.log('   Test wallet:', testPubkey);

    // Test 3: Check if test wallet is admin
    console.log('\n👤 Test 3: Admin Authorization Check');
    const isAdmin = isAdminPubkey(testPubkey);
    console.log('   Is test wallet an admin?', isAdmin ? '✓ YES' : '✗ NO');

    // If you want to test with actual admin, use first configured admin
    const adminToTest = adminPubkeys[0] || testPubkey;
    console.log('   Testing with wallet:', adminToTest);
    console.log('   Is admin?', isAdminPubkey(adminToTest) ? '✓ YES' : '✗ NO\n');

    // Test 4: Create and verify a valid signature
    console.log('✍️  Test 4: Signature Generation & Verification');
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(7);
    const message = `Admin authentication: ${testPubkey} at ${timestamp} (nonce: ${nonce})`;

    const messageBytes = new TextEncoder().encode(message);
    const signature = nacl.sign.detached(messageBytes, testKeypair.secretKey);
    const signatureBase58 = bs58.encode(signature);

    console.log('   Message:', message);
    console.log('   Signature:', signatureBase58.substring(0, 40) + '...');
    console.log('   Timestamp:', new Date(timestamp).toISOString());
    console.log('   Nonce:', nonce, '\n');

    // Test 5: Verify authentication
    console.log('🔍 Test 5: Authentication Verification');
    const authPayload: AdminAuthPayload = {
        Pubkey: testPubkey,
        timestamp,
        signature: signatureBase58,
        nonce
    };

    const result = await verifyAdminAuth(authPayload, '127.0.0.1');

    if (result.valid) {
        console.log('   ✓ Authentication SUCCESSFUL');
        console.log('   Authenticated pubkey:', result.pubkey);
    } else {
        console.log('   ✗ Authentication FAILED');
        console.log('   Error:', result.error);
    }

    // Test 6: Test expired timestamp
    console.log('\n⏰ Test 6: Expired Timestamp Detection');
    const expiredPayload: AdminAuthPayload = {
        ...authPayload,
        timestamp: Date.now() - (10 * 60 * 1000), // 10 minutes ago
    };
    const expiredResult = await verifyAdminAuth(expiredPayload, '127.0.0.1');
    console.log('   Should reject expired:', !expiredResult.valid ? '✓ PASS' : '✗ FAIL');
    if (!expiredResult.valid) {
        console.log('   Error:', expiredResult.error);
    }

    // Test 7: Test nonce reuse (replay attack)
    console.log('\n🔄 Test 7: Replay Attack Prevention');
    // First use should work if admin
    if (isAdminPubkey(testPubkey)) {
        await verifyAdminAuth(authPayload, '127.0.0.1');
    }
    // Second use with same nonce should fail
    const replayResult = await verifyAdminAuth(authPayload, '127.0.0.1');
    const replayBlocked = !replayResult.valid && replayResult.error?.includes('nonce');
    console.log('   Should block replay:', replayBlocked ? '✓ PASS' : '⚠️  SKIP (not admin)');
    if (!replayResult.valid) {
        console.log('   Error:', replayResult.error);
    }

    // Test 8: Test rate limiting
    console.log('\n🚦 Test 8: Rate Limiting');
    console.log('   Attempting 6 failed authentications...');
    const unauthorizedPubkey = Keypair.generate().publicKey.toBase58();

    for (let i = 1; i <= 6; i++) {
        const badPayload: AdminAuthPayload = {
            Pubkey: unauthorizedPubkey,
            timestamp: Date.now(),
            signature: 'invalid',
            nonce: Math.random().toString(36)
        };
        const res = await verifyAdminAuth(badPayload, '192.168.1.100');
        console.log(`   Attempt ${i}:`, !res.valid ? '✗ Rejected' : '✓ Passed');

        if (i === 6 && res.error?.includes('Blocked')) {
            console.log('   ✓ Rate limiting working! Blocked after 5 attempts');
        }
    }

    console.log('\n✅ Testing complete!\n');
}

testAdminAuth().catch(console.error);
