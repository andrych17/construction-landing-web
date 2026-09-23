'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LuExternalLink, LuX } from 'react-icons/lu';

function versionedPath(path: string, version: number): string {
  if (!version) return path;
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const base = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const join = base.includes('?') ? '&' : '?';
  return `${base}${join}preview=${version}${hash}`;
}

function sectionId(path: string): string {
  const hashAt = path.indexOf('#');
  return hashAt >= 0 ? path.slice(hashAt + 1) : '';
}

function storageKey(path: string): string {
  return `ww-preview:${path}`;
}

export function markPreviewSaved(path: string): number {
  const stamp = Date.now();
  sessionStorage.setItem(storageKey(path), String(stamp));
  return stamp;
}

export function PagePreview({
  path,
  note,
  frameKey = 0,
  open,
  onOpenChange,
}: {
  path: string;
  note?: string;
  frameKey?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = onOpenChange ? Boolean(open) : localOpen;
  const setOpen = useCallback((next: boolean) => {
    if (onOpenChange) onOpenChange(next);
    else setLocalOpen(next);
  }, [onOpenChange]);
  const frame = useRef<HTMLIFrameElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, setOpen]);

  useEffect(() => {
    const node = frame.current;
    if (!isOpen || !node) return;
    const stored = Number(sessionStorage.getItem(storageKey(path)) || 0);
    node.src = versionedPath(path, Math.max(stored, frameKey));
  }, [isOpen, path, frameKey]);

  const scrollToSection = () => {
    const id = sectionId(path);
    const doc = frame.current?.contentDocument;
    if (!id || !doc) return;
    doc.getElementById(id)?.scrollIntoView({ block: 'start' });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 transition-colors duration-200 hover:border-amber-300 hover:bg-amber-50"
      >
        Pratinjau
        <LuExternalLink className="h-4 w-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-3 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
            className="flex h-[min(92vh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div className="min-w-0">
                <h2 id="preview-title" className="text-base font-semibold text-slate-900">
                  Pratinjau section
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {note ?? 'Menampilkan section ini setelah data tersimpan.'}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Buka halaman
                </a>
                <button
                  ref={closeButton}
                  type="button"
                  aria-label="Tutup pratinjau"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <LuX className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe
              ref={frame}
              title="Pratinjau section"
              onLoad={scrollToSection}
              className="min-h-0 w-full flex-1 border-0 bg-[#030303]"
            />
          </div>
        </div>
      )}
    </>
  );
}
