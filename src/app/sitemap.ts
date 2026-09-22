import { MetadataRoute } from 'next';

const BASE_URL = 'https://wwconstruction.id';

/**
 * Hanya rute nyata. Versi sebelumnya mendaftarkan anchor (`/#projects`,
 * `/#faq` — yang bahkan tidak ada) dan justru melewatkan seluruh halaman asli.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE_URL, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/projects`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
