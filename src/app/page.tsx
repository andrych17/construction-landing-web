import { PageCanvas } from '@/components/pages/PageCanvas';
import { getPageLayout } from '@/lib/content';

export default async function Home() {
  const data = await getPageLayout('home');

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      <PageCanvas page="home" data={data} />
    </main>
  );
}
