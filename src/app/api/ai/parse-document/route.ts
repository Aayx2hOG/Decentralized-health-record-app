import { NextRequest, NextResponse } from "next/server";
import { parseHealthDocument } from "@/lib/extractor";

export const maxDuration = 60;

const ALLOWED_MIME_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/heic",
    "text/plain",
];

// Map extensions to MIME types for fallback detection
function getMimeTypeFromExtension(filename: string): string | null {
    const extension = filename.toLowerCase().split('.').pop();
    const mimeMap: Record<string, string> = {
        'pdf': 'application/pdf',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'webp': 'image/webp',
        'heic': 'image/heic',
        'txt': 'text/plain',
    };
    return extension ? mimeMap[extension] || null : null;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Detect MIME type - use file.type if valid, otherwise infer from extension
        let mimeType = file.type;
        if (!mimeType || mimeType === "application/octet-stream") {
            const inferredType = getMimeTypeFromExtension(file.name);
            if (inferredType) {
                mimeType = inferredType;
            }
        }

        // Validate file type
        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
            return NextResponse.json(
                { error: `Unsupported file type: ${mimeType}. Supported: PDF, PNG, JPEG, WebP, HEIC, TXT` },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB." },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await parseHealthDocument(buffer, mimeType, file.name);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error("Document parsing error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to parse document" },
            { status: 500 }
        );
    }
}
