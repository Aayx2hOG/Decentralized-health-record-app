'use client'

import CreateRecord from '../../components/create_record'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Shield, Upload } from 'lucide-react'

export default function Page() {
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Create Health Record</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Encrypt and store your health records on IPFS with end-to-end encryption and cryptographic signatures
                    </p>
                </div>

                
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Encrypted</CardTitle>
                            <CardDescription className="text-xs">
                                AES-256-GCM encryption ensures your data stays private
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">IPFS Storage</CardTitle>
                            <CardDescription className="text-xs">
                                Decentralized, immutable storage with content addressing
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-2">
                        <CardHeader className="pb-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                                <Upload className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-base">Signed</CardTitle>
                            <CardDescription className="text-xs">
                                Cryptographic signatures verify authenticity and integrity
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                
                <Card className="border-2 shadow-lg">
                    <CardHeader>
                        <CardTitle>Record Details</CardTitle>
                        <CardDescription>
                            Upload your health records and specify recipients for secure sharing
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateRecord />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
