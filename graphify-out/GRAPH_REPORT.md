# Graph Report - construction-landing-web  (2026-09-21)

## Corpus Check
- 38 files · ~185,631 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 206 nodes · 236 edges · 19 communities (11 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4fe98d7d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- include
- CorporateLayout.tsx
- package.json
- layout.tsx
- postcss.config.mjs
- WW Construction Website
- WW Construction Portfolio Website
- eslint.config.mjs
- next.config.js
- next.config.ts
- RemotionShowcase.tsx
- page.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `WW Construction Website` - 8 edges
3. `RemotionShowcase()` - 7 edges
4. `include` - 7 edges
5. `WW Construction Portfolio Website` - 6 edges
6. `scripts` - 5 edges
7. `useLayoutMode()` - 5 edges
8. `useTheme()` - 5 edges
9. `LayoutSwitcher()` - 4 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `useLayoutMode()`  [EXTRACTED]
  src/app/page.tsx → src/context/LayoutContext.tsx
- `RemotionShowcase()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/remotion/RemotionShowcase.tsx → src/context/ThemeContext.tsx
- `LayoutSwitcher()` --calls--> `useLayoutMode()`  [EXTRACTED]
  src/components/LayoutSwitcher.tsx → src/context/LayoutContext.tsx
- `ThemeSwitcher()` --calls--> `useTheme()`  [EXTRACTED]
  src/components/ThemeSwitcher.tsx → src/context/ThemeContext.tsx

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

### Community 3 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 4 - "CorporateLayout.tsx"
Cohesion: 0.09
Nodes (19): About(), companyCredentials, Achievements(), commitments, BuildingAnimation(), precisionPillars, Contact(), CTA() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 6 - "layout.tsx"
Cohesion: 0.13
Nodes (14): jetbrainsMono, metadata, plusJakartaSans, structuredSchema, viewport, ThemeSwitcher(), LayoutProvider(), ThemeConfig (+6 more)

### Community 8 - "WW Construction Website"
Cohesion: 0.18
Nodes (10): Build untuk Production, Cara Menjalankan, Customization, Fitur, Lisensi, Mengganti Foto Proyek, Mengubah Konten, Struktur Proyek (+2 more)

### Community 9 - "WW Construction Portfolio Website"
Cohesion: 0.29
Nodes (6): Description, Development Server, Features Implemented, Project Status, Project Type, WW Construction Portfolio Website

### Community 15 - "RemotionShowcase.tsx"
Cohesion: 0.11
Nodes (16): EditorialLayout(), editorialServices, journalNotes, navDepartments, stories, ateliers, MonographLayout(), monographWorks (+8 more)

### Community 17 - "page.tsx"
Cohesion: 0.12
Nodes (17): Home(), BlueprintLayout(), blueprintSheets, qaGates, wbsServices, CorporateLayout(), LuxuryLayout(), luxuryNavLinks (+9 more)

## Knowledge Gaps
- **103 isolated node(s):** `eslintConfig`, `nextConfig`, `nextConfig`, `name`, `version` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 120 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `nextConfig` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._