# Graph Report - wwconstruction.id  (2026-10-01)

## Corpus Check
- 132 files · ~519,813 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 720 nodes · 1556 edges · 45 communities (35 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `564d156f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- requireAdmin
- react
- [key]/route.ts
- home-layout.ts
- JsonField.tsx
- AdminShell.tsx
- smoke-cms-api.mjs
- package.json
- compilerOptions
- dependencies
- devDependencies
- scripts
- middleware.ts
- 20260922151240_init/migration.sql
- StatTile.tsx
- RowActionMenu.tsx
- SearchableSelect.tsx
- StatusPill.tsx
- app/layout.tsx
- eslint.config.mjs
- ListState.tsx
- generate_logos.py
- postcss.config.mjs
- login/layout.tsx
- sync-projects.js
- pil
- next
- auth.ts
- handleApiError
- upload/route.ts
- WW Construction Website
- projects/route.ts
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- content.ts
- WW Construction Portfolio Website
- 3. Spesifikasi Rinci Revisi Per Bagian
- getPageLayout
- layout-api.ts
- main
- @prisma/client
- prisma

## God Nodes (most connected - your core abstractions)
1. `next` - 54 edges
2. `react` - 49 edges
3. `useLanguage()` - 39 edges
4. `useSiteContent()` - 32 edges
5. `handleApiError()` - 29 edges
6. `react-icons` - 27 edges
7. `requireAdmin()` - 26 edges
8. `getPageLayout()` - 18 edges
9. `getAllSiteContent()` - 16 edges
10. `db` - 16 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `seedLayouts()` --calls--> `defaultPageLayout()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `seedLayouts()` --calls--> `layoutStorageKey()`  [EXTRACTED]
  prisma/seed.ts → src/lib/home-layout.ts
- `AdminLayout()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/layout.tsx → src/lib/auth.ts
- `ComposePage()` --calls--> `getPageHistory()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/compose/[page]/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (45 total, 10 thin omitted)

### Community 0 - "requireAdmin"
Cohesion: 0.28
Nodes (11): POST(), GET(), PUT(), GET(), PUT(), DELETE(), GET(), PUT() (+3 more)

### Community 1 - "react"
Cohesion: 0.06
Nodes (72): framer-motion, react, react-icons, Props, ModalSize, Props, SIZE_CLASS, HOME_HERO_COPY (+64 more)

### Community 2 - "[key]/route.ts"
Cohesion: 0.13
Nodes (30): ContentSectionPage(), dynamic, HERO_KEYS, SECTION_FETCHERS, AdminHeroPage(), dynamic, GET(), PUT() (+22 more)

### Community 3 - "home-layout.ts"
Cohesion: 0.10
Nodes (25): cleaned, fallback, project, withCopy, allowedTypes(), ANCHORS, COPY_FIELDS, COPY_MAX (+17 more)

### Community 4 - "JsonField.tsx"
Cohesion: 0.07
Nodes (43): asContact(), ContactEditor(), ContactValue, linesToText(), Place, textToLines(), asDisciplines(), Disciplines (+35 more)

### Community 5 - "AdminShell.tsx"
Cohesion: 0.08
Nodes (29): AdminLayout(), dynamic, metadata, dynamic, AdminShell(), AdminShellProps, NavGroup, NavItem (+21 more)

### Community 6 - "smoke-cms-api.mjs"
Cohesion: 0.10
Nodes (15): ref_node_assert, ref_node_fs, ref_node_path, ref_node_stream, ref_node_url, sharp, ALLOWLIST, data (+7 more)

### Community 7 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, version, autoprefixer, babel-plugin-react-compiler, bcryptjs, postcss, prisma (+13 more)

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

### Community 12 - "middleware.ts"
Cohesion: 0.31
Nodes (6): jose, LoginForm(), safeNextPath(), config, hasValidSession(), middleware()

### Community 13 - "20260922151240_init/migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 14 - "StatTile.tsx"
Cohesion: 0.33
Nodes (4): Card(), Props, StatTileVariant, VARIANT_STYLES

### Community 15 - "RowActionMenu.tsx"
Cohesion: 0.33
Nodes (3): RowActionItem, RowActionMenu(), RowActionMenuProps

### Community 16 - "SearchableSelect.tsx"
Cohesion: 0.33
Nodes (3): Props, SearchableSelect(), SearchableSelectOption

### Community 17 - "StatusPill.tsx"
Cohesion: 0.40
Nodes (5): FALLBACK, getStatusMeta(), STATUS_MAP, StatusMeta, StatusPill()

### Community 18 - "app/layout.tsx"
Cohesion: 0.06
Nodes (31): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+23 more)

### Community 19 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 26 - "sync-projects.js"
Cohesion: 0.25
Nodes (8): ref_fs, ref_path, fs, db, slugify(), path, { PrismaClient }, run()

### Community 30 - "next"
Cohesion: 0.07
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 31 - "auth.ts"
Cohesion: 0.13
Nodes (17): AdminDashboardPage(), dynamic, AdminUsersPage(), dynamic, loginSchema, POST(), getAdminSession(), getSecretKey() (+9 more)

### Community 32 - "handleApiError"
Cohesion: 0.26
Nodes (12): zod, POST(), DELETE(), PUT(), updateUserSchema, createUserSchema, GET(), POST() (+4 more)

### Community 33 - "upload/route.ts"
Cohesion: 0.25
Nodes (8): ref_node_crypto, ALLOWED_MIME_EXT, compressImage(), IMAGE_EXT_SET, IMAGE_MIME_EXT, POST(), UPLOAD_DIR, VIDEO_MIME_EXT

### Community 34 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 35 - "projects/route.ts"
Cohesion: 0.22
Nodes (8): dynamic, GET(), POST(), uniqueSlug(), ProjectInput, projectInputSchema, specLine, slugify()

### Community 36 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 37 - "content.ts"
Cohesion: 0.12
Nodes (30): db, DEFAULT_MAP, ProjectInspectionModalProps, CENTRA_SERVICES, DEFAULT_HERO_ABOUT, DEFAULT_HERO_CONTACT, DEFAULT_HERO_HOME, DEFAULT_HERO_PROJECTS (+22 more)

### Community 38 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 39 - "3. Spesifikasi Rinci Revisi Per Bagian"
Cohesion: 0.08
Nodes (25): 1. Dua Pilar Layanan Utama (*Interactive Sliding / Auto-Carousel*), 1. Hero Value Proposition Cards (4 Kartu Bawah), 1. Kronologi & Konteks Diskusi, 1. Penyederhanaan Kolom Input Form, 2. About Us Section, 2. Mekanisme Penyimpanan Data & Notifikasi, 2. Pemetaan Screenshot dan File WhatsApp, 2. Penyederhanaan Our Workflow (7 Tahapan Alur Kerja) (+17 more)

### Community 40 - "getPageLayout"
Cohesion: 0.16
Nodes (16): AboutPage(), ComposePage(), ContactPage(), Home(), ProjectsPage(), ServicesPage(), HomeComposer(), when() (+8 more)

### Community 41 - "layout-api.ts"
Cohesion: 0.32
Nodes (14): asJson(), getPageHistory(), readHistory(), readStoredLayout(), restorePageRevision(), savePageLayout(), summarize(), historyStorageKey() (+6 more)

### Community 42 - "main"
Cohesion: 0.33
Nodes (6): main(), seedAdmin(), seedContent(), seedLayouts(), seedProjects(), slugify()

### Community 43 - "@prisma/client"
Cohesion: 0.50
Nodes (4): @prisma/client, syncProjects(), db, slugify()

## Knowledge Gaps
- **248 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+243 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 309 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `requireAdmin`, `upload/route.ts`, `[key]/route.ts`, `projects/route.ts`, `handleApiError`, `AdminShell.tsx`, `content.ts`, `package.json`, `getPageLayout`, `JsonField.tsx`, `react`, `layout-api.ts`, `middleware.ts`, `StatTile.tsx`, `app/layout.tsx`, `auth.ts`?**
  _High betweenness centrality (0.239) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `JsonField.tsx`, `content.ts`, `AdminShell.tsx`, `package.json`, `getPageLayout`, `middleware.ts`, `StatTile.tsx`, `RowActionMenu.tsx`, `SearchableSelect.tsx`, `app/layout.tsx`, `ListState.tsx`, `next`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _248 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06162280701754386 - nodes in this community are weakly interconnected._
- **Should `[key]/route.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12698412698412698 - nodes in this community are weakly interconnected._
- **Should `home-layout.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Should `JsonField.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06721311475409836 - nodes in this community are weakly interconnected._