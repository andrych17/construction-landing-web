import type { Metadata } from 'next';

const SITE = 'https://wwconstruction.id';
const BRAND = 'Wonderful Works Construction';

// A section's `openGraph` replaces the root layout's whole block, so url and image have to be passed again.
export function pageOg(title: string, description: string, path: string): NonNullable<Metadata['openGraph']> {
  return {
    title: `${title} | ${BRAND}`,
    description,
    url: `${SITE}${path}`,
    siteName: BRAND,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: `${SITE}/images/og-image.jpg`,
        secureUrl: `${SITE}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: `${BRAND} - Building Spaces That Last`,
      },
    ],
  };
}
