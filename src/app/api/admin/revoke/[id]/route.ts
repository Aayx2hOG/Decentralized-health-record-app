import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await prismaClient.rewrapKey.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('Failed to revoke key:', e);
        return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 });
    }
}
