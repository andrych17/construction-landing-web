import { open } from 'node:fs/promises';
import type { FileHandle } from 'node:fs/promises';
import { Readable } from 'node:stream';
import path from 'node:path';

const CONTENT_TYPES: Record<string, string> = {
  avif: 'image/avif',
  jpg: 'image/jpeg',
  mp4: 'video/mp4',
  png: 'image/png',
  webm: 'video/webm',
  webp: 'image/webp',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  const match = /^([0-9a-f-]{36})\.(avif|jpg|mp4|png|webm|webp)$/.exec(filename);
  if (!match) return new Response(null, { status: 404 });

  let file: FileHandle | undefined;
  try {
    file = await open(path.join(process.cwd(), 'public', 'uploads', filename), 'r');
    const { size } = await file.stat();
    if (size === 0) {
      await file.close();
      return new Response(null, { headers: { 'Content-Length': '0', 'Content-Type': CONTENT_TYPES[match[2]] } });
    }
    let start = 0;
    let end = size - 1;
    let status = 200;
    const range = request.headers.get('range');

    if (range) {
      const parts = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!parts || (!parts[1] && !parts[2])) {
        await file.close();
        return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
      }
      if (!parts[1]) start = Math.max(size - Number(parts[2]), 0);
      else start = Number(parts[1]);
      if (parts[1] && parts[2]) end = Number(parts[2]);
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) {
        await file.close();
        return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
      }
      end = Math.min(end, size - 1);
      status = 206;
    }

    const headers = new Headers({
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': String(end - start + 1),
      'Content-Type': CONTENT_TYPES[match[2]],
      'X-Content-Type-Options': 'nosniff',
    });
    if (status === 206) headers.set('Content-Range', `bytes ${start}-${end}/${size}`);

    const body = Readable.toWeb(file.createReadStream({ start, end, autoClose: true })) as unknown as ReadableStream<Uint8Array>;
    return new Response(body, {
      status,
      headers,
    });
  } catch (error) {
    await file?.close().catch(() => {});
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return new Response(null, { status: 404 });
    throw error;
  }
}
