'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Field } from '@/components/admin/ui/Field';
import { Input } from '@/components/admin/ui/Input';
import { Button } from '@/components/admin/ui/Button';
import { useToast } from '@/components/admin/ui/Toast';
import type { HeroMediaValue } from '@/lib/content';

export function HeroMediaEditor({
  sectionKey,
  label,
  initialValue,
  previewPath,
}: {
  sectionKey: string;
  label: string;
  initialValue: HeroMediaValue;
  previewPath: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [video, setVideo] = useState(initialValue.video);
  const [poster, setPoster] = useState(initialValue.poster);
  const [alt, setAlt] = useState(initialValue.alt);
  const [altEn, setAltEn] = useState(initialValue.altEn);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [saving, setSaving] = useState(false);

  const upload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? 'Upload gagal.');
    }
    const body = await res.json();
    return body.url as string;
  };

  const handleVideoUpload = async (file: File) => {
    setUploadingVideo(true);
    try {
      setVideo(await upload(file));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload video gagal.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handlePosterUpload = async (file: File) => {
    setUploadingPoster(true);
    try {
      setPoster(await upload(file));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload poster gagal.');
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video, poster, alt, altEn }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Gagal menyimpan.');
      }
      toast.success('Hero video tersimpan.');
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-slate-200 z-10">
        <h1 className="text-lg font-bold text-slate-900">{label}</h1>
        <div className="flex items-center gap-3">
          <a
            href={previewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-600 hover:text-amber-600 transition-colors underline underline-offset-2"
          >
            Lihat Halaman Ini ↗
          </a>
          <Button type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
          </Button>
        </div>
      </div>

      <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
        {video ? (
          <video key={video} autoPlay loop muted playsInline poster={poster} className="w-full h-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        ) : poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Belum ada video/poster
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Video</span>
          <input
            type="file"
            accept="video/mp4,video/webm"
            onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
            disabled={uploadingVideo}
            className="text-xs text-slate-500 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-slate-100 file:text-xs file:font-semibold hover:file:bg-slate-200"
          />
          {uploadingVideo && <p className="text-xs text-slate-400 mt-1">Mengunggah video…</p>}
          <Input
            className="mt-2"
            placeholder="/videos/nama-file.mp4"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>

        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Poster</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(e) => e.target.files?.[0] && handlePosterUpload(e.target.files[0])}
            disabled={uploadingPoster}
            className="text-xs text-slate-500 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-slate-100 file:text-xs file:font-semibold hover:file:bg-slate-200"
          />
          {uploadingPoster && <p className="text-xs text-slate-400 mt-1">Mengunggah poster…</p>}
          <Input
            className="mt-2"
            placeholder="/images/projects/nama-file.jpg"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Alt Text (ID)" hint="opsional">
          <Input value={alt} onChange={(e) => setAlt(e.target.value)} />
        </Field>
        <Field label="Alt Text (EN)" hint="opsional">
          <Input value={altEn} onChange={(e) => setAltEn(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
