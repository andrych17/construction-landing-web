/** Susunan section per halaman. Teks CMS lain tetap di `useSiteContent`.
 *  Kalimat hero yang boleh diedit ada di props blok, bukan di kode. */

export const HOME_LAYOUT_KEY = 'homeLayout';
export const HOME_LAYOUT_PREVIOUS_KEY = 'homeLayoutPrevious';
export const MAX_HOME_BLOCKS = 20;
export const HISTORY_LIMIT = 8;
export const COPY_MAX = 600;

export const PAGES = [
  { id: 'home', label: 'Beranda', path: '/' },
  { id: 'about', label: 'Tentang Kami', path: '/about' },
  { id: 'services', label: 'Layanan', path: '/services' },
  { id: 'projects', label: 'Proyek', path: '/projects' },
  { id: 'contact', label: 'Kontak', path: '/contact' },
] as const;

export type PageId = (typeof PAGES)[number]['id'];

export const PAGE_BLOCKS = {
  home: [
    { type: 'Hero', label: 'Hero', anchor: 'hero' },
    { type: 'About', label: 'Tentang Kami', anchor: 'about' },
    { type: 'Philosophy', label: 'Filosofi Desain', anchor: 'philosophy' },
    { type: 'Founder', label: 'Founder', anchor: 'founder' },
    { type: 'Services', label: 'Layanan', anchor: 'services' },
    { type: 'Projects', label: 'Proyek Pilihan', anchor: 'projects' },
    { type: 'Contact', label: 'Kontak', anchor: 'contact' },
  ],
  about: [
    { type: 'AboutHero', label: 'Hero', anchor: 'hero' },
    { type: 'AboutNarrative', label: 'Narasi', anchor: 'narrative' },
    { type: 'AboutPhilosophy', label: 'Filosofi', anchor: 'philosophy' },
    { type: 'AboutFounder', label: 'Founder', anchor: 'founder' },
    { type: 'AboutCta', label: 'Ajakan', anchor: 'cta' },
  ],
  services: [
    { type: 'ServicesHero', label: 'Hero', anchor: 'hero' },
    { type: 'ServicesOverview', label: 'Ringkasan', anchor: 'overview' },
    { type: 'ServicesPillars', label: 'Tipologi', anchor: 'pillars' },
    { type: 'ServicesMethod', label: 'Alur Kerja', anchor: 'method' },
    { type: 'ServicesBenchmarks', label: 'Standar', anchor: 'benchmarks' },
    { type: 'ServicesFaq', label: 'FAQ', anchor: 'faqs' },
    { type: 'ServicesCta', label: 'Ajakan', anchor: 'cta' },
  ],
  projects: [
    { type: 'ProjectsHero', label: 'Hero', anchor: 'hero' },
    { type: 'ProjectsCatalog', label: 'Katalog', anchor: 'catalog' },
  ],
  contact: [{ type: 'ContactStudio', label: 'Studio & Formulir', anchor: 'contact' }],
} as const;

const COPY_FIELDS: Record<string, readonly string[]> = {
  Hero: ['line1Id', 'line1En', 'line2Id', 'line2En', 'line3Id', 'line3En', 'introId', 'introEn'],
  AboutHero: ['titleId', 'titleEn', 'ledeId', 'ledeEn'],
  ServicesHero: ['titleId', 'titleEn', 'ledeId', 'ledeEn'],
  ProjectsHero: ['titleId', 'titleEn', 'ledeId', 'ledeEn'],
  ContactStudio: ['titleId', 'titleEn', 'ledeId', 'ledeEn'],
};

const ANCHORS: Record<string, string> = {};
for (const blocks of Object.values(PAGE_BLOCKS)) {
  for (const block of blocks) ANCHORS[block.type] = block.anchor;
}

export const HOME_BLOCKS = PAGE_BLOCKS.home;
export type HomeBlockType = (typeof HOME_BLOCKS)[number]['type'];

export type HomeLayoutBlock = {
  type: string;
  props: { id: string } & Record<string, string>;
};

export type HomeLayoutData = {
  root: { props?: Record<string, unknown> };
  content: HomeLayoutBlock[];
  zones: Record<string, HomeLayoutBlock[]>;
};

export type LayoutRevision = {
  at: string;
  data: HomeLayoutData;
};

export type HistorySummary = { at: string; blocks: string[] };

export function isPageId(value: string): value is PageId {
  return PAGES.some((page) => page.id === value);
}

export function layoutStorageKey(page: PageId): string {
  return page === 'home' ? HOME_LAYOUT_KEY : `layout${page[0].toUpperCase()}${page.slice(1)}`;
}

export function historyStorageKey(page: PageId): string {
  return `${layoutStorageKey(page)}History`;
}

export function defaultPageLayout(page: PageId): HomeLayoutData {
  return {
    root: { props: {} },
    content: PAGE_BLOCKS[page].map((block) => ({ type: block.type, props: { id: block.type } })),
    zones: {},
  };
}

export function defaultHomeLayout(): HomeLayoutData {
  return defaultPageLayout('home');
}

function allowedTypes(page: PageId): readonly string[] {
  return PAGE_BLOCKS[page].map((block) => block.type);
}

function safeBlockId(raw: unknown, fallback: string): string {
  const source = typeof raw === 'string' ? raw : '';
  const cleaned = source.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
  return cleaned || fallback;
}

function copyProps(type: string, raw: unknown): Record<string, string> {
  const keys = COPY_FIELDS[type] ?? [];
  if (!raw || typeof raw !== 'object') return {};
  const source = raw as Record<string, unknown>;
  const props: Record<string, string> = {};
  for (const key of keys) {
    const value = source[key];
    if (typeof value !== 'string') continue;
    const cleaned = value.replace(/[\u0000-\u001F]/g, '').trim().slice(0, COPY_MAX);
    if (cleaned) props[key] = cleaned;
  }
  return props;
}

/** Anchor HTML unik. Salinan pertama mempertahankan `#contact` dan sejenisnya. */
export function sectionAnchor(type: string, puckId: string): string {
  const base = ANCHORS[type] ?? 'section';
  if (puckId === type) return base;
  const suffix = safeBlockId(puckId, '');
  if (!suffix || suffix === type || suffix === base) return `${base}-2`;
  return `${base}-${suffix}`;
}

export function layoutsEqual(a: HomeLayoutData, b: HomeLayoutData): boolean {
  return JSON.stringify(a.content) === JSON.stringify(b.content);
}

export function sanitizePageLayout(page: PageId, value: unknown): HomeLayoutData | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const raw = (value as { content?: unknown }).content;
  if (!Array.isArray(raw)) return null;

  const allowed = allowedTypes(page);
  const seen = new Set<string>();
  const content: HomeLayoutBlock[] = [];

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const type = (item as { type?: unknown }).type;
    if (typeof type !== 'string' || !allowed.includes(type)) continue;

    const rawProps = (item as { props?: unknown }).props;
    const rawId = rawProps && typeof rawProps === 'object' ? (rawProps as { id?: unknown }).id : undefined;
    const base = safeBlockId(rawId, type);
    let id = base;
    let n = 2;
    while (seen.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    seen.add(id);
    content.push({ type, props: { id, ...copyProps(type, rawProps) } });
  }

  return { root: { props: {} }, content, zones: {} };
}

export function sanitizeHomeLayout(value: unknown): HomeLayoutData | null {
  return sanitizePageLayout('home', value);
}

export function publishPageLayout(
  page: PageId,
  value: unknown,
): { ok: true; data: HomeLayoutData } | { ok: false; error: string } {
  const label = PAGES.find((item) => item.id === page)?.label ?? 'Halaman';
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, error: `Susunan ${label} tidak valid.` };
  }
  const raw = (value as { content?: unknown }).content;
  if (!Array.isArray(raw)) {
    return { ok: false, error: `Susunan ${label} tidak valid.` };
  }
  if (raw.length > MAX_HOME_BLOCKS) {
    return { ok: false, error: `Maksimal ${MAX_HOME_BLOCKS} section.` };
  }
  const data = sanitizePageLayout(page, value);
  if (!data || data.content.length !== raw.length) {
    return { ok: false, error: 'Ada section yang tidak dikenal.' };
  }
  if (data.content.length === 0) {
    return { ok: false, error: `${label} tidak boleh kosong. Sisakan minimal satu section.` };
  }
  return { ok: true, data };
}

export function publishHomeLayout(value: unknown) {
  return publishPageLayout('home', value);
}

export function sanitizeHistory(page: PageId, value: unknown): LayoutRevision[] {
  if (!Array.isArray(value)) return [];
  const revisions: LayoutRevision[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const at = (item as { at?: unknown }).at;
    const data = sanitizePageLayout(page, (item as { data?: unknown }).data);
    if (typeof at !== 'string' || !data || data.content.length === 0) continue;
    revisions.push({ at: at.slice(0, 40), data });
    if (revisions.length >= HISTORY_LIMIT) break;
  }
  return revisions;
}
