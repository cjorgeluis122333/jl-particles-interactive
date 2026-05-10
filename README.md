# React Text Particles

A high-performance, interactive text particle engine built with React and HTML5 Canvas. It allows you to render text using thousands of particles that respond to mouse movements and clicks.

## Features

- **Dynamic Text Rendering**: Converts any text input into a particle arrangement.
- **Interactive Physics**:
   - **Magnet Effect**: Particles gently attract to your cursor as you move it over the canvas.
   - **Click Effects**: Configure what happens when you click (Attract, Repel, or None) for explosive or cohesive interactions.
- **Customizable Aesthetics**:
   - **Color Palettes**: Choose between single colors or beautiful multi-color gradients and palettes.
   - **Particle Shape**: Toggle between circles (smoother) and squares (better performance for lower-end devices).
   - **Density & Size**: Adjust how many particles are rendered and their individual sizes.
   - **Ease/Speed**: Control how quickly particles move to their target positions.
- **Responsive**: Automatically adjusts sizing and density based on screen rules.

## Installation & Setup

1. Copy the components from `src/components` and the hooks from `src/hooks` into your React project.
2. Ensure you have tailwind setup if you want to use the included UI controls, or build your own UI.
3. Import the `ParticleCanvas` and `TextParticleEngine` into your application.

## Quick Usage

```tsx
import { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import TextParticleEngine from './components/TextParticleEngine';

function App() {
  const [text, setText] = useState("HELLO");

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <ParticleCanvas width="100%" height="100%">
        <TextParticleEngine 
          text={text} 
          particleColor="255, 255, 255" 
          particleSize={1} 
          particleDensity={1} 
          particleEase={1} 
          isMagnet={true} 
          clickMode="repel" 
          particleShape="circle" 
        />
      </ParticleCanvas>
      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        style={{ position: 'absolute', bottom: 20, left: 20 }}
      />
    </div>
  );
}

export default App;
```

## Props

### `ParticleCanvas`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | null | Expects the `TextParticleEngine`. |
| `width` | `string` \| `number` | `'100%'` | Width of the canvas wrapper. |
| `height` | `string` \| `number` | `'60vh'` | Height of the canvas wrapper. |
| `backgroundColor` | `string` | `'#050505'` | Background color of the canvas. Can be overridden to handle transparency or other colors. |

### `TextParticleEngine`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | required | The text to render as particles. |
| `particleColor` | `string` \| `string[]` | `'255, 255, 255'` | RGB string or array of RGB strings. |
| `particleSize` | `number` | `1` | Multiplier for the particle size. |
| `particleDensity` | `number` | `1` | Multiplier for the amount of particles generated. |
| `particleEase` | `number` | `1` | Multiplier for the speed at which particles return to their original position. |
| `isMagnet` | `boolean` | `true` | Whether particles physically interact with the mouse pointer position. |
| `clickMode` | `'none'` \| `'attract'` \| `'repel'` | `'none'` | The effect when the mouse is clicked/held down. |
| `particleShape` | `'circle'` \| `'square'` | `'circle'` | Shape of the particles. Squares perform better on low-end devices. |
