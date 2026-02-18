'use client'

import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { decryptPayloadAESGCM } from '../../lib/crypto'
import { verifyRecordSignature } from '../../lib/verify-signature'
import bs58 from 'bs58'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { FileCheck, Shield, Lock, CheckCircle, AlertCircle, Loader2, Download, FileImage, FileText } from 'lucide-react'

function fromBase64(s: string) {
  if (typeof Buffer !== 'undefined') return Buffer.from(s, 'base64')
  const binary = atob(s)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function detectFileType(bytes: Uint8Array): {
  isBinary: boolean
  mimeType: string
  extension: string
  displayType: string
} {
  const header = Array.from(bytes.slice(0, 12))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  if (header.startsWith('89504e47')) {
    return { isBinary: true, mimeType: 'image/png', extension: 'png', displayType: 'PNG Image' }
  }
  if (header.startsWith('ffd8ff')) {
    return { isBinary: true, mimeType: 'image/jpeg', extension: 'jpg', displayType: 'JPEG Image' }
  }
  if (header.startsWith('474946')) {
    return { isBinary: true, mimeType: 'image/gif', extension: 'gif', displayType: 'GIF Image' }
  }
  if (header.startsWith('255044462d')) {
    return { isBinary: true, mimeType: 'application/pdf', extension: 'pdf', displayType: 'PDF Document' }
  }
  if (header.substring(0, 8) === '52494646' && header.substring(16, 24) === '57454250') {
    return { isBinary: true, mimeType: 'image/webp', extension: 'webp', displayType: 'WebP Image' }
  }
  if (header.startsWith('424d')) {
    return { isBinary: true, mimeType: 'image/bmp', extension: 'bmp', displayType: 'BMP Image' }
  }
  if (header.startsWith('49492a00') || header.startsWith('4d4d002a')) {
    return { isBinary: true, mimeType: 'image/tiff', extension: 'tiff', displayType: 'TIFF Image' }
  }
  if (header.substring(8, 16) === '66747970') {
    return { isBinary: true, mimeType: 'video/mp4', extension: 'mp4', displayType: 'MP4 Video' }
  }
  if (header.startsWith('504b0304') || header.startsWith('504b0506') || header.startsWith('504b0708')) {
    return { isBinary: true, mimeType: 'application/zip', extension: 'zip', displayType: 'ZIP Archive' }
  }
  if (header.startsWith('504b0304')) {
    return {
      isBinary: true,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: 'docx',
      displayType: 'Word Document',
    }
  }

  let printableCount = 0
  const sampleSize = Math.min(bytes.length, 1000)
  for (let i = 0; i < sampleSize; i++) {
    const byte = bytes[i]
    if ((byte >= 32 && byte <= 126) || byte === 9 || byte === 10 || byte === 13) {
      printableCount++
    }
  }

  const printableRatio = printableCount / sampleSize
  if (printableRatio > 0.85) {
    return { isBinary: false, mimeType: 'text/plain', extension: 'txt', displayType: 'Text' }
  }

  return { isBinary: true, mimeType: 'application/octet-stream', extension: 'bin', displayType: 'Binary File' }
}

export default function VerifyPage() {
  const wallet = useWallet()
  const [jsonFile, setJsonFile] = useState<any>(null)
  const [consentCid, setConsentCid] = useState<string>('')
  const [decrypted, setDecrypted] = useState<string>('')
  const [decryptedBlob, setDecryptedBlob] = useState<{ data: Blob; type: string; name: string } | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [renderKey, setRenderKey] = useState(0)
  const [signatureStatus, setSignatureStatus] = useState<{ valid: boolean; signer?: string; error?: string } | null>(
    null,
  )

  useEffect(() => {
    const savedConsentCid = localStorage.getItem('consentCid')
    if (savedConsentCid) {
      setConsentCid(savedConsentCid)
    }
  }, [])

  const handleConsentCidChange = (value: string) => {
    setConsentCid(value)
    if (value) {
      localStorage.setItem('consentCid', value)
    } else {
      localStorage.removeItem('consentCid')
    }
  }

  const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const json = JSON.parse(text)
      setJsonFile(json)
      setError('')
      setDecrypted('')
      setDecryptedBlob(null)

      const verification = verifyRecordSignature(json)
      setSignatureStatus(verification)

      if (!verification.valid) {
        setError(`Signature verification failed: ${verification.error}`)
      }
    } catch (err: any) {
      setError('Invalid JSON file: ' + err.message)
      setSignatureStatus(null)
    }
  }

  const handleDecrypt = async () => {
    setError('')
    setDecrypted('')
    setDecryptedBlob(null)
    setLoading(true)

    try {
      if (!wallet.connected) {
        throw new Error('Wallet is not connected. Please connect your wallet using the button in the header.')
      }
      if (!wallet.publicKey) throw new Error('Connect your wallet first')
      if (!wallet.signMessage) {
        throw new Error(
          'Your wallet does not support message signing. Please use a compatible wallet like Phantom or Solflare.',
        )
      }
      if (!jsonFile?.cid) throw new Error('Load a signed record JSON first')

      const recipientPub = wallet.publicKey.toBase58()

      const sodium = require('libsodium-wrappers')
      await sodium.ready
      const kp = sodium.crypto_sign_keypair()
      const ephemeralPub = kp.publicKey
      const ephemeralSec = kp.privateKey

      const ephemeralPubB58 = bs58.encode(ephemeralPub)

      const timestamp = new Date().toISOString()
      const message = JSON.stringify({ ephemeralPub: ephemeralPubB58, timestamp })

      let sig: Uint8Array
      try {
        sig = await wallet.signMessage(new TextEncoder().encode(message))
      } catch (signError: any) {
        console.error('Signature error:', signError)
        throw new Error(
          `Failed to sign message: ${signError.message || 'User rejected the signature request or wallet error occurred'}`,
        )
      }

      const sigB64 =
        typeof Buffer !== 'undefined' ? Buffer.from(sig).toString('base64') : btoa(String.fromCharCode(...sig))

      let rewrapResp
      try {
        rewrapResp = await fetch('/api/rewrap/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recordCid: jsonFile.cid,
            recipientPub,
            ephemeralPub: ephemeralPubB58,
            signedRequest: sigB64,
            timestamp,
            consentCid: consentCid,
          }),
        })
      } catch (fetchError: any) {
        console.error('[Verify] Fetch error:', fetchError)
        throw new Error(`Network error when requesting rewrap key: ${fetchError.message}. Is the server running?`)
      }

      if (!rewrapResp.ok) {
        let errText
        try {
          const errJson = await rewrapResp.json()
          errText = errJson.error || JSON.stringify(errJson)
        } catch {
          errText = await rewrapResp.text()
        }
        console.error('[Verify] Rewrap API error:', { status: rewrapResp.status, error: errText })
        throw new Error('Rewrap failed: ' + errText)
      }

      const { rewrappedKey } = await rewrapResp.json()
      const rewrappedBytes = fromBase64(rewrappedKey)
      const ephemeralCurveSec = sodium.crypto_sign_ed25519_sk_to_curve25519(ephemeralSec)
      const ephemeralCurvePub = sodium.crypto_sign_ed25519_pk_to_curve25519(ephemeralPub)
      const opened = sodium.crypto_box_seal_open(rewrappedBytes, ephemeralCurvePub, ephemeralCurveSec)
      const symKey = new Uint8Array(opened)

      let payloadResp
      const gateways = [
        `http://127.0.0.1:8080/ipfs/${jsonFile.cid}`,
        `https://ipfs.io/ipfs/${jsonFile.cid}`,
        `https://cloudflare-ipfs.com/ipfs/${jsonFile.cid}`,
        `https://dweb.link/ipfs/${jsonFile.cid}`,
      ]

      let lastError
      for (const gateway of gateways) {
        try {
          payloadResp = await fetch(gateway)
          if (payloadResp.ok) {
            break
          }
        } catch (e: any) {
          lastError = e
        }
      }

      if (!payloadResp || !payloadResp.ok) {
        throw new Error(
          'Failed to fetch payload from IPFS via any gateway. Error: ' + (lastError?.message || 'Unknown'),
        )
      }

      const payloadTxt = await payloadResp.text()
      const payload = JSON.parse(payloadTxt)

      const plainBuf = await decryptPayloadAESGCM(payload, symKey)

      const uint8Array = plainBuf instanceof Uint8Array ? plainBuf : new Uint8Array(plainBuf)
      const fileType = detectFileType(uint8Array)

      if (fileType.isBinary) {
        const arrayBuffer = new ArrayBuffer(uint8Array.length)
        const view = new Uint8Array(arrayBuffer)
        view.set(uint8Array)
        const blob = new Blob([arrayBuffer], { type: fileType.mimeType })
        const fileName = jsonFile.title
          ? `${jsonFile.title}.${fileType.extension}`
          : `decrypted_file.${fileType.extension}`
        setDecryptedBlob({ data: blob, type: fileType.mimeType, name: fileName })
        setDecrypted('')
      } else {
        const plainStr =
          typeof Buffer !== 'undefined' ? Buffer.from(plainBuf).toString('utf8') : new TextDecoder().decode(plainBuf)

        if (!plainStr || plainStr.length === 0) {
          setDecrypted('(No payload data - record created for signature verification only)')
        } else {
          setDecrypted(plainStr)
        }
        setDecryptedBlob(null)
      }

      setRenderKey((prev) => prev + 1)
    } catch (err: any) {
      console.error('Decryption error:', err)
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Verify & Decrypt Health Record</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Securely decrypt encrypted health records using your wallet signature - no private key exposure required
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Signature Verification</CardTitle>
              <CardDescription className="text-xs">
                Cryptographically verify record authenticity before decryption
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Wallet Signature</CardTitle>
              <CardDescription className="text-xs">
                Decrypt using your connected wallet without exposing private keys
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Zero-Knowledge</CardTitle>
              <CardDescription className="text-xs">Your private keys never leave your wallet</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                1
              </Badge>
              <CardTitle>Load Signed Record</CardTitle>
            </div>
            <CardDescription>Select the JSON file exported from record creation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="recordFile">Record File</Label>
              <input
                id="recordFile"
                type="file"
                accept=".json"
                onChange={handleFileLoad}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                                         ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
                                         placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                                         focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed 
                                         disabled:opacity-50 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {jsonFile && (
          <>
            {signatureStatus && (
              <Card
                className={`border-2 ${signatureStatus.valid ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-destructive bg-destructive/5'}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {signatureStatus.valid ? (
                      <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3
                        className={`font-semibold mb-1 ${signatureStatus.valid ? 'text-green-900 dark:text-green-300' : 'text-destructive'}`}
                      >
                        {signatureStatus.valid ? 'Signature Valid' : 'Signature Invalid'}
                      </h3>
                      <p
                        className={`text-sm ${signatureStatus.valid ? 'text-green-700 dark:text-green-400' : 'text-destructive/90'}`}
                      >
                        {signatureStatus.valid
                          ? `This record was authentically signed by ${signatureStatus.signer?.substring(0, 8)}...${signatureStatus.signer?.substring(signatureStatus.signer.length - 6)}`
                          : signatureStatus.error}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Record Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {jsonFile.title && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Title</Label>
                    <p className="text-sm font-medium bg-background px-3 py-2 rounded border mt-1">{jsonFile.title}</p>
                  </div>
                )}
                {jsonFile.description && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Description</Label>
                    <p className="text-sm bg-background px-3 py-2 rounded border mt-1 whitespace-pre-wrap">
                      {jsonFile.description}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-xs text-muted-foreground">Record CID</Label>
                  <code className="block text-sm font-mono bg-background px-3 py-2 rounded border mt-1 break-all">
                    {jsonFile.cid}
                  </code>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Signer</Label>
                  <code className="block text-sm font-mono bg-background px-3 py-2 rounded border mt-1 break-all">
                    {jsonFile.signer || jsonFile.signerDid}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    2
                  </Badge>
                  <CardTitle>Decrypt with Wallet</CardTitle>
                </div>
                <CardDescription>
                  Click below to securely decrypt the record using your connected wallet signature
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="consentCid" className="text-sm font-medium">
                    Consent Credential CID <span className="text-muted-foreground">(only if you're a recipient)</span>
                  </Label>
                  <Input
                    id="consentCid"
                    type="text"
                    value={consentCid}
                    onChange={(e) => handleConsentCidChange(e.target.value)}
                    placeholder="Enter consent credential CID..."
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    {consentCid
                      ? '✓ Consent CID saved and will be used for decryption.'
                      : '💡 Only required for recipients without direct access. Record creators can decrypt without consent CID.'}
                  </p>
                </div>

                {!wallet.connected && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please connect your wallet using the button in the top-right corner
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleDecrypt}
                  disabled={loading || !wallet.connected}
                  className="w-full gap-2"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Decrypting...</span>
                    </>
                  ) : wallet.connected ? (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Decrypt with Wallet Signature</span>
                    </>
                  ) : (
                    <span>Connect Wallet First</span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Decryption Failed:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {(decrypted || decryptedBlob) && (
          <Card key={renderKey} className="border-2 border-green-500 bg-green-50/50 dark:bg-green-950/20 shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-8 w-8 text-green-600 shrink-0" />
                <div>
                  <CardTitle className="text-green-900 dark:text-green-300">Decryption Successful</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    The health record has been securely decrypted using your wallet signature
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {decryptedBlob ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Decrypted File
                    </Label>
                    <Badge variant="secondary">{decryptedBlob.type.split('/')[1]?.toUpperCase() || 'FILE'}</Badge>
                  </div>

                  {decryptedBlob.type.startsWith('image/') && (
                    <div className="bg-background border rounded-lg p-4 shadow-inner">
                      <img
                        src={URL.createObjectURL(decryptedBlob.data)}
                        alt="Decrypted image"
                        className="max-w-full h-auto rounded"
                        style={{ maxHeight: '600px' }}
                      />
                    </div>
                  )}

                  {decryptedBlob.type === 'application/pdf' && (
                    <div className="bg-background border rounded-lg p-4 shadow-inner">
                      <embed
                        src={URL.createObjectURL(decryptedBlob.data)}
                        type="application/pdf"
                        className="w-full"
                        style={{ height: '600px' }}
                      />
                    </div>
                  )}

                  {decryptedBlob.type.startsWith('video/') && (
                    <div className="bg-background border rounded-lg p-4 shadow-inner">
                      <video
                        src={URL.createObjectURL(decryptedBlob.data)}
                        controls
                        className="max-w-full h-auto rounded"
                        style={{ maxHeight: '600px' }}
                      />
                    </div>
                  )}

                  {!decryptedBlob.type.startsWith('image/') &&
                    !decryptedBlob.type.startsWith('video/') &&
                    decryptedBlob.type !== 'application/pdf' && (
                      <div className="bg-background border rounded-lg p-6 text-center">
                        <FileImage className="h-16 w-16 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          File type: <strong>{decryptedBlob.type}</strong>
                        </p>
                        <p className="text-xs text-muted-foreground">This file cannot be previewed in the browser</p>
                      </div>
                    )}

                  <Button
                    onClick={() => {
                      const url = URL.createObjectURL(decryptedBlob.data)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = decryptedBlob.name
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Download className="h-5 w-5" />
                    Download {decryptedBlob.name}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Decrypted Health Record
                    </Label>
                    <Badge variant="secondary">
                      <FileText className="h-3 w-3 mr-1" />
                      DOCUMENT
                    </Badge>
                  </div>
                  {/* Styled Document Container - PDF-like appearance */}
                  <div className="bg-white dark:bg-gray-50 border-2 rounded-lg shadow-lg overflow-hidden">
                    {/* Document Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-6 py-4 border-b">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-primary">Medical Report Excerpt</span>
                      </div>
                      {jsonFile?.title && (
                        <p className="text-sm text-muted-foreground mt-1">{jsonFile.title}</p>
                      )}
                    </div>
                    {/* Document Content */}
                    <div className="p-6 max-h-[600px] overflow-auto">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {decrypted ? (
                          decrypted.split('\n').map((line, idx) => {
                            const trimmedLine = line.trim();
                            // Render headers
                            if (trimmedLine.startsWith('# ')) {
                              return (
                                <h1 key={idx} className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2 pb-2 border-b">
                                  {trimmedLine.slice(2)}
                                </h1>
                              );
                            }
                            if (trimmedLine.startsWith('## ')) {
                              return (
                                <h2 key={idx} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                                  {trimmedLine.slice(3)}
                                </h2>
                              );
                            }
                            if (trimmedLine.startsWith('### ')) {
                              return (
                                <h3 key={idx} className="text-base font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1">
                                  {trimmedLine.slice(4)}
                                </h3>
                              );
                            }
                            // Render list items
                            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
                              return (
                                <div key={idx} className="flex gap-2 ml-4 my-1">
                                  <span className="text-primary">•</span>
                                  <span className="text-gray-700 dark:text-gray-300">{trimmedLine.slice(2)}</span>
                                </div>
                              );
                            }
                            // Render bold text (simple **text** pattern)
                            if (trimmedLine.includes('**')) {
                              const parts = trimmedLine.split(/\*\*(.*?)\*\*/g);
                              return (
                                <p key={idx} className="text-gray-700 dark:text-gray-300 my-2 leading-relaxed">
                                  {parts.map((part, i) => 
                                    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
                                  )}
                                </p>
                              );
                            }
                            // Empty lines as spacing
                            if (!trimmedLine) {
                              return <div key={idx} className="h-2" />;
                            }
                            // Regular paragraphs
                            return (
                              <p key={idx} className="text-gray-700 dark:text-gray-300 my-2 leading-relaxed">
                                {line}
                              </p>
                            );
                          })
                        ) : (
                          <p className="text-muted-foreground italic">(waiting...)</p>
                        )}
                      </div>
                    </div>
                    {/* Document Footer */}
                    <div className="bg-gray-50 dark:bg-gray-100 px-6 py-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>AI-Generated Medical Report Excerpt</span>
                        <span>Decrypted on {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
