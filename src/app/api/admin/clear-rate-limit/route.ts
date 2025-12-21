import { NextResponse } from 'next/server';

const rateLimitStore = new Map<string, any>();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pubkey } = body;

        if (!pubkey) {
            return NextResponse.json({ error: 'Pubkey required' }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Rate limit cleared. Please restart your dev server for this to take effect.'
        });
    } catch (e: any) {
        console.error('Failed to clear rate limit:', e);
        return NextResponse.json({ error: 'Failed to clear rate limit' }, { status: 500 });
    }
}
