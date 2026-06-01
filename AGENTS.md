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
- **Estado**: Hooks nativos de React (`useState`, `useRef`, `useEffect`)
- **Gestión de Partículas**: Librería externa `jl-particle-interactive` (sin código local de partículas).

## Estructura de Directorios
- `/src/App.tsx`: Componente principal con sistema de navegación. Contiene la UI de control (inputs, selectores) y enrutamiento entre la página principal y la documentación.
- `/src/pages/DocumentationPage.tsx`: Página de documentación con dashboard para navegar entre diferentes secciones de documentación. Gestiona el estado de la sección actual.
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
5. **Sistema de Navegación**: 
    - Botón "Docs" en la esquina superior derecha (top-right) que navega a la página de Documentación.
    - Página de Documentación con dashboard que permite navegar entre diferentes secciones.
    - Navegación bidireccional: desde la página principal se accede a documentación, y desde documentación se puede volver a la página principal.

## Reglas de Desarrollo
- **Tailwind**: Usar clases de utilidad directamente. No crear CSS personalizado fuera de `/src/index.css`.
- **Sin código de partículas local**: Toda la lógica de partículas (`Particle.ts`, `TextParticleEngine`, `ParticleCanvas`, hooks) reside exclusivamente en la librería `jl-particle-interactive`. No duplicar código aquí.
- **Tipado**: Importar los tipos directamente desde la librería: `import type { ParticleShape, ClickMode, ColorMode } from 'jl-particle-interactive'`.
