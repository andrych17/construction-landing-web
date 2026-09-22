import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Hubungi Wonderful Works Construction untuk konsultasi perancangan dan konstruksi hunian mewah maupun bangunan komersial di Surabaya.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
