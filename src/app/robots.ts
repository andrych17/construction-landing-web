import { MetadataRoute } from 'next';

/**
 * Top-Score SEO & AI Search (AEO/GEO/AIO) Robots Specification.
 * Explicitly allows standard web search engines and high-authority AI answer engines
 * (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://wwconstruction.id/sitemap.xml',
    host: 'https://wwconstruction.id',
  };
}
