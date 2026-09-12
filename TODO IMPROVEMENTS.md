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

### Resolve npm audit findings (18 issues: 1 critical, 12 high)
- **Category:** Dependency
- **What:** `npm audit` reports 18 vulnerabilities (1 critical, 12 high, 4 moderate, 1 low), all in transitive dev-tooling dependencies (eslint/next build toolchain: brace-expansion, browserslist, cross-spawn, js-yaml, lodash, flatted, glob, ajv, @babel/runtime, etc.), not in runtime/production code paths.
- **Where:** `package-lock.json` (transitive deps of `eslint-config-next`, `next`, `typescript`)
- **Why:** None currently exploitable client-side in this static-export app, but worth clearing periodically.
- **Risk:** Fixing requires dependency upgrades (`npm audit fix` / bumping `next`/`eslint`), explicitly out of scope for this pass.
- **Effort:** Low (run `npm audit fix`, verify build) but needs its own verification pass.

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
