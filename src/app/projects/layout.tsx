import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Portofolio proyek Wonderful Works Construction — hunian privat, showroom, dan gedung komersial di Surabaya dan Jawa Timur.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
