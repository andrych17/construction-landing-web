import { notFound, redirect } from 'next/navigation';
import { SectionEditor } from '@/components/admin/SectionEditor';
import { CONTENT_SECTIONS, isContentSectionKey } from '@/lib/content-sections';
import {
  getContact,
  getRotatingDisciplines,
  getPhilosophies,
  getFounders,
  getServices,
  getMethodology,
  getFaqs,
} from '@/lib/content';
import { db } from '@/lib/db';
import type { JsonValue } from '@/components/admin/JsonField';

const SECTION_FETCHERS: Record<string, () => Promise<unknown>> = {
  contact: getContact,
  rotatingDisciplines: getRotatingDisciplines,
  philosophies: getPhilosophies,
  founders: getFounders,
  services: getServices,
  methodology: getMethodology,
  faqs: getFaqs,
};

const HERO_KEYS = new Set(['heroHome', 'heroAbout', 'heroServices', 'heroProjects', 'heroContact']);

export const dynamic = 'force-dynamic';

export default async function ContentSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isContentSectionKey(key)) notFound();

  // Redirect legacy hero single-page URLs to the unified Hero manager
  if (HERO_KEYS.has(key)) {
    redirect(`/admin/hero?tab=${key}`);
  }

  const fetcher = SECTION_FETCHERS[key];
  if (!fetcher) notFound();

  const [value, meta] = await Promise.all([
    fetcher(),
    db.siteContent.findUnique({
      where: { key },
      select: { updatedAt: true, updatedBy: true },
    }),
  ]);
  const label = CONTENT_SECTIONS.find((s) => s.key === key)?.label ?? key;

  return (
    <SectionEditor
      sectionKey={key}
      label={label}
      initialValue={value as JsonValue}
      lastUpdated={
        meta?.updatedAt
          ? {
              at: meta.updatedAt.toISOString(),
              by: meta.updatedBy ?? undefined,
            }
          : undefined
      }
    />
  );
}
