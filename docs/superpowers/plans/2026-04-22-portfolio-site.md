# Nhat Portfolio — Implementation Plan

## Goal
Build a static portfolio + blog site using Astro + Decap CMS with gradient modern dark theme.

## Architecture
- Astro 5.x static site
- Decap CMS (Git-based) for blog/projects/testimonials
- CSS custom properties, no framework
- Lucide icons via astro-icon or direct SVG
- Netlify-ready (git-gateway for CMS)

## Task Breakdown

### Task 1: Project Scaffold
- `npm create astro@latest nhat-portfolio` (empty template)
- Configure `astro.config.mjs` (site URL, output: static)
- Set up `package.json` scripts
- Create directory structure

### Task 2: Base Layout + Global Styles + Nav + Footer
- `src/layouts/Base.astro` — HTML shell, fonts (Inter from Google Fonts), meta tags, SEO
- `src/styles/global.css` — reset, CSS custom properties, dark theme, mesh gradient background, typography, glass card utility, responsive grid utilities, scroll reveal classes, button styles, nav styles, footer styles
- `src/components/Nav.astro` — fixed top nav, name + links, mobile hamburger
- `src/components/Footer.astro` — simple footer with links and copyright

### Task 3: Hero + About + Experience Components
- `src/components/Hero.astro` — name, title, one-liner, CTAs, social links, gradient orb
- `src/components/About.astro` — summary, stat cards (5+ yrs, 7 certs, 35+ pipelines, 3 clouds), skill tags
- `src/components/Experience.astro` — timeline with roles from CV data

### Task 4: Skills + Services + Contact Components
- `src/components/Skills.astro` — tech grid by category + cert badges
- `src/components/Services.astro` — 6 consulting service cards
- `src/components/Contact.astro` — form (Formspree), social links

### Task 5: Content Collections + CMS-driven Components
- `src/content/config.ts` — schemas for blog, projects, testimonials
- Seed content: 1 blog post, 3 projects, 2 testimonials (from CV data)
- `src/components/Projects.astro` — project card grid from collection
- `src/components/Blog.astro` — latest posts from collection
- `src/components/Testimonials.astro` — quote card grid from collection

### Task 6: Pages + Blog/Project Detail Pages
- `src/pages/index.astro` — compose all section components
- `src/pages/blog/index.astro` — blog listing page
- `src/pages/blog/[slug].astro` — blog post detail
- `src/pages/projects/[slug].astro` — project detail

### Task 7: Decap CMS Setup
- `public/admin/index.html` — CMS entry point
- `public/admin/config.yml` — collections config for blog, projects, testimonials

### Task 8: Client-side Interactions
- `src/scripts/main.js` — scroll reveal (IntersectionObserver), magnetic buttons, smooth scroll, mobile menu toggle, back-to-top, counter animation
