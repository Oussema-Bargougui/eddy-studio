# Eddy Studio

Eddy Studio is the frontend where a school's management reads its school and acts on it with Eddy. It is built to sit inside EduCap later, as a sidebar entry.

- **Read** — a morning briefing, chart walls per theme, class files that open in place.
- **Understand** — Eddy slides over the page and answers "Pourquoi ?" with data, charts and sources. AI only runs on demand.
- **Act** — guided scenarios (forms, step by step). A dark panel always lists what will be written to EduCap. Nothing is written before an explicit **Valider**.

The design follows the concept board (cream / ink / EduCap purple, Fraunces + Inter + Caveat, counters, handwritten notes, ink that draws itself).

## Commands

```bash
pnpm install
pnpm dev          # http://localhost:5180
pnpm check        # types + lint + unit tests
pnpm test:e2e     # Playwright in the installed Chrome (starts the dev server if needed)
pnpm build        # production build in dist/
```

The project needs Node 22 or 24. On Node 23, jsdom is pinned to 26 so the unit tests still run.

## Docker

```bash
docker compose up -d --build     # http://localhost:5180
docker compose logs -f           # shows the allowed EduCap origins at start
docker compose down
```

The image is built in two stages: Node compiles the app, then nginx serves it. It weighs about 50 MB.

**One image for every environment.** The image is never rebuilt per environment. Its settings come from variables given at start-up:

| Variable | Default | Role |
|---|---|---|
| `EDUCAP_ORIGINS` | `http://localhost:3002 http://localhost:3001` | EduCap addresses allowed to embed Eddy Studio and send it a session. Space-separated. |
| `EDDY_STUDIO_PORT` (compose only) | `5180` | Port on the host |

```bash
docker run -d -p 8080:80 -e EDUCAP_ORIGINS="https://staging.educap.io" eddy-studio:local
```

At start-up, `docker/15-eddy-config.sh` checks `EDUCAP_ORIGINS` and refuses to start on unexpected characters, so nothing can be injected. It then writes `/config.js`, which the app reads, and nginx puts the same list in `Content-Security-Policy: frame-ancestors`, so only EduCap can show Eddy Studio in a frame.

nginx serves the files as follows:

- Internal addresses fall back to `index.html`.
- `/assets/*` (hashed names) is cached for a year and gzipped.
- `index.html` and `/config.js` are never cached.
- `/healthz` answers the Docker health check.

On Windows, Docker Desktop keeps images and build cache in its data disk. On this machine it is on `D:\DockerData`.

## Stack

| Need | Choice |
|---|---|
| Base | React 19, React Compiler, Vite 8 (Rolldown), TypeScript 7 strict |
| Routing | TanStack Router, file-based and typed; filters live in the URL (`?classe=7B`) |
| Data | TanStack Query on top of a `DataSource` interface |
| Style | Tailwind CSS v4; the design tokens are in `src/styles/index.css` |
| Motion | Motion, NumberFlow (counters); honours "reduce motion" |
| Charts | Hand-made SVG with d3-scale and d3-shape (`src/charts`) |
| Overlays | Radix Dialog (Eddy), cmdk (Ctrl+K) |
| Forms | react-hook-form + zod |
| Languages | i18next with typed keys; French is the default, English is ready |
| Quality | oxlint (250-line limit per file, a11y, hooks), Vitest, Playwright |

## Layout

```
src/
  app/          providers, query client, router
  routes/       one file per URL; each file only declares its route
  features/
    shell/      top bar, floating navigation, Eddy launcher, shortcuts, UI store
    briefing/   home page
    explore/    themes, class trends, class file drawer
    eddy/       Eddy layer, conversation, "Pourquoi ?" button
    command/    Ctrl+K bar
    scenarios/  catalogue, wizard parts, one folder per scenario
    journal/    log of validated actions
  charts/       LineChart, BarChart, StackedBars, Sparkline
  ui/           Card, buttons, AnimatedNumber, HandNote, InkPath, ChoiceGroup…
  api/          types, DataSource contract, demo source, query hooks
  lib/          formatting (fr numbers, deltas), dates in the school's time zone
  i18n/         fr, en
e2e/            Playwright journeys; their screenshots go to e2e/shots
```

## Data

Every screen reads through `DataSource` (`src/api/source.ts`). Today it is backed by `createDemoSource()`, a fictional school called École Les Oliviers whose figures are kept consistent by `consistency.test.ts`.

The EduCap source will implement the same interface over the API. The shapes in `src/api/types.ts` only contain what EduCap can really provide. Three rules apply:

- Dates are shown in the school's time zone, never the browser's.
- Money is never added across currencies.
- Attendance always names its source: roll call alone, or report-card absences, which include direct declarations.

## Shortcuts

- `Ctrl/⌘ + K` — command bar: find a class, start a scenario, ask Eddy.
- `Ctrl/⌘ + J` — open Eddy.
- `Échap` — close the open layer.
