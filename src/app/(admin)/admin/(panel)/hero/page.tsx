import {
  getHeroHome,
  getHeroAbout,
  getHeroServices,
  getHeroProjects,
  getHeroContact,
  type HeroMediaValue,
} from '@/lib/content';
import { HeroMediaManager } from '@/components/admin/HeroMediaEditor';

export const dynamic = 'force-dynamic';

export default async function AdminHeroPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const [home, about, services, projects, contact] = await Promise.all([
    getHeroHome(),
    getHeroAbout(),
    getHeroServices(),
    getHeroProjects(),
    getHeroContact(),
  ]);

  const initialData: Record<string, HeroMediaValue> = {
    heroHome: home,
    heroAbout: about,
    heroServices: services,
    heroProjects: projects,
    heroContact: contact,
  };

  return <HeroMediaManager initialData={initialData} initialTab={params.tab} />;
}
