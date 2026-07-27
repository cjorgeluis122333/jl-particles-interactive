# AGENTS.md — Agent Context for jl-particle-interactive

> **Maintenance rule:** Any agent that modifies this project **must update this file** before the task is considered complete. See [Section 9 — Self-Maintenance Rules](#9-self-maintenance-rules) for exactly what to update and when.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Architecture](#2-architecture)
3. [Annotated File Tree](#3-annotated-file-tree)
4. [Public API Reference](#4-public-api-reference)
5. [Coding Conventions](#5-coding-conventions)
6. [Key Algorithms](#6-key-algorithms)
7. [Skills Catalog & Auto-Selection](#7-skills-catalog--auto-selection)
8. [Build & Lint Commands](#8-build--lint-commands)
9. [Self-Maintenance Rules](#9-self-maintenance-rules)
10. [Scope & Exclusions](#10-scope--exclusions)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Package name** | `jl-particle-interactive` |
| **Version** | `0.3.1` |
| **License** | MIT |
| **Type** | React component library (not an app) |
| **Output formats** | ES Module + UMD + TypeScript declarations |
| **Peer dependencies** | `react >= 18`, `react-dom >= 18` |
| **Build tool** | Vite 6.2 + vite-plugin-dts |
| **Language** | TypeScript 5.8, strict mode, ES2020 target |
| **Entry point** | `src/index.ts` → `dist/jl-particle-interactive.js` |

**Purpose:** A React library for rendering text and background effects as thousands of animated particles on an HTML5 `<canvas>`. Particles respond to pointer interaction (magnetic hover, click attract/repel). No DOM-node particles — everything draws directly to canvas via `requestAnimationFrame`.

**Typical use cases:**
- Hero section animated titles
- Loading screen particle effects
- Interactive word carousels / text transitions
- Animated particle backgrounds (swarm, net graph, jellyfish glow)

---

## 2. Architecture

```
┌─────────────────────────────────────────┐
│  ParticleCanvas (container)             │  Sizing, background color,
│  src/components/ParticleCanvas.tsx      │  optional background engine slot
└───────────────┬─────────────────────────┘
                │ mounts one of:
    ┌───────────┼───────────────────────┐
    ▼           ▼                       ▼
TextParticle  BackgroundParticleEngine  NetParticleEngine
Engine        (FOLLOW_POINTER)         (NET)
                                        JellyfishParticleEngine
                                        (JELLYFISH)

Each engine owns:
  ├── <canvas> element (absolute inset, full size)
  ├── ResizeObserver → re-scales canvas on container resize (DPR-aware)
  ├── requestAnimationFrame loop
  └── One or more particle collections

Hooks (pure reusable logic, no JSX):
  ├── useParticleInteraction   — pointer tracking (pointermove/leave/down/up)
  ├── useTextParticles         — text-to-pixel-targets conversion
  ├── useParticleMovement      — swarm center & velocity update (background)
  ├── useParticleScaling       — depth-based size scaling (background)
  ├── useParticleOrientation   — direction vectors for bean shape (background)
  └── usePointerTracking       — smooth cursor interpolation (background)

Particle classes (plain TypeScript, no React):
  ├── Particle                 — text particles (spring physics + float noise)
  └── FollowPointerParticle    — background swarm (3D depth + color waves)
```

**Render loop pattern** (same in every engine):

```ts
const render = () => {
  timeRef.current++;
  // 1. Clear / trail-fade canvas
  // 2. Read live config from configRef.current (avoids stale closure)
  // 3. Update each particle (physics step)
  // 4. Draw each particle (canvas 2D API)
  animationFrameRef.current = requestAnimationFrame(render);
};
```

**Canvas setup pattern** (DPR-aware, in every engine):

```ts
const dpr = window.devicePixelRatio || 1;
canvas.width = width * dpr;
canvas.height = height * dpr;
canvas.style.width = `${width}px`;
canvas.style.height = `${height}px`;
ctx.scale(dpr, dpr);  // scale once after resize
```

---

## 3. Annotated File Tree

```
jl-particles-interactive/
│
├── AGENTS.md                          ← this file; AI agent context
├── package.json                       ← library metadata, scripts, peer deps
├── tsconfig.json                      ← strict TS, ES2020, bundler resolution
├── vite.config.ts                     ← library build (ES + UMD), DTS generation
├── skills-lock.json                   ← installed agent skills (do not edit manually)
├── README.md                          ← primary public documentation (install, API, background guide)
├── README_Samples.md                  ← usage examples for consumers
│
├── .github/
│   └── workflows/
│       └── deploy-demo.yml            ← GitHub Actions: build demo + docs → merge → deploy to GitHub Pages on push to main
│
├── demo/                              ← standalone interactive playground for testing the library
│   └── AGENTS.md                      ← agent context exclusively for the demo project (see there)
│
├── documentation/                     ← standalone documentation site; see documentation/AGENTS.md
│
├── doc/
│   └── particle_interactive_code.md   ← detailed code samples and explanations
│
└── src/
    ├── index.ts                       ← PUBLIC API: all exports live here
    ├── types.ts                       ← ColorMode, ParticleShape
    │
    ├── types/
    │   └── background.ts              ← BackgroundModeName, ParticleOrientation,
    │                                     BackgroundCanvas interface
    │
    ├── components/
    │   ├── ParticleCanvas.tsx         ← Container: sizing, background slot, z-index
    │   │
    │   ├── background/
    │   │   ├── ParticleBackground.tsx        ← Unified background component (selects engine via `name` prop)
    │   │   ├── BackgroundParticleEngine.tsx  ← FOLLOW_POINTER mode; swarm + color waves
    │   │   ├── FollowPointerParticle.ts      ← Swarm particle class (depth, orientation)
    │   │   ├── NetParticleEngine.tsx         ← NET mode; bouncing nodes + edge lines
    │   │   └── JellyfishParticleEngine.tsx   ← JELLYFISH mode; glow rings + tentacles
    │   │
    │   └── text/
    │       ├── TextParticleEngine.tsx        ← Main text animation engine
    │       └── Particle.ts                   ← Text particle class (spring + float)
    │
    └── hooks/
        ├── useParticleInteraction.ts         ← Pointer events + getMagnetTarget()
        │
        ├── background/
        │   ├── useParticleMovement.ts        ← Swarm velocity + separation pass
        │   ├── useParticleOrientation.ts     ← Direction vectors for bean rendering
        │   ├── useParticleScaling.ts         ← Distance-to-center size scaling
        │   └── usePointerTracking.ts         ← Smooth cursor interpolation
        │
        └── text/
            └── useTextParticles.ts           ← Offscreen canvas text sampling
```

---

## 4. Public API Reference

Everything exported from `src/index.ts` is public API. Do not remove or rename exports without a major version bump.

**Exported symbols (complete list):**
- Components: `ParticleCanvas`, `TextParticleEngine`, `ParticleBackground`
- Prop types: `ParticleCanvasProps`, `TextParticleEngineProps`, `ParticleBackgroundProps`
- Hooks: `useParticleInteraction`, `useTextParticles`
- Functions: `getMagnetTarget`
- Types: `ClickMode`, `ColorMode`, `ParticleShape`, `BackgroundModeName`, `BackgroundCanvas`, `ParticleOrientation`

---

### `<ParticleCanvas>` — `src/components/ParticleCanvas.tsx`

Container div that establishes the particle stage. Optionally mounts a background engine.

```tsx
import { ParticleCanvas } from 'jl-particle-interactive';

<ParticleCanvas
  width="100%"
  height="60vh"
  backgroundColor="#050505"
  background={{ name: 'NET', density: 0.9 }}
>
  <TextParticleEngine text="Hello" />
</ParticleCanvas>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content rendered above background (z-index 10) |
| `width` | `string \| number` | `'100%'` | CSS-valid width |
| `height` | `string \| number` | `'60vh'` | CSS-valid height |
| `backgroundColor` | `string` | `'#050505'` | Hex color for container background |
| `className` | `string` | `''` | CSS class applied to container div |
| `style` | `CSSProperties` | — | Inline styles merged over base styles |
| `background` | `BackgroundCanvas` | `{ name: 'NONE' }` | Background engine config |

Base styles applied automatically: `position: relative`, `border-radius: 1rem`, `overflow: hidden`, `box-shadow`, `border: 1px solid rgba(255,255,255,0.1)`.

---

### `<ParticleBackground>` — `src/components/background/ParticleBackground.tsx`

Dedicated background-only component. Selects which background engine to render via the `name` prop. Unlike `ParticleCanvas`, it has no children slot — it is designed exclusively for standalone background effects.

```tsx
import { ParticleBackground } from 'jl-particle-interactive';

// Net graph background
<ParticleBackground
  name="NET"
  width="100%"
  height="400px"
  backgroundColor="#050505"
  config={{ density: 0.9, colors: ['#00aaff', '#0044ff'] }}
/>

// Swarm following pointer
<ParticleBackground
  name="FOLLOW_POINTER"
  height="60vh"
  config={{ colorMode: 'wave', color: '#ff6600' }}
/>

// Jellyfish glow
<ParticleBackground name="JELLYFISH" />

// No background (empty container)
<ParticleBackground name="NONE" />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `BackgroundModeName` | `'FOLLOW_POINTER'` | Engine to render: `'NONE'`, `'FOLLOW_POINTER'`, `'NET'`, or `'JELLYFISH'` |
| `config` | `Omit<BackgroundCanvas, 'name'>` | `undefined` | All background engine options (see BackgroundCanvas type) |
| `width` | `string \| number` | `'100%'` | CSS-valid width |
| `height` | `string \| number` | `'60vh'` | CSS-valid height |
| `backgroundColor` | `string` | `'#050505'` | Hex background color |
| `className` | `string` | `''` | CSS class applied to container div |
| `style` | `CSSProperties` | — | Inline styles merged over base styles |

`config` accepts any property from `BackgroundCanvas` except `name` (which is promoted to top level): `density`, `color`, `colors`, `colorMode`, `orientation`, `shape`, `particleSpeed`, `pointerTrackingSpeed`.

Internally composes `ParticleCanvas` — inherits the same base styles (border-radius, box-shadow, overflow hidden).

**JELLYFISH mode:** Runs a built-in pulse/breathing animation cycle — 1 s of active radial contraction followed by 3 s of relaxation. Repeats automatically; no extra configuration required. Swarm tracking speed defaults to `0.02` (slower than FOLLOW_POINTER's `0.06`) to emphasize the floating, organic feel.

---

### `<TextParticleEngine>` — `src/components/text/TextParticleEngine.tsx`

The core animation engine. Renders `text` as animated particles that form letter shapes and respond to pointer interaction. Must be placed inside `ParticleCanvas` or a `position: relative` container.

```tsx
import { TextParticleEngine } from 'jl-particle-interactive';

<TextParticleEngine
  text="Hello"
  particleColor={['255, 100, 50', '255, 200, 100']}
  particleShape="bean"
  clickMode="repel"
  isMagnet={true}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | **required** | Text to form. Empty string (`''`) scatters all particles freely |
| `particleColor` | `string \| string[]` | `'255, 255, 255'` | RGB string(s). Array = each particle gets a random color from the list |
| `particleSize` | `number` | `1` | Size multiplier (0.5 = small, 2 = large) |
| `particleDensity` | `number` | `1` | Count multiplier (0.5 = half, 2 = double). Base: 3000 desktop / 1500 mobile |
| `particleEase` | `number` | `1` | Speed multiplier toward target. Higher = snappier |
| `isMagnet` | `boolean` | `true` | Enable hover magnetic attraction (~173px radius) |
| `clickMode` | `ClickMode` | `'none'` | Click behavior: `'none'`, `'attract'`, or `'repel'` |
| `particleShape` | `ParticleShape` | `'circle'` | Particle shape: `'circle'`, `'square'`, or `'bean'` |
| `backgroundColor` | `string` | `'#050505'` | Hex background for trail-fade effect. `'transparent'` for no fade |

**Important:** `particleColor` values must be in `'R, G, B'` format (comma-separated integers), **not** hex. Use `hexToRgb()` if converting programmatically.

---

### `useParticleInteraction` — `src/hooks/useParticleInteraction.ts`

Tracks pointer events on a container element. Returns a ref with live pointer state.

```ts
const mouseRef = useParticleInteraction(containerRef);
// mouseRef.current = { x, y, isDown, active }
```

| Field | Type | Description |
|---|---|---|
| `x` | `number` | Pointer X relative to container |
| `y` | `number` | Pointer Y relative to container |
| `isDown` | `boolean` | Whether pointer button is pressed |
| `active` | `boolean` | Whether pointer is inside the container |

Sets `container.style.touchAction = 'none'` automatically (prevents scroll interference on touch).

---

### `getMagnetTarget` — `src/hooks/useParticleInteraction.ts`

Pure function. Computes the effective target position for a particle given magnetic forces. Used inside particle `update()` loops.

```ts
const { x, y } = getMagnetTarget(
  particleX, particleY,
  targetX, targetY,
  mouseX, mouseY,
  isMouseDown,
  isMagnet,
  clickMode
);
```

| Parameter | Type | Description |
|---|---|---|
| `x, y` | `number` | Current particle position |
| `targetX, targetY` | `number` | Particle's natural target position (text pixel) |
| `mx, my` | `number \| null` | Mouse position. `null` when outside container |
| `isMouseDown` | `boolean` | Whether pointer is pressed |
| `isMagnet` | `boolean` | Enable hover attraction |
| `clickMode` | `ClickMode` | `'none'` \| `'attract'` \| `'repel'` |

**Force radii:**
- Hover magnet: 30 000 px² (~173 px radius), force × 0.15
- Attract (click): 30 000 px² (~173 px radius), force × 0.8
- Repel (click): 50 000 px² (~224 px radius), force × 400 px push distance

---

### `useTextParticles` — `src/hooks/text/useTextParticles.ts`

Converts text into target positions for particles using an offscreen canvas. Returns `updateTextTargets` which reassigns all particle targets.

```ts
const { updateTextTargets, textRef } = useTextParticles(text, particlesRef, containerRef);
updateTextTargets('A');         // reassign using current container size
updateTextTargets('A', w, h);  // reassign with explicit dimensions
```

Passing an empty string (`''`) scatters particles randomly across the container.

---

### Types

```ts
// src/types.ts
type ColorMode = 'single' | 'palette';
type ParticleShape = 'circle' | 'square' | 'bean';

// src/hooks/useParticleInteraction.ts
type ClickMode = 'none' | 'attract' | 'repel';

// src/types/background.ts
type BackgroundModeName = 'NONE' | 'FOLLOW_POINTER' | 'NET' | 'JELLYFISH';
type ParticleOrientation = 'vertical' | 'horizontal' | 'diagonal';

interface BackgroundCanvas {
  name: BackgroundModeName;           // required
  orientation?: ParticleOrientation;  // particle movement direction
  density?: number;                   // particle count multiplier; base counts: FOLLOW_POINTER=350, NET=min(300, w×h/6000), JELLYFISH=350
  color?: string;                     // single color (hex)
  colors?: string[];                  // palette (hex array)
  colorMode?: 'wave' | 'mixed';       // how colors propagate
  interactionRadius?: number;         // reserved in type (not applied in v0.2.2)
  lineDistance?: number;              // reserved in type (not applied in v0.2.2)
  shape?: ParticleShape;              // particle shape
  particleSpeed?: number;             // movement speed multiplier
  pointerTrackingSpeed?: number;      // how fast particles follow pointer
}
```

---

## 5. Coding Conventions

### Mutable state in animation loops — always use `useRef`

Never use `useState` for values read inside `requestAnimationFrame`. Use `useRef` instead to avoid stale closures:

```ts
// CORRECT
const particlesRef = useRef<Particle[]>([]);
const timeRef = useRef<number>(0);
const animationFrameRef = useRef<number>(0);

// WRONG — causes stale values in rAF loop
const [particles, setParticles] = useState<Particle[]>([]);
```

### Live prop access in rAF — the `configRef` pattern

Props captured at `useEffect` setup time go stale. Mirror all props into a single ref read on every frame:

```ts
const configRef = useRef({ isMagnet, clickMode, particleShape, backgroundColor });
configRef.current = { isMagnet, clickMode, particleShape, backgroundColor };  // in render body

// Inside rAF:
const { isMagnet, clickMode } = configRef.current;  // always fresh
```

### Color format

Canvas `fillStyle` uses `rgba(R, G, B, A)` strings. Store and pass colors as `'R, G, B'` strings (integers 0–255):

```ts
// CORRECT
particleColor = '255, 100, 50';
ctx.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;

// Convert hex → RGB string with hexToRgb() (defined in TextParticleEngine.tsx)
```

### Responsive breakpoint

`600px` viewport width is the mobile threshold used throughout the library:

```ts
const isMobile = window.innerWidth < 600;
const gap = isMobile ? 6 : 8;           // pixel sampling resolution
const baseCount = isMobile ? 1500 : 3000; // base particle count
```

### Background engine interface

All background engines receive the same two props — keep this consistent when adding new engines:

```tsx
interface EngineProps {
  config: BackgroundCanvas;
  backgroundColor: string;
}
```

### Canvas composite operations

- **`'screen'`** — glow/bloom effect; used when background is opaque (normal mode)
- **`'source-over'`** — standard alpha compositing; used after `clearRect` (transparent mode) and for cleanup passes

### `useEffect` dependency discipline

Each visual prop gets its own focused `useEffect` that updates only what changed (e.g., only reassign `p.baseColor` when `particleColor` changes, not all props). This avoids reinitializing the particle system unnecessarily.

---

## 6. Key Algorithms

### Text-to-Pixels Sampling (`useTextParticles.ts`)

1. Create offscreen `<canvas>` at container dimensions
2. Set font: `bold ${fontSize}px "Georgia", serif` where `fontSize = min(width, height) × 0.65`
3. If text overflows 90% of width, scale font down proportionally
4. Draw text centered at `(width/2, height/2.05)` in white
5. Read `ImageData`, scan every `gap`-th pixel (8px desktop, 6px mobile)
6. Collect pixels where `alpha > 128`, add ±2px random jitter per axis

### Particle-to-Target Assignment (`useTextParticles.ts`)

Pairs ~3000 particles to potentially far fewer text pixels with spatial coherence:

1. Assign a sort key to each text point: `key = pt.x + noise(±15% width)`
2. Sort text points by key ascending
3. Assign the same kind of key to each particle, sort by key
4. Split into chunks of size `√N` (particles)
5. Within each chunk: sort particles by Y, sort text points by Y, pair 1-to-1
6. Wrap text points cyclically if there are more particles than points
7. Apply arc impulse to particles that need to travel far: perpendicular velocity burst proportional to travel direction

### Magnetic Force (`getMagnetTarget`)

Uses **squared distance** comparisons (avoids `Math.sqrt` until repel):

```
hover:   distSq < 30000 → force = (30000 - distSq) / 30000 → offset × 0.15
attract: distSq < 30000 → force = (30000 - distSq) / 30000 → offset × 0.8
repel:   distSq < 50000 → force = pow((50000 - distSq)/50000, 1.2) → -dir × 400
```

### Particle Spring Physics (`Particle.ts`)

```
dx = targetX - x
vx += dx × (ease × easeMultiplier) + noiseX
vx *= friction                       // friction ∈ [0.82, 0.92]
x  += vx
x  += cos(t × floatSpeed + offset) × amplitude   // idle float
```

`amplitude = 2.0` when idle (no text), `0.2` when formed (active text).

---

## 7. Skills Catalog & Auto-Selection

When a task requires specialized domain knowledge, load the corresponding skill with the `read_file` tool before implementing. Skills are defined in the `.agents/skills/` directory.

| Skill | File | **Use when the task involves...** |
|---|---|---|
| `frontend-design` | `.agents/skills/frontend-design/SKILL.md` | Building new UI components, demo pages, visual layouts, CSS/styling, design system work, visual polish, creating sample/showcase pages |
| `vercel-react-best-practices` | `.agents/skills/vercel-react-best-practices/SKILL.md` | React hook optimization, `useMemo`/`useCallback` decisions, bundle size reduction, Next.js patterns, memoization strategies, performance profiling |
| `seo-audit` | `.agents/skills/seo-audit/SKILL.md` | Auditing or improving a public documentation/demo site built on top of this library (not the library itself) |

**Auto-selection rules:**

- Adding a new background engine or particle mode → `frontend-design`
- Optimizing the render loop or reducing re-renders → `vercel-react-best-practices`
- Refactoring hooks for better composition → `vercel-react-best-practices`
- Creating a demo/showcase page for the library → `frontend-design`
- Improving the library's npm page or docs site → `seo-audit`

**How to load a skill:**
```
read_file(".agents/skills/frontend-design/SKILL.md")
```

---

## 8. Build & Lint Commands

```bash
# Type-check only (no emit) — run after every change
npm run lint
# equivalent: tsc --noEmit

# Build library to dist/
npm run build
# equivalent: vite build

# Output files after build:
# dist/jl-particle-interactive.js        ESM bundle
# dist/jl-particle-interactive.umd.cjs   CommonJS/UMD bundle
# dist/index.d.ts                        TypeScript declarations

# Demo site — development
cd demo && npm run dev

# Demo site — production build
cd demo && npm run build
# Output: demo/dist/ (deployed to GitHub Pages via .github/workflows/deploy-demo.yml)
```

**Build is not required during development.** The source files in `src/` are what consumers of this repo import directly in development.

**Lint must pass** (`npm run lint` exits 0) before any change is considered done. TypeScript strict mode is on — no `any`, no implicit returns on non-void functions.

---

## 9. Self-Maintenance Rules

**After every task that modifies this project, update AGENTS.md before finishing.**

### Recent maintenance notes

- 2026-06-10: Expanded `README.md` with a dedicated background usage guide (mode-specific examples, option matrix, and `BackgroundCanvas` reference).
- 2026-06-27: Added `ParticleBackground` component — unified background wrapper with `name` prop at top level and optional `config` object; exported from `src/index.ts`.
- 2026-06-27: Removed individual engine exports (`BackgroundParticleEngine`, `NetParticleEngine`, `JellyfishParticleEngine`) from `src/index.ts`. `ParticleBackground` is now the only public API for backgrounds.
- 2026-06-27: AGENTS.md accuracy audit — corrected version 0.2.1 → 0.2.2 (synced with `package.json`), added full exported-symbol list to §4 intro, added `border` to `ParticleCanvas` base styles, documented JELLYFISH pulse/breathing cycle, added per-engine particle base counts to `BackgroundCanvas.density` comment, updated reserved-field version references to v0.2.2.
- 2026-06-27: Moved all demo-specific context to `demo/AGENTS.md`. Root AGENTS.md now covers only the library (`src/`). The `demo/` entry in Section 3 is a single-line pointer to `demo/AGENTS.md`.
- 2026-06-27: Rewrote README.md examples — replaced all old examples and background guide with 6 copy-paste-ready snippets: 3 text examples (free-float, Hello 🖐️ with repel, word carousel with 3s cycle) and 3 background examples (FOLLOW_POINTER, NET, JELLYFISH). Added `<ParticleBackground>` props table and `BackgroundConfig` option matrix to API reference. Removed stale `BackgroundCanvas` flat-prop-on-ParticleCanvas examples.
- 2026-06-27: Changed `ParticleBackground` defaults — `name` is now optional (default `'FOLLOW_POINTER'`), and `shape: 'bean'` + `orientation: 'vertical'` are baked in as base defaults (overridable via `config`).
- 2026-06-27: Added `.github/workflows/publish.yml` — automated npm publish + GitHub Release on `git push` of a `v*` tag. Requires `NPM_TOKEN` secret in repository settings. Sequence: lint → build → `npm publish` → `softprops/action-gh-release@v2`.
- 2026-06-30: Added `documentation/` mini-app — standalone Vite + React + Tailwind 4 docs site. 7 sections with live embedded particle demos, full API reference. Deployed to `/jl-particles-interactive/docs/` via updated `deploy-demo.yml`. See `documentation/AGENTS.md` for full context.
- 2026-06-30: **Documentation route restructuring** — converted documentation from single-page scroll to multi-route SPA using `react-router-dom` v6 + `React.lazy` code splitting (11 page chunks). Text Particles split into 3 sub-routes (Basic/Intermediate/Advanced). Each background mode gets its own page with the effect as fixed page background. IntroPage redesigned with full-viewport FOLLOW_POINTER hero + glassmorphic install card. Added `public/404.html` for GitHub Pages SPA support. Old `sections/` directory replaced by `pages/` directory. See `documentation/AGENTS.md` for full updated context.
- 2026-06-30: **Documentation text demo legibility fix** — `LiveDemo` now unmounts canvases when scrolled off-screen (was mount-only). All text demos tuned: `particleDensity=0.5` (was default 1.0), `particleSize≤1.0` (was 1.2–1.8), container heights increased to 300px (was 220px). Code examples synced to match preview props exactly. See `documentation/AGENTS.md`.
- 2026-07-27: **TextParticleEngine initialization fix.** Fixed an issue where the text was not correctly sized/positioned on initial load. `handleResize` in `TextParticleEngine` now uses `textRef.current` instead of the stale `text` prop from the initial render closure. Added a `document.fonts.ready` check on mount to recalculate text targets once web fonts have fully loaded, ensuring `measureText` calculations are completely accurate when the library is used in external apps.
- 2026-07-27: **Subpixel Text Rendering Fix (Float Index Bug).** Fixed a critical issue where the text particles would look skewed, clipped, or wrapped (e.g., showing a "C" on the wrong side) on initial load. This was caused by `ResizeObserver` returning a float value for `entry.contentRect.width`. When used directly in `useTextParticles` to calculate the `ImageData` pixel array stride (`index = (y * width + x) * 4`), the fractional width shifted row reads exponentially. Enforced strict `Math.floor()` rounding for all dimensions and loops in the sampling engine, correctly locking particle coordinates to absolute pixels.

| Change type | Update this section |
|---|---|
| New file added | Section 3 — Annotated File Tree |
| File deleted or renamed | Section 3 — Annotated File Tree |
| New exported symbol (component, hook, function, type) | Section 3 + Section 4 |
| Exported symbol renamed or removed | Section 4 (and bump version in Section 1) |
| Prop added/removed/changed on any component | Section 4 |
| New background engine mode | Section 2 (architecture), Section 3, Section 4 (BackgroundCanvas type) |
| Physics algorithm changed | Section 6 |
| New coding pattern established | Section 5 |
| Responsive breakpoint changed | Section 5 |
| New skill installed | Section 7 |
| Skill removed | Section 7 |
| `package.json` version bumped | Section 1 |
| New script added to `package.json` | Section 8 |
| `tsconfig.json` or `vite.config.ts` changed | Section 1 and/or Section 8 |

**At the start of each task session:** Read this file first. It is your primary context. Do not rely on code search alone to understand the project.

---

## 10. Scope & Exclusions

**This library is not:**
- **SSR-compatible.** `HTMLCanvasElement`, `ResizeObserver`, `requestAnimationFrame`, and `window` are used directly. These are browser-only APIs. Do not attempt to add server-side rendering support without major architectural changes.
- **A charting library.** It renders decorative/artistic particle effects, not data.
- **A general animation framework.** It has no public animation timeline or sequencing API.
- **CSS-based.** All visual output is canvas-drawn. No DOM particles, no CSS animations.

**External runtime dependencies:** Zero. Only `react` and `react-dom` are used, and they are peer dependencies (not bundled).

**Do not add runtime dependencies** without explicit discussion. Keeping zero runtime deps is a design goal.

**Browser support target:** Modern browsers supporting ES2020, Canvas 2D API, `ResizeObserver`, and Pointer Events. No IE or legacy Safari support intended.
