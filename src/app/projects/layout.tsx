import type { Metadata } from 'next';
import { pageOg } from '@/lib/og';

const description =
  'Portofolio proyek Wonderful Works Construction: rumah tinggal, showroom, dan gedung komersial.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: pageOg('Projects', description, '/projects'),
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
