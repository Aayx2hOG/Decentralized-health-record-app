'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileCheck2, Loader2, Sparkles, Download, Eye } from 'lucide-react';

interface DocumentSection {
    id: string;
    name: string;
    category: string;
    content: string;
    summary: string;
    confidence: number;
}

interface ParsedDocument {
    documentType: string;
    sections: DocumentSection[];
    metadata: {
        patientName?: string;
        date?: string;
        labName?: string;
    };
}

interface SelectiveShareProps {
    onPartialDocumentReady: (pdfBase64: string, selectedSections: DocumentSection[]) => void;
}

export default function SelectiveShare({ onPartialDocumentReady }: SelectiveShareProps) {
    const [file, setFile] = useState<File | null>(null);
    const [parsing, setParsing] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [parsedDoc, setParsedDoc] = useState<ParsedDocument | null>(null);
    const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());
    const [previewContent, setPreviewContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setParsedDoc(null);
            setSelectedSections(new Set());
            setPreviewContent(null);
            setError(null);
        }
    };

    const parseDocument = async () => {
        if (!file) return;

        setParsing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/ai/parse-document', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to parse document');
            }

            const result: ParsedDocument = await res.json();

            if (result.sections.length === 0) {
                throw new Error('No sections found in the document. Please try a different file.');
            }

            setParsedDoc(result);
            // Auto-select all sections initially
            setSelectedSections(new Set(result.sections.map(s => s.id)));
        } catch (err: any) {
            setError(err.message || 'Failed to parse document');
        } finally {
            setParsing(false);
        }
    };

    const toggleSection = (sectionId: string) => {
        setSelectedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
        setPreviewContent(null); // Clear preview when selection changes
    };

    const generatePreview = async () => {
        if (!parsedDoc || selectedSections.size === 0) return;

        setGenerating(true);
        setError(null);

        try {
            const sectionsToInclude = parsedDoc.sections.filter(s => selectedSections.has(s.id));

            const res = await fetch('/api/ai/generate-partial', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selectedSections: sectionsToInclude,
                    metadata: parsedDoc.metadata,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to generate partial document');
            }

            const { pdfBase64 } = await res.json();
            setPreviewContent(pdfBase64);
        } catch (err: any) {
            setError(err.message || 'Failed to generate preview');
        } finally {
            setGenerating(false);
        }
    };

    const handleUsePartialDocument = () => {
        if (!previewContent || !parsedDoc) return;
        const sectionsToInclude = parsedDoc.sections.filter(s => selectedSections.has(s.id));
        onPartialDocumentReady(previewContent, sectionsToInclude);
    };

    const getCategoryColor = (category: string): string => {
        const colors: Record<string, string> = {
            'Vitals': 'bg-green-500/10 text-green-600 border-green-500/30',
            'Lab Work': 'bg-blue-500/10 text-blue-600 border-blue-500/30',
            'Imaging': 'bg-purple-500/10 text-purple-600 border-purple-500/30',
            'Diagnosis': 'bg-orange-500/10 text-orange-600 border-orange-500/30',
            'Prescription': 'bg-pink-500/10 text-pink-600 border-pink-500/30',
        };
        return colors[category] || 'bg-gray-500/10 text-gray-600 border-gray-500/30';
    };

    return (
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Smart Extraction: Selective Sharing
                </CardTitle>
                <CardDescription>
                    Upload a medical document and extract sections. Choose which parts to share.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* File Upload */}
                <div className="space-y-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.txt"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <div className="flex items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-2"
                        >
                            <Upload className="h-4 w-4" />
                            Upload Document
                        </Button>
                        {file && (
                            <Badge variant="secondary" className="gap-1">
                                <FileCheck2 className="h-3 w-3" />
                                {file.name}
                            </Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Supports PDF, PNG, JPEG, WebP, HEIC, and TXT files (max 10MB)
                    </p>
                </div>

                {/* Parse Button */}
                {file && !parsedDoc && (
                    <Button
                        onClick={parseDocument}
                        disabled={parsing}
                        className="w-full gap-2"
                    >
                        {parsing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Analyzing Document...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                Extract Sections
                            </>
                        )}
                    </Button>
                )}

                {/* Error Display */}
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Parsed Sections */}
                {parsedDoc && (
                    <div className="space-y-4">
                        {/* Document Info */}
                        <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                            <p className="font-medium">{parsedDoc.documentType}</p>
                            {parsedDoc.metadata.patientName && (
                                <p className="text-sm text-muted-foreground">
                                    Patient: {parsedDoc.metadata.patientName}
                                </p>
                            )}
                            {parsedDoc.metadata.date && (
                                <p className="text-sm text-muted-foreground">
                                    Date: {parsedDoc.metadata.date}
                                </p>
                            )}
                        </div>

                        {/* Section Selection */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-semibold">
                                    Select Sections to Share
                                </Label>
                                <span className="text-sm text-muted-foreground">
                                    {selectedSections.size} of {parsedDoc.sections.length} selected
                                </span>
                            </div>

                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                {parsedDoc.sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                                            selectedSections.has(section.id)
                                                ? 'bg-primary/5 border-primary/30'
                                                : 'bg-muted/30 border-muted hover:border-muted-foreground/30'
                                        }`}
                                        onClick={() => toggleSection(section.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                checked={selectedSections.has(section.id)}
                                                onCheckedChange={() => toggleSection(section.id)}
                                                className="mt-0.5"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-medium">{section.name}</span>
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-xs ${getCategoryColor(section.category)}`}
                                                    >
                                                        {section.category}
                                                    </Badge>
                                                    {section.confidence < 0.8 && (
                                                        <Badge variant="outline" className="text-xs text-yellow-600">
                                                            Low confidence
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {section.summary}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button
                                onClick={generatePreview}
                                disabled={selectedSections.size === 0 || generating}
                                variant="outline"
                                className="flex-1 gap-2"
                            >
                                {generating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4" />
                                        Preview Selected
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={handleUsePartialDocument}
                                disabled={!previewContent}
                                className="flex-1 gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Use This Selection
                            </Button>
                        </div>

                        {/* Preview */}
                        {previewContent && (
                            <div className="space-y-2">
                                <Label>Preview of Trimmed PDF</Label>
                                <div className="rounded-lg border overflow-hidden" style={{ height: '400px' }}>
                                    <embed
                                        src={`data:application/pdf;base64,${previewContent}`}
                                        type="application/pdf"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
