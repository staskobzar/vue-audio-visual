# Copilot instructions for vue-audio-visual

Purpose: short reference for Copilot sessions to quickly understand how to build, test, lint, and navigate this repository.

---

## Build, test, and lint commands

- Dev (local demo):
  - npm run dev
- Preview demo (after build-demo):
  - npm run preview
- Full library build (runs type-check, demo build, dist build, types):
  - npm run build
- Dist-only build (library bundle):
  - npm run build-dist
- Demo build (GitHub Pages site under /vue-audio-visual/):
  - npm run build-demo
- Type generation / aliases:
  - npm run build-types
- Type checking (fast check used in CI and pre-build):
  - npm run type-check

- Unit tests (Vitest, jsdom):
  - Run full suite: npm run test:unit
  - CI with coverage: npm run test:ci
  - Run a single test file: npm run test:unit -- path/to/spec.file.ts
  - Run a single test by name: npm run test:unit -- -t "partial or full test name"

- Linting (ESLint + Vue + TypeScript):
  - npm run lint  (adds --fix)

- Notes:
  - This project uses Vite 8.x and matching plugins (minimum tested versions):
    - vite >= 8.0.14
    - @vitejs/plugin-vue >= 6.0.7
    - @vitejs/plugin-basic-ssl >= 2.3.0
  - If a developer encounters peer dependency conflicts during dev dependency install on some npm setups, using:
    - npm install --legacy-peer-deps
    can resolve the issue and was used during upgrades in this repo.
  - CI workflow (.github/workflows/node.js.yml) runs: npm ci, npm run lint, npm run build, npm run test:ci

---

## High-level architecture (big picture)

- This repository is a Vue 3 plugin that exposes a set of audio-visualization components and composable helpers.
- Exports are centralized in `src/plugin.ts`:
  - Library exposes components: AVBars, AVLine, AVCircle, AVWaveform, AVMedia
  - And composables: useAVBars, useAVLine, useAVCircle, useAVWaveform, useAVMedia
- Components are single-file Vue components under `src/components/` and implement UI/props/events.
- Business logic is extracted to composables under `src/composables/` (audio/canvas context handling and drawing logic).
- Build targets:
  - Demo site built by Vite (configured to output to `docs/`, base path `/vue-audio-visual/`) — used for live examples and GH Pages hosting.
  - Library bundle built with `vite.config.dist.ts` into `dist/` as ESM + UMD (Vue is externalized).
  - Types generated via `vue-tsc` and `tsc-alias` (see `build-types`).
- Tests use Vitest with a jsdom environment and a small test setup (`tests.setup.ts`) that mocks `HTMLCanvasElement.getContext`.

---

## Key repository conventions and patterns

- Naming:
  - Components: PascalCase exports (AVBars) and registered as kebab-case tags (`<av-bars>`). See `src/plugin.ts`.
  - Composables: prefixed with `useAV` (useAVBars, useAVWaveform, etc.). These accept refs to DOM elements (audio, canvas).
- Aliases:
  - `@` is aliased to `src/` in both development and dist Vite configs. Use `@/components/...` or `@/composables/...`.
- Separation of concerns:
  - Rendering/display code lives in components; audio processing and drawing code live in composables. Prefer updating composable logic when behavior changes across components.
- Testing:
  - Vitest is configured in `vite.config.ts` (see `test` block). Tests run under `jsdom`. `tests.setup.ts` stubs canvas contexts — for more realistic canvas tests install the `canvas` package and its system deps (see CONTRIBUTING.md).
  - To run a specific test file or test name pass arguments after `--` to the npm script (see Single test commands above).
- Type and release flow:
  - Type-checking and type generation are explicit steps in the build pipeline. `npm run build` runs type-check and then builds demo and dist and types. Keep `tsconfig.build-types.json` and `tsconfig.vitest.json` in sync where relevant.
- Linting and formatting:
  - ESLint with `@vue/eslint-config-typescript` is used. `npm run lint` will attempt autofixes.

---

## Where to look first (short pointers)

- `src/plugin.ts` — entrypoint & public API
- `src/components/` — Vue SFCs (behavior + templates)
- `src/composables/` — audio/canvas logic shared by components
- `vite.config.ts`, `vite.config.dist.ts` — dev/demo and library build configuration
- `package.json` — scripts (build/test/lint) and dependency versions
- `tests.setup.ts` — small global test stubs/mocks
- `CONTRIBUTING.md` and `README.md` for usage, API, and notes about demo and test environment

---

If this file should be expanded with examples (e.g., common code snippets to mock audio/canvas in tests, or recommended single-file test invocation examples), say which area to expand.
