# Graph Report - wwconstruction.id  (2026-10-03)

## Corpus Check
- 138 files · ~438,047 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 757 nodes · 1688 edges · 42 communities (29 shown, 13 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `07a9b4b9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.ts
- react
- AdminShell.tsx
- home-layout.ts
- JsonField.tsx
- UsersTable.tsx
- smoke-cms-api.mjs
- package.json
- compilerOptions
- dependencies
- devDependencies
- scripts
- react-icons
- 20260922151240_init/migration.sql
- app/layout.tsx
- RowActionMenu.tsx
- SearchableSelect.tsx
- StatusPill.tsx
- contact/layout.tsx
- eslint.config.mjs
- sync-projects.js
- generate_logos.py
- postcss.config.mjs
- login/layout.tsx
- pil
- next
- WW Construction Website
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- content.ts
- WW Construction Portfolio Website
- 3. Spesifikasi Rinci Revisi Per Bagian
- Modal.tsx
- 20261001093500_add_inquiry/migration.sql
- middleware.ts
- StatTile.tsx
- ListState.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 54 edges
2. `react` - 52 edges
3. `useLanguage()` - 39 edges
4. `useSiteContent()` - 34 edges
5. `react-icons` - 30 edges
6. `handleApiError()` - 29 edges
7. `requireAdmin()` - 26 edges
8. `getAllSiteContent()` - 19 edges
9. `getPageLayout()` - 18 edges
10. `getSection()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `seedLayouts()` --calls--> `defaultPageLayout()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `seedLayouts()` --calls--> `layoutStorageKey()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `AdminLayout()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/layout.tsx → src/lib/auth.ts
- `ComposePage()` --calls--> `parsePageId()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/compose/[page]/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (42 total, 13 thin omitted)

### Community 0 - "auth.ts"
Cohesion: 0.07
Nodes (55): ref_node_crypto, server-only, zod, AdminDashboardPage(), dynamic, AdminUsersPage(), POST(), GET() (+47 more)

### Community 1 - "react"
Cohesion: 0.07
Nodes (68): framer-motion, @puckeditor/core, react, HOME_HERO_COPY, heroFields, homePuckConfig, AboutSection(), ContactSection() (+60 more)

### Community 2 - "AdminShell.tsx"
Cohesion: 0.14
Nodes (14): AdminLayout(), dynamic, metadata, AdminShell(), AdminShellProps, NavGroup, NavItem, STYLE_CLASS (+6 more)

### Community 3 - "home-layout.ts"
Cohesion: 0.05
Nodes (56): cleaned, fallback, project, withCopy, AboutPage(), ComposePage(), ContactPage(), Home() (+48 more)

### Community 4 - "JsonField.tsx"
Cohesion: 0.06
Nodes (50): dynamic, dynamic, AboutEditor(), asContact(), ContactEditor(), ContactValue, linesToText(), Place (+42 more)

### Community 5 - "UsersTable.tsx"
Cohesion: 0.18
Nodes (14): dynamic, ProjectRow, ProjectsTable(), ConfirmationModal(), Props, ColumnDef, DataTable(), DataTableProps (+6 more)

### Community 6 - "smoke-cms-api.mjs"
Cohesion: 0.10
Nodes (15): ref_node_assert, ref_node_fs, ref_node_path, ref_node_stream, ref_node_url, sharp, ALLOWLIST, data (+7 more)

### Community 7 - "package.json"
Cohesion: 0.10
Nodes (20): name, prisma, seed, private, version, autoprefixer, babel-plugin-react-compiler, postcss (+12 more)

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

### Community 12 - "react-icons"
Cohesion: 0.22
Nodes (3): react-icons, Props, CONTENT_SECTIONS

### Community 13 - "20260922151240_init/migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 14 - "app/layout.tsx"
Cohesion: 0.06
Nodes (36): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+28 more)

### Community 15 - "RowActionMenu.tsx"
Cohesion: 0.33
Nodes (3): RowActionItem, RowActionMenu(), RowActionMenuProps

### Community 16 - "SearchableSelect.tsx"
Cohesion: 0.33
Nodes (3): Props, SearchableSelect(), SearchableSelectOption

### Community 17 - "StatusPill.tsx"
Cohesion: 0.40
Nodes (5): FALLBACK, getStatusMeta(), STATUS_MAP, StatusMeta, StatusPill()

### Community 19 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 20 - "sync-projects.js"
Cohesion: 0.15
Nodes (12): ref_fs, ref_path, fs, db, slugify(), path, { PrismaClient }, run() (+4 more)

### Community 30 - "next"
Cohesion: 0.10
Nodes (5): nextConfig, next, metadata, metadata, metadata

### Community 34 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 36 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 37 - "content.ts"
Cohesion: 0.05
Nodes (82): db, main(), seedAdmin(), seedContent(), seedLayouts(), seedProjects(), slugify(), bcryptjs (+74 more)

### Community 38 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 39 - "3. Spesifikasi Rinci Revisi Per Bagian"
Cohesion: 0.08
Nodes (25): 1. Dua Pilar Layanan Utama (*Interactive Sliding / Auto-Carousel*), 1. Hero Value Proposition Cards (4 Kartu Bawah), 1. Kronologi & Konteks Diskusi, 1. Penyederhanaan Kolom Input Form, 2. About Us Section, 2. Mekanisme Penyimpanan Data & Notifikasi, 2. Pemetaan Screenshot dan File WhatsApp, 2. Penyederhanaan Our Workflow (7 Tahapan Alur Kerja) (+17 more)

### Community 40 - "Modal.tsx"
Cohesion: 0.40
Nodes (3): ModalSize, Props, SIZE_CLASS

### Community 42 - "middleware.ts"
Cohesion: 0.17
Nodes (9): jose, LoginForm(), WwLogoMark(), src_lib_auth_session_cookie_name, safeNextPath(), SESSION_COOKIE_NAME, config, hasValidSession() (+1 more)

### Community 43 - "StatTile.tsx"
Cohesion: 0.33
Nodes (4): Card(), Props, StatTileVariant, VARIANT_STYLES

## Knowledge Gaps
- **256 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+251 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 316 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `auth.ts`, `react`, `AdminShell.tsx`, `home-layout.ts`, `JsonField.tsx`, `content.ts`, `UsersTable.tsx`, `package.json`, `middleware.ts`, `StatTile.tsx`, `react-icons`, `app/layout.tsx`, `contact/layout.tsx`, `TopProgressBar.tsx`, `inquiries/route.ts`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `AdminShell.tsx`, `home-layout.ts`, `JsonField.tsx`, `content.ts`, `UsersTable.tsx`, `package.json`, `Modal.tsx`, `middleware.ts`, `StatTile.tsx`, `react-icons`, `ListState.tsx`, `app/layout.tsx`, `RowActionMenu.tsx`, `SearchableSelect.tsx`, `TopProgressBar.tsx`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `@prisma/client` connect `content.ts` to `sync-projects.js`, `package.json`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _256 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07343987823439878 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07175689479060265 - nodes in this community are weakly interconnected._
- **Should `AdminShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13970588235294118 - nodes in this community are weakly interconnected._