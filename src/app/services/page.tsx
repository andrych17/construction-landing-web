import { PageCanvas } from '@/components/pages/PageCanvas';
import { getPageLayout } from '@/lib/content';

export default async function ServicesPage() {
  const data = await getPageLayout('services');
  return <PageCanvas page="services" data={data} />;
}
