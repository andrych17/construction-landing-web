'use client';

import React, { useRef, useState } from 'react';
import { LuUpload, LuTrash2, LuImages } from 'react-icons/lu';

async function uploadOne(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? 'Upload gagal.');
  }
  const body = await res.json();
  return body.url as string;
}

/** Multi-file drag & drop gallery — uploads land as filepaths appended to `value`, removable individually. */
export function GalleryDropzone({
  value,
  onChange,
  accept = 'image/jpeg,image/png,image/webp,image/avif',
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFiles = async (files: FileList) => {
    setUploading(true);
    setError(null);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadOne));
      onChange([...value, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => e.target.files && e.target.files.length > 0 && uploadFiles(e.target.files)}
        disabled={uploading}
        className="hidden"
      />
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        className={`flex items-center gap-3 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${
          uploading
            ? 'bg-slate-50 border-slate-300'
            : 'bg-slate-50 border-slate-200 hover:bg-amber-50/40 hover:border-amber-400'
        }`}
      >
        <div className="w-10 h-10 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
          <LuImages className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            {uploading ? (
              <span className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <LuUpload className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <span>{uploading ? 'Mengunggah…' : 'Klik atau tarik beberapa gambar ke sini'}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Bisa pilih lebih dari satu file sekaligus — JPG, PNG, WEBP, AVIF
          </p>
        </div>
      </div>
      {error && <p className="text-[11px] text-red-600">{error}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative group aspect-square rounded-md overflow-hidden border border-slate-200 bg-slate-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(value.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-600"
                title="Hapus foto"
              >
                <LuTrash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
