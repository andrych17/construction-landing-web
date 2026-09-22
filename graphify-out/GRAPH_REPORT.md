# Graph Report - construction-landing-web  (2026-09-23)

## Corpus Check
- 93 files · ~276,890 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 493 nodes · 989 edges · 30 communities (24 shown, 6 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 24 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ea27b1da`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- compilerOptions
- next
- content.ts
- UsersTable.tsx
- requireAdmin
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- react
- auth.ts
- migration.sql
- ProjectForm.tsx
- StatTile.tsx
- RowActionMenu
- generate_logos.py
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- pil
- SearchableSelect.tsx
- StatusPill.tsx
- Modal.tsx
- ListState.tsx
- upload/route.ts
- handleApiError
- db.ts
- devDependencies
- AdminShell.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 47 edges
2. `react` - 39 edges
3. `react-icons` - 22 edges
4. `useLanguage()` - 19 edges
5. `useSiteContent()` - 19 edges
6. `handleApiError()` - 19 edges
7. `requireAdmin()` - 16 edges
8. `getAllSiteContent()` - 16 edges
9. `compilerOptions` - 16 edges
10. `getSection()` - 13 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `ProjectInspectionModal()` --calls--> `waLink()`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/siteData.ts
- `ContentSectionPage()` --calls--> `isContentSectionKey()`  [EXTRACTED]
  src/app/(admin)/admin/content/[key]/page.tsx → src/lib/content-sections.ts
- `AdminLayout()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/layout.tsx → src/lib/auth.ts
- `AdminDashboardPage()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/page.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (30 total, 6 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, bcryptjs, framer-motion, jose, next, prisma, @prisma/client, react (+7 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "next"
Cohesion: 0.08
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 3 - "content.ts"
Cohesion: 0.08
Nodes (55): db, main(), seedAdmin(), seedContent(), seedProjects(), slugify(), dynamic, HERO_KEYS (+47 more)

### Community 4 - "UsersTable.tsx"
Cohesion: 0.12
Nodes (20): dynamic, HeroMediaManager(), ProjectRow, ProjectsTable(), ConfirmationModal(), Props, ColumnDef, DataTable() (+12 more)

### Community 5 - "requireAdmin"
Cohesion: 0.16
Nodes (15): ContentSectionPage(), GET(), PUT(), DELETE(), GET(), PUT(), GET(), POST() (+7 more)

### Community 6 - "package.json"
Cohesion: 0.06
Nodes (35): eslintConfig, name, prisma, seed, private, scripts, build, db:migrate (+27 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 10 - "react"
Cohesion: 0.09
Nodes (44): 7. Implementation Roadmap & Milestones, framer-motion, react, react-icons, AboutPage(), ContactPage(), src_app_globals, buildStructuredSchema() (+36 more)

### Community 11 - "auth.ts"
Cohesion: 0.19
Nodes (13): config, hasValidSession(), middleware(), jose, loginSchema, POST(), getSecretKey(), src_lib_auth_session_cookie_name (+5 more)

### Community 12 - "migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 13 - "ProjectForm.tsx"
Cohesion: 0.11
Nodes (21): dynamic, emptyLike(), humanLabel(), isObjectArray(), isStringArray(), JsonField(), JsonValue, DEFAULT_SPECS (+13 more)

### Community 14 - "StatTile.tsx"
Cohesion: 0.33
Nodes (4): Card(), Props, StatTileVariant, VARIANT_STYLES

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.11
Nodes (18): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"?, B. Anatomi Keunggulan 3 Benchmark Referensi (+10 more)

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
Cohesion: 0.13
Nodes (15): ref_node_crypto, ref_node_fs, ref_node_path, sharp, ALLOWLIST, data, FOREIGN, walk() (+7 more)

### Community 26 - "handleApiError"
Cohesion: 0.30
Nodes (11): zod, DELETE(), PUT(), updateUserSchema, createUserSchema, GET(), POST(), handleApiError() (+3 more)

### Community 27 - "db.ts"
Cohesion: 0.19
Nodes (11): AdminLayout(), dynamic, metadata, AdminDashboardPage(), dynamic, AdminUsersPage(), dynamic, AdminShell() (+3 more)

### Community 28 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 29 - "AdminShell.tsx"
Cohesion: 0.18
Nodes (10): AdminShellProps, NavGroup, NavItem, ToastProvider(), AdminSession, CONTENT_SECTION_KEYS, CONTENT_SECTIONS, ContentSectionKey (+2 more)

## Knowledge Gaps
- **191 isolated node(s):** `eslintConfig`, `config`, `nextConfig`, `name`, `version` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 235 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `content.ts`, `UsersTable.tsx`, `requireAdmin`, `package.json`, `react`, `auth.ts`, `ProjectForm.tsx`, `StatTile.tsx`, `upload/route.ts`, `handleApiError`, `db.ts`, `AdminShell.tsx`?**
  _High betweenness centrality (0.296) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `content.ts`, `UsersTable.tsx`, `package.json`, `ProjectForm.tsx`, `StatTile.tsx`, `SearchableSelect.tsx`, `Modal.tsx`, `ListState.tsx`, `AdminShell.tsx`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `config`, `nextConfig` to the rest of the system?**
  _191 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0819252432155658 - nodes in this community are weakly interconnected._