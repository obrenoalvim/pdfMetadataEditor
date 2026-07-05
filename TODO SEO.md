# TODO SEO

> Last updated: 2026-07-04

## Pending Changes

None currently.

## Applied
- Root metadata was previously just a bare title + one-line description — added full `Metadata` (title template, description, keywords, canonical, OpenGraph, Twitter Card, robots directives), `Viewport` with `themeColor`, and `WebApplication` JSON-LD to `app/layout.tsx`.
- Added `app/robots.ts` and `app/sitemap.ts` (dynamic, Next file convention).
- Added `app/icon.png`, `app/apple-icon.png`, `app/opengraph-image.png` (dark-theme document + metadata-tag icon, matches the app's dark UI).
- Added `public/llms.txt` and `public/humans.txt`.
- Fixed `NEXT_PUBLIC_SITE_URL` fallback in `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`: was `http://localhost:3000`, now defaults to the confirmed live deploy `https://pdf-metadata-editor-theta.vercel.app` (still overridable via env var).
- Fixed pre-existing build-blocking TS error at `app/page.tsx:59` (`Uint8Array<ArrayBufferLike>` not assignable to `BlobPart`) with a `BlobPart` cast.
- Added `export const dynamic = 'force-static'` to `app/robots.ts` and `app/sitemap.ts` — required by `output: 'export'` static export mode, `next build` was failing without it.
