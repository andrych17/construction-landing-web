'use client';

import type { ReactNode } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';

export function editorFrame({ children, puck }: { children: ReactNode; puck?: { isEditing?: boolean } }) {
  if (!puck?.isEditing) return <>{children}</>;
  return (
    <div className="relative min-h-screen bg-[#030303] text-neutral-100">
      <Navbar placement="absolute" />
      {children}
      <Footer />
    </div>
  );
}
