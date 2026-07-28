# AGENTS.md — jl-particle-interactive Monorepo Context

> **Maintenance rule:** Update this file whenever the workspace layout, public library API, package configuration, CI, or deployment workflow changes. Update `apps/web/AGENTS.md` too when changing the web application.

## Project identity

`jl-particle-interactive` is a zero-runtime-dependency React canvas library for particle text and interactive particle backgrounds. It targets modern browsers only; it is not SSR-compatible.

| Item | Value |
|---|---|
| npm package | `jl-particle-interactive` |
| Current version | `0.3.1` |
| Library location | `packages/jl-particle-interactive` |
| Web location | `apps/web` |
| Package formats | ESM, UMD/CJS, TypeScript declarations |
| Peer dependencies | `react >= 18`, `react-dom >= 18` |
| Build tooling | Vite 6, TypeScript 5.8, `vite-plugin-dts` |
| Web deployment | Vercel, configured by `vercel.json` |

## Workspace layout

```text
.
├── apps/
│   └── web/                         # One Vite SPA: documentation at /, playground at /demo
│       ├── src/documentation/        # Docs layout, pages and live examples
│       ├── src/demo/                 # Interactive text/background playground
│       └── AGENTS.md                 # Web-specific context
├── packages/
│   └── jl-particle-interactive/      # The only npm-publishable workspace
│       ├── src/
│       │   ├── components/           # ParticleCanvas, text and background engines
│       │   ├── hooks/                # Pointer, sampling and background movement hooks
│       │   ├── types/                # Background types
│       │   ├── utils/textSampling.ts # Offscreen text sampling
│       │   ├── index.ts              # Public API entry point
│       │   └── types.ts              # Shared public types
│       ├── package.json              # Package metadata and restricted npm contents
│       ├── LICENSE                   # MIT license distributed with npm package
│       ├── vite.config.ts            # Library build + declaration generation
│       └── README.md                 # npm documentation
├── .github/workflows/publish.yml     # Version-aware npm publish + GitHub Release
├── package.json                      # Private npm-workspaces coordinator
└── vercel.json                       # Builds and serves apps/web as an SPA
```

Do not add app-specific code, Tailwind, React Router, icons, or documentation dependencies to the library package. The library must stay dependency-free at runtime; React and ReactDOM remain peer dependencies.

## Architecture

`ParticleCanvas` is the container. It mounts `TextParticleEngine` or a background engine through `ParticleBackground`:

```text
ParticleCanvas
├── TextParticleEngine
│   └── Particle (spring physics + idle float)
└── ParticleBackground
    ├── BackgroundParticleEngine  (FOLLOW_POINTER)
    ├── NetParticleEngine         (NET)
    └── JellyfishParticleEngine   (JELLYFISH)
```

Every engine owns an absolute canvas, a DPR-aware `ResizeObserver`, and a `requestAnimationFrame` loop. Mutable animation state must use refs; props read inside a frame loop must use the live `configRef` pattern rather than a closure.

The web app consumes the library source through aliases in `apps/web/vite.config.ts` and `apps/web/tsconfig.json`, giving immediate local feedback. The published package is still validated separately through its own build and `npm pack --dry-run`.

## Public API

Everything exported from `packages/jl-particle-interactive/src/index.ts` is public and must not be removed or renamed in a non-major release.

- Components: `ParticleCanvas`, `TextParticleEngine`, `ParticleBackground`
- Prop types: `ParticleCanvasProps`, `TextParticleEngineProps`, `ParticleBackgroundProps`
- Hooks/functions: `useParticleInteraction`, `useTextParticles`, `getMagnetTarget`
- Types: `ClickMode`, `ColorMode`, `ParticleShape`, `BackgroundModeName`, `BackgroundCanvas`, `ParticleOrientation`

`TextParticleEngine.text` accepts `string | string[]`; an empty string scatters particles. `particleColor` accepts RGB strings (`'R, G, B'`), not hex. `ParticleBackground` accepts `NONE`, `FOLLOW_POINTER`, `NET`, and `JELLYFISH` modes; its color configuration uses hex values.

## Important algorithms and conventions

- Text sampling uses an offscreen canvas. Dimensions must be floored before indexing `ImageData`; sampling uses a font-size-based gap and stochastic alpha acceptance for smooth edges.
- Particle target assignment uses X-noise sorting, Y-sorted chunks, proportional point selection when text points outnumber particles, and an arc impulse for long moves.
- Magnetic force uses squared distances: hover/attract radius `30_000`, repel radius `50_000`.
- Use `useRef` for particle arrays, time, mouse state, and animation-frame IDs. Never use React state for values read inside `requestAnimationFrame`.
- The mobile threshold is `600px`.
- Use canvas `screen` compositing for opaque glow and `source-over` for transparent/cleanup rendering.

## Commands

Run these commands from the repository root:

```bash
npm install
npm run dev             # apps/web
npm run lint            # type-check all workspaces
npm run build           # library first, then web
npm run build:library
npm run build:web
npm run publish:library # type-checks, builds and publishes packages/jl-particle-interactive
```

To inspect the exact npm payload without publishing:

```bash
npm pack --workspace=jl-particle-interactive --dry-run
```

The library's `files` allowlist contains only `dist` and `README.md`; verify this remains true whenever publishing configuration changes.

## CI and deployment

- `.github/workflows/publish.yml` runs only when the package, root lockfile, or publish workflow changes. It reads the version from `packages/jl-particle-interactive/package.json`, then type-checks, builds, publishes, tags, and creates a GitHub release only if the tag does not already exist.
- The publish workflow authenticates npm through the `NODE_AUTH_TOKEN` environment variable. The repository must define an `NPM_TOKEN` Actions secret containing an npm automation/access token with publish permission; the workflow validates it with `npm whoami` before publishing.
- Vercel should be connected to the repository root. `vercel.json` runs `npm run build:web`, serves `apps/web/dist`, and rewrites SPA routes to `index.html`.
- Update the package version before publishing. Never publish the root coordinator package; it is `private`.

## Change checklist

| Change | Required documentation update |
|---|---|
| Library file added, deleted, or renamed | Workspace layout and relevant architecture section here |
| Public export or prop changes | Public API section here and package README |
| Rendering/physics changes | Important algorithms section here |
| Web page, route, or playground changes | `apps/web/AGENTS.md` |
| Workspace/build/publish/deploy configuration | Commands or CI/deployment sections here |
| Package version change | Project identity version here |

## Recent maintenance notes

- 2026-07-28: Converted the repository to npm workspaces. The publishable library moved from the root `src/` to `packages/jl-particle-interactive`; the former separate documentation and demo apps were consolidated into `apps/web`, with documentation routes at `/` and the playground at `/demo`. The root package is now private, Vercel builds only the web workspace, and the npm release workflow targets only the library workspace.
- 2026-07-27: Added multi-line text, resilient initial text sizing after font loading, integer dimensions for image-data sampling, font-scaled sampling gaps, proportional target assignment, and stochastic anti-aliased sampling.

## Scope exclusions

Do not add SSR support, legacy-browser support, runtime dependencies, DOM-particle rendering, charting features, or a general animation timeline without explicit architectural discussion.
