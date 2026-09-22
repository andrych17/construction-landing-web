import { MetadataRoute } from 'next';
import { SITE_CONTACT } from '@/data/siteData';

/**
 * Selama konten masih placeholder (nama proyek & profil founder menyalin firma
 * lain, kontak belum diisi), indexing ditutup. Set SITE_CONTACT.isPlaceholder
 * ke false setelah konten Wonderful Works asli terpasang.
 */
export default function robots(): MetadataRoute.Robots {
  if (SITE_CONTACT.isPlaceholder) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://wwconstruction.id/sitemap.xml',
  };
}
