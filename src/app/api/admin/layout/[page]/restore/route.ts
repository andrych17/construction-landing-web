import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { parsePageId } from '@/lib/content';
import { restoreLayoutResponse } from '@/lib/layout-api';

export async function POST(request: Request, { params }: { params: Promise<{ page: string }> }) {
  try {
    const session = await requireAdmin();
    const { page: raw } = await params;
    const page = parsePageId(raw);
    if (!page) return NextResponse.json({ error: 'Halaman tidak dikenal.' }, { status: 404 });
    const body = await request.json().catch(() => ({}));
    const index = typeof body.index === 'number' && body.index >= 0 ? body.index : 0;
    return await restoreLayoutResponse(page, index, session.name);
  } catch (error) {
    return handleApiError(error);
  }
}
