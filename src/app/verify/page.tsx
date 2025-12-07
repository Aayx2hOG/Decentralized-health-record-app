'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { decryptPayloadAESGCM } from '../../lib/crypto';
import { verifyRecordSignature } from '../../lib/verify-signature';
import bs58 from "bs58";

function fromBase64(s: string) {
    if (typeof Buffer !== 'undefined') return Buffer.from(s, 'base64');
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

export default function VerifyPage() {
    const wallet = useWallet();
    const [jsonFile, setJsonFile] = useState<any>(null);
    const [decrypted, setDecrypted] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [renderKey, setRenderKey] = useState(0); // Force re-render
    const [signatureStatus, setSignatureStatus] = useState<{ valid: boolean; signer?: string; error?: string } | null>(null);

    const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const json = JSON.parse(text);
            setJsonFile(json);
            setError('');
            setDecrypted('');

            const verification = verifyRecordSignature(json);
            setSignatureStatus(verification);

            if (!verification.valid) {
                setError(`Signature verification failed: ${verification.error}`);
            }
        } catch (err: any) {
            setError('Invalid JSON file: ' + err.message);
            setSignatureStatus(null);
        }
    };

    const handleDecrypt = async () => {
        setError('');
        setDecrypted('');
        setLoading(true);

        try {
            if (!wallet.publicKey) throw new Error('Connect your wallet first');
            if (!wallet.signMessage) throw new Error('Wallet does not support signing');
            if (!jsonFile?.cid) throw new Error('Load a signed record JSON first');

            const recipientPub = wallet.publicKey.toBase58();

            const sodium = require('libsodium-wrappers');
            await sodium.ready;
            const kp = sodium.crypto_sign_keypair();
            const ephemeralPub = kp.publicKey;
            const ephemeralSec = kp.privateKey;

            const ephemeralPubB58 = bs58.encode(ephemeralPub);

            const timestamp = new Date().toISOString();
            const message = JSON.stringify({ ephemeralPub: ephemeralPubB58, timestamp });
            const sig = await wallet.signMessage(new TextEncoder().encode(message));
            const sigB64 = typeof Buffer !== 'undefined'
                ? Buffer.from(sig).toString('base64')
                : btoa(String.fromCharCode(...sig));

            const rewrapResp = await fetch('/api/rewrap/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    recordCid: jsonFile.cid,
                    recipientPub,
                    ephemeralPub: ephemeralPubB58,
                    signedRequest: sigB64,
                    timestamp
                })
            });

            if (!rewrapResp.ok) {
                const errText = await rewrapResp.text();
                throw new Error('Rewrap failed: ' + errText);
            }

            const { rewrappedKey } = await rewrapResp.json();
            const rewrappedBytes = fromBase64(rewrappedKey);
            // Unseal rewrapped key with ephemeral keypair
            const ephemeralCurveSec = sodium.crypto_sign_ed25519_sk_to_curve25519(ephemeralSec);
            const ephemeralCurvePub = sodium.crypto_sign_ed25519_pk_to_curve25519(ephemeralPub);
            const opened = sodium.crypto_box_seal_open(rewrappedBytes, ephemeralCurvePub, ephemeralCurveSec);
            const symKey = new Uint8Array(opened);

            let payloadResp = await fetch(`http://localhost:8080/ipfs/${jsonFile.cid}`);
            if (!payloadResp.ok) {
                payloadResp = await fetch(`https://ipfs.io/ipfs/${jsonFile.cid}`);
            }
            if (!payloadResp.ok) throw new Error('Failed to fetch payload from IPFS');

            const payloadTxt = await payloadResp.text();
            const payload = JSON.parse(payloadTxt);

            const plainBuf = await decryptPayloadAESGCM(payload, symKey);
            const plainStr = typeof Buffer !== 'undefined'
                ? Buffer.from(plainBuf).toString('utf8')
                : new TextDecoder().decode(plainBuf);

            console.log('Decryption successful!');
            console.log('plainBuf type:', typeof plainBuf, 'length:', plainBuf?.length);
            console.log('plainStr type:', typeof plainStr, 'length:', plainStr?.length);
            console.log('plainStr value:', plainStr);

            if (!plainStr || plainStr.length === 0) {
                setDecrypted('(No payload data - record created for signature verification only)');
                console.log('Empty payload - this is a signature-only verification');
            } else {
                setDecrypted(plainStr);
            }

            setRenderKey(prev => prev + 1);

            const resultMsg = plainStr && plainStr.length > 0
                ? `Data decrypted: ${plainStr.substring(0, 50)}...`
                : 'Verification successful! (No payload data attached)';
            alert(resultMsg);
        } catch (err: any) {
            console.error('Decryption error:', err);
            setError(err.message || String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Verify & Decrypt Health Record</h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Securely decrypt encrypted health records using your wallet signature - no private key exposure required.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="text-2xl">📄</span>
                        Step 1: Load Signed Record
                    </h2>
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Select JSON file exported from record creation
                        </label>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileLoad}
                            className="block w-full text-sm border dark:border-gray-600 rounded-lg p-3 
                                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                                     file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                                     hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200
                                     cursor-pointer bg-white dark:bg-gray-900"
                        />
                    </div>
                </div>

                {jsonFile && (
                    <>
                        {signatureStatus && (
                            <div className={`rounded-xl border p-5 shadow-sm ${signatureStatus.valid
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                                }`}>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{signatureStatus.valid ? '✅' : '❌'}</span>
                                    <div className="flex-1">
                                        <h3 className={`font-semibold mb-1 ${signatureStatus.valid
                                            ? 'text-green-900 dark:text-green-300'
                                            : 'text-red-900 dark:text-red-300'
                                            }`}>
                                            {signatureStatus.valid ? 'Signature Valid' : 'Signature Invalid'}
                                        </h3>
                                        <p className={`text-sm ${signatureStatus.valid
                                            ? 'text-green-700 dark:text-green-400'
                                            : 'text-red-700 dark:text-red-400'
                                            }`}>
                                            {signatureStatus.valid
                                                ? `This record was authentically signed by ${signatureStatus.signer?.substring(0, 8)}...${signatureStatus.signer?.substring(signatureStatus.signer.length - 6)}`
                                                : signatureStatus.error
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                                      rounded-xl border border-blue-200 dark:border-blue-800 p-6 shadow-sm">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                                <span className="text-xl">ℹ️</span>
                                Record Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex gap-2">
                                    <span className="font-medium text-blue-800 dark:text-blue-300 min-w-24">Record CID:</span>
                                    <code className="text-blue-600 dark:text-blue-400 font-mono text-xs break-all">{jsonFile.cid}</code>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-medium text-blue-800 dark:text-blue-300 min-w-24">Signer:</span>
                                    <code className="text-blue-600 dark:text-blue-400 font-mono text-xs">{jsonFile.signer || jsonFile.signerDid}</code>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span className="text-2xl">🔐</span>
                                Step 2: Decrypt with Wallet
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                Click below to securely decrypt the record using your connected wallet.
                                You'll be prompted to sign a message to prove your identity.
                            </p>

                            {!wallet.connected && (
                                <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                                    <p className="text-sm text-orange-800 dark:text-orange-300 flex items-center gap-2">
                                        Please connect your wallet using the button in the top-right corner
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleDecrypt}
                                disabled={loading || !wallet.connected}
                                className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 
                                         disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed
                                         text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200
                                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                         flex items-center justify-center gap-3"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Decrypting...</span>
                                    </>
                                ) : wallet.connected ? (
                                    <>
                                        <span>Decrypt with Wallet Signature</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Connect Wallet First</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-5 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div>
                                <h4 className="font-semibold text-red-900 dark:text-red-300 mb-1">Decryption Failed</h4>
                                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div key={renderKey} className={`${decrypted ? 'block' : 'hidden'} 
                                                  bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 
                                                  border-l-4 border-green-500 rounded-xl p-6 shadow-lg`}>
                    <div className="flex items-start gap-3 mb-4">
                        <span className="text-3xl">✅</span>
                        <div>
                            <h3 className="font-bold text-green-900 dark:text-green-300 text-xl">Decryption Successful</h3>
                            <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                                The health record has been securely decrypted using your wallet signature
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-5 shadow-inner">
                        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                            Decrypted Health Record Data
                        </h4>
                        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed overflow-auto max-h-96">
                            {decrypted || '(waiting...)'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
