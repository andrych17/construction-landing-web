import Link from 'next/link';
import { db } from '@/lib/db';
import { CONTENT_SECTIONS } from '@/lib/content-sections';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [projectCount, publishedCount] = await Promise.all([
    db.project.count(),
    db.project.count({ where: { published: true } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Kelola proyek dan teks yang tampil di situs publik.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors"
        >
          <span className="text-3xl font-bold text-slate-900">{projectCount}</span>
          <p className="text-sm font-semibold text-slate-700 mt-1">Proyek</p>
          <p className="text-xs text-slate-400">{publishedCount} terbit · {projectCount - publishedCount} draf</p>
        </Link>

        <Link
          href="/admin/content"
          className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors"
        >
          <span className="text-3xl font-bold text-slate-900">{CONTENT_SECTIONS.length}</span>
          <p className="text-sm font-semibold text-slate-700 mt-1">Section Konten Teks</p>
          <p className="text-xs text-slate-400">Kontak, filosofi, founder, layanan, FAQ, dll.</p>
        </Link>
      </div>
    </div>
  );
}
