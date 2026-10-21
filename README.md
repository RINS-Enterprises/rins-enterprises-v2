# RINS Enterprises V2

Modern company website and frontend platform built using React, TypeScript, and Vite.

This project focuses on creating a fast, scalable, and conversion-oriented frontend architecture for showcasing AI services, automation systems, and digital products.

---

## 🚀 Project Goals

- Build a performant modern frontend using React + TypeScript
- Improve maintainability through component-based architecture
- Create a scalable foundation for future AI product integrations
- Optimize user experience and landing page performance

---

## 🛠 Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3 + shadcn/ui
- GSAP (ScrollTrigger) + Lenis smooth scroll
- three.js (3D hero)
- ESLint

---

## ▶️ Getting Started

Requires Node.js 20+.

```bash
npm ci            # install dependencies
npm run dev       # dev server on http://localhost:3000
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

No environment variables are needed today (see `.env.example`).

---

## 📂 Project Structure

```bash
src/
 ├── App.tsx            # Page composition + Lenis/GSAP smooth-scroll setup
 ├── main.tsx           # Application entry point
 ├── index.css          # Tailwind + global styles
 ├── sections/          # Page sections (Hero, Mission, Services, Projects, Process,
 │                      #   TechStack, Founders, Vision, Contact)
 ├── components/        # Navigation, Footer, SingularityEngine (three.js hero)
 │   └── ui/            # shadcn/ui component library (scaffolded, mostly unused)
 ├── hooks/             # Custom hooks
 └── lib/               # Utilities
public/images/          # Site imagery
```

---

## 🔗 Related Repositories

This repo is the **v2 single-page marketing site** for RINS Enterprises (static frontend only, no backend).
`rins-enterprises-website` covers the same purpose. See `docs/qa/QA_REPORT.md` for the overlap analysis.

---

## ⚡ Engineering Focus

This project emphasizes:

- Modular frontend architecture
- Fast development workflow using Vite
- Type safety with TypeScript
- Clean component separation
- Maintainable code organization

---

## 🎯 Planned Improvements

- Backend API integration
- Authentication system
- Dynamic CMS/content system
- AI chatbot integration
- Performance optimization
- Deployment pipeline improvements

---

## 🧠 Lessons & Experience

This project helped strengthen:

- React application structure
- TypeScript usage in frontend systems
- Frontend scalability planning
- Reusable component development
- Modern frontend tooling workflows

---

## 📌 Status

Static showcase site, last updated May 2026. The contact form is UI-only and is not yet connected to a backend.
See `docs/qa/QA_REPORT.md` for the audit and next steps.
