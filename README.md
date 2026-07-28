# jl-particle-interactive

Monorepo de la librería React `jl-particle-interactive` y su sitio de documentación con playground interactivo.

## Estructura

- `packages/jl-particle-interactive`: paquete publicable en npm. Su API y guía de uso están en [su README](./packages/jl-particle-interactive/README.md).
- `apps/web`: documentación y playground, disponibles respectivamente en `/` y `/demo`.

## Desarrollo

```bash
npm install
npm run dev
```

Comprueba ambos entregables con:

```bash
npm run lint
npm run build
```

## Publicación

Tras actualizar la versión de `packages/jl-particle-interactive/package.json`:

```bash
npm run publish:library
```

El workflow de GitHub también publica automáticamente una versión nueva al hacer push a `main` con cambios en el paquete.

## Despliegue web

El archivo `vercel.json` construye `apps/web` y sirve sus rutas SPA. Conecta el repositorio a Vercel y conserva la raíz del proyecto en el repositorio; no hace falta desplegar la librería como una aplicación.

