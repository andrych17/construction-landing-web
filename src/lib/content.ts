import 'server-only';
import { db } from '@/lib/db';
import {
  SITE_CONTACT,
  ROTATING_DISCIPLINES,
  ROTATING_DISCIPLINES_EN,
  WW_PHILOSOPHIES,
  WW_FOUNDERS,
  CENTRA_SERVICES,
  MASTER_METHODOLOGY,
  WW_FAQS,
  WW_PROJECTS,
  type ProjectDetail,
  type FounderDetail,
  type FaqItem,
} from '@/data/siteData';

export type Contact = typeof SITE_CONTACT;
export type RotatingDisciplines = { id: string[]; en: string[] };
export type Philosophy = (typeof WW_PHILOSOPHIES)[number];
export type Service = (typeof CENTRA_SERVICES)[number];
export type MethodologyStep = (typeof MASTER_METHODOLOGY)[number];
export type { ProjectDetail, FounderDetail, FaqItem };

async function getSection<T>(key: string, fallback: T): Promise<T> {
  const row = await db.siteContent.findUnique({ where: { key } });
  return row ? (row.value as T) : fallback;
}

export const getContact = () => getSection<Contact>('contact', SITE_CONTACT);

export const getRotatingDisciplines = () =>
  getSection<RotatingDisciplines>('rotatingDisciplines', { id: ROTATING_DISCIPLINES, en: ROTATING_DISCIPLINES_EN });

export const getPhilosophies = () => getSection<Philosophy[]>('philosophies', WW_PHILOSOPHIES);

export const getFounders = () => getSection<FounderDetail[]>('founders', WW_FOUNDERS);

export const getServices = () => getSection<Service[]>('services', CENTRA_SERVICES);

export const getMethodology = () => getSection<MethodologyStep[]>('methodology', MASTER_METHODOLOGY);

export const getFaqs = () => getSection<FaqItem[]>('faqs', WW_FAQS);

function dbProjectToDetail(p: {
  title: string;
  category: string;
  categoryEn: string | null;
  location: string;
  img: string;
  desc: string;
  descEn: string | null;
  materials: string | null;
  materialsEn: string | null;
  specs: unknown;
  features: unknown;
  featuresEn: unknown;
  specsTable: unknown;
  specsTableEn: unknown;
}): ProjectDetail {
  return {
    title: p.title,
    category: p.category,
    categoryEn: p.categoryEn ?? undefined,
    location: p.location,
    img: p.img,
    desc: p.desc,
    descEn: p.descEn ?? undefined,
    materials: p.materials ?? undefined,
    materialsEn: p.materialsEn ?? undefined,
    specs: (p.specs as ProjectDetail['specs']) ?? undefined,
    features: (p.features as string[] | null) ?? undefined,
    featuresEn: (p.featuresEn as string[] | null) ?? undefined,
    specsTable: (p.specsTable as ProjectDetail['specsTable']) ?? undefined,
    specsTableEn: (p.specsTableEn as ProjectDetail['specsTable']) ?? undefined,
  };
}

/** Proyek terbit untuk halaman publik. Fallback ke data statis bila DB belum diseed. */
export async function getProjects(): Promise<ProjectDetail[]> {
  const rows = await db.project.findMany({
    where: { published: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  if (rows.length === 0) return WW_PROJECTS;
  return rows.map(dbProjectToDetail);
}

export type SiteData = {
  contact: Contact;
  rotatingDisciplines: RotatingDisciplines;
  philosophies: Philosophy[];
  founders: FounderDetail[];
  services: Service[];
  methodology: MethodologyStep[];
  faqs: FaqItem[];
  projects: ProjectDetail[];
};

/** Satu fetch gabungan dipakai sekali di root layout, lalu disebar via SiteContentContext. */
export async function getAllSiteContent(): Promise<SiteData> {
  const [contact, rotatingDisciplines, philosophies, founders, services, methodology, faqs, projects] =
    await Promise.all([
      getContact(),
      getRotatingDisciplines(),
      getPhilosophies(),
      getFounders(),
      getServices(),
      getMethodology(),
      getFaqs(),
      getProjects(),
    ]);
  return { contact, rotatingDisciplines, philosophies, founders, services, methodology, faqs, projects };
}
