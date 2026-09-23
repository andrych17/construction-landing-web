import { db } from '@/lib/db';
import { PagePreview } from '@/components/admin/PagePreview';
import { ProjectsTable } from '@/components/admin/ProjectsTable';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Proyek</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{projects.length} portofolio proyek terdaftar.</p>
        </div>
        <PagePreview path="/projects#catalog" />
      </div>

      <div>
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
    </div>
  );
}
