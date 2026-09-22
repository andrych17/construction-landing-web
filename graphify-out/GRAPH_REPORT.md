# Graph Report - construction-landing-web  (2026-09-22)

## Corpus Check
- 29 files · ~243,715 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 177 nodes · 217 edges · 19 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4bc6d6ba`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- BarcwayLayout.tsx
- include
- package.json
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- eslint.config.mjs
- next.config.js
- next.config.ts
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- layout.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` - 8 edges
3. `WW Construction Website` - 8 edges
4. `include` - 7 edges
5. `ArchitecturalPreloader()` - 6 edges
6. `BarcwayFooter()` - 6 edges
7. `BarcwayNav()` - 6 edges
8. `WW Construction Portfolio Website` - 6 edges
9. `4. Reverse-Engineered & Elevated Interaction Engine` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ProjectInspectionModalProps` --references--> `ProjectDetail`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/barcwayData.ts

## Import Cycles
- None detected.

## Communities (19 total, 4 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.09
Nodes (23): autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, autoprefixer, babel-plugin-react-compiler, eslint (+15 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.13
Nodes (15): framer-motion, dependencies, framer-motion, next, react, react-dom, react-icons, remotion (+7 more)

### Community 3 - "BarcwayLayout.tsx"
Cohesion: 0.13
Nodes (20): ArchitecturalPreloader(), ArchitecturalPreloaderProps, ProjectInspectionModal(), ProjectInspectionModalProps, BarcwayLayout(), BarcwayFooter(), BarcwayNav(), NAV_LINKS (+12 more)

### Community 4 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.10
Nodes (19): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+11 more)

### Community 21 - "layout.tsx"
Cohesion: 0.25
Nodes (6): baskervville, jetbrainsMono, metadata, plusJakartaSans, structuredSchema, viewport

## Knowledge Gaps
- **91 isolated node(s):** `eslintConfig`, `nextConfig`, `nextConfig`, `name`, `version` (+86 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 112 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `nextConfig` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._