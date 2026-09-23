'use client';

import type { ReactElement } from 'react';
import type { Config } from '@puckeditor/core';
import { sectionAnchor, type HomeBlockType } from '@/lib/home-layout';
import { editorFrame } from '@/components/pages/editor-frame';
import { HOME_HERO_COPY } from '@/components/home/hero-copy';
import {
  AboutSection,
  ContactSection,
  FounderSection,
  HeroSection,
  PhilosophySection,
  ProjectsSection,
  ServicesSection,
} from '@/components/home/sections';

const block = (label: string, type: HomeBlockType, render: (anchorId: string) => ReactElement) => ({
  label,
  fields: {},
  render: ({ id }: { id: string }) => render(sectionAnchor(type, id)),
});

function withCopyDefaults<T extends Record<string, string>>(defaults: T) {
  return ({ props }: { props: T & { id: string } }) => ({
    props: {
      ...defaults,
      ...Object.fromEntries(Object.entries(props).filter(([, value]) => typeof value === 'string' && value.trim())),
      id: props.id,
    },
  });
}

const heroFields = {
  line1Id: { type: 'text' as const, label: 'Baris 1 (ID)' },
  line1En: { type: 'text' as const, label: 'Baris 1 (EN)' },
  line2Id: { type: 'text' as const, label: 'Baris 2 (ID)' },
  line2En: { type: 'text' as const, label: 'Baris 2 (EN)' },
  line3Id: { type: 'text' as const, label: 'Baris 3 (ID)' },
  line3En: { type: 'text' as const, label: 'Baris 3 (EN)' },
  introId: { type: 'textarea' as const, label: 'Pengantar (ID)' },
  introEn: { type: 'textarea' as const, label: 'Pengantar (EN)' },
};

export const homePuckConfig = {
  root: {
    fields: {},
    render: editorFrame,
  },
  categories: {
    beranda: {
      title: 'Section beranda',
      components: ['Hero', 'About', 'Philosophy', 'Founder', 'Services', 'Projects', 'Contact'],
      defaultExpanded: true,
    },
  },
  components: {
    Hero: {
      label: 'Hero',
      fields: heroFields,
      defaultProps: { ...HOME_HERO_COPY },
      resolveData: withCopyDefaults(HOME_HERO_COPY),
      render: ({
        id,
        line1Id,
        line1En,
        line2Id,
        line2En,
        line3Id,
        line3En,
        introId,
        introEn,
      }: {
        id: string;
        line1Id?: string;
        line1En?: string;
        line2Id?: string;
        line2En?: string;
        line3Id?: string;
        line3En?: string;
        introId?: string;
        introEn?: string;
      }) => (
        <HeroSection
          anchorId={sectionAnchor('Hero', id)}
          line1Id={line1Id}
          line1En={line1En}
          line2Id={line2Id}
          line2En={line2En}
          line3Id={line3Id}
          line3En={line3En}
          introId={introId}
          introEn={introEn}
        />
      ),
    },
    About: block('Tentang Kami', 'About', (anchorId) => <AboutSection anchorId={anchorId} />),
    Philosophy: block('Filosofi Desain', 'Philosophy', (anchorId) => <PhilosophySection anchorId={anchorId} />),
    Founder: block('Founder', 'Founder', (anchorId) => <FounderSection anchorId={anchorId} />),
    Services: block('Layanan', 'Services', (anchorId) => <ServicesSection anchorId={anchorId} />),
    Projects: block('Proyek Pilihan', 'Projects', (anchorId) => <ProjectsSection anchorId={anchorId} />),
    Contact: block('Kontak', 'Contact', (anchorId) => <ContactSection anchorId={anchorId} />),
  },
} satisfies Config;
