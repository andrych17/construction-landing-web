import { notFound } from 'next/navigation';
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

export default async function ContentSectionPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!isContentSectionKey(key)) notFound();

  const value = (await SECTION_FETCHERS[key]()) as JsonValue;
  const label = CONTENT_SECTIONS.find((s) => s.key === key)?.label ?? key;

  return <SectionEditor sectionKey={key} label={label} initialValue={value} />;
}
