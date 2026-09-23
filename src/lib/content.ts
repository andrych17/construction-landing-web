import 'server-only';
import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import {
  defaultPageLayout,
  HISTORY_LIMIT,
  historyStorageKey,
  HOME_LAYOUT_PREVIOUS_KEY,
  isPageId,
  layoutStorageKey,
  layoutsEqual,
  sanitizeHistory,
  sanitizePageLayout,
  type HomeLayoutData,
  type HistorySummary,
  type LayoutRevision,
  type PageId,
} from '@/lib/home-layout';
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
  DEFAULT_HERO_HOME,
  DEFAULT_HERO_ABOUT,
  DEFAULT_HERO_SERVICES,
  DEFAULT_HERO_PROJECTS,
  DEFAULT_HERO_CONTACT,
  type ProjectDetail,
  type FounderDetail,
  type FaqItem,
  type HeroMediaValue,
} from '@/data/siteData';

export type Contact = typeof SITE_CONTACT;
export type RotatingDisciplines = { id: string[]; en: string[] };
export type Philosophy = (typeof WW_PHILOSOPHIES)[number];
export type Service = (typeof CENTRA_SERVICES)[number];
export type MethodologyStep = (typeof MASTER_METHODOLOGY)[number];
export type { ProjectDetail, FounderDetail, FaqItem, HeroMediaValue };

async function getSection<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db.siteContent.findUnique({ where: { key } });
    return row ? (row.value as T) : fallback;
  } catch {
    return fallback;
  }
}

export const getContact = () => getSection<Contact>('contact', SITE_CONTACT);

export const getRotatingDisciplines = () =>
  getSection<RotatingDisciplines>('rotatingDisciplines', { id: ROTATING_DISCIPLINES, en: ROTATING_DISCIPLINES_EN });

export const getPhilosophies = () => getSection<Philosophy[]>('philosophies', WW_PHILOSOPHIES);

export const getFounders = () => getSection<FounderDetail[]>('founders', WW_FOUNDERS);

export const getServices = () => getSection<Service[]>('services', CENTRA_SERVICES);

export const getMethodology = () => getSection<MethodologyStep[]>('methodology', MASTER_METHODOLOGY);

export const getFaqs = () => getSection<FaqItem[]>('faqs', WW_FAQS);

export const getHeroHome = () => getSection<HeroMediaValue>('heroHome', DEFAULT_HERO_HOME);
export const getHeroAbout = () => getSection<HeroMediaValue>('heroAbout', DEFAULT_HERO_ABOUT);
export const getHeroServices = () => getSection<HeroMediaValue>('heroServices', DEFAULT_HERO_SERVICES);
export const getHeroProjects = () => getSection<HeroMediaValue>('heroProjects', DEFAULT_HERO_PROJECTS);
export const getHeroContact = () => getSection<HeroMediaValue>('heroContact', DEFAULT_HERO_CONTACT);

function asJson(data: unknown): Prisma.InputJsonValue {
  return data as Prisma.InputJsonValue;
}

async function readStoredLayout(page: PageId): Promise<HomeLayoutData | null> {
  const row = await db.siteContent.findUnique({ where: { key: layoutStorageKey(page) } });
  if (!row) return null;
  const parsed = sanitizePageLayout(page, row.value);
  if (!parsed || parsed.content.length === 0) return null;
  return parsed;
}

async function readHistory(page: PageId): Promise<LayoutRevision[]> {
  const row = await db.siteContent.findUnique({ where: { key: historyStorageKey(page) } });
  const stored = row ? sanitizeHistory(page, row.value) : [];
  if (stored.length > 0 || page !== 'home') return stored;
  const legacy = await db.siteContent.findUnique({ where: { key: HOME_LAYOUT_PREVIOUS_KEY } });
  if (!legacy) return [];
  const legacyLayout = sanitizePageLayout('home', legacy.value);
  if (!legacyLayout || legacyLayout.content.length === 0) return [];
  return [{ at: legacy.updatedAt.toISOString(), data: legacyLayout }];
}

function summarize(history: LayoutRevision[]): HistorySummary[] {
  return history.map((revision) => ({
    at: revision.at,
    blocks: revision.data.content.map((block) => block.type),
  }));
}

export async function getPageLayout(page: PageId): Promise<HomeLayoutData> {
  try {
    return (await readStoredLayout(page)) ?? defaultPageLayout(page);
  } catch {
    return defaultPageLayout(page);
  }
}

export async function getPageHistory(page: PageId): Promise<HistorySummary[]> {
  try {
    return summarize(await readHistory(page));
  } catch {
    return [];
  }
}

export async function getHomeLayout(): Promise<HomeLayoutData> {
  return getPageLayout('home');
}

export async function savePageLayout(page: PageId, next: HomeLayoutData): Promise<{ history: HistorySummary[] }> {
  const current = await readStoredLayout(page);
  let history = await readHistory(page);
  if (current && !layoutsEqual(current, next)) {
    history = [{ at: new Date().toISOString(), data: current }, ...history.filter((item) => !layoutsEqual(item.data, current))].slice(0, HISTORY_LIMIT);
  }
  const writes = [
    db.siteContent.upsert({
      where: { key: layoutStorageKey(page) },
      create: { key: layoutStorageKey(page), value: asJson(next) },
      update: { value: asJson(next) },
    }),
    db.siteContent.upsert({
      where: { key: historyStorageKey(page) },
      create: { key: historyStorageKey(page), value: asJson(history) },
      update: { value: asJson(history) },
    }),
  ];
  await db.$transaction(writes);
  if (page === 'home') {
    await db.siteContent.deleteMany({ where: { key: HOME_LAYOUT_PREVIOUS_KEY } });
  }
  return { history: summarize(history) };
}

export async function restorePageRevision(
  page: PageId,
  index: number,
): Promise<{ value: HomeLayoutData; history: HistorySummary[] } | null> {
  const history = await readHistory(page);
  const picked = history[index];
  if (!picked) return null;
  const current = (await readStoredLayout(page)) ?? defaultPageLayout(page);
  const nextHistory = layoutsEqual(current, picked.data)
    ? history
    : [{ at: new Date().toISOString(), data: current }, ...history.filter((_, itemIndex) => itemIndex !== index)].slice(0, HISTORY_LIMIT);
  await db.$transaction([
    db.siteContent.upsert({
      where: { key: layoutStorageKey(page) },
      create: { key: layoutStorageKey(page), value: asJson(picked.data) },
      update: { value: asJson(picked.data) },
    }),
    db.siteContent.upsert({
      where: { key: historyStorageKey(page) },
      create: { key: historyStorageKey(page), value: asJson(nextHistory) },
      update: { value: asJson(nextHistory) },
    }),
  ]);
  if (page === 'home') {
    await db.siteContent.deleteMany({ where: { key: HOME_LAYOUT_PREVIOUS_KEY } });
  }
  return { value: picked.data, history: summarize(nextHistory) };
}

export function parsePageId(value: string): PageId | null {
  return isPageId(value) ? value : null;
}

function dbProjectToDetail(p: {
  title: string;
  category: string;
  categoryEn: string | null;
  location: string;
  img: string;
  gallery: unknown;
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
    gallery: (p.gallery as string[] | null) ?? undefined,
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

/** Proyek terbit untuk halaman publik. Fallback ke data statis bila DB belum diseed atau saat build. */
export async function getProjects(): Promise<ProjectDetail[]> {
  try {
    const rows = await db.project.findMany({
      where: { published: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
    if (rows.length === 0) return WW_PROJECTS;
    return rows.map(dbProjectToDetail);
  } catch {
    return WW_PROJECTS;
  }
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
  hero: {
    home: HeroMediaValue;
    about: HeroMediaValue;
    services: HeroMediaValue;
    projects: HeroMediaValue;
    contact: HeroMediaValue;
  };
};

/** Satu fetch gabungan dipakai sekali di root layout, lalu disebar via SiteContentContext. */
export async function getAllSiteContent(): Promise<SiteData> {
  const [
    contact,
    rotatingDisciplines,
    philosophies,
    founders,
    services,
    methodology,
    faqs,
    projects,
    heroHome,
    heroAbout,
    heroServices,
    heroProjects,
    heroContact,
  ] = await Promise.all([
    getContact(),
    getRotatingDisciplines(),
    getPhilosophies(),
    getFounders(),
    getServices(),
    getMethodology(),
    getFaqs(),
    getProjects(),
    getHeroHome(),
    getHeroAbout(),
    getHeroServices(),
    getHeroProjects(),
    getHeroContact(),
  ]);
  return {
    contact,
    rotatingDisciplines,
    philosophies,
    founders,
    services,
    methodology,
    faqs,
    projects,
    hero: { home: heroHome, about: heroAbout, services: heroServices, projects: heroProjects, contact: heroContact },
  };
}
