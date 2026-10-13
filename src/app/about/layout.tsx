import type { Metadata } from 'next';
import { pageOg } from '@/lib/og';

const description =
  'Filosofi desain dan profil founder Wonderful Works Construction, studio rancang bangun di Surabaya.';

export const metadata: Metadata = {
  title: 'About Us',
  description,
  alternates: { canonical: '/about' },
  openGraph: pageOg('About Us', description, '/about'),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
