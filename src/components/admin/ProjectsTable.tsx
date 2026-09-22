'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/admin/ui/Button';

type ProjectRow = {
  id: string;
  title: string;
  location: string;
  category: string;
  img: string;
  published: boolean;
};

export function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus proyek "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus proyek.');
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Gagal menghapus proyek.');
    } finally {
      setDeletingId(null);
    }
  };

  if (projects.length === 0) {
    return <p className="text-sm text-slate-500">Belum ada proyek.</p>;
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
      {projects.map((p) => (
        <div key={p.id} className="flex items-center gap-4 p-4">
          <div className="relative w-16 h-12 rounded-md overflow-hidden bg-slate-100 shrink-0">
            {p.img && <Image src={p.img} alt="" fill className="object-cover" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate">{p.title}</p>
            <p className="text-xs text-slate-400">
              {p.category} · {p.location}
            </p>
          </div>
          <span
            className={`text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
              p.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {p.published ? 'Terbit' : 'Draf'}
          </span>
          <Link
            href={`/admin/projects/${p.id}`}
            className="text-xs font-semibold text-slate-600 hover:text-amber-600 min-h-[36px] flex items-center px-2"
          >
            Edit
          </Link>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => handleDelete(p.id, p.title)}
            disabled={deletingId === p.id}
          >
            {deletingId === p.id ? '…' : 'Hapus'}
          </Button>
        </div>
      ))}
    </div>
  );
}
