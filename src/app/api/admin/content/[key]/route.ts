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
  getHeroHome,
  getHeroAbout,
  getHeroServices,
  getHeroProjects,
  getHeroContact,
} from '@/lib/content';

const SECTION_DEFAULTS: Record<string, () => Promise<unknown>> = {
  contact: getContact,
  rotatingDisciplines: getRotatingDisciplines,
  philosophies: getPhilosophies,
  founders: getFounders,
  services: getServices,
  methodology: getMethodology,
  faqs: getFaqs,
  heroHome: getHeroHome,
  heroAbout: getHeroAbout,
  heroServices: getHeroServices,
  heroProjects: getHeroProjects,
  heroContact: getHeroContact,
};

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isContentSectionKey(key)) {
      return NextResponse.json({ error: `Section '${key}' tidak dikenal.` }, { status: 404 });
    }
    const [value, row] = await Promise.all([
      SECTION_DEFAULTS[key](),
      db.siteContent.findUnique({
        where: { key },
        select: { updatedAt: true, updatedBy: true },
      }),
    ]);
    return NextResponse.json({
      key,
      value,
      updatedAt: row?.updatedAt,
      updatedBy: row?.updatedBy,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    const session = await requireAdmin();
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
      create: { key, value: body, updatedBy: session.name },
      update: { value: body, updatedBy: session.name },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({
      key: row.key,
      value: row.value,
      updatedAt: row.updatedAt,
      updatedBy: row.updatedBy,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
