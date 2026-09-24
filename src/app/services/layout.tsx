import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Layanan rumah tinggal dan bangunan komersial Wonderful Works Construction, dengan alur kerja 10 tahap dari konsultasi awal sampai masa garansi.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
