import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { projectInputSchema } from '@/lib/project-schema';
import { slugify } from '@/lib/slug';

export async function GET() {
  try {
    await requireAdmin();
    const projects = await db.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
    return NextResponse.json(projects);
  } catch (error) {
    return handleApiError(error);
  }
}

async function uniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || 'proyek';
  let slug = base;
  let suffix = 2;
  while (await db.project.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const data = projectInputSchema.parse(await request.json());
    const slug = await uniqueSlug(data.title);

    const project = await db.project.create({
      data: { ...data, slug },
    });

    revalidatePath('/', 'layout');
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
