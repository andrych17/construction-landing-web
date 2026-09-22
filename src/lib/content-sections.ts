/** Daftar section SiteContent untuk teks CMS yang boleh diedit admin di submenu CMS Konten Teks */
export const CONTENT_SECTIONS = [
  { key: 'contact', label: 'Kontak & Alamat' },
  { key: 'rotatingDisciplines', label: 'Disiplin Studio (Hero)' },
  { key: 'philosophies', label: 'Filosofi Desain' },
  { key: 'founders', label: 'Founder' },
  { key: 'services', label: 'Layanan' },
  { key: 'methodology', label: 'Alur Kerja 10 Tahap' },
  { key: 'faqs', label: 'FAQ' },
] as const;

/** Daftar Hero media untuk 5 halaman publik */
export const HERO_PAGES = [
  { key: 'heroHome', label: 'Beranda', path: '/', defaultName: 'hero.mp4' },
  { key: 'heroAbout', label: 'Tentang Kami', path: '/about', defaultName: 'material-detail.mp4' },
  { key: 'heroServices', label: 'Layanan', path: '/services', defaultName: 'concrete-structure.mp4' },
  { key: 'heroProjects', label: 'Proyek', path: '/projects', defaultName: 'villa-dusk.mp4' },
  { key: 'heroContact', label: 'Kontak', path: '/contact', defaultName: 'villa-dusk.mp4' },
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number]['key'];
export type HeroPageKey = (typeof HERO_PAGES)[number]['key'];

export const CONTENT_SECTION_KEYS: readonly string[] = [
  ...CONTENT_SECTIONS.map((s) => s.key),
  ...HERO_PAGES.map((h) => h.key),
];

export function isContentSectionKey(key: string): boolean {
  return (CONTENT_SECTION_KEYS as string[]).includes(key);
}
