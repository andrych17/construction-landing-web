import Link from 'next/link';
import { db } from '@/lib/db';
import { ProjectsTable } from '@/components/admin/ProjectsTable';

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Proyek</h1>
          <p className="text-sm text-slate-500">{projects.length} proyek.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2.5 min-h-[44px] rounded-md bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold transition-colors"
        >
          + Proyek Baru
        </Link>
      </div>

      <ProjectsTable
        projects={projects.map((p) => ({
          id: p.id,
          title: p.title,
          location: p.location,
          category: p.category,
          img: p.img,
          published: p.published,
        }))}
      />
    </div>
  );
}
