# AGENTS.md — Agent Context for jl-particle-interactive **Demo**

> This file contains context exclusively for the `demo/` project.
> For the library itself, see the root `AGENTS.md`.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Architecture](#2-architecture)
3. [Annotated File Tree](#3-annotated-file-tree)
4. [Component Reference](#4-component-reference)
5. [Constants & Data](#5-constants--data)
6. [Coding Conventions](#6-coding-conventions)
7. [Build & Dev Commands](#7-build--dev-commands)
8. [Self-Maintenance Rules](#8-self-maintenance-rules)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Package name** | `jl-particle-interactive-demo` |
| **Version** | `1.0.0` |
| **Type** | Standalone Vite + React demo app (not published to npm) |
| **Purpose** | Interactive playground to showcase and test every feature of the `jl-particle-interactive` library |
| **Deployed to** | GitHub Pages at `https://cjorgeluis122333.github.io/jl-particles-interactive/` |
| **Library source** | `jl-particle-interactive` resolved from local monorepo path `file:../` |
| **Build tool** | Vite 5.3 |
| **Styling** | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| **Language** | TypeScript 5.5, strict mode |
| **Icon library** | Lucide React (`lucide-react`) |
| **React** | 18.3.1, StrictMode |

---

## 2. Architecture

```
demo/
  index.html          ← HTML shell + SEO meta tags + JSON-LD schema
  src/
    main.tsx          ← React 18 createRoot → <App />
    App.tsx           ← Two-tab layout: Text | Background
    index.css         ← Tailwind import + .custom-scrollbar utility
    components/
      TextPlayground.tsx        ← Live editor for <TextParticleEngine>
      BackgroundPlayground.tsx  ← Live editor for <ParticleBackground>
    constants/
      colors.ts       ← 14 solid color definitions (name, RGB string, Tailwind class)
      palettes.ts     ← 7 multi-color palettes (name, RGB[] array, Tailwind gradient)
      words.ts        ← DEFAULT_WORDS array for the text carousel
```

**UI Layout:**
```
┌────────────────────────────────────────┐
│ [Text] [Background]   [npm] [GitHub]   │  ← fixed top bar (glassmorphic)
├────────────────────────────────────────┤
│                                        │
│           Canvas / Background          │  ← fills remaining space
│                                        │
├────────────────────────────────────────┤
│        Control Panel (fixed bottom)    │  ← glassmorphic panel
└────────────────────────────────────────┘
```

**Glassmorphic design tokens** (used everywhere):
- Container bg: `bg-white/5` (active: `bg-white/15`)
- Border: `border border-white/10`
- Backdrop blur: `backdrop-blur-sm`
- Text: `text-white` / `text-white/60`

---

## 3. Annotated File Tree

```
demo/
│
├── AGENTS.md                     ← this file; agent context for demo project
├── package.json                  ← app deps, scripts
├── tsconfig.json                 ← strict TS, ES2020, bundler resolution, no emit
├── vite.config.ts                ← React + Tailwind plugins; base: '/jl-particles-interactive/'
├── index.html                    ← HTML shell: SEO meta, OG tags, JSON-LD SoftwareApplication schema
│
├── public/
│   └── favicon.svg               ← Particle network icon (4 colored nodes + connection lines)
│
└── src/
    ├── main.tsx                  ← React root mount (StrictMode)
    ├── App.tsx                   ← Tab switcher: 'text' | 'background' state; top bar with links
    ├── index.css                 ← @import "tailwindcss" + .custom-scrollbar utility
    │
    ├── components/
    │   ├── TextPlayground.tsx    ← Live playground for TextParticleEngine (8 state vars + carousel)
    │   └── BackgroundPlayground.tsx  ← Live playground for ParticleBackground (mode + config controls)
    │
    └── constants/
        ├── colors.ts             ← COLORS: { name, value: 'R, G, B', bg: 'bg-...' }[]
        ├── palettes.ts           ← PALETTES: { name, values: string[], bg: 'bg-gradient-...' }[]
        └── words.ts              ← DEFAULT_WORDS: string[]
```

---

## 4. Component Reference

### `App.tsx`

Top-level component. Manages `tab: 'text' | 'background'` state.

- **Fixed top bar:** Tab switcher (left) + npm/GitHub icon links (right)
- **Tab switcher:** glassmorphic pill; active tab uses `bg-white/15`
- **GitHub link:** Inline SVG (24×24 viewBox)
- **npm link:** Lucide `<ExternalLink />` icon

**Never add business logic here.** Only tab routing and the top bar belong in `App.tsx`.

---

### `TextPlayground.tsx`

Live editor for `<TextParticleEngine>`. The canvas occupies the middle area; a fixed control panel sits at the bottom.

**State variables:**

| State | Type | Default | Purpose |
|---|---|---|---|
| `text` | `string` | `''` | Current text input |
| `colorMode` | `'single' \| 'palette'` | `'single'` | Single color vs multi-color palette |
| `particleColor` | `string` | first COLORS entry | Active single RGB color string |
| `paletteColors` | `string[]` | first PALETTES entry | Active palette RGB array |
| `particleShape` | `ParticleShape` | `'circle'` | Particle shape |
| `particleSize` | `number` | `1` | Size multiplier |
| `particleDensity` | `number` | `1` | Density multiplier |
| `particleEase` | `number` | `1` | Speed/ease multiplier |
| `isMagnet` | `boolean` | `true` | Magnetic hover on/off |
| `clickMode` | `ClickMode` | `'none'` | Click interaction mode |
| `canvasBg` | `string` | `'#050505'` | Canvas/container background hex |
| `canvasWidth` | `number` | `100` | Width as % of container |
| `canvasHeight` | `number` | `60` | Height in vh |
| `defaultWordIndex` | `number` | `0` | Current carousel word index |
| `showDefaultWords` | `boolean` | `true` | Whether carousel is active |

**Word carousel logic:**
- Activates after 3 s of no text input (timer reset on every keystroke)
- Cycles through `DEFAULT_WORDS` every 4 s via `setInterval`
- Deactivates immediately when user types

**Keyboard:** `Escape` clears text input.

**Control panel rows:**
1. BG color picker → Solid/Palette toggle → color swatches (14 single / 7 palettes) → Shape buttons → Magnet toggle → Click mode toggle
2. 5 sliders: Size (0.5–3), Density (0.1–3), Speed (0.1–3), Width % (30–100), Height vh (20–90) — 2-col on mobile, 5-col on md+
3. Text input (max 40 chars, auto-uppercase, centered, border-bottom style)

**Color swatch UI pattern:**
```tsx
// Selected state: ring + scale + shadow
className={`... ${isSelected
  ? 'opacity-100 ring-[1.5px] ring-white ring-offset-[2px] ring-offset-[#050505] scale-110 shadow-lg'
  : 'opacity-40 hover:opacity-100'
}`}
```

---

### `BackgroundPlayground.tsx`

Live editor for `<ParticleBackground>`. Background fills the full screen (no width/height cap).

**State variables:**

| State | Type | Default | Purpose |
|---|---|---|---|
| `mode` | `'FOLLOW_POINTER' \| 'NET' \| 'JELLYFISH'` | `'FOLLOW_POINTER'` | Active background engine |
| `colorMode` | `'single' \| 'palette'` | `'single'` | Single color vs palette |
| `singleColorRgb` | `string` | first COLORS entry | Active RGB string for single mode |
| `paletteValue` | `string[]` | first PALETTES entry | Active palette RGB array |
| `bgColor` | `string` | `'#050505'` | Container background hex |
| `density` | `number` | `1` | Particle count multiplier |
| `particleSpeed` | `number` | `1` | Movement speed multiplier |
| `pointerTrackingSpeed` | `number` | `0.06` | How fast particles follow cursor |
| `particleColorMode` | `'wave' \| 'mixed'` | `'wave'` | Color wave vs random mix |
| `orientation` | `ParticleOrientation` | `'vertical'` | Particle movement direction (FOLLOW_POINTER only) |
| `shape` | `ParticleShape` | `'circle'` | Particle shape |

**`rgbStringToHex()` helper:** Converts `'R, G, B'` → `'#RRGGBB'` for `ParticleBackground`'s hex-based `color`/`colors` props.

**`config` memo:** Built with `useMemo` — rebuilds only when any config state changes. Produces the `Omit<BackgroundCanvas, 'name'>` object passed to `<ParticleBackground config={...}>`.

**Conditionally visible controls:**
- Orientation buttons: only when `mode === 'FOLLOW_POINTER'`
- Color mode toggle (wave/mixed): only when `colorMode === 'palette'`

**Full-screen override:**
```tsx
style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
```
Removes `ParticleBackground`'s default rounded-border styles.

**Control panel rows:**
1. Mode buttons (Follow / Net / Jellyfish) → Solid/Palette toggle → color swatches → BG color picker
2. Shape buttons → Orientation (conditional) → Color mode toggle (conditional)
3. 3 sliders: Density (0.1–3), Speed (0.1–3), Tracking speed (0.01–0.20)

---

## 5. Constants & Data

### `constants/colors.ts` — `COLORS`

14 single-color entries. Each entry:
```ts
{ name: string; value: string; bg: string }
// value: 'R, G, B'  ← passed directly to particleColor prop
// bg: Tailwind class (e.g. 'bg-cyan-400') ← used for swatch rendering
```
Colors: White, Cyan, Rose, Emerald, Amber, Purple, Blue, Indigo, Pink, Red, Orange, Yellow, Lime, Teal.

### `constants/palettes.ts` — `PALETTES`

7 multi-color palette entries. Each entry:
```ts
{ name: string; values: string[]; bg: string }
// values: 'R, G, B'[]  ← passed as particleColor array or converted to hex[] for backgrounds
// bg: Tailwind gradient class ← used for swatch rendering
```
Palettes: Rainbow (6), Ocean (4), Fire (4), Forest (4), Cyberpunk (4), Sunset (3), Neon (3).

### `constants/words.ts` — `DEFAULT_WORDS`

```ts
export const DEFAULT_WORDS = ['HOLA 🖐️', 'CREATE 🚀', 'PARTICLES', 'INTERACTIVE', 'EASY ❤️'];
```
Carousel words shown when the text input is empty. Can be extended freely.

---

## 6. Coding Conventions

### Tailwind-only styling
No CSS files except `index.css` (which only contains the Tailwind import and `.custom-scrollbar`). All component styles use Tailwind utility classes inline.

### `useMemo` for heavy config objects
Use `useMemo` when building config objects passed to library components to avoid triggering unnecessary re-renders (see `BackgroundPlayground`'s `config` memo).

### RGB strings, not hex, for library props
`<TextParticleEngine particleColor>` requires `'R, G, B'` strings.  
`<ParticleBackground config.color>` requires hex strings.  
Use `rgbStringToHex()` to convert when calling `ParticleBackground`.

### TypeScript strict mode — no `any`
Matches the library's own strict config. All state and props must be typed explicitly.

### Slider pattern
```tsx
<input
  type="range"
  min={MIN} max={MAX} step={STEP}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
  className="w-full accent-white/60 cursor-pointer"
/>
```

### Color picker pattern
```tsx
<input
  type="color"
  value={hexColor}
  onChange={(e) => setHexColor(e.target.value)}
  className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
/>
```

---

## 7. Build & Dev Commands

Run all commands from inside the `demo/` directory.

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Type-check only (no build output)
npx tsc --noEmit

# Production build → demo/dist/
npm run build
# Includes type-check before vite build

# Preview production build locally
npm run preview
```

**GitHub Pages deployment** is automatic: pushing to `main` on the root repo triggers `.github/workflows/deploy-demo.yml`, which builds the demo and publishes `demo/dist/` to GitHub Pages. No manual deploy step needed.

**Library resolution:** The demo imports `jl-particle-interactive` from `file:../` (the root `src/`). After changing library source files, the dev server picks up changes automatically (no rebuild needed).

---

## 8. Self-Maintenance Rules

Update this file whenever the demo project changes.

| Change type | Update this section |
|---|---|
| New file added to `demo/src/` | Section 3 — Annotated File Tree |
| New component added | Section 3 + Section 4 |
| New state variable in a playground | Section 4 component table |
| New constant file added | Section 3 + Section 5 |
| New color or palette added | Section 5 |
| New dependency added to `demo/package.json` | Section 1 |
| New npm script added | Section 7 |
| Tailwind version changed | Section 1 |
| New UI pattern established | Section 6 |

### Recent maintenance notes

- 2026-06-27: File created. Extracted demo-specific context from root `AGENTS.md`.
