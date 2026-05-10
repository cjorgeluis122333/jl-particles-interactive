# Particle Vowels Project Context

Este documento sirve como fuente única de verdad para el contexto del proyecto, facilitando el desarrollo rápido y reduciendo errores.

## Regla de Mantenimiento Obligatoria
Cualquier cambio, añadido o modificación en el código o funcionalidad que afecte a una de las descripciones técnicas, arquitectónicas o de características listadas en este fichero **DEBE** ir acompañado de una actualización en este `AGENTS.md`.

## Descripción del Proyecto
Una aplicación web interactiva desarrollada en **React + Vite + TypeScript** que renderiza texto (proporcionado por el usuario o por defecto) mediante una nube de partículas animadas.

## Stack Tecnológico
- **Frontend**: React 18+ (Vite)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Hooks nativos de React (`useState`, `useRef`, `useEffect`)
- **Gestión de Partículas**: Lógica personalizada en `Particle.ts` y motor de renderizado en canvas.

## Estructura de Directorios
- `/src/App.tsx`: Componente principal y UI de control (inputs, selectores).
- `/src/components/`:
    - `ParticleCanvas.tsx`: Envoltorio para el canvas.
    - `TextParticleEngine.tsx`: Motor principal que renderiza el texto como partículas.
    - `Particle.ts`: Clase que define el comportamiento físico de cada partícula.
- `/src/hooks/`: Lógica reutilizable (`useParticleInteraction.ts`, `useTextParticles.ts`).
- `/src/constants/`: Datos compartidos (`colors.ts`, `palettes.ts`, `words.ts`).

## Características Principales
1. **Renderizado de Texto**: Convierte texto de entrada en una estructura de partículas basada en píxeles.
2. **Interactividad**:
    - Efecto imán (magnet) para atraer o repeler partículas.
    - Modos de clic configurables.
3. **Personalización Visual**:
    - Selección de colores (modo simple o paletas).
    - Selección de color de fondo del canvas.
    - Forma de las partículas (círculo, cuadrado).
4. **Palabras por Defecto**: Gestionadas en `src/constants/words.ts`.

## Reglas de Desarrollo
- **Tailwind**: Usar clases de utilidad directamente. No crear CSS personalizado fuera de `/src/index.css`.
- **Limpieza**: No dejar residuos de sistemas de seguimiento (cara/mano) anteriores. El sistema está totalmente optimizado para entrada de texto y ratón/puntero.
- **Tipado**: Mantener tipado estricto en todos los componentes y hooks.
