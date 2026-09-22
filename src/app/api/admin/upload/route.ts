import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const IMAGE_MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};
const VIDEO_MIME_EXT: Record<string, string> = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
};
const ALLOWED_MIME_EXT: Record<string, string> = { ...IMAGE_MIME_EXT, ...VIDEO_MIME_EXT };
const IMAGE_EXT_SET = new Set(Object.values(IMAGE_MIME_EXT));

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

async function compressImage(buffer: Buffer, ext: string): Promise<Buffer> {
  try {
    const pipeline = sharp(buffer).resize({ width: 2560, withoutEnlargement: true });
    switch (ext) {
      case 'jpg':
        return await pipeline.jpeg({ quality: 82 }).toBuffer();
      case 'webp':
        return await pipeline.webp({ quality: 82 }).toBuffer();
      case 'avif':
        return await pipeline.avif({ quality: 60 }).toBuffer();
      case 'png':
        return await pipeline.png({ quality: 82, compressionLevel: 9 }).toBuffer();
      default:
        return buffer;
    }
  } catch {
    // Compression is an enhancement, not a hard requirement — fall back to the
    // original buffer rather than failing the whole upload.
    return buffer;
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Field 'file' wajib diisi." }, { status: 422 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Ukuran file maksimal 10MB.' }, { status: 413 });
    }
    const ext = ALLOWED_MIME_EXT[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: 'Format harus JPG, PNG, WEBP, AVIF (gambar) atau MP4, WEBM (video).' },
        { status: 422 }
      );
    }

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = `${randomUUID()}.${ext}`;
    let buffer: Buffer = Buffer.from(await file.arrayBuffer());

    if (IMAGE_EXT_SET.has(ext)) {
      buffer = await compressImage(buffer, ext);
    }
    // ponytail: video is stored as-is, no server-side transcoding. Real
    // compression needs ffmpeg on the server and adds real processing time;
    // this project already documents a manual FFmpeg pre-compression workflow
    // in docs/hero-video/README.md. Wire up fluent-ffmpeg + ffmpeg-static here
    // if/when server-side video compression is actually needed.

    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
