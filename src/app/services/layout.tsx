import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Layanan residential dan commercial building Wonderful Works Construction, dengan alur kerja 10 tahap dari konsultasi awal hingga garansi purna serah terima.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
