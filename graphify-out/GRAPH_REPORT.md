# Graph Report - construction-landing-web  (2026-09-22)

## Corpus Check
- 35 files · ~254,637 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 205 nodes · 311 edges · 15 communities (12 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7313639a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- MainLayout.tsx
- check-contact-integrity.mjs
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- next
- generate_logos.py
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)
- pil
- app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `next` - 17 edges
2. `compilerOptions` - 16 edges
3. `react` - 13 edges
4. `waLink()` - 11 edges
5. `framer-motion` - 9 edges
6. `SITE_CONTACT` - 9 edges
7. `react-icons` - 8 edges
8. `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` - 8 edges
9. `WW Construction Website` - 8 edges
10. `Navbar()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `7. Implementation Roadmap & Milestones` --references--> `ArchitecturalPreloader()`  [INFERRED]
  DESIGN.md → src/components/interactive/ArchitecturalPreloader.tsx
- `AboutPage()` --calls--> `waLink()`  [EXTRACTED]
  src/app/about/page.tsx → src/data/siteData.ts
- `ContactPage()` --calls--> `waLink()`  [EXTRACTED]
  src/app/contact/page.tsx → src/data/siteData.ts
- `ProjectInspectionModalProps` --references--> `ProjectDetail`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/siteData.ts
- `ProjectInspectionModal()` --calls--> `waLink()`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/siteData.ts

## Import Cycles
- None detected.

## Communities (15 total, 3 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, postcss, tailwindcss, @tailwindcss/postcss (+4 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 2 - "dependencies"
Cohesion: 0.25
Nodes (8): dependencies, framer-motion, next, react, react-dom, react-icons, remotion, @remotion/player

### Community 3 - "MainLayout.tsx"
Cohesion: 0.14
Nodes (29): framer-motion, react, react-icons, AboutPage(), ContactPage(), src_components_interactive_projectinspectionmodal_projectdetail, ProjectInspectionModal(), ProjectInspectionModalProps (+21 more)

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

### Community 10 - "next"
Cohesion: 0.11
Nodes (6): nextConfig, next, metadata, metadata, metadata, metadata

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.11
Nodes (18): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"?, B. Anatomi Keunggulan 3 Benchmark Referensi (+10 more)

### Community 19 - "Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)"
Cohesion: 0.22
Nodes (8): 1. Batasan & Komposisi Tampilan Layar (Layout Fit), 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai, 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop), 4. Spesifikasi File Keluaran & Cara Pasang, 5. Checklist Verifikasi Sebelum Selesai:, Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1), Pembagian Vertikal Frame:, Perintah Kompresi FFmpeg (Opsional):

### Community 21 - "app/layout.tsx"
Cohesion: 0.13
Nodes (13): 7. Implementation Roadmap & Milestones, src_app_globals, baskervville, jetbrainsMono, metadata, plusJakartaSans, structuredSchema, viewport (+5 more)

## Knowledge Gaps
- **108 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 133 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `MainLayout.tsx`, `app/layout.tsx`, `package.json`?**
  _High betweenness centrality (0.177) - this node is a cross-community bridge._
- **Why does `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` connect `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` to `app/layout.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `MainLayout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13953488372093023 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._