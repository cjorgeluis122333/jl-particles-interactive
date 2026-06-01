# jl-particle-interactive — Guía Completa

Una librería React para crear animaciones de partículas interactivas que forman texto sobre un canvas HTML5.

---

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Inicio rápido](#inicio-rápido)
3. [API de componentes](#api-de-componentes)
   - [ParticleCanvas](#particlecanvas)
   - [TextParticleEngine](#textparticleengine)
4. [API de hooks](#api-de-hooks)
   - [useParticleInteraction](#useparticleinteraction)
   - [useTextParticles](#usetextparticles)
5. [Tipos exportados](#tipos-exportados)
6. [Ejemplos](#ejemplos)
   - [Básico: texto estático](#1-básico-texto-estático)
   - [Cambio dinámico de texto](#2-cambio-dinámico-de-texto)
   - [Paleta de colores](#3-paleta-de-colores)
   - [Modo repulsión al hacer clic](#4-modo-repulsión-al-hacer-clic)
   - [Modo atracción al hacer clic](#5-modo-atracción-al-hacer-clic)
   - [Sin efecto magnético](#6-sin-efecto-magnético)
   - [Partículas cuadradas](#7-partículas-cuadradas)
   - [Alta densidad y tamaño grande](#8-alta-densidad-y-tamaño-grande)
   - [Fondo personalizado](#9-fondo-personalizado)
   - [Canvas de tamaño fijo](#10-canvas-de-tamaño-fijo)
   - [Animación de título hero](#11-animación-de-título-hero)
   - [Pantalla de carga con partículas](#12-pantalla-de-carga-con-partículas)
   - [Contador animado](#13-contador-animado)
   - [Selector de modo interactivo](#14-selector-de-modo-interactivo)
   - [Carrusel de palabras](#15-carrusel-de-palabras)
7. [Personalización avanzada](#personalización-avanzada)
8. [Preguntas frecuentes](#preguntas-frecuentes)

---

## Instalación

```bash
npm install jl-particle-interactive
```

```bash
yarn add jl-particle-interactive
```

```bash
pnpm add jl-particle-interactive
```

**Requisitos:** React 18 o superior.

> La librería no incluye CSS global ni depende de ningún framework de estilos.

---

## Inicio rápido

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function App() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine text="Hola" />
    </ParticleCanvas>
  );
}
```

Al renderizar verás miles de partículas blancas que se reorganizan para formar el texto "Hola" sobre un fondo casi negro. Al pasar el cursor sobre el canvas, las partículas cercanas son atraídas magnéticamente.

---

## API de componentes

### ParticleCanvas

Contenedor visual que envuelve el canvas. Provee bordes redondeados, sombra y overflow oculto. No es obligatorio; puedes usar cualquier `div` con `position: relative`.

```tsx
<ParticleCanvas
  width="100%"
  height="60vh"
  backgroundColor="#050505"
  className="mi-clase"
  style={{ borderRadius: '2rem' }}
>
  {/* children */}
</ParticleCanvas>
```

| Prop              | Tipo                   | Por defecto                     | Descripción                                    |
|-------------------|------------------------|---------------------------------|------------------------------------------------|
| `width`           | `string \| number`     | `'100%'`                        | Ancho del contenedor (CSS válido)              |
| `height`          | `string \| number`     | `'60vh'`                        | Alto del contenedor (CSS válido)               |
| `backgroundColor` | `string`               | `'#050505'`                     | Color de fondo CSS del `div` contenedor        |
| `className`       | `string`               | `''`                            | Clase CSS adicional                            |
| `style`           | `CSSProperties`        | —                               | Estilos inline adicionales (sobrescriben base) |
| `children`        | `ReactNode`            | —                               | Contenido a renderizar dentro                  |

---

### TextParticleEngine

Motor principal. Renderiza un `<canvas>` que ocupa toda el área del contenedor padre y anima las partículas.

```tsx
<TextParticleEngine
  text="React"
  particleColor="100, 200, 255"
  particleSize={1.2}
  particleDensity={1.5}
  particleEase={1.5}
  isMagnet={true}
  clickMode="repel"
  particleShape="circle"
  backgroundColor="#050505"
/>
```

| Prop              | Tipo                      | Por defecto          | Descripción                                                                                   |
|-------------------|---------------------------|----------------------|-----------------------------------------------------------------------------------------------|
| `text`            | `string`                  | **requerido**        | Texto que forman las partículas. String vacío (`""`) dispersa las partículas libremente.      |
| `particleColor`   | `string \| string[]`      | `'255, 255, 255'`    | Color en formato `'R, G, B'`. Usa un array para asignar colores aleatorios por partícula.     |
| `particleSize`    | `number`                  | `1`                  | Multiplicador de tamaño. `0.5` = pequeñas, `2` = grandes.                                    |
| `particleDensity` | `number`                  | `1`                  | Multiplicador de cantidad. `0.5` = pocas, `2` = el doble.                                    |
| `particleEase`    | `number`                  | `1`                  | Multiplicador de velocidad de retorno al objetivo. Mayor = más rápido.                        |
| `isMagnet`        | `boolean`                 | `true`               | Si `true`, el hover del ratón atrae suavemente las partículas cercanas.                       |
| `clickMode`       | `'none' \| 'attract' \| 'repel'` | `'none'`    | Comportamiento al mantener pulsado: nada / atraer fuertemente / repeler con fuerza.           |
| `particleShape`   | `'circle' \| 'square'`    | `'circle'`           | Forma de cada partícula.                                                                      |
| `backgroundColor` | `string`                  | `'#050505'`          | Color HEX del fondo del canvas. Se usa con alfa `0.25` para crear el efecto de estela.       |

> **Nota sobre colores:** `particleColor` acepta formato `'R, G, B'` (sin `rgb()`, sin `#`). El canal alfa lo gestiona internamente la librería. Usa `backgroundColor` con hex para el fondo.

---

## API de hooks

Puedes usar los hooks directamente si quieres construir tu propio motor de renderizado.

### useParticleInteraction

Registra eventos de puntero sobre un elemento y devuelve una ref con el estado del ratón.

```tsx
import { useParticleInteraction } from 'jl-particle-interactive';

const containerRef = useRef<HTMLDivElement>(null);
const mouseRef = useParticleInteraction(containerRef);

// mouseRef.current contiene:
// {
//   x: number,       // posición X relativa al contenedor
//   y: number,       // posición Y relativa al contenedor
//   isDown: boolean, // botón del puntero presionado
//   active: boolean  // el puntero está dentro del contenedor
// }
```

También exporta `getMagnetTarget`, la función pura que calcula hacia dónde debe moverse cada partícula según la posición del ratón y el modo activo:

```tsx
import { getMagnetTarget } from 'jl-particle-interactive';

const { x, y } = getMagnetTarget(
  particle.x, particle.y,
  particle.targetX, particle.targetY,
  mouseX, mouseY,
  isMouseDown,
  isMagnet,
  clickMode
);
```

---

### useTextParticles

Convierte texto en una nube de puntos pixel y asigna posiciones objetivo a las partículas.

```tsx
import { useTextParticles } from 'jl-particle-interactive';

const { updateTextTargets, textRef } = useTextParticles(text, particlesRef, containerRef);

// Actualiza los objetivos de todas las partículas para formar `text`
updateTextTargets('A');

// O pasando dimensiones explícitas (útil antes de que el DOM esté listo)
updateTextTargets('A', 800, 400);
```

---

## Tipos exportados

```tsx
import type {
  ParticleCanvasProps,
  TextParticleEngineProps,
  ClickMode,
  ParticleShape,
  ColorMode,
} from 'jl-particle-interactive';

// ClickMode = 'none' | 'attract' | 'repel'
// ParticleShape = 'circle' | 'square'
// ColorMode = 'single' | 'palette'
```

---

## Ejemplos

### 1. Básico: texto estático

El caso más simple. Las partículas flotan aleatoriamente y forman el texto al cargar.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function BasicExample() {
  return (
    <ParticleCanvas height="50vh">
      <TextParticleEngine text="Hola Mundo" />
    </ParticleCanvas>
  );
}
```

---

### 2. Cambio dinámico de texto

`TextParticleEngine` reacciona a cambios en la prop `text`. Las partículas se redistribuyen fluidamente.

```tsx
import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const words = ['React', 'Vite', 'TypeScript', 'Canvas'];

export default function DynamicText() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ParticleCanvas height="50vh">
        <TextParticleEngine text={words[index]} />
      </ParticleCanvas>

      <button onClick={() => setIndex((i) => (i + 1) % words.length)}>
        Siguiente palabra
      </button>
    </div>
  );
}
```

---

### 3. Paleta de colores

Pasa un array de colores RGB para que cada partícula adopte uno al azar.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function ColorPalette() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="Color"
        particleColor={[
          '255, 100, 100',   // rojo
          '100, 200, 255',   // azul claro
          '150, 255, 150',   // verde
          '255, 220, 80',    // amarillo
          '200, 100, 255',   // violeta
        ]}
      />
    </ParticleCanvas>
  );
}
```

---

### 4. Modo repulsión al hacer clic

Al mantener pulsado el botón del ratón, las partículas salen disparadas desde el cursor.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function RepelMode() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="¡Explota!"
        clickMode="repel"
        particleColor="255, 140, 0"
      />
    </ParticleCanvas>
  );
}
```

---

### 5. Modo atracción al hacer clic

Al pulsar, las partículas son atraídas fuertemente hacia el cursor, aplastándose.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AttractMode() {
  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text="Imán"
        clickMode="attract"
        isMagnet={false}
        particleColor="80, 220, 200"
      />
    </ParticleCanvas>
  );
}
```

---

### 6. Sin efecto magnético

Desactiva el efecto hover para una experiencia más limpia. El texto permanece estable al pasar el ratón.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function NoMagnet() {
  return (
    <ParticleCanvas height="50vh">
      <TextParticleEngine
        text="Estático"
        isMagnet={false}
        particleColor="200, 200, 200"
      />
    </ParticleCanvas>
  );
}
```

---

### 7. Partículas cuadradas

Usa `particleShape="square"` para un estilo más pixelado.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function SquareParticles() {
  return (
    <ParticleCanvas height="55vh" backgroundColor="#0a0a0a">
      <TextParticleEngine
        text="8-BIT"
        particleShape="square"
        particleSize={1.5}
        particleColor="0, 255, 100"
        backgroundColor="#0a0a0a"
      />
    </ParticleCanvas>
  );
}
```

---

### 8. Alta densidad y tamaño grande

`particleDensity` multiplica la cantidad de partículas. `particleSize` multiplica el radio de cada una.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function DenseParticles() {
  return (
    <ParticleCanvas height="70vh">
      <TextParticleEngine
        text="HD"
        particleDensity={2}
        particleSize={0.6}
        particleEase={2}
        particleColor="255, 255, 255"
      />
    </ParticleCanvas>
  );
}
```

> Valores de densidad muy altos (> 3) pueden afectar el rendimiento en dispositivos lentos.

---

### 9. Fondo personalizado

Ajusta `backgroundColor` tanto en `ParticleCanvas` como en `TextParticleEngine` para que coincidan.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function CustomBackground() {
  const bg = '#0d1b2a'; // azul oscuro

  return (
    <ParticleCanvas height="60vh" backgroundColor={bg}>
      <TextParticleEngine
        text="Noche"
        backgroundColor={bg}
        particleColor={['200, 220, 255', '150, 180, 255', '100, 140, 230']}
      />
    </ParticleCanvas>
  );
}
```

---

### 10. Canvas de tamaño fijo

Útil para tarjetas o secciones con dimensiones exactas.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function FixedCanvas() {
  return (
    <ParticleCanvas width={600} height={300} style={{ margin: '0 auto' }}>
      <TextParticleEngine
        text="600×300"
        particleColor="255, 200, 0"
        isMagnet={true}
      />
    </ParticleCanvas>
  );
}
```

---

### 11. Animación de título hero

Sección hero de página completa con texto grande y efecto de repulsión.

```tsx
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function HeroSection() {
  return (
    <section style={{ width: '100%', padding: '4rem 0' }}>
      <ParticleCanvas height="80vh" style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}>
        <TextParticleEngine
          text="BIENVENIDO"
          particleColor={['255, 255, 255', '200, 200, 200', '150, 200, 255']}
          particleSize={1.3}
          particleDensity={1.2}
          particleEase={1.5}
          clickMode="repel"
        />
      </ParticleCanvas>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Mi Portafolio</h1>
        <p>Haz clic y arrastra sobre las partículas para interactuar.</p>
      </div>
    </section>
  );
}
```

---

### 12. Pantalla de carga con partículas

Muestra las partículas mientras carga y las dispersa al terminar.

```tsx
import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simula carga de datos
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParticleCanvas height="100vh">
      <TextParticleEngine
        text={loaded ? '' : '...'}
        particleColor="80, 180, 255"
        particleEase={2}
        isMagnet={false}
      />
    </ParticleCanvas>
  );
}
```

> Pasar `text=""` dispersa todas las partículas de forma aleatoria, lo que crea un efecto de "dissolve".

---

### 13. Contador animado

Las partículas se reorganizan cada vez que cambia el número.

```tsx
import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

export default function AnimatedCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c < 9 ? c + 1 : 0)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="40vh" width={300} style={{ margin: '0 auto' }}>
      <TextParticleEngine
        text={String(count)}
        particleColor="255, 180, 50"
        particleEase={3}
        particleDensity={1.5}
        isMagnet={false}
        backgroundColor="#050505"
      />
    </ParticleCanvas>
  );
}
```

---

### 14. Selector de modo interactivo

Permite al usuario cambiar en tiempo real el modo de interacción.

```tsx
import { useState } from 'react';
import { ParticleCanvas, TextParticleEngine, ClickMode } from 'jl-particle-interactive';

const modes: ClickMode[] = ['none', 'attract', 'repel'];

export default function InteractiveModeSelector() {
  const [mode, setMode] = useState<ClickMode>('none');
  const [magnet, setMagnet] = useState(true);

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        {modes.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{ fontWeight: mode === m ? 'bold' : 'normal' }}
          >
            Clic: {m}
          </button>
        ))}
        <button onClick={() => setMagnet((v) => !v)}>
          Magneto: {magnet ? 'ON' : 'OFF'}
        </button>
      </div>

      <ParticleCanvas height="55vh">
        <TextParticleEngine
          text="DEMO"
          clickMode={mode}
          isMagnet={magnet}
          particleColor="180, 255, 180"
          particleSize={1.2}
        />
      </ParticleCanvas>
    </div>
  );
}
```

---

### 15. Carrusel de palabras

Rota palabras automáticamente con un intervalo y muestra la transición de partículas.

```tsx
import { useState, useEffect } from 'react';
import { ParticleCanvas, TextParticleEngine } from 'jl-particle-interactive';

const WORDS = ['Creatividad', 'Código', 'Diseño', 'Animación', 'React'];
const COLORS = [
  ['255, 100, 100', '255, 160, 100'],
  ['100, 200, 255', '80, 140, 255'],
  ['150, 255, 150', '80, 210, 120'],
  ['255, 220, 80', '255, 160, 50'],
  ['200, 100, 255', '150, 80, 255'],
];

export default function WordCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <ParticleCanvas height="60vh">
      <TextParticleEngine
        text={WORDS[index]}
        particleColor={COLORS[index]}
        particleEase={1.8}
        particleDensity={1.2}
        clickMode="repel"
      />
    </ParticleCanvas>
  );
}
```

---

## Personalización avanzada

### Superponer contenido HTML sobre el canvas

`TextParticleEngine` se posiciona con `position: absolute; inset: 0` y `zIndex: 0`. Puedes colocar elementos HTML encima añadiendo hijos con `position: relative` y un `zIndex` superior dentro del mismo `ParticleCanvas`.

```tsx
<ParticleCanvas height="60vh">
  <TextParticleEngine text="Fondo" isMagnet={false} />

  {/* Contenido superpuesto */}
  <div style={{ position: 'relative', zIndex: 10, padding: '2rem', color: 'white' }}>
    <h2>Título superpuesto</h2>
    <p>Este texto está sobre las partículas.</p>
  </div>
</ParticleCanvas>
```

### Usar sin ParticleCanvas

Puedes ignorar `ParticleCanvas` y usar cualquier contenedor con `position: relative`.

```tsx
<div style={{ position: 'relative', width: '100%', height: '400px', background: '#000', overflow: 'hidden' }}>
  <TextParticleEngine text="Custom" particleColor="255, 255, 255" />
</div>
```

### Hook useParticleInteraction de forma standalone

Si construyes tu propio loop de animación:

```tsx
import { useRef } from 'react';
import { useParticleInteraction, getMagnetTarget } from 'jl-particle-interactive';

function MyCustomCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useParticleInteraction(containerRef);

  // En tu loop de animación (requestAnimationFrame):
  // const target = getMagnetTarget(p.x, p.y, p.tx, p.ty,
  //   mouseRef.current.x, mouseRef.current.y,
  //   mouseRef.current.isDown, true, 'repel');

  return <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '400px' }} />;
}
```

---

## Preguntas frecuentes

**¿Por qué `particleColor` no acepta `#hex` directamente?**
El motor mezcla el color con un canal alfa variable por partícula usando `rgba(R, G, B, alpha)`. Para simplificar la construcción de la cadena internamente, se espera el formato `'R, G, B'`. Para el fondo sí se admite HEX en `backgroundColor`.

**¿Cómo ajusto el rendimiento en móviles?**
La librería detecta automáticamente `window.innerWidth < 600` y reduce la cantidad base de partículas a 1500 (frente a 3000 en escritorio). Puedes reducir aún más con `particleDensity={0.5}`.

**¿Qué pasa si paso un string de más de un carácter?**
`TextParticleEngine` acepta cadenas de cualquier longitud, pero el texto se renderiza a medida de la fuente Georgia serif en una sola línea. Cadenas cortas (1–4 caracteres) ofrecen mejores resultados visuales. Para frases largas, reduce `particleDensity` y aumenta el `height` del contenedor.

**¿Cómo detengo la animación?**
La animación corre mientras el componente está montado. Desmonta el componente para detenerla.

**¿Puedo cambiar la fuente del texto?**
La fuente está hardcodeada como `bold Georgia, serif` dentro del hook `useTextParticles`. Para cambiarla, crea un fork del proyecto y edita `src/hooks/useTextParticles.ts`.

**¿Funciona con SSR (Next.js, Remix)?**
El canvas requiere `document` y `window`. Usa carga dinámica con `ssr: false`:
```tsx
// Next.js
import dynamic from 'next/dynamic';
const TextParticleEngine = dynamic(
  () => import('jl-particle-interactive').then((m) => m.TextParticleEngine),
  { ssr: false }
);
```

**¿Cómo contribuir?**
Clona el repositorio, instala dependencias con `npm install`, y ejecuta `npm run build` para compilar. El código fuente está en `src/`.
