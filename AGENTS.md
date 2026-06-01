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
- `/src/modules/docs/pages/`: Páginas individuales de cada sección (`GettingStarted`, `Components`, `Customization`, `ApiReference`, `Hooks`, `Examples`).
- `/src/modules/docs/examples/`: 15 componentes de ejemplo interactivos + componente shell reutilizable:
  - `_ExampleShell.tsx`: Componente contenedor que muestra preview del ejemplo + código fuente en acordeón.
  - `Example01BasicText.tsx` - `Example15WordCarousel.tsx`: Uno por cada ejemplo del README de la librería.
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
