# Graph Report - construction-landing-web  (2026-09-22)

## Corpus Check
- 77 files · ~271,519 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 5, .example 2, .toml 1)

## Summary
- 409 nodes · 817 edges · 21 communities (17 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `afab3ebb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- compilerOptions
- dependencies
- content.ts
- UsersTable.tsx
- [key]/route.ts
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- react
- auth.ts
- migration.sql
- ProjectForm.tsx
- scripts
- check-contact-integrity.mjs
- generate_logos.py
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- pil

## God Nodes (most connected - your core abstractions)
1. `next` - 43 edges
2. `react` - 27 edges
3. `useLanguage()` - 19 edges
4. `useSiteContent()` - 19 edges
5. `handleApiError()` - 19 edges
6. `requireAdmin()` - 16 edges
7. `compilerOptions` - 16 edges
8. `react-icons` - 14 edges
9. `db` - 13 edges
10. `getAllSiteContent()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `ContentSectionPage()` --calls--> `isContentSectionKey()`  [EXTRACTED]
  src/app/(admin)/admin/content/[key]/page.tsx → src/lib/content-sections.ts
- `AdminUsersPage()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/users/page.tsx → src/lib/auth.ts
- `ProjectInspectionModal()` --calls--> `waLink()`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/siteData.ts
- `AdminLayout()` --calls--> `getAdminSession()`  [EXTRACTED]
  src/app/(admin)/admin/layout.tsx → src/lib/auth.ts

## Import Cycles
- None detected.

## Communities (21 total, 4 thin omitted)

### Community 0 - "next"
Cohesion: 0.06
Nodes (17): nextConfig, next, metadata, metadata, src_app_globals, buildStructuredSchema(), metadata, plusJakartaSans (+9 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, bcryptjs, framer-motion, jose, next, prisma, @prisma/client, react (+6 more)

### Community 3 - "content.ts"
Cohesion: 0.10
Nodes (39): db, main(), seedAdmin(), seedContent(), seedProjects(), slugify(), ContentSectionPage(), dynamic (+31 more)

### Community 4 - "UsersTable.tsx"
Cohesion: 0.15
Nodes (13): dynamic, AdminUsersPage(), dynamic, ProjectRow, ProjectsTable(), ColumnDef, DataTable(), DataTableProps (+5 more)

### Community 5 - "[key]/route.ts"
Cohesion: 0.11
Nodes (32): ref_node_crypto, zod, GET(), PUT(), SECTION_DEFAULTS, DELETE(), GET(), PUT() (+24 more)

### Community 6 - "package.json"
Cohesion: 0.05
Nodes (40): eslintConfig, devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss (+32 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 10 - "react"
Cohesion: 0.16
Nodes (29): framer-motion, react, react-icons, AboutPage(), ContactPage(), ProjectsPage(), ServicesPage(), src_components_interactive_projectinspectionmodal_projectdetail (+21 more)

### Community 11 - "auth.ts"
Cohesion: 0.09
Nodes (27): config, hasValidSession(), middleware(), jose, AdminLayout(), dynamic, metadata, AdminDashboardPage() (+19 more)

### Community 12 - "migration.sql"
Cohesion: 0.43
Nodes (6): "AdminUser", AdminUser_email_key, "Project", Project_published_order_idx, Project_slug_key, "SiteContent"

### Community 13 - "ProjectForm.tsx"
Cohesion: 0.12
Nodes (20): dynamic, emptyLike(), humanLabel(), isObjectArray(), isStringArray(), JsonField(), JsonValue, DEFAULT_SPECS (+12 more)

### Community 14 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:migrate, db:migrate:deploy, db:seed, db:studio, dev, lint (+1 more)

### Community 15 - "check-contact-integrity.mjs"
Cohesion: 0.29
Nodes (6): ref_node_fs, ref_node_path, ALLOWLIST, data, FOREIGN, walk()

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.10
Nodes (19): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+11 more)

### Community 19 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

## Knowledge Gaps
- **163 isolated node(s):** `eslintConfig`, `config`, `nextConfig`, `name`, `version` (+158 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 193 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `content.ts`, `UsersTable.tsx`, `[key]/route.ts`, `package.json`, `react`, `auth.ts`, `ProjectForm.tsx`?**
  _High betweenness centrality (0.327) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `next`, `UsersTable.tsx`, `package.json`, `auth.ts`, `ProjectForm.tsx`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `ArchitecturalPreloader()` connect `next` to `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `config`, `nextConfig` to the rest of the system?**
  _163 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.06386554621848739 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._