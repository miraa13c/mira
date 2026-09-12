# Mira — "us, obviously" (standalone Astro + React)

A private little site for two people: home messages, love notes, a memory space, a surprise page, a timeline, a countdown, and a music page. Runs entirely client-side — content edits are saved to the visitor's browser (`localStorage`), no backend or database.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Pushes to `main` deploy automatically to GitHub Pages via `.github/workflows/deploy.yml`.
The site is published at <https://miraa13c.github.io/mira/>.

To enable deployment, open the repository's **Settings → Pages** page and set **Source** to
**GitHub Actions**. The workflow installs dependencies, builds the static Astro output, and
publishes `dist/`.

## Important things to know before you deploy

**1. Edits only save on the device that made them.**
Every screen (Settings, Love Notes, Our Space, Timeline, Music…) writes to that browser's `localStorage`. If you edit content on your laptop, your girlfriend won't see those edits on her phone — she'll only see whatever is baked into `src/lib/store.ts` (the `defaultData` seed) plus anything *she* has personally edited on her own device. To make a change permanent for everyone, edit the values in `defaultData` directly and redeploy.

**2. Some photo URLs are borrowed and will break.**
`src/lib/store.ts` hotlinks most images from a `cdn.b12.io` address (your old site builder) and one cover photo from a temporary `chatgpt.com/backend-api/...` link. The chatgpt.com one is a short-lived signed URL — it will expire, possibly already has. The b12.io ones will die the moment that B12 account goes away, which somewhat defeats the point of "we don't need B12 anymore."
**Fix:** download the actual photos, put them in `public/images/`, and point the `IMG` object in `store.ts` at local paths like `/images/coffee.jpg` instead. Local paths never expire.

## What was fixed from the original files

- `Home.tsx` referenced the `React.ReactNode` type without ever importing `React` — this fails TypeScript's type-check (`Cannot find namespace 'React'`). Replaced with a direct `import type { ReactNode } from 'react'`.
- `App.tsx` had the same issue with `React.CSSProperties`, plus two unused icon imports (`CalendarHeart`, `ChevronDown`) that were never rendered. Cleaned up.
- The Settings page had a "Save" button that did nothing (`updateData(d => ({ ...d }))` — every field already auto-saves on change, so this button was pure decoration implying unsaved state that never existed). Replaced with an honest "changes save automatically" note.
- Config/dotfiles were named so they wouldn't actually work if dropped straight into a repo: `_gitignore` → `.gitignore`, `astro_config.mjs` → `astro.config.mjs`, `env_d.ts` → `src/env.d.ts`. All fixed and placed at the correct paths.
- Normalized line endings (the original files used Windows CRLF).
