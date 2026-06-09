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

## Examples

### Text with a color palette

Assign multiple colors and each particle picks one at random.

```tsx
<ParticleCanvas height="60vh">
  <TextParticleEngine
    text="React"
    particleColor={['#ff6b6b', '#feca57', '#48dbfb']}
    particleSize={1.5}
  />
</ParticleCanvas>
```

---

### Repel on click

Particles flee from the cursor while the mouse button is held down.

```tsx
<ParticleCanvas height="60vh">
  <TextParticleEngine
    text="Boom"
    clickMode="repel"
    particleEase={2}
  />
</ParticleCanvas>
```

---

### Attract on click

The opposite — particles swarm toward the cursor on press.

```tsx
<ParticleCanvas height="60vh">
  <TextParticleEngine
    text="Pull"
    clickMode="attract"
    isMagnet={false}
  />
</ParticleCanvas>
```

---

### Animated NET background

A connected particle network moves behind your content.

```tsx
<ParticleCanvas
  height="80vh"
  background={{
    name: 'NET',
    color: '#4ecdc4',
    lineDistance: 120,
    density: 0.8,
  }}
>
  <TextParticleEngine text="Network" particleColor="#ffffff" />
</ParticleCanvas>
```

---

### Jellyfish background

Smooth, organic blobs that drift across the canvas.

```tsx
<ParticleCanvas
  height="80vh"
  background={{
    name: 'JELLYFISH',
    colors: ['#ff6b6b', '#a29bfe', '#00cec9'],
    colorMode: 'wave',
  }}
>
  <TextParticleEngine text="Fluid" particleColor="#ffffff" />
</ParticleCanvas>
```

---

### Dynamic text

Change the `text` prop and the particles re-form automatically.

```tsx
const words = ['Hello', 'World', 'React'];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine text={words[index]} />
    </ParticleCanvas>
  );
}
```

---

## API reference

### `<ParticleCanvas>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `string \| number` | `'100%'` | Container width |
| `height` | `string \| number` | `'60vh'` | Container height |
| `backgroundColor` | `string` | `'#050505'` | Background color |
| `background` | `BackgroundCanvas` | `{ name: 'NONE' }` | Animated background config |
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
