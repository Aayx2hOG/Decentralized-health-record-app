import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { ensurePdfjsPolyfills } from './pdf-polyfills';

export interface DocumentSection {
    id: string;
    name: string;
    category: string;
    content: string;
    summary: string;
    confidence: number;
}

export interface ParsedDocument {
    documentType: string;
    sections: DocumentSection[];
    metadata: {
        patientName?: string;
        date?: string;
        labName?: string;
    };
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

function sanitize(text: string): string {
    return text
        .replace(/[\u2022\u25cf\u25cb\u25a0\u25a1\u25aa\u25ab]/g, '-')
        .replace(/[\u2018\u2019\u201a]/g, "'")
        .replace(/[\u201c\u201d\u201e]/g, '"')
        .replace(/\u2013/g, '-')
        .replace(/\u2014/g, '--')
        .replace(/\u2026/g, '...')
        .replace(/\u00a0/g, ' ')
        .replace(/[^\x00-\x7f\xc0-\xff]/g, '');
}

const KNOWN_HEADERS = new Set([
    'patient information', 'patient details', 'demographics',
    'chief complaint', 'history of present illness', 'hpi',
    'past medical history', 'pmh', 'medical history',
    'medications', 'current medications', 'prescription',
    'allergies', 'known allergies',
    'family history', 'social history',
    'review of systems', 'ros',
    'physical examination', 'physical exam', 'examination',
    'vital signs', 'vitals',
    'assessment', 'diagnosis', 'impression',
    'plan', 'treatment plan', 'recommendations',
    'lab results', 'laboratory', 'laboratory results', 'test results',
    'imaging', 'radiology', 'x-ray', 'mri', 'ct scan',
    'procedures', 'surgical history',
    'follow-up', 'follow up',
    'notes', 'physician notes', 'clinical notes',
    'summary', 'discharge summary',
    'conclusion', 'results', 'findings',
    'introduction', 'abstract', 'methodology', 'methods',
    'discussion', 'references', 'appendix',
    'background', 'overview', 'objectives', 'scope',
    'table of contents', 'glossary', 'acknowledgements',
    'preface', 'foreword', 'executive summary',
]);

function isPageNumber(line: string): boolean {
    const s = line.replace(/^[-–—\s]+|[-–—\s]+$/g, '').trim();
    return (
        /^(page\s*)?\d+\s*(of|\/)\s*\d+$/i.test(s) ||
        /^\d+\s*[-–—]\s*\d+$/.test(s) ||
        /^\d{1,4}$/.test(s) ||
        /^page\s+\d+$/i.test(s) ||
        /^\[?\s*\d+\s*\]?$/.test(s)
    );
}

function isListItem(line: string): boolean {
    return /^(\d+\.\s|[IVXLC]+\.\s|[a-zA-Z]\.\s)/.test(line);
}

/**
 * Returns confidence that a line is a heading:
 * 0.95 = known header, 0.85 = pattern match, 0.7 = short title, 0 = not a heading
 */
function classifyLine(line: string): number {
    if (isPageNumber(line) || isListItem(line)) return 0;

    // "Name: John Doe", "Gender: Male" → key-value pairs, not headings
    // But "Patient Information:" (colon at end) or "Lab Results (Note: ...)" are fine
    const colonPos = line.indexOf(':');
    if (colonPos > 0 && colonPos < line.length - 1) {
        const before = line.substring(0, colonPos).trim();
        const after = line.substring(colonPos + 1).trim();
        if (after.length > 0 && after !== '-' && !before.includes('(')) return 0;
    }

    const normalized = line.toLowerCase().replace(/[:\-_]/g, '').trim();
    for (const h of KNOWN_HEADERS) {
        if (normalized === h || normalized.startsWith(h + ' ')) return 0.95;
    }

    if (line.length > 3 && line.length < 80 && line === line.toUpperCase() && /[A-Z]/.test(line)) return 0.85;
    if (line.endsWith(':') && line.length < 60 && !line.includes('  ')) return 0.85;
    if (/[:\s]+-\s*$/.test(line) && line.length < 80) return 0.85;

    const isShortTitle =
        line.length > 3 && line.length < 80 &&
        line.split(' ').length <= 10 &&
        !/\. [A-Z]/.test(line) &&
        !/^[a-z]/.test(line) &&
        !/[,;]/.test(line);
    if (isShortTitle) return 0.7;

    return 0;
}

const CATEGORY_RULES: [string[], string][] = [
    [['vital signs', 'vitals', 'physical examination', 'physical exam', 'examination'], 'Vitals'],
    [['lab results', 'laboratory', 'test results'], 'Lab Work'],
    [['imaging', 'radiology', 'x-ray', 'mri', 'ct scan'], 'Imaging'],
    [['diagnosis', 'assessment', 'impression', 'findings'], 'Diagnosis'],
    [['medications', 'prescription', 'treatment plan'], 'Prescription'],
    [['patient information', 'patient details', 'demographics'], 'Demographics'],
    [['history', 'hpi', 'pmh', 'chief complaint'], 'History'],
    [['summary', 'conclusion', 'abstract'], 'Summary'],
    [['introduction', 'background', 'overview', 'objectives'], 'Introduction'],
    [['methodology', 'methods', 'approach', 'procedure'], 'Methods'],
    [['discussion', 'analysis'], 'Discussion'],
    [['references', 'bibliography', 'appendix', 'glossary'], 'Reference'],
];

function categorize(name: string): string {
    const lower = name.toLowerCase();
    for (const [keywords, label] of CATEGORY_RULES) {
        if (keywords.some(kw => lower.includes(kw))) return label;
    }
    return 'Section';
}

function detectSections(text: string): DocumentSection[] {
    const lines = text.split('\n');
    const sections: DocumentSection[] = [];
    let current: { name: string; lines: string[]; confidence: number } | null = null;

    function flush() {
        if (current && current.lines.some(l => l.trim())) {
            const content = current.lines.join('\n').trim();
            const firstLine = content.split('\n')[0].trim();
            sections.push({
                id: generateId(),
                name: current.name,
                category: categorize(current.name),
                content,
                summary: firstLine.length <= 100 ? firstLine : firstLine.substring(0, 97) + '...',
                confidence: current.confidence,
            });
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();

        if (!trimmed) {
            if (current) current.lines.push('');
            continue;
        }
        if (isPageNumber(trimmed)) continue;

        const confidence = classifyLine(trimmed);

        // Low-confidence headings only accepted if followed by body text
        let accepted = confidence >= 0.85;
        if (!accepted && confidence > 0) {
            for (let j = i + 1; j < lines.length && j <= i + 3; j++) {
                const next = lines[j]?.trim();
                if (next) {
                    accepted = next.length > trimmed.length || next.split(' ').length > 8;
                    break;
                }
            }
        }

        if (accepted) {
            flush();
            const name = trimmed
                .replace(/[:\s]*-\s*$/, '')
                .replace(/:$/, '')
                .replace(/^[\u2022\u25cf\u25cb\u25a0\u25a1\u25aa\u25ab\u2023\u2043\u2219\u25e6*\-\u2013\u2014]+\s*/, '')
                .trim();
            current = { name, lines: [], confidence };
        } else {
            if (current) {
                current.lines.push(trimmed);
            } else {
                current = { name: 'Document Header', lines: [trimmed], confidence: 0.7 };
            }
        }
    }
    flush();

    if (sections.length === 0 && text.trim()) {
        const content = text.trim();
        const firstLine = content.split('\n')[0].trim();
        sections.push({
            id: generateId(),
            name: 'Main Content',
            category: 'Section',
            content,
            summary: firstLine.length <= 100 ? firstLine : firstLine.substring(0, 97) + '...',
            confidence: 0.7,
        });
    }

    return sections;
}

function extractMetadata(text: string): ParsedDocument['metadata'] {
    const metadata: ParsedDocument['metadata'] = {};

    const firstMatch = (patterns: RegExp[]) => {
        for (const p of patterns) {
            const m = text.match(p);
            if (m) return m[1].trim();
        }
        return undefined;
    };

    metadata.patientName = firstMatch([
        /(?:patient\s*(?:name)?|name)\s*[:]\s*(.+)/i,
        /(?:mr\.|mrs\.|ms\.|dr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
    ])?.substring(0, 100);

    metadata.date = firstMatch([
        /(?:date|dated|report date|exam date)\s*[:]\s*(.+)/i,
        /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/,
        /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})/i,
    ])?.substring(0, 50);

    metadata.labName = firstMatch([
        /(?:hospital|clinic|laboratory|lab|medical center|healthcare)\s*[:]\s*(.+)/i,
        /(?:^|\n)([A-Z][A-Za-z\s]+(?:Hospital|Clinic|Laboratory|Lab|Medical Center|Healthcare))/m,
    ])?.substring(0, 100);

    return metadata;
}

const DOC_TYPE_RULES: [string[], string][] = [
    [['lab', 'laboratory', 'test results'], 'Lab Report'],
    [['prescription', 'rx'], 'Prescription'],
    [['discharge', 'summary'], 'Discharge Summary'],
    [['radiology', 'imaging'], 'Radiology Report'],
    [['pathology'], 'Pathology Report'],
    [['patient', 'medical', 'clinical'], 'Medical Document'],
];

function detectDocumentType(text: string): string {
    const lower = text.toLowerCase();
    for (const [keywords, type] of DOC_TYPE_RULES) {
        if (keywords.some(kw => lower.includes(kw))) return type;
    }
    return 'Document';
}

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    ensurePdfjsPolyfills();
    const { PDFParse } = await import('pdf-parse');
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    const text = result.text || result.pages.map(p => p.text).join('\n\n');
    await parser.destroy();
    return text;
}

export async function parseHealthDocument(
    fileBuffer: Buffer,
    mimeType: string,
    fileName: string
): Promise<ParsedDocument> {
    try {
        let text = '';

        if (mimeType === 'application/pdf') {
            text = await extractTextFromPdf(fileBuffer);
        } else if (mimeType === 'text/plain') {
            text = fileBuffer.toString('utf-8');
        } else {
            return {
                documentType: 'Image Document',
                sections: [{
                    id: generateId(),
                    name: 'Full Document',
                    category: 'Section',
                    content: `Image file: ${fileName}`,
                    summary: `Image document (${fileName})`,
                    confidence: 1.0,
                }],
                metadata: {},
            };
        }

        if (!text.trim()) throw new Error('No text content could be extracted from the document.');

        return {
            documentType: detectDocumentType(text),
            sections: detectSections(text),
            metadata: extractMetadata(text),
        };
    } catch (error: any) {
        console.error('Failed to parse document:', error);
        if (error.message?.includes('No text content')) throw error;
        throw new Error(`Failed to parse document: ${error.message || String(error)}`);
    }
}

export async function generatePartialPdf(
    selectedSections: DocumentSection[],
    _metadata: ParsedDocument['metadata']
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const W = 595.28, H = 841.89, M = 50;
    const maxWidth = W - 2 * M;
    let page = pdfDoc.addPage([W, H]);
    let y = H - M;

    function newPage() { page = pdfDoc.addPage([W, H]); y = H - M; }
    function ensureSpace(needed: number) { if (y - needed < M) newPage(); }

    function wrapText(text: string, fontSize: number, f = font): string[] {
        const result: string[] = [];
        let line = '';
        for (const word of text.split(' ')) {
            const test = line ? `${line} ${word}` : word;
            if (f.widthOfTextAtSize(test, fontSize) > maxWidth && line) {
                result.push(line);
                line = word;
            } else {
                line = test;
            }
        }
        if (line) result.push(line);
        return result;
    }

    function draw(text: string, size: number, f = font, color = rgb(0.15, 0.15, 0.15)) {
        for (const line of wrapText(sanitize(text), size, f)) {
            ensureSpace(16);
            page.drawText(line, { x: M, y, size, font: f, color });
            y -= 16;
        }
    }

    for (const section of selectedSections) {
        ensureSpace(50);
        draw(section.name, 13, boldFont, rgb(0.15, 0.15, 0.4));
        y -= 3;
        for (const line of section.content.split('\n')) {
            if (line.trim()) draw(line.trim(), 10);
            else y -= 6;
        }
        y -= 12;
    }

    const pages = pdfDoc.getPages();
    pages.forEach((p, i) => {
        const footer = `-- ${i + 1} of ${pages.length} --`;
        p.drawText(footer, {
            x: W / 2 - font.widthOfTextAtSize(footer, 8) / 2,
            y: M - 20,
            size: 8,
            font,
            color: rgb(0.5, 0.5, 0.5),
        });
    });

    return await pdfDoc.save();
}
