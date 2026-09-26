import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { parsePageId } from '@/lib/content';
import { NextResponse } from 'next/server';
import { readLayoutResponse, writeLayoutResponse } from '@/lib/layout-api';

export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  try {
    await requireAdmin();
    const { page: raw } = await params;
    const page = parsePageId(raw);
    if (!page) return NextResponse.json({ error: 'Halaman tidak dikenal.' }, { status: 404 });
    return await readLayoutResponse(page);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ page: string }> }) {
  try {
    const session = await requireAdmin();
    const { page: raw } = await params;
    const page = parsePageId(raw);
    if (!page) return NextResponse.json({ error: 'Halaman tidak dikenal.' }, { status: 404 });
    return await writeLayoutResponse(page, await request.json(), session.name);
  } catch (error) {
    return handleApiError(error);
  }
}
