import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { isContentSectionKey } from '@/lib/content-sections';
import {
  getContact,
  getRotatingDisciplines,
  getPhilosophies,
  getFounders,
  getServices,
  getMethodology,
  getFaqs,
} from '@/lib/content';

const SECTION_DEFAULTS: Record<string, () => Promise<unknown>> = {
  contact: getContact,
  rotatingDisciplines: getRotatingDisciplines,
  philosophies: getPhilosophies,
  founders: getFounders,
  services: getServices,
  methodology: getMethodology,
  faqs: getFaqs,
};

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isContentSectionKey(key)) {
      return NextResponse.json({ error: `Section '${key}' tidak dikenal.` }, { status: 404 });
    }
    const value = await SECTION_DEFAULTS[key]();
    return NextResponse.json({ key, value });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isContentSectionKey(key)) {
      return NextResponse.json({ error: `Section '${key}' tidak dikenal.` }, { status: 404 });
    }
    const body = await request.json();
    if (body === null || typeof body !== 'object') {
      return NextResponse.json({ error: 'Body harus berupa object atau array JSON.' }, { status: 422 });
    }

    const row = await db.siteContent.upsert({
      where: { key },
      create: { key, value: body },
      update: { value: body },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ key: row.key, value: row.value });
  } catch (error) {
    return handleApiError(error);
  }
}
