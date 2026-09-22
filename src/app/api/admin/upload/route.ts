import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED_MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Field 'file' wajib diisi." }, { status: 422 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Ukuran file maksimal 8MB.' }, { status: 413 });
    }
    const ext = ALLOWED_MIME_EXT[file.type];
    if (!ext) {
      return NextResponse.json({ error: 'Format harus JPG, PNG, WEBP, atau AVIF.' }, { status: 422 });
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = `${randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
