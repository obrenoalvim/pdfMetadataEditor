# TODO IMPROVEMENTS

> Started 2026-09-12

## Pending

### Add a test suite for lib/pdf.ts and lib/dates.ts
- **Category:** Test
- **What:** No test runner is configured (no vitest/jest, no `test` script). `lib/pdf.ts` (metadata read/write round-trip, encryption detection) and `lib/dates.ts` (datetime-local conversions) are the app's core logic and have zero automated coverage.
- **Where:** `lib/pdf.ts`, `lib/dates.ts`, new `package.json` devDependency + script
- **Why:** These are pure functions ideal for unit testing; a regression here (e.g. the keyword-encoding bug just fixed) would otherwise only surface as silent metadata corruption in a downloaded file.
- **Risk:** Low risk to app code, but adds a new devDependency (vitest recommended) and CI step, which is out of scope for a same-pass safe change.
- **Effort:** Medium

### File-type validation relies solely on `file.type` MIME sniffing
- **Category:** Bug
- **What:** `Dropzone.tsx` only accepts a file if the browser-reported `file.type === 'application/pdf'`. Some OS/browser combinations report an empty or generic MIME type for local files (e.g. certain Windows file associations), which would silently reject a genuine PDF even though the `<input accept=".pdf,application/pdf">` let the user pick it.
- **Where:** `components/Dropzone.tsx` (`handleDrop`, `handleFileInput`)
- **Why:** Not confirmed reproducible in this session (needs cross-browser/OS testing), so not applied as a direct fix; a defensive fallback (also accept files with a `.pdf` extension when `file.type` is empty) would need testing to avoid weakening validation.
- **Risk:** Low, but a same-session guess at OS-specific behavior isn't safe to ship untested.
- **Effort:** Low

## Applied (2026-09-12)
- Fixed `lib/pdf.ts`: `PDFDocument.load()` defaults to pdf-lib's `updateMetadata: true`, which unconditionally overwrites `Producer` to `"pdf-lib (...)"` and `ModificationDate` to "now" as soon as any PDF is loaded — meaning the app was misreporting those two fields for every PDF opened, before any edit. Passed `updateMetadata: false` at both load call sites.
- Fixed `lib/pdf.ts` `applyMetadata()`: keywords were written via pdf-lib's `setKeywords()`, which joins with spaces, while `loadPdfAndExtractMeta()` reads them back by splitting on commas — multi-word keywords set through this app silently merged into one keyword on next load. Now writes the `Keywords` entry directly with a comma delimiter for a consistent round-trip. Also fixed: clearing all keywords was a no-op (guarded by `length > 0`) so old keywords survived "Clear All Fields" + download.
- Fixed `lib/pdf.ts` `applyMetadata()`: clearing the Creation Date or Modification Date field was a no-op (guarded by truthy checks) so the original dates survived into the downloaded file even after being cleared in the form. Now explicitly deletes those Info dict entries when the field is cleared.
- Fixed `components/Dropzone.tsx`: dropping/selecting a non-PDF file silently did nothing, with no feedback. Now shows the existing `errorReading` toast.
- Removed unused `@supabase/supabase-js` dependency (never imported anywhere in the codebase) from `package.json`/`package-lock.json`.
- Fixed `README.md`/`README.pt.md`: tech stack listed "Next.js 13.5", actual installed/built version is Next.js 15.
- Fixed `CONTRIBUTING.md`: clone URL pointed at `github.com/brenoalvim/pdfMetadataEditor` (wrong username casing and repo name), actual remote is `github.com/obrenoalvim/pdf-metadata-editor`.
- Resolved all 18 `npm audit` findings (1 critical, 12 high, 4 moderate, 1 low), down to 0. Note: the prior entry here mischaracterized these as dev-tooling-only — the critical finding was in `next` itself (production framework, e.g. unauthenticated RCE on Windows-hosted servers), not just transitive lint/build tooling. `npm audit fix` alone resolved 16/18 (next 15.5.20 -> 15.5.25, plus patch bumps to postcss/sharp/nanoid/yaml/etc., all within existing semver ranges). The last 2 (a high-severity PostCSS XSS/path-traversal pair, bundled inside Next's own internals) required `npm audit fix --force`, which bumped `next` 15.5.25 -> 16.3.5 (major). Verified: `npm run typecheck`, `npm run build` (Turbopack, static export), and a dev-server smoke test all pass clean. Next 16 removed the built-in `next lint` subcommand, so `package.json`'s `lint` script now runs `eslint .` directly (still using the existing ESLint 8 + `.eslintrc.json` config, which is unaffected); the now-unrecognized `eslint.ignoreDuringBuilds` key was removed from `next.config.js`. Next 16 also auto-migrated `tsconfig.json` (`jsx: react-jsx`, added `.next/dev/types/**/*.ts` to `include`) on first build, per this repo's `AGENTS.md` — expected, left as-is.
