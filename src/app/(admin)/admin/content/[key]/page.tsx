import { notFound } from 'next/navigation';
import { SectionEditor } from '@/components/admin/SectionEditor';
import { HeroMediaEditor } from '@/components/admin/HeroMediaEditor';
import { CONTENT_SECTIONS, isContentSectionKey } from '@/lib/content-sections';
import {
  getContact,
  getRotatingDisciplines,
  getPhilosophies,
  getFounders,
  getServices,
  getMethodology,
  getFaqs,
  getHeroHome,
  getHeroAbout,
  getHeroServices,
  getHeroProjects,
  getHeroContact,
  type HeroMediaValue,
} from '@/lib/content';
import type { JsonValue } from '@/components/admin/JsonField';

const SECTION_FETCHERS: Record<string, () => Promise<unknown>> = {
  contact: getContact,
  rotatingDisciplines: getRotatingDisciplines,
  philosophies: getPhilosophies,
  founders: getFounders,
  services: getServices,
  methodology: getMethodology,
  faqs: getFaqs,
  heroHome: getHeroHome,
  heroAbout: getHeroAbout,
  heroServices: getHeroServices,
  heroProjects: getHeroProjects,
  heroContact: getHeroContact,
};

const HERO_KEYS = new Set(['heroHome', 'heroAbout', 'heroServices', 'heroProjects', 'heroContact']);
const HERO_PREVIEW_PATH: Record<string, string> = {
  heroHome: '/',
  heroAbout: '/about',
  heroServices: '/services',
  heroProjects: '/projects',
  heroContact: '/contact',
};

export const dynamic = 'force-dynamic';

export default async function ContentSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isContentSectionKey(key)) notFound();

  const value = await SECTION_FETCHERS[key]();
  const label = CONTENT_SECTIONS.find((s) => s.key === key)?.label ?? key;

  if (HERO_KEYS.has(key)) {
    return (
      <HeroMediaEditor
        sectionKey={key}
        label={label}
        initialValue={value as HeroMediaValue}
        previewPath={HERO_PREVIEW_PATH[key]}
      />
    );
  }

  return <SectionEditor sectionKey={key} label={label} initialValue={value as JsonValue} />;
}
