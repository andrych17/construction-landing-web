'use client';

import React, { useRef, useState } from 'react';
import { LuImage, LuUpload, LuTrash2 } from 'react-icons/lu';

/** Drag & drop file upload with inline preview. Value is always the stored filepath string. */
export function ImageDropzone({
  value,
  onChange,
  accept = 'image/jpeg,image/png,image/webp,image/avif',
  emptyHint = 'Klik atau tarik gambar ke sini',
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  emptyHint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Upload gagal.');
      }
      const body = await res.json();
      onChange(body.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        disabled={uploading}
        className="hidden"
      />
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        className={`flex items-center gap-3 border-2 border-dashed rounded-lg p-3 cursor-pointer transition-colors ${
          uploading
            ? 'bg-slate-50 border-slate-300'
            : 'bg-slate-50 border-slate-200 hover:bg-amber-50/40 hover:border-amber-400'
        }`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="w-14 h-14 rounded-md object-cover border border-slate-200 shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
            <LuImage className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1 min-w-0 text-left">
          <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            {uploading ? (
              <span className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <LuUpload className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <span>{uploading ? 'Mengunggah…' : value ? 'Ganti Gambar' : emptyHint}</span>
          </p>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">
            {value ? value.split('/').pop() : 'JPG, PNG, WEBP, AVIF — maks 10MB'}
          </p>
        </div>

        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer shrink-0"
            title="Hapus gambar"
          >
            <LuTrash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-red-600">{error}</p>}
    </div>
  );
}
