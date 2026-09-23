import { PageCanvas } from '@/components/pages/PageCanvas';
import { getPageLayout } from '@/lib/content';

export default async function AboutPage() {
  const data = await getPageLayout('about');
  return <PageCanvas page="about" data={data} />;
}
