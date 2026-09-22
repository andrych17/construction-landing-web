/** Daftar section SiteContent yang boleh diedit admin, dengan label untuk UI. */
export const CONTENT_SECTIONS = [
  { key: 'contact', label: 'Kontak & Alamat' },
  { key: 'rotatingDisciplines', label: 'Disiplin Studio (Hero)' },
  { key: 'philosophies', label: 'Filosofi Desain' },
  { key: 'founders', label: 'Founder' },
  { key: 'services', label: 'Layanan' },
  { key: 'methodology', label: 'Alur Kerja 10 Tahap' },
  { key: 'faqs', label: 'FAQ' },
] as const;

export type ContentSectionKey = (typeof CONTENT_SECTIONS)[number]['key'];

export const CONTENT_SECTION_KEYS: readonly string[] = CONTENT_SECTIONS.map((s) => s.key);

export function isContentSectionKey(key: string): key is ContentSectionKey {
  return (CONTENT_SECTION_KEYS as string[]).includes(key);
}
