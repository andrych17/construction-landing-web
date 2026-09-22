import { MetadataRoute } from 'next';

const BASE_URL = 'https://wwconstruction.id';

/**
 * Top-Score Multilingual XML Sitemap with alternate hreflang support.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/services', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => {
    const url = `${BASE_URL}${path}`;
    return {
      url,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          id: url,
          en: url,
        },
      },
    };
  });
}
