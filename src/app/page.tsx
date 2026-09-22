'use client';

import { useLayoutMode } from '@/context/LayoutContext';
import CorporateLayout from '@/components/layouts/CorporateLayout';
import MonographLayout from '@/components/layouts/MonographLayout';
import BlueprintLayout from '@/components/layouts/BlueprintLayout';
import EditorialLayout from '@/components/layouts/EditorialLayout';
import LuxuryLayout from '@/components/layouts/LuxuryLayout';
import BarcwayLayout from '@/components/layouts/BarcwayLayout';
import CentraBarcwayLayout from '@/components/layouts/CentraBarcwayLayout';
import LayoutSwitcher from '@/components/LayoutSwitcher';

export default function Home() {
  const { currentLayout } = useLayoutMode();

  return (
    <main className="min-h-screen">
      {currentLayout === 'fusion' && <CentraBarcwayLayout />}
      {currentLayout === 'corporate' && <CorporateLayout />}
      {currentLayout === 'monograph' && <MonographLayout />}
      {currentLayout === 'blueprint' && <BlueprintLayout />}
      {currentLayout === 'editorial' && <EditorialLayout />}
      {currentLayout === 'luxury' && <LuxuryLayout />}
      {currentLayout === 'barcway' && <BarcwayLayout />}
      <LayoutSwitcher />
    </main>
  );
}
