import type { Metadata } from 'next';
import { pageOg } from '@/lib/og';

const description =
  'Layanan rumah tinggal dan bangunan komersial Wonderful Works Construction, dengan alur kerja 10 tahap dari konsultasi awal sampai masa garansi.';

export const metadata: Metadata = {
  title: 'Services',
  description,
  alternates: { canonical: '/services' },
  openGraph: pageOg('Services', description, '/services'),
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
