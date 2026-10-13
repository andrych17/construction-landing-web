# Graph Report - wwconstruction.id  (2026-10-13)

## Corpus Check
- 139 files · ~438,404 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 759 nodes · 1798 edges · 39 communities (28 shown, 11 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c08b3cc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- sections.tsx
- getPageLayout
- home-layout.ts
- react
- react-icons
- smoke-cms-api.mjs
- package.json
- compilerOptions
- dependencies
- devDependencies
- scripts
- [key]/route.ts
- 20260922151240_init/migration.sql
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- content.ts
- sync-projects.js
- StatusPill.tsx
- @prisma/client
- eslint.config.mjs
- postcss.config.mjs
- login/layout.tsx
- TopProgressBar.tsx
- og.ts
- WW Construction Website
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- siteData.ts
- WW Construction Portfolio Website
- 3. Spesifikasi Rinci Revisi Per Bagian
- 20261001093500_add_inquiry/migration.sql
- AdminShell.tsx
- StatTile.tsx
- ListState.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 55 edges
2. `react` - 52 edges
3. `useLanguage()` - 39 edges
4. `useSiteContent()` - 34 edges
5. `react-icons` - 30 edges
6. `handleApiError()` - 29 edges
7. `requireAdmin()` - 26 edges
8. `JsonField()` - 19 edges
9. `getAllSiteContent()` - 19 edges
10. `getPageLayout()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `seedLayouts()` --calls--> `defaultPageLayout()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `seedLayouts()` --calls--> `layoutStorageKey()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `EditProjectPage()` --calls--> `ProjectForm()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/projects/[id]/page.tsx → src/components/admin/ProjectForm.tsx
- `ComposePage()` --calls--> `parsePageId()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/compose/[page]/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (39 total, 11 thin omitted)

### Community 0 - "next"
Cohesion: 0.05
Nodes (62): nextConfig, next, server-only, zod, AdminDashboardPage(), dynamic, dynamic, EditProjectPage() (+54 more)

### Community 1 - "sections.tsx"
Cohesion: 0.06
Nodes (78): framer-motion, @puckeditor/core, buildStructuredSchema(), metadata, plusJakartaSans, revalidate, RootLayout(), viewport (+70 more)

### Community 2 - "getPageLayout"
Cohesion: 0.21
Nodes (13): AboutPage(), ComposePage(), ContactPage(), Home(), ProjectsPage(), ServicesPage(), HomeComposer(), when() (+5 more)

### Community 3 - "home-layout.ts"
Cohesion: 0.09
Nodes (29): cleaned, fallback, project, withCopy, allowedTypes(), ANCHORS, COPY_FIELDS, COPY_MAX (+21 more)

### Community 4 - "react"
Cohesion: 0.09
Nodes (55): react, NewProjectPage(), AboutEditor(), asContact(), Card(), ContactEditor(), ContactValue, Labeled() (+47 more)

### Community 5 - "react-icons"
Cohesion: 0.06
Nodes (31): react-icons, AdminProjectsPage(), dynamic, ProjectRow, ProjectsTable(), ConfirmationModal(), Props, ColumnDef (+23 more)

### Community 6 - "smoke-cms-api.mjs"
Cohesion: 0.10
Nodes (10): sharp, ALLOWLIST, data, FOREIGN, walk(), api(), cookie, request() (+2 more)

### Community 7 - "package.json"
Cohesion: 0.09
Nodes (21): name, prisma, seed, private, version, autoprefixer, babel-plugin-react-compiler, bcryptjs (+13 more)

### Community 8 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, bcryptjs, framer-motion, jose, next, prisma, @prisma/client, @puckeditor/core (+8 more)

### Community 10 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 11 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:migrate, db:migrate:deploy, db:seed, db:studio, dev, lint (+3 more)

### Community 12 - "[key]/route.ts"
Cohesion: 0.12
Nodes (33): ContentSectionPage(), dynamic, HERO_KEYS, SECTION_FETCHERS, AdminHeroPage(), dynamic, GET(), PUT() (+25 more)

### Community 13 - "20260922151240_init/migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 14 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.10
Nodes (19): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+11 more)

### Community 15 - "content.ts"
Cohesion: 0.25
Nodes (16): asJson(), Contact, dbProjectToDetail(), getProjects(), MethodologyStep, Philosophy, readHistory(), readStoredLayout() (+8 more)

### Community 16 - "sync-projects.js"
Cohesion: 0.15
Nodes (10): fs, db, slugify(), path, { PrismaClient }, run(), db, fs (+2 more)

### Community 17 - "StatusPill.tsx"
Cohesion: 0.40
Nodes (5): FALLBACK, getStatusMeta(), STATUS_MAP, StatusMeta, StatusPill()

### Community 18 - "@prisma/client"
Cohesion: 0.40
Nodes (5): @prisma/client, syncProjects(), db, slugify(), WW_PROJECTS

### Community 19 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 30 - "og.ts"
Cohesion: 0.19
Nodes (5): metadata, metadata, metadata, metadata, pageOg()

### Community 34 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 36 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 37 - "siteData.ts"
Cohesion: 0.09
Nodes (32): db, main(), seedAdmin(), seedContent(), seedLayouts(), seedProjects(), slugify(), DEFAULT_MAP (+24 more)

### Community 38 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 39 - "3. Spesifikasi Rinci Revisi Per Bagian"
Cohesion: 0.08
Nodes (25): 1. Dua Pilar Layanan Utama (*Interactive Sliding / Auto-Carousel*), 1. Hero Value Proposition Cards (4 Kartu Bawah), 1. Kronologi & Konteks Diskusi, 1. Penyederhanaan Kolom Input Form, 2. About Us Section, 2. Mekanisme Penyimpanan Data & Notifikasi, 2. Pemetaan Screenshot dan File WhatsApp, 2. Penyederhanaan Our Workflow (7 Tahapan Alur Kerja) (+17 more)

### Community 42 - "AdminShell.tsx"
Cohesion: 0.10
Nodes (26): jose, LoginForm(), LoginPage(), AdminLayout(), dynamic, metadata, AdminShell(), AdminShellProps (+18 more)

### Community 43 - "StatTile.tsx"
Cohesion: 0.38
Nodes (5): Card(), Props, StatTile(), StatTileVariant, VARIANT_STYLES

## Knowledge Gaps
- **256 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+251 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 304 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `sections.tsx`, `getPageLayout`, `home-layout.ts`, `react`, `siteData.ts`, `react-icons`, `package.json`, `AdminShell.tsx`, `StatTile.tsx`, `[key]/route.ts`, `TopProgressBar.tsx`, `og.ts`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _256 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.051515151515151514 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `sections.tsx`, `home-layout.ts`, `react-icons`, `siteData.ts`, `package.json`, `AdminShell.tsx`, `StatTile.tsx`, `ListState.tsx`, `TopProgressBar.tsx`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Should `sections.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0594059405940594 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `@prisma/client` to `next`, `siteData.ts`, `package.json`, `content.ts`, `sync-projects.js`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Should `home-layout.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08870967741935484 - nodes in this community are weakly interconnected._