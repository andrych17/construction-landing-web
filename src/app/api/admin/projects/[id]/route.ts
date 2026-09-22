import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';
import { projectInputSchema } from '@/lib/project-schema';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const project = await db.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: 'Proyek tidak ditemukan.' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = projectInputSchema.parse(await request.json());

    const project = await db.project.update({ where: { id }, data });

    revalidatePath('/', 'layout');
    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.project.delete({ where: { id } });

    revalidatePath('/', 'layout');
    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleApiError(error);
  }
}
