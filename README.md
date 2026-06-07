# jl-particle-interactive

Particle animations for React — text that comes alive and backgrounds that react to your cursor.

---

## Installation

```bash
npm install jl-particle-interactive
```

> Requires React 18+. No global CSS. No extra dependencies.

---

## What it offers

| Feature | Description |
|---|---|
| **Text particles** | Thousands of particles that form any text string |
| **Magnetic hover** | Particles are attracted to the cursor on hover |
| **Click interactions** | Attract or repel particles on click/tap |
| **Animated backgrounds** | NET, JELLYFISH, and FOLLOW_POINTER modes |
| **Customizable** | Colors, shapes, density, speed, and more |

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
