# Graph Report - construction-landing-web  (2026-09-22)

## Corpus Check
- 56 files · ~267,605 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 294 nodes · 399 edges · 22 communities (12 shown, 4 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f5e17f29`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- BarcwayLayout.tsx
- CorporateLayout.tsx
- LuxuryLayout.tsx
- ThemeContext.tsx
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- eslint.config.mjs
- next.config.js
- next.config.ts
- app/page.tsx
- DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
- LayoutContext.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `ArchitecturalPreloader()` - 8 edges
3. `DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO` - 8 edges
4. `WW Construction Website` - 8 edges
5. `RemotionShowcase()` - 7 edges
6. `ModernWwLogo()` - 7 edges
7. `ProjectDetail` - 7 edges
8. `include` - 7 edges
9. `BarcwayFooter()` - 6 edges
10. `BarcwayNav()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `useLayoutMode()`  [EXTRACTED]
  src/app/page.tsx → src/context/LayoutContext.tsx
- `ProjectInspectionModalProps` --references--> `ProjectDetail`  [EXTRACTED]
  src/components/interactive/ProjectInspectionModal.tsx → src/data/barcwayData.ts
- `RemotionShowcase()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/remotion/RemotionShowcase.tsx → src/context/ThemeContext.tsx
- `LayoutSwitcher()` --calls--> `useLayoutMode()`  [EXTRACTED]
  src/components/LayoutSwitcher.tsx → src/context/LayoutContext.tsx
- `ThemeSwitcher()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/ThemeSwitcher.tsx → src/context/ThemeContext.tsx

## Import Cycles
- None detected.

## Communities (22 total, 4 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.09
Nodes (23): autoprefixer, babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, autoprefixer, babel-plugin-react-compiler, eslint (+15 more)

### Community 1 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (23): framer-motion, dependencies, framer-motion, next, react, react-dom, react-icons, remotion (+15 more)

### Community 3 - "BarcwayLayout.tsx"
Cohesion: 0.13
Nodes (20): ArchitecturalPreloader(), ArchitecturalPreloaderProps, PHASES, BARCWAY_FOUNDERS, BARCWAY_PHILOSOPHIES, BARCWAY_PROJECTS, CENTRA_SERVICES, MASTER_METHODOLOGY (+12 more)

### Community 4 - "CorporateLayout.tsx"
Cohesion: 0.09
Nodes (19): About(), companyCredentials, Achievements(), commitments, BuildingAnimation(), precisionPillars, Contact(), CTA() (+11 more)

### Community 5 - "LuxuryLayout.tsx"
Cohesion: 0.10
Nodes (22): ArchitecturalMegaMenu(), ArchitecturalMegaMenuProps, DISCIPLINES, NavItem, STANDARDS, HERO_SLIDES, HeroCinematicStage(), Slide (+14 more)

### Community 6 - "ThemeContext.tsx"
Cohesion: 0.21
Nodes (11): ThemeSwitcher(), getThemeServerSnapshot(), getThemeSnapshot(), subscribeTheme(), ThemeConfig, ThemeContext, ThemeContextType, ThemeId (+3 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 15 - "app/page.tsx"
Cohesion: 0.08
Nodes (26): Home(), BarcwayLayout(), BlueprintLayout(), blueprintSheets, qaGates, wbsServices, CorporateLayout(), EditorialLayout() (+18 more)

### Community 18 - "DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO"
Cohesion: 0.10
Nodes (19): 1. Executive Summary: The Anti-AI-Slop Teardown, 2. Visual Theme & Calibrated Atmosphere, 3. Typographic Architecture & Rules, 4. Reverse-Engineered & Elevated Interaction Engine, 5. Component Master Table & Behavioral States, 6. Performance & Implementation Guardrails, 7. Implementation Roadmap & Milestones, A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"? (+11 more)

### Community 21 - "LayoutContext.tsx"
Cohesion: 0.14
Nodes (15): baskervville, jetbrainsMono, metadata, montserrat, plusJakartaSans, structuredSchema, viewport, getLayoutServerSnapshot() (+7 more)

## Knowledge Gaps
- **141 isolated node(s):** `eslintConfig`, `nextConfig`, `nextConfig`, `name`, `version` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 165 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `ArchitecturalPreloader()` connect `BarcwayLayout.tsx` to `LuxuryLayout.tsx`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `nextConfig` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `BarcwayLayout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12834224598930483 - nodes in this community are weakly interconnected._