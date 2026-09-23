# Graph Report - construction-landing-web  (2026-09-23)

## Corpus Check
- 125 files · ~292,260 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 667 nodes · 1477 edges · 38 communities (29 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8460eab4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- compilerOptions
- layout-api.ts
- content.ts
- AdminShell.tsx
- auth.ts
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- react
- scripts
- migration.sql
- StatTile.tsx
- RowActionMenu.tsx
- generate_logos.py
- app/layout.tsx
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- pil
- SearchableSelect.tsx
- StatusPill.tsx
- Modal.tsx
- ListState.tsx
- upload/route.ts
- eslint.config.mjs
- devDependencies
- handleApiError
- home-layout.ts
- JsonField.tsx
- next
- requireAdmin
- db.ts
- prisma
- middleware.ts
- login/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 53 edges
2. `react` - 49 edges
3. `useLanguage()` - 36 edges
4. `useSiteContent()` - 31 edges
5. `handleApiError()` - 29 edges
6. `react-icons` - 27 edges
7. `requireAdmin()` - 26 edges
8. `getPageLayout()` - 18 edges
9. `getAllSiteContent()` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `ProjectInspectionModal()` --calls--> `waLink()`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/siteData.ts
- `ComposePage()` --calls--> `parsePageId()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/compose/[page]/page.tsx → src/lib/content.ts
- `ContentSectionPage()` --calls--> `isContentSectionKey()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/content/[key]/page.tsx → src/lib/content-sections.ts
- `AdminLayout()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/(panel)/layout.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (38 total, 9 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, bcryptjs, framer-motion, jose, next, prisma, @prisma/client, @puckeditor/core (+8 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "layout-api.ts"
Cohesion: 0.24
Nodes (13): server-only, POST(), GET(), PUT(), POST(), GET(), PUT(), parsePageId() (+5 more)

### Community 3 - "content.ts"
Cohesion: 0.06
Nodes (66): db, main(), seedAdmin(), seedContent(), seedProjects(), slugify(), bcryptjs, @prisma/client (+58 more)

### Community 4 - "AdminShell.tsx"
Cohesion: 0.08
Nodes (28): dynamic, metadata, dynamic, AdminShell(), AdminShellProps, NavGroup, NavItem, HeroMediaManager() (+20 more)

### Community 5 - "auth.ts"
Cohesion: 0.23
Nodes (10): loginSchema, POST(), getSecretKey(), src_lib_auth_session_cookie_name, sessionCookieOptions(), signSessionToken(), UnauthorizedError, verifyPassword() (+2 more)

### Community 6 - "package.json"
Cohesion: 0.11
Nodes (18): name, private, version, autoprefixer, babel-plugin-react-compiler, postcss, prisma, react-dom (+10 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 10 - "react"
Cohesion: 0.08
Nodes (60): framer-motion, @puckeditor/core, react, react-icons, Props, HOME_HERO_COPY, heroFields, homePuckConfig (+52 more)

### Community 11 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:migrate, db:migrate:deploy, db:seed, db:studio, dev, lint (+3 more)

### Community 12 - "migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 14 - "StatTile.tsx"
Cohesion: 0.33
Nodes (4): Card(), Props, StatTileVariant, VARIANT_STYLES

### Community 15 - "RowActionMenu.tsx"
Cohesion: 0.33
Nodes (3): RowActionItem, RowActionMenu(), RowActionMenuProps

### Community 18 - "app/layout.tsx"
Cohesion: 0.06
Nodes (30): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+22 more)

### Community 19 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 21 - "SearchableSelect.tsx"
Cohesion: 0.33
Nodes (3): Props, SearchableSelect(), SearchableSelectOption

### Community 22 - "StatusPill.tsx"
Cohesion: 0.40
Nodes (5): FALLBACK, getStatusMeta(), STATUS_MAP, StatusMeta, StatusPill()

### Community 23 - "Modal.tsx"
Cohesion: 0.40
Nodes (3): ModalSize, Props, SIZE_CLASS

### Community 25 - "upload/route.ts"
Cohesion: 0.08
Nodes (23): ref_node_assert, ref_node_crypto, ref_node_fs, ref_node_path, ref_node_stream, ref_node_url, sharp, ALLOWLIST (+15 more)

### Community 27 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 28 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 29 - "handleApiError"
Cohesion: 0.30
Nodes (11): zod, DELETE(), PUT(), updateUserSchema, createUserSchema, GET(), POST(), handleApiError() (+3 more)

### Community 30 - "home-layout.ts"
Cohesion: 0.06
Nodes (56): cleaned, fallback, project, withCopy, AboutPage(), ComposePage(), ContactPage(), Home() (+48 more)

### Community 31 - "JsonField.tsx"
Cohesion: 0.07
Nodes (42): asContact(), ContactEditor(), ContactValue, linesToText(), Place, textToLines(), asDisciplines(), Disciplines (+34 more)

### Community 32 - "next"
Cohesion: 0.08
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 33 - "requireAdmin"
Cohesion: 0.24
Nodes (11): DELETE(), GET(), PUT(), GET(), POST(), uniqueSlug(), requireAdmin(), ProjectInput (+3 more)

### Community 34 - "db.ts"
Cohesion: 0.21
Nodes (9): AdminLayout(), AdminDashboardPage(), dynamic, dynamic, AdminUsersPage(), dynamic, getAdminSession(), db (+1 more)

### Community 36 - "middleware.ts"
Cohesion: 0.31
Nodes (6): jose, LoginForm(), safeNextPath(), config, hasValidSession(), middleware()

## Knowledge Gaps
- **222 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+217 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 276 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `requireAdmin`, `db.ts`, `content.ts`, `middleware.ts`, `AdminShell.tsx`, `package.json`, `layout-api.ts`, `auth.ts`, `react`, `TopProgressBar.tsx`, `StatTile.tsx`, `app/layout.tsx`, `upload/route.ts`, `handleApiError`, `home-layout.ts`, `JsonField.tsx`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `content.ts`, `middleware.ts`, `AdminShell.tsx`, `package.json`, `TopProgressBar.tsx`, `StatTile.tsx`, `RowActionMenu.tsx`, `app/layout.tsx`, `SearchableSelect.tsx`, `Modal.tsx`, `ListState.tsx`, `home-layout.ts`, `JsonField.tsx`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _222 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.063568010936432 - nodes in this community are weakly interconnected._
- **Should `AdminShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08108108108108109 - nodes in this community are weakly interconnected._