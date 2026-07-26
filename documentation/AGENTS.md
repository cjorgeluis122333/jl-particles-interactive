# AGENTS.md — Agent Context for jl-particle-interactive **Documentation**

> This file contains context exclusively for the `documentation/` project.
> For the library itself, see the root `AGENTS.md`.
> For the interactive demo, see `demo/AGENTS.md`.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Architecture](#2-architecture)
3. [Annotated File Tree](#3-annotated-file-tree)
4. [Component Reference](#4-component-reference)
5. [Page Reference](#5-page-reference)
6. [Coding Conventions](#6-coding-conventions)
7. [Build & Dev Commands](#7-build--dev-commands)
8. [Self-Maintenance Rules](#8-self-maintenance-rules)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Package name** | `jl-particle-interactive-docs` |
| **Version** | `1.0.0` |
| **Type** | Standalone Vite + React documentation SPA (not published to npm) |
| **Purpose** | Official documentation for the `jl-particle-interactive` library — API reference, live examples, and usage guides |
| **Deployed to** | GitHub Pages at `https://cjorgeluis122333.github.io/jl-particles-interactive/docs/` |
| **Library source** | `jl-particle-interactive` resolved from local monorepo path `file:../` |
| **Build tool** | Vite 5.3 |
| **Styling** | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| **Language** | TypeScript 5.5, strict mode |
| **Icon library** | Lucide React (`lucide-react`) |
| **Syntax highlighting** | `react-syntax-highlighter` with `vscDarkPlus` theme + `@types/react-syntax-highlighter` |
| **Routing** | `react-router-dom` v6 — `createBrowserRouter` with `basename` + `React.lazy` code splitting |
| **React** | 18.3.1, StrictMode |

---

## 2. Architecture

**Route-based SPA** — each page is a separate lazy-loaded chunk. Only the current route's particle canvases run rAF loops.

```
documentation/
  index.html          ← HTML shell + SEO meta + SPA redirect handler script
  public/404.html     ← GitHub Pages SPA redirect (preserves path for react-router)
  src/
    main.tsx          ← createBrowserRouter + React.lazy routes + RouterProvider
    App.tsx           ← Layout: Sidebar + Navbar + <Outlet />; exports NAV_ITEMS
    index.css         ← @import "tailwindcss" + .custom-scrollbar + html scroll-behavior
    components/
      Sidebar.tsx           ← Fixed left nav with NavLink; collapsible groups for text/backgrounds
      Navbar.tsx            ← Sticky top bar; route-aware page title (mobile); external links
      CodeBlock.tsx         ← react-syntax-highlighter + copy-to-clipboard
      PropTable.tsx         ← Reusable prop documentation table (violet/sky/amber column coloring)
      LiveDemo.tsx          ← IntersectionObserver lazy-mount wrapper for particle canvases
      SectionWrapper.tsx    ← Shared page wrapper (id, h2 title, subtitle, max-w-4xl padding)
    pages/
      IntroPage.tsx                ← / — full-viewport FOLLOW_POINTER hero + centered install card + features + comparison
      InstallPage.tsx              ← /install — npm install, framework compat, Next.js note
      QuickStartPage.tsx           ← /quick-start — minimal code + live demo
      ApiReferencePage.tsx         ← /api — full API for all exports + types
      ExamplesPage.tsx             ← /examples — 4 copy-paste recipes with live demos
      text/
        TextBasicPage.tsx          ← /text/basic — props table + free-float + simple text
        TextIntermediatePage.tsx   ← /text/intermediate — repel + attract + shape comparison
        TextAdvancedPage.tsx       ← /text/advanced — carousel + text+bg combo + loading screen
      backgrounds/
        FollowPointerPage.tsx      ← /backgrounds/follow-pointer — FOLLOW_POINTER as page bg + docs overlay
        NetPage.tsx                ← /backgrounds/net — NET as page bg + docs overlay
        JellyfishPage.tsx          ← /backgrounds/jellyfish — JELLYFISH as page bg + docs overlay
```

**Route map:**
```
/                              → IntroPage
/install                       → InstallPage
/quick-start                   → QuickStartPage
/text/basic                    → TextBasicPage
/text/intermediate             → TextIntermediatePage
/text/advanced                 → TextAdvancedPage
/backgrounds/follow-pointer    → FollowPointerPage
/backgrounds/net               → NetPage
/backgrounds/jellyfish         → JellyfishPage
/api                           → ApiReferencePage
/examples                      → ExamplesPage
```

All routes prefixed with `basename: '/jl-particles-interactive/docs'`.

**Page layout:**
```
┌─────────────────────────────────────────────────┐
│ Sidebar (fixed, 256px, hidden on mobile)        │
│  ├── Brand (BookOpen icon + title)              │
│  ├── Nav groups with NavLink (11 items)         │
│  │   ├── Intro / Install / Quick Start          │
│  │   ├── Text Particles (▾ Basic/Inter/Adv)     │
│  │   ├── Backgrounds (▾ FP / Net / Jellyfish)   │
│  │   └── API / Examples                         │
│  └── Footer (Demo / npm / GitHub)              │
│                                                 │
│ Main area (pl-64 on lg+)                        │
│  ├── Navbar (sticky top, hamburger on mobile)  │
│  └── <Outlet /> (one lazy-loaded page at a time)│
└─────────────────────────────────────────────────┘
```

**Active route tracking:** `useLocation()` from react-router-dom. Sidebar uses `<NavLink>` with built-in `isActive` for route matching. No scroll-based tracking.

**Code splitting:** `React.lazy()` in `main.tsx` for all 11 page components. Each page is a separate Vite chunk. `<Suspense>` wrapper with spinner fallback.

**Lazy canvas mounting:** `LiveDemo.tsx` still uses `IntersectionObserver` (threshold 0.1) within pages. But since only one page loads at a time, most canvases are already off-DOM.

**Background pages pattern:** FollowPointerPage, NetPage, and JellyfishPage render their respective `ParticleBackground` as a `position: fixed; inset: 0` layer behind glassmorphic card overlays, so the user experiences the effect while reading the docs.

**GitHub Pages SPA support:** `public/404.html` redirects unknown paths to `index.html` with the path encoded as a query parameter. A script in `index.html` `<head>` decodes it and calls `history.replaceState()` before React mounts, so react-router picks up the correct route.

---

## 3. Annotated File Tree

```
documentation/
│
├── AGENTS.md                          ← this file; agent context for docs project
├── package.json                       ← app deps, scripts (includes react-router-dom)
├── tsconfig.json                      ← strict TS, ES2020, bundler resolution, no emit
├── vite.config.ts                     ← React + Tailwind plugins; base: '/jl-particles-interactive/docs/'
├── index.html                         ← HTML shell: SEO meta, OG tags, JSON-LD, SPA redirect handler
│
├── public/
│   ├── favicon.svg                    ← Particle network icon (same as demo)
│   └── 404.html                       ← GitHub Pages SPA redirect trick
│
└── src/
    ├── main.tsx                       ← createBrowserRouter + React.lazy + RouterProvider
    ├── App.tsx                        ← Layout component: Sidebar + Navbar + <Outlet />; exports NAV_ITEMS
    ├── index.css                      ← @import "tailwindcss" + scrollbar + scroll-behavior
    │
    ├── components/
    │   ├── Sidebar.tsx                ← NavLink-based left nav with collapsible groups
    │   ├── Navbar.tsx                 ← Route-aware sticky top bar
    │   ├── CodeBlock.tsx              ← Syntax-highlighted code + copy button
    │   ├── PropTable.tsx              ← API table (prop/type/default/description rows)
    │   ├── LiveDemo.tsx               ← Lazy-loading viewport-aware canvas wrapper
    │   └── SectionWrapper.tsx         ← Consistent page padding (max-w-4xl)
    │
    └── pages/
        ├── IntroPage.tsx              ← / — hero with FOLLOW_POINTER bg + install card
        ├── InstallPage.tsx            ← /install
        ├── QuickStartPage.tsx         ← /quick-start
        ├── ApiReferencePage.tsx       ← /api
        ├── ExamplesPage.tsx           ← /examples
        │
        ├── text/
        │   ├── TextBasicPage.tsx      ← /text/basic
        │   ├── TextIntermediatePage.tsx ← /text/intermediate
        │   └── TextAdvancedPage.tsx   ← /text/advanced
        │
        └── backgrounds/
            ├── FollowPointerPage.tsx  ← /backgrounds/follow-pointer
            ├── NetPage.tsx            ← /backgrounds/net
            └── JellyfishPage.tsx      ← /backgrounds/jellyfish
```

---

## 4. Component Reference

### `App.tsx`

Exports:
- `NAV_ITEMS: NavItem[]` — ordered list of routes (used by Sidebar); items with `children` create collapsible groups
- `NavItem` interface: `{ id: string; label: string; path: string; children?: NavItem[] }`

State:
- `isSidebarOpen: boolean` — mobile sidebar drawer state

Uses `useLocation()` to close sidebar on route change and scroll to top.

### `Sidebar.tsx`

Props: `{ isOpen: boolean; onNavClick: (id: string) => void }`

Uses `<NavLink>` from react-router-dom for route-based active state. Items with `children` (Text Particles, Backgrounds) render as collapsible groups with `<ChevronDown>` toggle. Active group detection via `useLocation()`.

### `Navbar.tsx`

Props: `{ onMenuClick: () => void }`

Sticky top bar. Shows route-aware page title on mobile (derived from `NAV_ITEMS` via `useLocation()`). Links: Live Demo, npm, GitHub (icon SVG).

### `CodeBlock.tsx`

Props: `{ code: string; language?: string }` (default language: `'tsx'`)

Uses `Prism` from `react-syntax-highlighter` with `vscDarkPlus` style. Clipboard copy button appears on group hover with Lucide `Copy`/`Check` icons.

### `PropTable.tsx`

Props: `{ rows: PropRow[] }` where `PropRow = { prop, type, default?, description }`.

Column coloring: prop = `text-violet-300`, type = `text-sky-300`, default = `text-amber-300`, description = `text-white/55`.

### `LiveDemo.tsx`

Props: `{ children: ReactNode; height?: string; label?: string }`

Uses `IntersectionObserver` (threshold 0.1) to lazily mount `children`. Shows a separator line with label and interaction hint.

### `SectionWrapper.tsx`

Props: `{ id: string; title: string; subtitle?: string; children: ReactNode }`

Renders `<section id={id} className="border-b border-white/5">`. Content inside `max-w-4xl mx-auto px-6 py-16`.

---

## 5. Page Reference

| Page file | Route | Live demos | Layout type |
|---|---|---|---|
| `IntroPage` | `/` | 1 (FOLLOW_POINTER fullscreen hero) | Custom: hero + below-fold content |
| `InstallPage` | `/install` | 0 | SectionWrapper |
| `QuickStartPage` | `/quick-start` | 1 (TextParticleEngine "Hello") | SectionWrapper |
| `TextBasicPage` | `/text/basic` | 2 (free-float, simple text) | SectionWrapper |
| `TextIntermediatePage` | `/text/intermediate` | 4 (repel, attract, 3× shapes) | SectionWrapper |
| `TextAdvancedPage` | `/text/advanced` | 3 (carousel, hero+NET, loading) | SectionWrapper |
| `FollowPointerPage` | `/backgrounds/follow-pointer` | Fixed BG (page-level FOLLOW_POINTER) | Custom: fixed bg + glassmorphic cards |
| `NetPage` | `/backgrounds/net` | Fixed BG (page-level NET) | Custom: fixed bg + glassmorphic cards |
| `JellyfishPage` | `/backgrounds/jellyfish` | Fixed BG (page-level JELLYFISH) | Custom: fixed bg + glassmorphic cards |
| `ApiReferencePage` | `/api` | 0 | SectionWrapper |
| `ExamplesPage` | `/examples` | 4 (hero+NET, loading, attract, jellyfish) | SectionWrapper |

---

## 6. Coding Conventions

### Design tokens (glassmorphic dark theme)

Match the demo's aesthetic:
- Container bg: `bg-[#070710]` (body) / `bg-white/5` (cards)
- Active state: `bg-white/10`
- Border: `border-white/10` (major) / `border-white/8` (minor)
- Backdrop blur: `backdrop-blur-sm`
- Primary text: `text-white`
- Secondary text: `text-white/55` or `text-white/45`
- Muted: `text-white/30`
- Accent: `text-violet-400` / `text-violet-300` (code names)
- Type color: `text-sky-300`
- Default color: `text-amber-300`

### Live demo canvases

Always pass `style={{ borderRadius: 0 }}` to `ParticleCanvas` / `ParticleBackground` inside `<LiveDemo>` to prevent double-rounding. The `LiveDemo` wrapper handles `rounded-xl overflow-hidden`.

For performance, reduce `particleDensity` in live demos (0.3–0.5) vs. production values. Standard doc demo density: **0.5** for single text demos, **0.3** for the shape-comparison grid. Demo container heights: **300px** for single demos, **320px** for hero+background combos, **180px** for the shape grid.

### Background page pattern

Background pages (FollowPointerPage, NetPage, JellyfishPage) use a fixed `ParticleBackground` layer (`position: fixed; inset: 0; z-index: 0`) behind content cards (`bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl`). Content sits at `z-index: 10`. Each page has a colored badge indicating the mode (cyan for FOLLOW_POINTER, sky for NET, pink for JELLYFISH).

### Code strings in pages

Keep code examples identical to the README where possible. Use the exact import path `'jl-particle-interactive'`.

### Route paths

Route paths in `NAV_ITEMS` (App.tsx) must match the `path` properties in `main.tsx` router definition. When adding a new page: add route in `main.tsx`, add NAV_ITEMS entry in `App.tsx`, create page file in `pages/`.

---

## 7. Build & Dev Commands

```bash
# Install deps (from documentation/ directory)
npm install

# Start dev server (http://localhost:5173 by default)
npm run dev

# Type-check + production build
npm run build
# Output: documentation/dist/

# Preview production build
npm run preview
```

**Library must be built first** before the docs dev server resolves `jl-particle-interactive`:
```bash
# From repo root
npm run build
cd documentation && npm install && npm run dev
```

**GitHub Pages deployment** is handled by `.github/workflows/deploy-demo.yml` (modified to also build documentation and merge both outputs). The docs output is merged into `docs/` subdirectory of the combined artifact.

**SPA routing on GitHub Pages** requires `public/404.html` + redirect handler script in `index.html <head>`. Both must stay in sync — they use `pathSegmentsToKeep = 2` to preserve the `/jl-particles-interactive/docs/` base path.

---

## 8. Self-Maintenance Rules

After every task that modifies the documentation project, update this file before finishing.

| Change type | Update this section |
|---|---|
| New page added | §3 File Tree, §5 Page Reference, add route in main.tsx + NAV_ITEMS |
| Page removed or renamed | §3 File Tree, §5 Page Reference |
| New component added | §3 File Tree, §4 Component Reference |
| Component props changed | §4 Component Reference |
| New dependency added | §1 Project Identity + §7 Build & Dev Commands |
| Design token changed | §6 Coding Conventions |
| Route path changed | §5 Page Reference + §6 Coding Conventions note |
| Deployment config changed | §7 Build & Dev Commands |

### Recent maintenance notes

- 2026-06-30: Initial creation. 7 sections, 6 shared components, deploy via modified `deploy-demo.yml`.
- 2026-06-30: **Route-based restructuring.** Converted from single-page scroll to multi-route SPA with `react-router-dom` v6. Added `React.lazy` code splitting (11 page chunks). Replaced `sections/` directory with `pages/` directory. IntroPage redesigned with full-viewport FOLLOW_POINTER hero + centered glassmorphic install card. Text Particles split into 3 sub-routes (Basic/Intermediate/Advanced). Each background mode (FOLLOW_POINTER, NET, JELLYFISH) gets its own page with the effect running as a fixed page background behind glassmorphic content cards. Sidebar updated with `NavLink` and collapsible groups. Added `public/404.html` + SPA redirect handler in `index.html` for GitHub Pages routing support. Added `react-router-dom` dependency.
- 2026-06-30: **Text demo legibility fix.** `LiveDemo` IntersectionObserver now toggles mount/unmount (was mount-only, never unmounting off-screen canvases). All text particle demos updated: `particleDensity` set to 0.5 (single demos) or 0.3 (shape grid) — was default 1.0 causing 3000-particle blob in small containers. `particleSize` reduced to ≤1.0 (was 1.2–1.8). Container heights increased to 300px (was 220px). All code string constants synced exactly to match preview JSX props — code examples now produce the same visual as the preview. Affected files: LiveDemo.tsx, QuickStartPage.tsx, TextBasicPage.tsx, TextIntermediatePage.tsx, TextAdvancedPage.tsx, ExamplesPage.tsx.
