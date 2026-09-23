'use client';

import type { ReactElement } from 'react';
import type { Config } from '@puckeditor/core';
import { sectionAnchor, type PageId } from '@/lib/home-layout';
import { editorFrame } from '@/components/pages/editor-frame';
import { homePuckConfig } from '@/components/home/puck-config';
import {
  AboutCtaSection,
  AboutFounderSection,
  AboutHeroSection,
  AboutNarrativeSection,
  AboutPhilosophySection,
} from '@/components/pages/about-sections';
import {
  ServicesBenchmarksSection,
  ServicesCtaSection,
  ServicesFaqSection,
  ServicesHeroSection,
  ServicesMethodSection,
  ServicesOverviewSection,
  ServicesPillarsSection,
} from '@/components/pages/services-sections';
import { ProjectsCatalogSection, ProjectsHeroSection } from '@/components/pages/projects-sections';
import { ContactStudioSection } from '@/components/pages/contact-sections';

const titleFields = {
  titleId: { type: 'text' as const, label: 'Judul (ID). Kosong = teks bawaan' },
  titleEn: { type: 'text' as const, label: 'Judul (EN). Kosong = teks bawaan' },
  ledeId: { type: 'textarea' as const, label: 'Pengantar (ID). Kosong = teks bawaan' },
  ledeEn: { type: 'textarea' as const, label: 'Pengantar (EN). Kosong = teks bawaan' },
};

function plain(label: string, type: string, render: (anchorId: string) => ReactElement) {
  return {
    label,
    fields: {},
    render: ({ id }: { id: string }) => render(sectionAnchor(type, id)),
  };
}

function titled(
  label: string,
  type: string,
  render: (anchorId: string, copy: { titleId?: string; titleEn?: string; ledeId?: string; ledeEn?: string }) => ReactElement,
) {
  return {
    label,
    fields: titleFields,
    render: ({
      id,
      titleId,
      titleEn,
      ledeId,
      ledeEn,
    }: {
      id: string;
      titleId?: string;
      titleEn?: string;
      ledeId?: string;
      ledeEn?: string;
    }) => render(sectionAnchor(type, id), { titleId, titleEn, ledeId, ledeEn }),
  };
}

const root = { fields: {}, render: editorFrame };

export const pageConfigs = {
  home: homePuckConfig,
  about: {
    root,
    categories: { halaman: { title: 'Section halaman', defaultExpanded: true, components: ['AboutHero', 'AboutNarrative', 'AboutPhilosophy', 'AboutFounder', 'AboutCta'] } },
    components: {
      AboutHero: titled('Hero', 'AboutHero', (anchorId, copy) => <AboutHeroSection anchorId={anchorId} {...copy} />),
      AboutNarrative: plain('Narasi', 'AboutNarrative', (anchorId) => <AboutNarrativeSection anchorId={anchorId} />),
      AboutPhilosophy: plain('Filosofi', 'AboutPhilosophy', (anchorId) => <AboutPhilosophySection anchorId={anchorId} />),
      AboutFounder: plain('Founder', 'AboutFounder', (anchorId) => <AboutFounderSection anchorId={anchorId} />),
      AboutCta: plain('Ajakan', 'AboutCta', (anchorId) => <AboutCtaSection anchorId={anchorId} />),
    },
  },
  services: {
    root,
    categories: {
      halaman: {
        title: 'Section halaman',
        defaultExpanded: true,
        components: ['ServicesHero', 'ServicesOverview', 'ServicesPillars', 'ServicesMethod', 'ServicesBenchmarks', 'ServicesFaq', 'ServicesCta'],
      },
    },
    components: {
      ServicesHero: titled('Hero', 'ServicesHero', (anchorId, copy) => <ServicesHeroSection anchorId={anchorId} {...copy} />),
      ServicesOverview: plain('Ringkasan', 'ServicesOverview', (anchorId) => <ServicesOverviewSection anchorId={anchorId} />),
      ServicesPillars: plain('Tipologi', 'ServicesPillars', (anchorId) => <ServicesPillarsSection anchorId={anchorId} />),
      ServicesMethod: plain('Alur Kerja', 'ServicesMethod', (anchorId) => <ServicesMethodSection anchorId={anchorId} />),
      ServicesBenchmarks: plain('Standar', 'ServicesBenchmarks', (anchorId) => <ServicesBenchmarksSection anchorId={anchorId} />),
      ServicesFaq: plain('FAQ', 'ServicesFaq', (anchorId) => <ServicesFaqSection anchorId={anchorId} />),
      ServicesCta: plain('Ajakan', 'ServicesCta', (anchorId) => <ServicesCtaSection anchorId={anchorId} />),
    },
  },
  projects: {
    root,
    categories: { halaman: { title: 'Section halaman', defaultExpanded: true, components: ['ProjectsHero', 'ProjectsCatalog'] } },
    components: {
      ProjectsHero: titled('Hero', 'ProjectsHero', (anchorId, copy) => <ProjectsHeroSection anchorId={anchorId} {...copy} />),
      ProjectsCatalog: plain('Katalog', 'ProjectsCatalog', (anchorId) => <ProjectsCatalogSection anchorId={anchorId} />),
    },
  },
  contact: {
    root,
    categories: { halaman: { title: 'Section halaman', defaultExpanded: true, components: ['ContactStudio'] } },
    components: {
      ContactStudio: titled('Studio & Formulir', 'ContactStudio', (anchorId, copy) => <ContactStudioSection anchorId={anchorId} {...copy} />),
    },
  },
} satisfies Record<PageId, Config>;

export function configFor(page: PageId): Config {
  return pageConfigs[page];
}
