import { requireAdminAuth } from "@/lib/admin-auth";
import { prismaClient } from "db/src";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return NextResponse.json({ error: authResult.error || 'Unauthorized' }, { status: 401 });
    }

    const { pubkey } = await request.json();
    if (!pubkey) {
        return NextResponse.json({ error: 'Missing pubkey' }, { status: 400 });
    }

    await prismaClient.admin.create({
        data: {
            pubkey,
            addedBy: authResult.pubkey,
            isActive: true,
        }
    });

    return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return NextResponse.json({ error: authResult.error || 'Unauthorized' }, { status: 401 });
    }

    const { pubkey } = await request.json();

    await prismaClient.admin.update({
        where: { pubkey },
        data: { isActive: false }
    });
    return NextResponse.json({ success: true });
}