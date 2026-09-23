'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Puck } from '@puckeditor/core';
import '@puckeditor/core/puck.css';
import { configFor } from '@/components/pages/page-configs';
import { PAGES, type HistorySummary, type HomeLayoutData, type PageId } from '@/lib/home-layout';

function when(at: string): string {
  const date = new Date(at);
  if (Number.isNaN(date.getTime())) return at;
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function HomeComposer({
  page,
  initialData,
  history: initialHistory,
}: {
  page: PageId;
  initialData: HomeLayoutData;
  history: HistorySummary[];
}) {
  const [data, setData] = useState(initialData);
  const [history, setHistory] = useState(initialHistory);
  const [editorKey, setEditorKey] = useState(0);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const label = PAGES.find((item) => item.id === page)?.label ?? 'Halaman';

  const restore = async (index: number) => {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/layout/${page}/restore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof body.error === 'string' ? body.error : 'Gagal mengembalikan riwayat.');
      }
      setData(body.value);
      setHistory(Array.isArray(body.history) ? body.history : []);
      setEditorKey((key) => key + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengembalikan riwayat.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {error && (
        <p className="fixed top-3 left-1/2 z-[80] -translate-x-1/2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
          {error}
        </p>
      )}
      <Puck
        key={editorKey}
        config={configFor(page)}
        data={data}
        height="100%"
        headerTitle={`Susunan ${label}`}
        iframe={{ enabled: false }}
        dictionary={{ 'header-publish': 'Terbitkan' }}
        overrides={{
          headerActions: ({ children }) => (
            <>
              <Link href="/admin" className="inline-flex items-center px-3 text-sm font-medium text-neutral-700 hover:text-black">
                Kembali ke admin
              </Link>
              {history.length > 0 && (
                <details className="relative">
                  <summary className="cursor-pointer list-none px-3 text-sm font-medium text-neutral-700 hover:text-black">
                    Riwayat ({history.length})
                  </summary>
                  <div className="absolute right-0 top-full z-[80] mt-2 w-80 rounded-md border border-neutral-200 bg-white p-2 shadow-lg">
                    {history.map((item, index) => (
                      <button
                        key={`${item.at}-${index}`}
                        type="button"
                        disabled={busy}
                        onClick={() => restore(index)}
                        className="block w-full rounded px-2 py-2 text-left text-xs hover:bg-neutral-100 disabled:opacity-50"
                      >
                        <span className="font-medium text-neutral-900">{when(item.at)}</span>
                        <span className="mt-0.5 block truncate text-neutral-500">{item.blocks.join(' · ')}</span>
                      </button>
                    ))}
                  </div>
                </details>
              )}
              {children}
            </>
          ),
        }}
        onPublish={async (next) => {
          setError('');
          const res = await fetch(`/api/admin/layout/${page}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(next),
          });
          const body = await res.json().catch(() => ({}));
          if (!res.ok) {
            const message = typeof body.error === 'string' ? body.error : 'Gagal menyimpan susunan.';
            setError(message);
            throw new Error(message);
          }
          setHistory(Array.isArray(body.history) ? body.history : []);
        }}
      />
    </>
  );
}
