import { PageCanvas } from '@/components/pages/PageCanvas';
import { getPageLayout } from '@/lib/content';

export default async function ContactPage() {
  const data = await getPageLayout('contact');
  return <PageCanvas page="contact" data={data} />;
}
