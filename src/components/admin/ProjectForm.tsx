'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { JsonField, type JsonValue } from '@/components/admin/JsonField';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { Button } from '@/components/admin/ui/Button';
import type { ProjectInput } from '@/lib/project-schema';

type ProjectFormData = ProjectInput;

const DEFAULT_SPECS = { landArea: '', buildingArea: '', levels: '', year: '', concreteGrade: '' };

export function ProjectForm({
  mode,
  projectId,
  initialData,
}: {
  mode: 'create' | 'edit';
  projectId?: string;
  initialData?: Partial<ProjectFormData>;
}) {
  const router = useRouter();
  const [data, setData] = useState<ProjectFormData>({
    title: initialData?.title ?? '',
    category: initialData?.category ?? '',
    categoryEn: initialData?.categoryEn ?? '',
    location: initialData?.location ?? '',
    img: initialData?.img ?? '',
    desc: initialData?.desc ?? '',
    descEn: initialData?.descEn ?? '',
    materials: initialData?.materials ?? '',
    materialsEn: initialData?.materialsEn ?? '',
    specs: initialData?.specs ?? DEFAULT_SPECS,
    features: initialData?.features ?? [],
    featuresEn: initialData?.featuresEn ?? [],
    specsTable: initialData?.specsTable ?? [],
    specsTableEn: initialData?.specsTableEn ?? [],
    published: initialData?.published ?? true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleUpload = async (file: File) => {
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
      set('img', body.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const url = mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${projectId}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Gagal menyimpan proyek.');
      }
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan proyek.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-16">
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-slate-200 z-10">
        <h1 className="text-lg font-bold text-slate-900">{mode === 'create' ? 'Proyek Baru' : 'Edit Proyek'}</h1>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <input
              type="checkbox"
              checked={data.published ?? true}
              onChange={(e) => set('published', e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
            Terbit
          </label>
          <Button type="submit" disabled={saving}>
            {saving ? 'Menyimpan…' : 'Simpan'}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Judul Proyek">
          <Input required value={data.title} onChange={(e) => set('title', e.target.value)} />
        </Field>
        <Field label="Lokasi">
          <Input required value={data.location} onChange={(e) => set('location', e.target.value)} />
        </Field>
        <Field label="Kategori (ID)">
          <Input required value={data.category} onChange={(e) => set('category', e.target.value)} />
        </Field>
        <Field label="Kategori (EN)">
          <Input value={data.categoryEn ?? ''} onChange={(e) => set('categoryEn', e.target.value)} />
        </Field>
      </div>

      <div>
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Foto Utama</span>
        <div className="flex items-start gap-4">
          {data.img && (
            <div className="relative w-32 h-24 rounded-md overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
              <Image src={data.img} alt="" fill className="object-cover" />
            </div>
          )}
          <div className="space-y-2">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              disabled={uploading}
              className="text-xs text-slate-500 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-slate-100 file:text-xs file:font-semibold hover:file:bg-slate-200"
            />
            {uploading && <p className="text-xs text-slate-400">Mengunggah…</p>}
            <Input placeholder="/images/projects/nama-file.jpg" value={data.img} onChange={(e) => set('img', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Deskripsi (ID)">
          <Textarea required value={data.desc} onChange={(e) => set('desc', e.target.value)} />
        </Field>
        <Field label="Deskripsi (EN)">
          <Textarea value={data.descEn ?? ''} onChange={(e) => set('descEn', e.target.value)} />
        </Field>
        <Field label="Material (ID)">
          <Textarea value={data.materials ?? ''} onChange={(e) => set('materials', e.target.value)} />
        </Field>
        <Field label="Material (EN)">
          <Textarea value={data.materialsEn ?? ''} onChange={(e) => set('materialsEn', e.target.value)} />
        </Field>
      </div>

      <JsonField fieldKey="Spesifikasi" value={(data.specs ?? DEFAULT_SPECS) as JsonValue} onChange={(v) => set('specs', v as ProjectFormData['specs'])} />
      <JsonField fieldKey="Fitur (ID)" value={(data.features ?? []) as JsonValue} onChange={(v) => set('features', v as string[])} />
      <JsonField fieldKey="Fitur (EN)" value={(data.featuresEn ?? []) as JsonValue} onChange={(v) => set('featuresEn', v as string[])} />
      <JsonField fieldKey="Tabel Spesifikasi (ID)" value={(data.specsTable ?? []) as JsonValue} onChange={(v) => set('specsTable', v as ProjectFormData['specsTable'])} />
      <JsonField fieldKey="Tabel Spesifikasi (EN)" value={(data.specsTableEn ?? []) as JsonValue} onChange={(v) => set('specsTableEn', v as ProjectFormData['specsTableEn'])} />
    </form>
  );
}
