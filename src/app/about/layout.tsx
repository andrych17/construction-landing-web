import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Studio ethos, filosofi desain, dan founder ww.cons — arsitektur, interior, dan general contracting di Surabaya.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
