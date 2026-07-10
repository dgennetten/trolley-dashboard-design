# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Refer to @agents.md for the **Design OS planning workflow** — the `/product-vision`, `/design-shell`, `/shape-section`, `/design-screen`, `/export-product` flow, the `product/` vs `product-plan/` distinction, and the design/Tailwind requirements for screen designs. That document is authoritative for *how to design a product* with this tool.

The notes below cover what `agents.md` does not: the **commands** and the **architecture of the Design OS application itself** (the React app under `src/` that renders the planning files).

## Commands

```bash
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # tsc -b (typecheck) then vite build
npm run lint     # eslint over the whole repo
npm run preview  # serve the production build
```

There is no test runner configured. `npm run build` is the closest thing to a full check — it runs the TypeScript project references (`tsc -b`) before bundling, so a green build means types are sound. Run `npm run lint` for style/hooks rules.

## Architecture

Design OS is a Vite + React 19 + React Router + Tailwind v4 single-page app. Its distinguishing trait: **the app has almost no hardcoded content. Everything it displays is discovered from the filesystem at build time** via Vite's `import.meta.glob`.

### The loader layer (`src/lib/*-loader.ts`)

Each loader globs a slice of the `product/` (and `src/sections/`, `src/shell/`) trees and turns files into typed data. This is the heart of the app — understand it before changing rendering:

- `product-loader.ts` — globs `/product/*.md`, parses `product-overview.md` and `product-roadmap.md` with **regex against markdown headings** (`## Description`, `### Problem N:`, `### N. Title`, `## Key Features`). Roadmap section IDs are derived by `slugify()`, where `" & "` becomes `"-and-"` (so section folders like `authentication-and-member-portal` match their roadmap titles). Also exposes the `product-plan.zip` export URL.
- `section-loader.ts` — per-section data: globs `/product/sections/*/spec.md` (parsed for Overview / User Flows / UI Requirements, plus a `shell: false` config flag), `/product/sections/*/data.json` (sample data), `/product/sections/*/*.png` (screenshots), and `/src/sections/*/*.tsx` (screen-design components, loaded **lazily**).
- `design-system-loader.ts` — globs `/product/design-system/*.json` for color/typography tokens.
- `shell-loader.ts` — globs `/product/shell/spec.md` and `/src/shell/components/*.tsx`. `loadAppShell()` prefers a `ShellWrapper.tsx`, falling back to `AppShell.tsx`.

Consequence: **the presence or absence of a file changes app behavior.** The many `hasX()` helpers (`hasProductOverview`, `hasSectionSpec`, `hasShellComponents`, etc.) gate UI phases. Markdown parsing normalizes CRLF→LF and returns `null` on unparseable input rather than throwing — callers treat `null` as "not defined yet."

### Routing (`src/lib/router.tsx`)

Flat `createBrowserRouter` config mapping the planning phases to pages: `/` (product), `/data-shape`, `/design`, `/sections`, `/sections/:sectionId`, `/sections/:sectionId/screen-designs/:screenDesignName`, plus `/fullscreen` variants and `/shell/design`. `main.tsx` mounts only `<RouterProvider>`.

### Screen-design rendering (`src/components/ScreenDesignPage.tsx`)

A screen design is previewed in a **resizable container that embeds the `/fullscreen` route in an `<iframe>`** for true style isolation. The `ScreenDesignFullscreen` component:
1. Lazily loads the section's screen-design component via the section-loader.
2. Optionally wraps it in the product's `AppShell` — but only if shell components exist *and* the section's `spec.md` doesn't set `shell: false`. Nav items are parsed out of the shell spec (`**Label** → Description` format) and passed as props.
3. Syncs dark mode across the iframe boundary by polling `localStorage.theme`.

### Screen designs: preview wrapper vs. exportable component

This split is load-bearing and matches the `agents.md` "props-based components" rule:

- `src/sections/[section]/components/[Name].tsx` — the **exportable** component. Pure, props-only, never imports data. This is what ships in the export package.
- `src/sections/[section]/[Name].tsx` — the **preview wrapper** (a default export named `[Name]Preview`). It imports `data.json` and the `types.ts` from `product/sections/[section]/`, then renders the real component with that data and `console.log` stub callbacks. The section-loader globs these top-level `*.tsx` files as the previews.

When adding a screen design, create both: the pure component under `components/` and a thin preview wrapper beside it that feeds it sample data.

## Conventions specific to this app

- **Path alias:** `@/` → `src/` (configured in `vite.config.ts` and `tsconfig`). Preview wrappers reach into the product tree with `@/../product/...`.
- **shadcn/ui (new-york style)** primitives live in `src/components/ui/`, built on Radix + `class-variance-authority`. `cn()` from `src/lib/utils.ts` merges class names. Icons are `lucide-react`.
- **The Design OS app UI** (everything under `src/components/`) uses the fixed **stone/lime** palette and DM Sans — do **not** apply product design tokens to it. Product design tokens apply only to shell and section screen designs. (See `agents.md` → "Design System Scope".)
- Several loaders emit `console.log` debug output for shell detection; that is intentional, not stray logging.
