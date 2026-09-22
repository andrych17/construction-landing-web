'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef, FilterDef } from '@/components/admin/ui/DataTable';
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuEye,
  LuCircleCheck,
  LuClock,
  LuExternalLink,
  LuSparkles,
} from 'react-icons/lu';

export type ProjectRow = {
  id: string;
  slug?: string;
  title: string;
  location: string;
  category: string;
  img: string;
  published: boolean;
  order?: number;
  createdAt?: string | Date;
};

export function ProjectsTable({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();
  const [data, setData] = useState<ProjectRow[]>(projects);
  const [deletingProject, setDeletingProject] = useState<ProjectRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Quick toggle published status
  const handleTogglePublish = async (project: ProjectRow) => {
    const nextPublished = !project.published;
    setUpdatingId(project.id);
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: nextPublished }),
      });
      if (!res.ok) throw new Error('Gagal memperbarui status proyek.');
      setData((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: nextPublished } : p))
      );
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setUpdatingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${deletingProject.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal menghapus proyek.');
      setData((prev) => prev.filter((p) => p.id !== deletingProject.id));
      setDeletingProject(null);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Gagal menghapus proyek.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Unique categories for filter
  const categoryOptions = React.useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return cats.map((c) => ({ label: c, value: c }));
  }, [projects]);

  const filters: FilterDef<ProjectRow>[] = [
    {
      key: 'published',
      label: 'Status',
      options: [
        { label: 'Terbit (Live)', value: 'true' },
        { label: 'Draf', value: 'false' },
      ],
      filterFn: (row, val) => String(row.published) === val,
    },
    {
      key: 'category',
      label: 'Kategori',
      options: categoryOptions,
    },
  ];

  const columns: ColumnDef<ProjectRow>[] = [
    {
      header: 'No',
      className: 'w-12 text-slate-400 font-mono text-xs',
      cell: (_row, idx) => idx + 1,
    },
    {
      header: 'Pratinjau',
      className: 'w-20',
      cell: (row) => (
        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80 shadow-2xs group-hover:scale-105 transition-transform duration-200">
          {row.img ? (
            <Image src={row.img} alt={row.title} fill sizes="64px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <LuSparkles className="w-4 h-4" />
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Nama Proyek & Lokasi',
      accessorKey: 'title',
      sortable: true,
      cell: (row) => (
        <div className="min-w-0 py-1">
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/projects/${row.id}`}
              className="font-bold text-slate-900 hover:text-amber-600 transition-colors truncate text-sm"
            >
              {row.title}
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span>📍 {row.location}</span>
          </p>
        </div>
      ),
    },
    {
      header: 'Kategori',
      accessorKey: 'category',
      sortable: true,
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Status Publikasi',
      accessorKey: 'published',
      sortable: true,
      cell: (row) => {
        const isBusy = updatingId === row.id;
        return (
          <button
            type="button"
            onClick={() => handleTogglePublish(row)}
            disabled={isBusy}
            title={row.published ? 'Klik untuk ubah jadi Draf' : 'Klik untuk Terbitkan'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border ${
              row.published
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 shadow-2xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-300'
            } ${isBusy ? 'opacity-50 animate-pulse' : ''}`}
          >
            {row.published ? (
              <>
                <LuCircleCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Terbit (Live)</span>
              </>
            ) : (
              <>
                <LuClock className="w-3.5 h-3.5 text-slate-500" />
                <span>Draf</span>
              </>
            )}
          </button>
        );
      },
    },
    {
      header: 'Aksi',
      align: 'right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/projects`}
            target="_blank"
            title="Lihat di Web Publik"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <LuExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/projects/${row.id}`}
            title="Edit Proyek"
            className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
          >
            <LuPencil className="w-4 h-4" />
          </Link>
          <button
            type="button"
            title="Hapus Proyek"
            onClick={() => setDeletingProject(row)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LuTrash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Cari nama proyek, lokasi, atau kategori…"
        searchKeys={['title', 'location', 'category']}
        filters={filters}
        getItemId={(item) => item.id}
        emptyTitle="Belum Ada Proyek"
        emptyDescription="Silakan tambahkan portofolio proyek baru menggunakan tombol di atas."
        actions={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <LuPlus className="w-4 h-4" />
            <span>Tambah Proyek</span>
          </Link>
        }
      />

      {/* Modern Confirmation Delete Modal */}
      {deletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <LuTrash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Hapus Portofolio Proyek?</h3>
            <p className="text-sm text-slate-500 mb-6">
              Apakah Anda yakin ingin menghapus proyek{' '}
              <strong className="text-slate-900">"{deletingProject.title}"</strong>? Tindakan ini permanen dan tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingProject(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus…' : 'Ya, Hapus Proyek'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
