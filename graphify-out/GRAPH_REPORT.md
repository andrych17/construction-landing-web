# Graph Report - construction-landing-web  (2026-09-22)

## Corpus Check
- 37 files · ~258,539 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 214 nodes · 355 edges · 21 communities (18 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39fd1e45`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- about/page.tsx
- next
- check-contact-integrity.mjs
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- Navbar.tsx
- projects/page.tsx
- MainLayout.tsx
- siteData.ts
- LanguageContext.tsx
- waLink
- generate_logos.py
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- pil
- app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 19 edges
2. `next` - 17 edges
3. `compilerOptions` - 16 edges
4. `react` - 15 edges
5. `waLink()` - 13 edges
6. `react-icons` - 9 edges
7. `SITE_CONTACT` - 9 edges
8. `Navbar()` - 8 edges
9. `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` - 8 edges
10. `WW Construction Website` - 8 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `ProjectsPage()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/projects/page.tsx → src/context/LanguageContext.tsx
- `AboutPage()` --calls--> `waLink()`  [EXTRACTED]
  src/app/about/page.tsx → src/data/siteData.ts
- `ContactPage()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/contact/page.tsx → src/context/LanguageContext.tsx
- `ServicesPage()` --calls--> `useLanguage()`  [EXTRACTED]
  src/app/services/page.tsx → src/context/LanguageContext.tsx

## Import Cycles
- None detected.

## Communities (21 total, 3 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+4 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, next, react, react-dom, react-icons, remotion, @remotion/player

### Community 3 - "about/page.tsx"
Cohesion: 0.30
Nodes (9): AboutPage(), ServicesPage(), Footer(), Navbar(), HeroMedia(), HeroMediaProps, useLanguage(), WW_FOUNDERS (+1 more)

### Community 4 - "next"
Cohesion: 0.11
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 5 - "check-contact-integrity.mjs"
Cohesion: 0.29
Nodes (6): ref_node_fs, ref_node_path, ALLOWLIST, data, FOREIGN, walk()

### Community 6 - "package.json"
Cohesion: 0.08
Nodes (23): eslintConfig, name, private, scripts, build, dev, lint, start (+15 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 10 - "Navbar.tsx"
Cohesion: 0.50
Nodes (5): react, ModernWwLogo(), ModernWwLogoProps, SIZE, SITE_CONTACT

### Community 11 - "projects/page.tsx"
Cohesion: 0.39
Nodes (6): react-icons, ProjectsPage(), ProjectInspectionModal(), ProjectInspectionModalProps, ProjectDetail, WW_PROJECTS

### Community 12 - "MainLayout.tsx"
Cohesion: 0.32
Nodes (4): src_components_interactive_projectinspectionmodal_projectdetail, MainLayout(), FounderSvgPlaceholder(), FounderSvgPlaceholderProps

### Community 13 - "siteData.ts"
Cohesion: 0.25
Nodes (7): CENTRA_SERVICES, FaqItem, FounderDetail, MASTER_METHODOLOGY, TODO: ganti seluruh nilai di bawah dengan data ww.cons asli., ROTATING_DISCIPLINES, ROTATING_DISCIPLINES_EN

### Community 14 - "LanguageContext.tsx"
Cohesion: 0.40
Nodes (4): Language, LanguageContext, LanguageContextType, LanguageProvider()

### Community 15 - "waLink"
Cohesion: 0.67
Nodes (3): ContactPage(), FloatingWhatsApp(), waLink()

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.11
Nodes (18): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"?, B. Anatomi Keunggulan 3 Benchmark Referensi (+10 more)

### Community 19 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 21 - "app/layout.tsx"
Cohesion: 0.13
Nodes (13): 7. Implementation Roadmap & Milestones, framer-motion, src_app_globals, baskervville, jetbrainsMono, metadata, plusJakartaSans, structuredSchema (+5 more)

## Knowledge Gaps
- **111 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 133 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `about/page.tsx`, `package.json`, `Navbar.tsx`, `projects/page.tsx`, `MainLayout.tsx`, `app/layout.tsx`?**
  _High betweenness centrality (0.175) - this node is a cross-community bridge._
- **Why does `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` connect `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` to `app/layout.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._