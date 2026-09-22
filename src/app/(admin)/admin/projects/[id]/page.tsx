import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { ProjectForm } from '@/components/admin/ProjectForm';
import type { ProjectInput } from '@/lib/project-schema';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  const initialData: Partial<ProjectInput> = {
    title: project.title,
    category: project.category,
    categoryEn: project.categoryEn ?? '',
    location: project.location,
    img: project.img,
    desc: project.desc,
    descEn: project.descEn ?? '',
    materials: project.materials ?? '',
    materialsEn: project.materialsEn ?? '',
    specs: project.specs as ProjectInput['specs'],
    features: project.features as string[] | undefined,
    featuresEn: project.featuresEn as string[] | undefined,
    specsTable: project.specsTable as ProjectInput['specsTable'],
    specsTableEn: project.specsTableEn as ProjectInput['specsTableEn'],
    published: project.published,
  };

  return <ProjectForm mode="edit" projectId={project.id} initialData={initialData} />;
}
