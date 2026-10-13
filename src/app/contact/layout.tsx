import type { Metadata } from 'next';
import { pageOg } from '@/lib/og';

const description =
  'Hubungi Wonderful Works Construction untuk konsultasi desain dan konstruksi rumah tinggal atau bangunan komersial di Surabaya, Sidoarjo, dan Gresik.';

export const metadata: Metadata = {
  title: 'Contact Us',
  description,
  alternates: { canonical: '/contact' },
  openGraph: pageOg('Contact Us', description, '/contact'),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
