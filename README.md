# jl-particle-interactive — React Canvas Particle Animations

[![npm version](https://img.shields.io/npm/v/jl-particle-interactive)](https://www.npmjs.com/package/jl-particle-interactive)
[![npm downloads](https://img.shields.io/npm/dm/jl-particle-interactive)](https://www.npmjs.com/package/jl-particle-interactive)
[![bundle size](https://img.shields.io/bundlephobia/minzip/jl-particle-interactive)](https://bundlephobia.com/package/jl-particle-interactive)
[![license](https://img.shields.io/npm/l/jl-particle-interactive)](https://github.com/cjorgeluis122333/jl-particles-interactive/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org/)

A canvas-based React library for rendering text and backgrounds as thousands of animated particles. Letters form from particle swarms, respond to magnetic hover, attract or repel on click, and backgrounds come alive with NET graphs, JELLYFISH glows, or pointer-following swarms. Built with zero runtime dependencies, full TypeScript support, and DPR-aware rendering for sharp output on retina displays.

> Requires React 18+. No global CSS. Zero runtime dependencies.

---

## Why jl-particle-interactive?

| Feature | jl-particle-interactive | tsparticles | particles.js |
|---|---|---|---|
| **Text that forms from particles** | ✓ (native, spatial coherence) | Plugin only (complex setup) | ✗ |
| **Spring physics + float noise** | ✓ | ✗ | ✗ |
| **Magnetic hover / click interact** | ✓ (attract & repel) | ✗ | ✗ |
| **Ready-made background presets** | ✓ NET, JELLYFISH, FOLLOW_POINTER | General engine (DIY) | General engine (DIY) |
| **Runtime dependencies** | **Zero** | 14+ packages | 0 (vanilla JS only) |
| **React integration** | Native React hooks | Wrapper package needed | Manual integration |
| **TypeScript** | Strict mode | Partial | ✗ |
| **DPR-aware (retina)** | ✓ | ✗ | ✗ |

---

## Use cases

- **Hero section animated titles** — Text materializes from particle chaos on page load
- **Loading screens** — Words form and dissolve while content loads
- **Interactive word carousels** — Cycle through words; particles re-form smoothly
- **Animated backgrounds** — NET graph, JELLYFISH glow, or pointer-following swarm behind any content

---

## Installation

```bash
npm install jl-particle-interactive
```

---

## Framework compatibility

| Framework | Supported |
|---|---|
| Vite + React | ✓ |
| Next.js (App Router & Pages) | ✓ (client components only — add `'use client'`) |
| Create React App | ✓ |
| Remix | ✓ (client-side only) |
| Astro | ✓ (inside `client:only` components) |
| TypeScript | ✓ (strict mode, declarations included) |

---

## What it offers

| Feature | Description |
|---|---|
| **Text particles** | Thousands of canvas particles that form any text string using pixel-sampling with spatial coherence — letters look sharp at any size |
| **Magnetic hover** | Particles are attracted to the cursor on hover (~173px radius spring force) |
| **Click interactions** | Attract or repel particles on click/tap — particles flee or swarm toward the pointer |
| **Animated backgrounds** | NET (connected node graph), JELLYFISH (organic glow rings), and FOLLOW_POINTER (swarm) modes |
| **Spring physics** | Each particle uses spring + friction + float-noise physics — movement feels natural, never robotic |
| **Customizable** | Colors (hex or RGB palettes), shapes (circle, square, bean), density, speed, ease, and more |

---

## Quick start

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function App() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine text="Hello" />
    </ParticleCanvas>
  );
}
```

---

## Text examples

### 1. Free-floating particles

When `text` is an empty string, particles scatter and drift freely across the canvas — great for ambient loading screens or decorative backgrounds.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FloatingParticles() {
  return (
    <ParticleCanvas height="60vh" backgroundColor="#050505">
      <TextParticleEngine
        text=""
        particleColor={['#60a5fa', '#a78bfa', '#34d399']}
        particleSize={1.2}
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}
```

---

### 2. Hello 🖐️ — magnetic hover + color palette

Particles form the text and spring toward the cursor on hover. Click and hold to repel them outward.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function HelloParticles() {
  return (
    <ParticleCanvas height="60vh" backgroundColor="#050505">
      <TextParticleEngine
        text="Hello 🖐️"
        particleColor={['#f472b6', '#fb923c', '#facc15', '#34d399', '#60a5fa']}
        particleSize={1.3}
        particleEase={1.2}
        isMagnet={true}
        clickMode="repel"
        particleShape="circle"
      />
    </ParticleCanvas>
  );
}
```

---

### 3. Word carousel — cycles every 3 seconds

The particles re-form automatically each time the `text` prop changes. No extra animation code needed.

```tsx
import { useEffect, useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['Create', 'Inspire', 'React'];

export default function WordCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="60vh" backgroundColor="#050505">
      <TextParticleEngine
        text={words[index]}
        particleColor={['#60a5fa', '#a78bfa', '#f472b6']}
        particleSize={1.5}
        particleEase={1.2}
        isMagnet={true}
        particleShape="bean"
      />
    </ParticleCanvas>
  );
}
```

---

## Background examples

Use `<ParticleBackground>` for standalone animated backgrounds. Set the mode with the `name` prop and pass all options through `config`.

### 1. FOLLOW_POINTER — swarm that follows the cursor

Particles form a loose swarm that chases the cursor across the canvas.

```tsx
import { ParticleBackground } from 'jl-particle-interactive';

export default function FollowPointerDemo() {
  return (
    <ParticleBackground
      name="FOLLOW_POINTER"
      height="60vh"
      backgroundColor="#050505"
      config={{
        orientation: 'diagonal',
        density: 1,
        shape: 'bean',
        colors: ['#00d4ff', '#6ee7b7', '#facc15'],
        colorMode: 'wave',
        particleSpeed: 1,
        pointerTrackingSpeed: 0.06,
      }}
    />
  );
}
```

---

### 2. NET — connected node graph

Particles bounce around and draw lines between nearby nodes. Great for tech-style hero sections.

```tsx
import { ParticleBackground } from 'jl-particle-interactive';

export default function NetDemo() {
  return (
    <ParticleBackground
      name="NET"
      height="60vh"
      backgroundColor="#050505"
      config={{
        density: 0.9,
        shape: 'circle',
        colors: ['#7dd3fc', '#60a5fa', '#a78bfa'],
        colorMode: 'mixed',
        particleSpeed: 1,
        pointerTrackingSpeed: 0.08,
      }}
    />
  );
}
```

---

### 3. JELLYFISH — organic pulsing glow

Soft concentric rings expand and contract in a slow breathing cycle. Particles drift with organic float noise.

```tsx
import { ParticleBackground } from 'jl-particle-interactive';

export default function JellyfishDemo() {
  return (
    <ParticleBackground
      name="JELLYFISH"
      height="60vh"
      backgroundColor="#050505"
      config={{
        density: 1.1,
        shape: 'circle',
        colors: ['#f472b6', '#a78bfa', '#22d3ee'],
        colorMode: 'wave',
        particleSpeed: 1,
        pointerTrackingSpeed: 0.02,
      }}
    />
  );
}
```

---

## API reference

### `<ParticleBackground>`

Standalone background component. Use this when you want an animated background without any text particles.

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `'NONE' \| 'FOLLOW_POINTER' \| 'NET' \| 'JELLYFISH'` | **required** | Background engine to render |
| `config` | `BackgroundConfig` | `undefined` | All engine options (see table below) |
| `width` | `string \| number` | `'100%'` | Container width |
| `height` | `string \| number` | `'60vh'` | Container height |
| `backgroundColor` | `string` | `'#050505'` | Background fill color |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | — | Inline style overrides |

### `BackgroundConfig` (`config` prop options)

All fields are optional. Pass any combination inside the `config` prop of `<ParticleBackground>`.

| Option | Type | Applies to | Description |
|---|---|---|---|
| `density` | `number` | all modes | Particle count multiplier. Base counts: FOLLOW_POINTER=350, NET≈300, JELLYFISH=350 |
| `color` | `string` | all modes | Single hex color for all particles |
| `colors` | `string[]` | all modes | Palette of hex colors; overrides `color` |
| `colorMode` | `'wave' \| 'mixed'` | all modes | How colors propagate across particles |
| `shape` | `'circle' \| 'square' \| 'bean'` | all modes | Particle drawing shape |
| `particleSpeed` | `number` | all modes | Animation speed multiplier |
| `pointerTrackingSpeed` | `number` | all modes | How fast particles follow the cursor (lower = floatier) |
| `orientation` | `'vertical' \| 'horizontal' \| 'diagonal'` | FOLLOW_POINTER only | Swarm drift direction |
| `interactionRadius` | `number` | — | Declared in type; not applied in current version |
| `lineDistance` | `number` | — | Declared in type; not applied in current version |

### `<ParticleCanvas>`

Container that combines text particles with an optional background. Use `background` to activate a background engine alongside `<TextParticleEngine>` children.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Content rendered above background (z-index 10) |
| `width` | `string \| number` | `'100%'` | Container width |
| `height` | `string \| number` | `'60vh'` | Container height |
| `backgroundColor` | `string` | `'#050505'` | Background fill color |
| `background` | `BackgroundCanvas` | `{ name: 'NONE' }` | Background engine config (flat object with `name` + all options) |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | — | Inline style overrides |

### `<TextParticleEngine>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | **required** | Text the particles form |
| `particleColor` | `string \| string[]` | `'255, 255, 255'` | RGB string or array of hex colors |
| `particleSize` | `number` | `1` | Size multiplier |
| `particleDensity` | `number` | `1` | Particle count multiplier |
| `particleEase` | `number` | `1` | Return speed multiplier |
| `isMagnet` | `boolean` | `true` | Hover attraction effect |
| `clickMode` | `'none' \| 'attract' \| 'repel'` | `'none'` | Click/tap interaction |
| `particleShape` | `'circle' \| 'square' \| 'bean'` | `'circle'` | Particle shape |
| `backgroundColor` | `string` | `'#050505'` | Canvas background (hex) |

> **Color note:** `particleColor` accepts `'R, G, B'` strings (e.g. `'255, 100, 50'`) or hex strings in an array (e.g. `['#ff0000', '#00ff00']`). Alpha is handled internally.

---

## License

MIT
