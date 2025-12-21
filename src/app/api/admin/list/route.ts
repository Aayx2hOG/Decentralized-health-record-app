import { requireAdminAuth } from "@/lib/admin-auth";
import { prismaClient } from "db/src";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const authResult = await requireAdminAuth(request);
    if (!authResult.valid) {
        return new Response(JSON.stringify({ error: authResult.error || 'Unauthorized' }), { status: 401 });
    }

    const admins = await prismaClient.admin.findMany({
        where: { isActive: true },
        orderBy: { addedAt: 'desc' },
    });
    return new Response(JSON.stringify(admins), { status: 200 });
}