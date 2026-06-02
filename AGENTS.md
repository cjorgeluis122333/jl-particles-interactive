# Particle Vowels Project Context

Este documento sirve como fuente única de verdad para el contexto del proyecto, facilitando el desarrollo rápido y reduciendo errores.

## Regla de Mantenimiento Obligatoria
Cualquier cambio, añadido o modificación en el código o funcionalidad que afecte a una de las descripciones técnicas, arquitectónicas o de características listadas en este fichero **DEBE** ir acompañado de una actualización en este `AGENTS.md`.

## Descripción del Proyecto
Una aplicación web interactiva desarrollada en **React + Vite + TypeScript** que renderiza texto (proporcionado por el usuario o por defecto) mediante una nube de partículas animadas.

Este proyecto actúa como **banco de pruebas** de la librería `jl-particle-interactive`. Toda la lógica de partículas vive en la librería; aquí solo existe la UI de control y la integración.

## Librería de Partículas: `jl-particle-interactive`
- **Paquete npm**: `jl-particle-interactive`
- **Código fuente**: `d:\PROGRAMACION\HTML_CSS_JS\react\myprojects\jl-particles-interactive\`
- **Componentes exportados**: `ParticleCanvas`, `TextParticleEngine`
- **Hooks exportados**: `useParticleInteraction`, `useTextParticles`
- **Tipos exportados**: `ParticleShape`, `ColorMode`, `ClickMode`, `ParticleCanvasProps`, `TextParticleEngineProps`

> Cuando detectes un bug o necesites modificar el comportamiento de las partículas, **edita el proyecto de la librería** en la ruta indicada, ejecuta `npm run build` allí, y luego actualiza la dependencia aquí con `npm install jl-particle-interactive@latest` (o mediante `npm install ../jl-particles-interactive` si todavía no se ha publicado la nueva versión).

## Stack Tecnológico
- **Frontend**: React 19 (Vite)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Routing**: React Router v6 (`react-router-dom`) con `createBrowserRouter` y nested routes
- **Estado**: Hooks nativos de React (`useState`, `useRef`, `useEffect`)
- **Gestión de Partículas**: Librería externa `jl-particle-interactive` (sin código local de partículas).

## Estructura de Directorios
- `/src/main.tsx`: Punto de entrada. Monta `<RouterProvider>` con el router de React Router v6.
- `/src/router.tsx`: Define todas las rutas de la aplicación con `createBrowserRouter`.
- `/src/modules/playground/PlaygroundPage.tsx`: Módulo del playground. Contiene la UI de control (inputs, selectores) y el canvas de partículas.
- `/src/modules/docs/layout/DocsLayout.tsx`: Layout compartido del módulo de documentación. Incluye header con back link y sidebar lateral.
- `/src/modules/docs/layout/Sidebar.tsx`: Sidebar de navegación de la documentación con `<NavLink>` de React Router.
- `/src/modules/docs/pages/DocsIndex.tsx`: Dashboard de la documentación (`/docs`). Grid de tarjetas con links a cada sección.
- `/src/modules/docs/pages/`: Páginas individuales de cada sección (`GettingStarted`, `Components`, `Customization`, `ApiReference`, `Hooks`, `TextSamples`, `CanvasSamples`).
  - `TextSamples.tsx`: Galería de 16 ejemplos con texto (`/docs/examples/text`).
  - `CanvasSamples.tsx`: Galería de ejemplos de canvas sin texto (`/docs/examples/canvas`). Actualmente solo `CanvasExample01Default`.
- `/src/modules/docs/examples/`: Ejemplos de documentación organizados por tipo.
  - `/src/modules/docs/examples/_ExampleShell.tsx`: Componente contenedor reutilizable para previews y código.
  - `/src/modules/docs/examples/text/`: 16 ejemplos con texto (`Example01BasicText.tsx` - `Example16AdaptiveText.tsx`) usados en `TextSamples`.
  - `/src/modules/docs/examples/canvas/`: Ejemplos sin texto para fondos. Actualmente contiene `CanvasExample01Default.tsx` usado en `CanvasSamples`.
  - `_ExampleShell.tsx`: Componente contenedor que:
    - Muestra preview del componente + código fuente en acordeón (Show/Hide Code)
    - Estados visuales: activo (borde verde), pausado (opacidad 50%), inactivo (dimmed)
    - Botón de control: "Ejecutar" (inactivo) → "Pausa/Reanuda" (activo) según estado
    - Overlay "Pausado" cuando el ejemplo está pausado o no es el activo
    - **Estructura de contenedor tipo Playground**: wrapper externo centrado + wrapper interno con `pointer-events-auto` para garantizar interactividad correcta del canvas
    - Los ejemplos con controles (inputs/botones/selectores) usan overlays con `pointer-events-none` en la capa y `pointer-events-auto` en controles para mantener la adaptación del texto al contenedor sin romper la interacción
  - `Example01BasicText.tsx` - `Example15WordCarousel.tsx`: Uno por cada ejemplo del README de la librería.
    - `Example11HeroSection.tsx`: Incluye input editable de texto para comprobar visualmente la adaptación de tamaño según longitud (comportamiento similar a Playground).
- `/src/constants/`: Datos compartidos de la UI (`colors.ts`, `palettes.ts`, `words.ts`). **No contiene lógica de partículas.**

## Características Principales
1. **Renderizado de Texto**: Convierte texto de entrada en una estructura de partículas basada en píxeles (via librería).
2. **Interactividad**:
    - Efecto imán (magnet) para atraer o repeler partículas.
    - Modos de clic configurables.
3. **Personalización Visual**:
    - Selección de colores (modo simple o paletas).
    - Selección de color de fondo del canvas.
    - Forma de las partículas (círculo, cuadrado).
4. **Palabras por Defecto**: Gestionadas en `src/constants/words.ts`.
5. **Galería de 15 Ejemplos Interactivos**: En `/docs/examples/` se renderizan todos los ejemplos del README con:
    - Preview visual interactivo del componente
    - Código fuente visible en acordeón (mostrar/ocultar)
    - Interfaz modular y reutilizable con `_ExampleShell.tsx`
    - Grid responsive (1 columna en móvil, 2 en desktop)
        - **Probe de adaptación**: bloque superior con input editable + canvas para comprobar en tiempo real el reescalado de texto según longitud (comportamiento tipo Playground).
        - **Sistema de pausa/ejecución**: Solo un ejemplo se ejecuta a la vez. Al hacer clic en "Ejecutar" en un ejemplo, los demás se pausan automáticamente para optimizar rendimiento. El primer ejemplo (#1) está activo por defecto.
        - **Estados visuales**: Ejemplos activos tienen borde verde, pausados se oscurecen (50% opacidad).
        - **Control granular**: Botón "Pausa/Reanuda" en ejemplos activos para controlar la animación sin cambiar de ejemplo.
6. **Sistema de Navegación**: 
    - Botón "Docs" en la esquina superior derecha (top-right) que navega a `/docs` usando `<Link>` de React Router.
    - Página `/docs` muestra el dashboard con grid de tarjetas. Cada tarjeta es un `<Link>` a su ruta de sección.
    - Layout de sidebar persistente en todas las rutas `/docs/*` via nested routes + `<Outlet>`.
    - Navegación bidireccional: botón back en el header de docs usa `<Link to="/">` para regresar al playground.
    - Refresh en cualquier ruta `/docs/*` mantiene la página correcta (sin 404).

## Reglas de Desarrollo
- **Tailwind**: Usar clases de utilidad directamente. No crear CSS personalizado fuera de `/src/index.css`.
- **Sin código de partículas local**: Toda la lógica de partículas (`Particle.ts`, `TextParticleEngine`, `ParticleCanvas`, hooks) reside exclusivamente en la librería `jl-particle-interactive`. No duplicar código aquí.
- **Tipado**: Importar los tipos directamente desde la librería: `import type { ParticleShape, ClickMode, ColorMode } from 'jl-particle-interactive'`.
- **Patrón de Contenedor para Canvases**: El patrón correcto para renderizar ParticleCanvas (tanto en Playground como en ejemplos) es un wrapper externo con flex centering + pointer-events-none, conteniendo un wrapper interno con pointer-events-auto. Esto garantiza que el canvas se centre correctamente y el texto se adapte al contenedor disponible:
  ```jsx
  <div className="h-full w-full p-6 pointer-events-none flex items-center justify-center">
    <div className="pointer-events-auto w-full h-full">
      <ParticleCanvas>{/* content */}</ParticleCanvas>
    </div>
  </div>
  ```
