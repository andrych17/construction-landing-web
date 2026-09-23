import { notFound } from 'next/navigation';
import { HomeComposer } from '@/components/admin/HomeComposer';
import { getPageHistory, getPageLayout, parsePageId } from '@/lib/content';

export default async function ComposePage({ params }: { params: Promise<{ page: string }> }) {
  const { page: raw } = await params;
  const page = parsePageId(raw);
  if (!page) notFound();
  const [data, history] = await Promise.all([getPageLayout(page), getPageHistory(page)]);
  return <HomeComposer page={page} initialData={data} history={history} />;
}
