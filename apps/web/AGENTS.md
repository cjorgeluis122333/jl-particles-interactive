# AGENTS.md — Web Application Context

This workspace is the public Vite SPA. It is not published to npm.

## Structure

```text
apps/web/
├── src/main.tsx              # Router: documentation routes plus /demo
├── src/documentation/        # Docs shell, navigation, pages and live examples
├── src/demo/                 # Interactive Text/Background playground
├── src/index.css             # Shared Tailwind entry and global utilities
├── package.json              # Web-only dependencies and commands
└── vite.config.ts            # React/Tailwind plus local library source alias
```

The documentation is displayed at `/`; the playground is a separate top-level route at `/demo`. Keep both in this workspace instead of creating independent applications.

## Development rules

- The Vite and TypeScript aliases resolve `jl-particle-interactive` to the local library source. Keep both aliases synchronized when moving the package.
- All routing lives in `src/main.tsx`. Add documentation routes there and keep `src/documentation/App.tsx` navigation entries in sync.
- The visual style is Tailwind-first and uses the existing dark glassmorphic tokens.
- Live particle demos should use conservative particle densities and `LiveDemo` so canvases unmount off screen.
- Do not import web dependencies into `packages/jl-particle-interactive`.

## Commands

From the repository root: `npm run dev`, `npm run build:web`, and `npm run lint`.

## Maintenance

Update this file after changing the routes, route ownership, web dependencies, design patterns, or the local-library alias.

### Recent maintenance notes

- 2026-07-28: Consolidated the former `documentation/` and `demo/` projects into this workspace. The root router now owns both surfaces, which are deployed as one Vercel SPA.
