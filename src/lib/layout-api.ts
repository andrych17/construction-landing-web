import 'server-only';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPageHistory, getPageLayout, restorePageRevision, savePageLayout } from '@/lib/content';
import { layoutStorageKey, PAGES, publishPageLayout, type PageId } from '@/lib/home-layout';

import { db } from '@/lib/db';

function revalidatePage(page: PageId) {
  const path = PAGES.find((item) => item.id === page)?.path ?? '/';
  revalidatePath(path);
  revalidatePath('/', 'layout');
}

export async function readLayoutResponse(page: PageId) {
  const [value, history, meta] = await Promise.all([
    getPageLayout(page),
    getPageHistory(page),
    db.siteContent.findUnique({
      where: { key: layoutStorageKey(page) },
      select: { updatedAt: true, updatedBy: true },
    }),
  ]);
  return NextResponse.json({
    key: layoutStorageKey(page),
    value,
    history,
    updatedAt: meta?.updatedAt,
    updatedBy: meta?.updatedBy,
  });
}

export async function writeLayoutResponse(page: PageId, body: unknown, by?: string) {
  const published = publishPageLayout(page, body);
  if (!published.ok) {
    return NextResponse.json({ error: published.error }, { status: 422 });
  }
  const saved = await savePageLayout(page, published.data, by);
  revalidatePage(page);
  return NextResponse.json({
    key: layoutStorageKey(page),
    value: published.data,
    history: saved.history,
    updatedBy: by,
  });
}

export async function restoreLayoutResponse(page: PageId, index: number, by?: string) {
  const restored = await restorePageRevision(page, index, by);
  if (!restored) {
    return NextResponse.json({ error: 'Riwayat itu tidak ada.' }, { status: 404 });
  }
  revalidatePage(page);
  return NextResponse.json({
    key: layoutStorageKey(page),
    value: restored.value,
    history: restored.history,
    updatedBy: by,
  });
}
