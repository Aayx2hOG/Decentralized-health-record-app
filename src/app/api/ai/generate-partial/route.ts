import { NextRequest, NextResponse } from "next/server";
import { generatePartialPdf, DocumentSection } from "@/lib/extractor";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { selectedSections, metadata } = body as {
            selectedSections: DocumentSection[];
            metadata: { patientName?: string; date?: string; labName?: string };
        };

        if (!selectedSections || selectedSections.length === 0) {
            return NextResponse.json(
                { error: "No sections selected" },
                { status: 400 }
            );
        }

        const pdfBytes = await generatePartialPdf(
            selectedSections,
            metadata || {}
        );

        // Return as base64
        const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

        return NextResponse.json({ pdfBase64 });
    } catch (error: any) {
        console.error("Partial document generation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate partial document" },
            { status: 500 }
        );
    }
}
