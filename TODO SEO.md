# TODO SEO

> Last updated: 2026-07-03

## Pending Changes

### NEXT_PUBLIC_SITE_URL not set — canonical/OG/sitemap fall back to localhost
- **Source:** n/a — no live deploy URL exists anywhere in the repo (no vercel.json, no hardcoded domain, unlike diffViewer/spotiPaper/cromaWall which had a known `*.vercel.app` domain hardcoded already).
- **What:** `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` all read `process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'`. Without that env var set in the actual deployment (Vercel project settings or `.env.production`), canonical URLs, `og:url`, and the sitemap's `<loc>` will all resolve to `http://localhost:3000` in production — actively wrong metadata.
- **Where:** Vercel project env vars (or wherever this is deployed) — set `NEXT_PUBLIC_SITE_URL` to the real production URL.
- **Why:** Without it, every piece of metadata added this pass points at localhost, which is worse than having no canonical/OG tags at all.
- **Risk:** None to fix — it's just a missing env var. Flagged instead of guessing a domain (fabricating a URL that might not match the real deployment would be actively wrong metadata fed to crawlers/AI).
- **Effort:** Low — one env var.

### Pre-existing build-blocking bug (unrelated to SEO, found incidentally)
- **What:** `app/page.tsx:59` — `new Blob([updatedPdfBytes], ...)` fails TypeScript compilation: `Uint8Array<ArrayBufferLike>` not assignable to `BlobPart` (lib/tsconfig target mismatch on `applyMetadata`'s return type from `pdf-lib`). `next build` currently fails outright on this — same category of "app can't ship to production" as the bug fixed in portfolioGenerator's `[username]/layout.tsx`.
- **Where:** `app/page.tsx:59`, likely needs a cast/fix in `lib/pdf.ts`'s `applyMetadata` return type or wrapping in `new Uint8Array(updatedPdfBytes)` at the call site.
- **Why:** Not fixed this pass — out of Findable's SEO/GEO scope and user asked to wrap up; flagging since it blocks deployment entirely regardless of any SEO work.
- **Effort:** Low, but needs someone to actually verify the fix against the current TS/lib target rather than guess.

## Applied this cycle
- Root metadata was previously just a bare title + one-line description — added full `Metadata` (title template, description, keywords, canonical, OpenGraph, Twitter Card, robots directives), `Viewport` with `themeColor`, and `WebApplication` JSON-LD to `app/layout.tsx`.
- Added `app/robots.ts` and `app/sitemap.ts` (dynamic, Next file convention — safer than a static file with a guessed domain).
- Added `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png` (dark-theme document + metadata-tag icon, matches the app's dark UI).
- Added `public/llms.txt` and `public/humans.txt`.
- Did **not** create a static `public/robots.txt`/`sitemap.xml` with a guessed production domain — no confirmed live URL exists in this repo, and fabricating one would put wrong data in front of crawlers. Used env-var-based dynamic routes instead; see the `NEXT_PUBLIC_SITE_URL` item above.
