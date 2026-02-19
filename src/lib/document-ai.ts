import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';


function sanitizeForWinAnsi(text: string): string {
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

const MEDICAL_HEADERS = [
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
];

function categorizeSection(name: string): string {
    const lower = name.toLowerCase();
    if (['vital signs', 'vitals', 'physical examination', 'physical exam', 'examination'].some(h => lower.includes(h))) return 'Vitals';
    if (['lab results', 'laboratory', 'test results'].some(h => lower.includes(h))) return 'Lab Work';
    if (['imaging', 'radiology', 'x-ray', 'mri', 'ct scan'].some(h => lower.includes(h))) return 'Imaging';
    if (['diagnosis', 'assessment', 'impression', 'findings'].some(h => lower.includes(h))) return 'Diagnosis';
    if (['medications', 'prescription', 'treatment plan'].some(h => lower.includes(h))) return 'Prescription';
    if (['patient information', 'patient details', 'demographics'].some(h => lower.includes(h))) return 'Demographics';
    if (['history', 'hpi', 'pmh', 'chief complaint'].some(h => lower.includes(h))) return 'History';
    if (['summary', 'conclusion', 'abstract'].some(h => lower.includes(h))) return 'Summary';
    return 'Content';
}

function createSummary(content: string): string {
    const firstLine = content.trim().split('\n')[0].trim();
    if (firstLine.length <= 100) return firstLine;
    return firstLine.substring(0, 97) + '...';
}

function detectSections(text: string): DocumentSection[] {
    const lines = text.split('\n');
    const sections: DocumentSection[] = [];
    let currentSection: { name: string; lines: string[] } | null = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            if (currentSection) currentSection.lines.push('');
            continue;
        }

        const lowerTrimmed = trimmed.toLowerCase().replace(/[:\-_]/g, '').trim();
        const isKnownHeader = MEDICAL_HEADERS.some(h => lowerTrimmed === h || lowerTrimmed.startsWith(h + ' '));
        const isAllCaps = trimmed.length > 3 && trimmed.length < 80 && trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
        const isColonHeader = trimmed.endsWith(':') && trimmed.length < 60 && !trimmed.includes('  ');
        const isNumberedHeader = /^(\d+\.|[IVXLC]+\.|[A-Z]\.)/.test(trimmed) && trimmed.length < 80;

        if (isKnownHeader || isAllCaps || isColonHeader || isNumberedHeader) {
            if (currentSection && currentSection.lines.some(l => l.trim())) {
                const content = currentSection.lines.join('\n').trim();
                sections.push({
                    id: generateId(),
                    name: currentSection.name,
                    category: categorizeSection(currentSection.name),
                    content,
                    summary: createSummary(content),
                    confidence: isKnownHeader ? 0.95 : 0.8,
                });
            }
            currentSection = {
                name: trimmed.replace(/:$/, '').trim(),
                lines: [],
            };
        } else {
            if (currentSection) {
                currentSection.lines.push(trimmed);
            } else {
                currentSection = { name: 'Document Header', lines: [trimmed] };
            }
        }
    }

    if (currentSection && currentSection.lines.some(l => l.trim())) {
        const content = currentSection.lines.join('\n').trim();
        sections.push({
            id: generateId(),
            name: currentSection.name,
            category: categorizeSection(currentSection.name),
            content,
            summary: createSummary(content),
            confidence: 0.85,
        });
    }

    if (sections.length === 0 && text.trim()) {
        sections.push({
            id: generateId(),
            name: 'Main Content',
            category: 'Content',
            content: text.trim(),
            summary: createSummary(text),
            confidence: 0.7,
        });
    }

    return sections;
}

function extractMetadata(text: string): ParsedDocument['metadata'] {
    const metadata: ParsedDocument['metadata'] = {};

    const namePatterns = [
        /(?:patient\s*(?:name)?|name)\s*[:]\s*(.+)/i,
        /(?:mr\.|mrs\.|ms\.|dr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/,
    ];
    for (const p of namePatterns) {
        const match = text.match(p);
        if (match) {
            metadata.patientName = match[1].trim().substring(0, 100);
            break;
        }
    }

    const datePatterns = [
        /(?:date|dated|report date|exam date)\s*[:]\s*(.+)/i,
        /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/,
        /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})/i,
    ];
    for (const p of datePatterns) {
        const match = text.match(p);
        if (match) {
            metadata.date = match[1].trim().substring(0, 50);
            break;
        }
    }

    const labPatterns = [
        /(?:hospital|clinic|laboratory|lab|medical center|healthcare)\s*[:]\s*(.+)/i,
        /(?:^|\n)([A-Z][A-Za-z\s]+(?:Hospital|Clinic|Laboratory|Lab|Medical Center|Healthcare))/m,
    ];
    for (const p of labPatterns) {
        const match = text.match(p);
        if (match) {
            metadata.labName = match[1].trim().substring(0, 100);
            break;
        }
    }

    return metadata;
}

function ensurePdfjsPolyfills() {
    if (typeof globalThis.DOMMatrix === 'undefined') {
        (globalThis as any).DOMMatrix = class DOMMatrix {
            a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
            m11 = 1; m12 = 0; m13 = 0; m14 = 0;
            m21 = 0; m22 = 1; m23 = 0; m24 = 0;
            m31 = 0; m32 = 0; m33 = 1; m34 = 0;
            m41 = 0; m42 = 0; m43 = 0; m44 = 1;
            is2D = true; isIdentity = true;
            constructor(init?: any) {
                if (Array.isArray(init) && init.length === 6) {
                    [this.a, this.b, this.c, this.d, this.e, this.f] = init;
                    this.m11 = this.a; this.m12 = this.b;
                    this.m21 = this.c; this.m22 = this.d;
                    this.m41 = this.e; this.m42 = this.f;
                    this.isIdentity = false;
                }
            }
            inverse() { return new (globalThis as any).DOMMatrix(); }
            invertSelf() { return this; }
            multiply() { return new (globalThis as any).DOMMatrix(); }
            multiplySelf() { return this; }
            preMultiplySelf() { return this; }
            translate() { return new (globalThis as any).DOMMatrix(); }
            translateSelf() { return this; }
            scale() { return new (globalThis as any).DOMMatrix(); }
            scaleSelf() { return this; }
            transformPoint(p: any) { return p || { x: 0, y: 0, z: 0, w: 1 }; }
            toFloat64Array() { return new Float64Array([this.a, this.b, this.c, this.d, this.e, this.f]); }
        };
    }

    if (typeof globalThis.Path2D === 'undefined') {
        (globalThis as any).Path2D = class Path2D {
            addPath() {}
            closePath() {}
            moveTo() {}
            lineTo() {}
            bezierCurveTo() {}
            quadraticCurveTo() {}
            arc() {}
            arcTo() {}
            ellipse() {}
            rect() {}
        };
    }

    if (typeof globalThis.ImageData === 'undefined') {
        (globalThis as any).ImageData = class ImageData {
            data: Uint8ClampedArray;
            width: number;
            height: number;
            constructor(sw: number, sh: number) {
                this.width = sw;
                this.height = sh;
                this.data = new Uint8ClampedArray(sw * sh * 4);
            }
        };
    }
}

async function extractTextFromPdf(buffer: Buffer): Promise<string> {
    ensurePdfjsPolyfills();

    const { PDFParse } = await import('pdf-parse');

    const parser = new PDFParse({
        data: new Uint8Array(buffer),
    });

    const textResult = await parser.getText();
    const text = textResult.text || textResult.pages.map(p => p.text).join('\n\n');

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
                    category: 'Content',
                    content: `Image file: ${fileName}`,
                    summary: `Image document (${fileName})`,
                    confidence: 1.0,
                }],
                metadata: {},
            };
        }

        if (!text.trim()) {
            throw new Error('No text content could be extracted from the document.');
        }

        const sections = detectSections(text);
        const metadata = extractMetadata(text);

        const lowerText = text.toLowerCase();
        let documentType = 'Medical Document';
        if (lowerText.includes('lab') || lowerText.includes('laboratory') || lowerText.includes('test results')) {
            documentType = 'Lab Report';
        } else if (lowerText.includes('prescription') || lowerText.includes('rx')) {
            documentType = 'Prescription';
        } else if (lowerText.includes('discharge') || lowerText.includes('summary')) {
            documentType = 'Discharge Summary';
        } else if (lowerText.includes('radiology') || lowerText.includes('imaging')) {
            documentType = 'Radiology Report';
        } else if (lowerText.includes('pathology')) {
            documentType = 'Pathology Report';
        }

        return {
            documentType,
            sections,
            metadata,
        };
    } catch (error: any) {
        console.error('Failed to parse document:', error);

        if (error.message?.includes('No text content')) {
            throw error;
        }

        throw new Error(`Failed to parse document: ${error.message || String(error)}`);
    }
}

export async function generatePartialPdf(
    selectedSections: DocumentSection[],
    metadata: ParsedDocument['metadata']
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const PAGE_WIDTH = 595.28; // A4 width in points
    const PAGE_HEIGHT = 841.89; // A4 height in points
    const MARGIN = 50;
    const MAX_WIDTH = PAGE_WIDTH - 2 * MARGIN;
    const LINE_HEIGHT = 14;
    const HEADER_HEIGHT = 20;

    let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let yPos = PAGE_HEIGHT - MARGIN;

    function addNewPage() {
        page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        yPos = PAGE_HEIGHT - MARGIN;
    }

    function ensureSpace(needed: number) {
        if (yPos - needed < MARGIN) {
            addNewPage();
        }
    }

    function wrapText(text: string, maxWidth: number, fontSize: number, usedFont = font): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testWidth = usedFont.widthOfTextAtSize(testLine, fontSize);

            if (testWidth > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    }

    function drawText(text: string, fontSize: number, usedFont = font, color = rgb(0.15, 0.15, 0.15)) {
        const safeText = sanitizeForWinAnsi(text);
        const lines = wrapText(safeText, MAX_WIDTH, fontSize, usedFont);
        for (const line of lines) {
            ensureSpace(LINE_HEIGHT + 2);
            page.drawText(line, {
                x: MARGIN,
                y: yPos,
                size: fontSize,
                font: usedFont,
                color,
            });
            yPos -= LINE_HEIGHT + 2;
        }
    }

    // Title
    drawText('Medical Report Excerpt', 18, boldFont, rgb(0.1, 0.1, 0.5));
    yPos -= 5;

    // Divider line
    page.drawLine({
        start: { x: MARGIN, y: yPos },
        end: { x: PAGE_WIDTH - MARGIN, y: yPos },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
    });
    yPos -= 15;

    // Metadata
    if (metadata.patientName || metadata.date || metadata.labName) {
        if (metadata.patientName) {
            drawText(`Patient: ${metadata.patientName}`, 10, font, rgb(0.3, 0.3, 0.3));
        }
        if (metadata.date) {
            drawText(`Date: ${metadata.date}`, 10, font, rgb(0.3, 0.3, 0.3));
        }
        if (metadata.labName) {
            drawText(`Facility: ${metadata.labName}`, 10, font, rgb(0.3, 0.3, 0.3));
        }
        yPos -= 10;
    }

    // Sections
    for (const section of selectedSections) {
        ensureSpace(HEADER_HEIGHT + LINE_HEIGHT * 3);

        // Section header
        drawText(section.name, 13, boldFont, rgb(0.15, 0.15, 0.4));
        yPos -= 3;

        // Section content
        const contentLines = section.content.split('\n');
        for (const line of contentLines) {
            if (line.trim()) {
                drawText(line.trim(), 10, font);
            } else {
                yPos -= 6; // Blank line spacing
            }
        }

        yPos -= 12; // Space between sections
    }

    // Footer
    ensureSpace(30);
    yPos = MARGIN - 10;
    const footerText = `Generated on ${new Date().toLocaleDateString()} — Partial document containing ${selectedSections.length} section(s)`;
    page.drawText(footerText, {
        x: MARGIN,
        y: yPos,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
    });

    return await pdfDoc.save();
}