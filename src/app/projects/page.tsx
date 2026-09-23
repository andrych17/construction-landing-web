import { PageCanvas } from '@/components/pages/PageCanvas';
import { getPageLayout } from '@/lib/content';

export default async function ProjectsPage() {
  const data = await getPageLayout('projects');
  return <PageCanvas page="projects" data={data} />;
}
