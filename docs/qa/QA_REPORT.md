# QA Report — rins-enterprises-v2

_Audit date: 2026-10-21 · Branch: `claude/qa-review` · Auditor: visiting QA (Claude Code) · Tier B (audit + light cleanup)_

## 1. Summary
`rins-enterprises-v2` is a **single-page marketing/brand website for RINS Enterprises** (AI systems, workflow automation, digital infrastructure). It is aimed at prospective clients. It is a static React SPA: hero section with a Three.js visual ("Singularity Engine"), then Mission, Services, Projects, Process, Tech Stack, Founders, Vision and Contact sections, with GSAP/Lenis scroll animation. **It builds and would render**, but it is a front-end showcase only: the contact form does not send anything, and the WhatsApp call-to-action button does nothing. The code was scaffolded by an AI site generator (Kimi: `kimi-plugin-inspect-react`, a `/mnt/agents/output/app` path in `info.md`, and the package is still named `my-app`).

## 2. Status
**Stale.** There are 3 commits, all from 2026-05-15 ("Initial commit", "Initial cinematic flagship deployment", and a README rewrite). Nothing has changed since then. The README says "Active development", which is not accurate.

## 3. Stack & architecture
- Vite 7, React 19, TypeScript 5.9 (strict), Tailwind CSS 3.4 with the shadcn/ui theme, and ESLint 9 (flat config).
- Animation and 3D: GSAP + ScrollTrigger, Lenis smooth scroll, and three.js (`src/components/SingularityEngine.tsx`).
- `src/App.tsx` puts `src/sections/*` together into one page. `react-router` is installed and `BrowserRouter` wraps the app, but there are no routes.
- `src/components/ui/*` holds about 50 generated shadcn components. **None of them are imported by the site.** They exist only as scaffold.
- Assets are in `public/images/` (12 JPGs, about 1.9 MB, including two founder portraits of about 530 KB each).
- There is no backend, API, env vars or tests.

## 4. How to run (verified 2026-10-21, Node 20+)
```bash
npm ci          # ~15 s
npm run dev     # http://localhost:3000
npm run build   # tsc -b && vite build -> dist/
npm run lint
```
`npm ci` and `npm run build` were **verified** and both succeed. The dev server was not exercised in a browser.

## 5. Health
| Check | Result |
|---|---|
| Install | ✅ `npm ci` OK |
| Typecheck + build | ✅ passes. Warning: the single JS chunk is 935 KB (267 KB gzip), mostly three.js plus GSAP |
| Lint | ❌ **11 errors** (details in the findings below). Most come from unused shadcn scaffold |
| Tests | ❌ none (no test runner configured) |
| CI | ❌ no `.github/workflows` |
| `.gitignore` | ❌ **missing**. Running `npm ci`/`build` leaves `node_modules/` and `dist/` untracked, so they could be committed by accident (fixed on this branch) |

## 6. Findings
### Critical
- None.

### High
- **H1. The contact form is fake.** In `src/sections/ContactSection.tsx:48-55`, `handleSubmit` only flips a "submitted" flag and then clears the form. No data is sent anywhere, so leads are silently lost while the user sees a success message.
- **H2. The WhatsApp CTA is dead.** `src/sections/ContactSection.tsx:~102` is a `<button>` with no `onClick` or `href`. The other card button (`:~158`) is the same.
- **H3. `.gitignore` was missing** at the repo root. This creates a risk of committing `node_modules/`, `dist/` or `.env` files. _Fixed on this branch._

### Medium
- **M1. Ticker callback leak.** In `src/App.tsx:33-41`, an anonymous function is added to `gsap.ticker`, but cleanup removes `lenis.raf`, which is a different function. As a result, the callback is never removed, and in React StrictMode/HMR the callbacks pile up. This is also the `no-explicit-any` lint error at `:41`. _Fixed on this branch._
- **M2. Lint fails with 11 errors.**
  - `src/sections/TechStackSection.tsx:196` calls `Math.random()` during render (react-hooks/purity).
  - `src/components/SingularityEngine.tsx:144` should use `const` (prefer-const). _Fixed._
  - The other 8 errors are in unused `src/components/ui/*` files: `react-refresh/only-export-components` in badge, button-group, button, form, navigation-menu, sidebar and toggle, plus `sidebar.tsx:611` purity.
- **M3. Dead scaffold code.** `src/pages/Home.tsx` is the Vite counter demo. It is never imported and it imports `../App.css`, which does not exist. The roughly 50 unused shadcn components and many unused dependencies (radix, recharts, react-hook-form, zod, date-fns, cmdk, vaul, embla, etc.) add install weight and lint noise.
- **M4. Bundle size.** There is one 935 KB chunk. three.js should be lazy-loaded (for example, `React.lazy` for `SingularityEngine`).
- **M5. The README did not match the repo.** It described `src/assets/` and `src/styles/`, which do not exist, and omitted `src/sections/`, three.js and GSAP. It also had no run instructions and claimed "Active development". _Fixed on this branch._

### Low
- **L1.** `package.json:2` uses the name `"my-app"` and version `0.0.0`. _The name is fixed._
- **L2.** `info.md` is a leftover generator note that contains an agent sandbox path (`/mnt/agents/output/app`). It should be removed or folded into the docs.
- **L3.** `vite.config.ts:4,9` enables `kimi-plugin-inspect-react` (a third-party plugin with no description) in **all** modes, including production builds. It should be dev-only or removed.
- **L4.** `react-router` and `react-router-dom` are both installed, but no routing is used.
- **L5.** The founder portraits in `public/images/founder-*.jpg` are about 530 KB each and should be compressed or converted to WebP. There is no favicon, no OG/social meta tags and no `robots.txt` or sitemap.
- **L6.** `browserslist`/`caniuse-lite` data is 10 months old (build warning).
- **L7.** There is no LICENSE file in a public repo.

## 7. Security
- **No committed secrets** were found. The working tree and full git history were grepped for key, token, secret and password patterns. There are no `.env` files.
- The site is static, with no server-side code or auth.
- Dependency advisories exist. Run `npm audit` for details; they are reported privately to the owner, not here, because the repo is public. `npm audit fix` is expected to resolve them.
- The founders' names and photos are published intentionally as site content. Confirm both founders consent to this, since the repo is public.

## 8. Docs gaps
- There were no run/build/deploy instructions (_added_).
- There is no `.env.example`. None is needed today, but one will be once the contact form gets a backend. A placeholder was added.
- The deployment target and live URL are undocumented. The commit message says "deployment", but the repo contains no Vercel, Netlify or Pages config.
- There is no explanation of how this repo relates to `rins-enterprises-website`, `rins` or `R.I.N.S.`.
- There is no LICENSE and no CONTRIBUTING file.

## 9. Overlap with the owner's other repos
| Repo | Relationship (judged from names plus this repo's content) |
|---|---|
| **rins-enterprises-website** | **Direct overlap.** It is almost certainly the same purpose (company brand site). This repo is "v2", so it is presumably the newer redesign. Pick one canonical site. |
| **rins**, **R.I.N.S.** | Likely the same brand. If either is a website, it is another duplicate. If they are product or code repos, this site would only *showcase* them. Needs the owner's confirmation. |
| rins-ai-backend / rins-ai-core / rins-agent-workspace | Possible backend for the contact form or chatbot listed under "Planned Improvements". No code link today. |
| rins-digital-shop, rins-downloader | Separate RINS products. This site could link to them as portfolio items. |
| honeycomb3d-*, HoneyComb-3D/test01, perfect-dose, AI-Usage-Meter/Monitor, ICT-Trading-Lab, Jargon_Decoder, bittertruths-ai-workflows, GenViralVids | Unrelated products. Some may correspond to the "Projects" cards (WhatsApp bot, Telegram bot, dashboards, workflows). |

**How this repo differs:** it is a pure static front end (Vite, React, three.js and GSAP) for the RINS Enterprises brand. It has no backend and no product logic. Its distinguishing feature is the "cinematic" 3D/scroll-animated design.

## 10. Recommendation — **KEEP-MAINTAIN** (conditional: either it becomes *the* canonical brand site, or it gets MERGE-INTO `rins-enterprises-website`)
The code is small, builds cleanly and is in reasonable shape. It is the most modern candidate for the company website. However, the company only needs **one** brand-site repo. The owner should compare it with `rins-enterprises-website` and decide:
- If this is the newer or better design, make it canonical and archive the other.
- Otherwise, port the sections or 3D hero into `rins-enterprises-website` and archive this repo.

It is not worth focusing heavy effort here until the contact form works, because without it the site produces no leads.

## 11. Continuation plan
| # | Task | Effort |
|---|---|---|
| 1 | Decide the canonical site versus `rins-enterprises-website`, `rins` and `R.I.N.S.`, and note the decision in the README | 30 min |
| 2 | Wire the contact form to a real endpoint (Formspree, a serverless function or `rins-ai-backend`), with validation (zod is already installed) | 2–3 h |
| 3 | Give the WhatsApp/email CTAs real `href`s (`https://wa.me/...`, `mailto:`) | 15 min |
| 4 | Remove dead scaffold: `src/pages/Home.tsx`, unused `components/ui/*` and unused dependencies; delete `info.md` | 1 h |
| 5 | Fix the remaining lint errors (TechStack `Math.random` → memoized values) and get `npm run lint` green | 30 min |
| 6 | Add GitHub Actions CI (`npm ci && npm run lint && npm run build`) | 30 min |
| 7 | Lazy-load three.js/`SingularityEngine` and compress images (WebP) | 1–2 h |
| 8 | Add a favicon, OG/Twitter meta tags, `robots.txt` and a sitemap | 1 h |
| 9 | Document and automate deployment (Vercel/Pages config), and record the live URL | 1 h |
| 10 | Run `npm audit fix`, refresh browserslist and add a LICENSE | 20 min |

## Changes made on this branch
- **`.gitignore` added** (node_modules, dist, env files, logs, editor/OS, caches) and **`.env.example` added** (placeholder; no vars required today). Fixes H3.
- **README**: added Getting Started (verified commands), an accurate project structure, the real tech stack, a Related Repositories note and an honest status. Fixes M5.
- **`src/App.tsx`**: the GSAP ticker callback is now a named function, so cleanup removes the same function it added. Fixes the M1 leak and the `no-explicit-any` lint error.
- **`src/components/SingularityEngine.tsx:144`**: `let` → `const` (prefer-const).
- **`package.json` / `package-lock.json`**: package name `my-app` → `rins-enterprises-v2`.
- Verified after the changes: `npm run build` ✅. Lint went from 11 to 9 errors; the remaining 9 are listed in M2 (TechStack purity plus the unused shadcn files).
- Not done (out of tier-B scope): contact form backend, dead-code removal, dependency upgrades and bundle splitting.
