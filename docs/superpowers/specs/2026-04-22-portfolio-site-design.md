# Nhat Tran Minh — Portfolio Site Design Spec

## Goal

Static portfolio + blog site for Nhat Tran Minh (Senior Platform Engineer / Release Manager). Hybrid job-seeking and consulting site. Managed via Decap CMS for blog and content.

## Tech Stack

- **Framework**: Astro (static output)
- **CMS**: Decap CMS (Git-based, `/admin` panel)
- **Styling**: CSS (no Tailwind — keep it simple, custom properties like chucchuc.com)
- **Fonts**: Inter (body) + a modern serif or mono accent (headings)
- **Icons**: Lucide (same as chucchuc.com)
- **Hosting**: Netlify (required for Decap CMS Git Gateway) or GitHub Pages + manual Decap config
- **Content**: Markdown collections (blog posts, projects, testimonials)

## Visual Design

**Theme: Gradient Modern (option d)**
- Dark base: `#0a0a0f` to `#0f1020`
- Mesh gradient accents: deep blue (#1e3a5f) → purple (#4c1d95) → teal (#0d9488)
- Accent color: teal `#14b8a6` (primary CTAs, links, highlights)
- Secondary accent: purple `#8b5cf6`
- Text: `#e4e4e7` (body), `#a1a1aa` (muted), `#ffffff` (headings)
- Cards: subtle glass effect with `rgba(255,255,255,0.03)` background, thin border `rgba(255,255,255,0.08)`
- Border radius: 12px (cards), 8px (buttons), 999px (pills)
- Font: Inter 400/500/600 (body), Inter 700 or JetBrains Mono (code/accent)

**Reused principles from chucchuc.com:**
- Pure CSS custom properties for theming
- Glassmorphism cards (subtler, darker variant)
- Scroll reveal animations (IntersectionObserver)
- Smooth scroll + scroll-padding
- Mobile-first responsive
- Lucide icons
- `text-wrap: pretty` / `balance` for typography
- Magnetic buttons
- Back-to-top button

**Different from chucchuc.com:**
- No blobs — mesh gradient background instead
- No theme toggle (single dark theme)
- No carousel — grid layout for testimonials
- No floating CTA
- No reCAPTCHA (use Netlify Forms or Formspree with honeypot only)
- Blog section (CMS-driven)
- Timeline component for experience
- Cert badges grid

## Sections

### 1. Hero
- Name: "Nhat Tran Minh"
- Title: "Senior Platform Engineer & Release Manager"
- One-liner: "Building CI/CD pipelines, cloud infrastructure, and release processes that scale."
- CTA buttons: "Get in Touch" (primary) + "Read Blog" (outline)
- Social links: LinkedIn, GitHub, Email
- Subtle animated gradient orb or mesh in background

### 2. About
- 3-line summary (from CV)
- Key achievements as stat cards:
  - 5+ Years Experience
  - 7 Cloud Certifications
  - 35+ CI/CD Pipelines (from BDO monorepo)
  - 3 Cloud Platforms (AWS, Azure, GCP)
- Tags: key skill areas

### 3. Experience (Timeline)
- Reverse chronological
- Each entry: role, company, date range, 3-4 bullet points
- Visual timeline line with dots
- Data from CV context:
  - Datum Consulting (10/2024 - Present) with sub-projects: SBC RM, BDO PE, Alpha Bank PE, SBC DevOps
  - FPT Software (06/2020 - 09/2024) with sub-projects: Automotive Platform, IoT & Insurance

### 4. Skills & Certifications
- **Tech grid**: grouped by category (CI/CD, Cloud, IaC, Containers, Monitoring, Languages)
- **Cert badges**: AWS SA Pro, AWS DevOps Pro, AWS Dev Associate, GCP Cloud Dev, GCP SA, MongoDB, PSM II
- Visual: icon + name pills, grouped

### 5. Services (Consulting)
- Cards with icon + title + description
- Services:
  - CI/CD Pipeline Design & Implementation
  - Cloud Infrastructure (AWS/Azure)
  - Release Management & GitOps
  - Platform Engineering Consulting
  - DevOps Transformation
  - Infrastructure as Code (Terraform)

### 6. Projects / Case Studies
- CMS-managed collection
- Card grid: title, description, tags, link to detail page
- Initial seed projects from CV:
  - BDO CRM Pipeline Blueprint (35 projects, GitHub Actions, release-please)
  - Terraform Pipeline Blueprint (multi-cloud, reusable workflows)
  - AWS Landing Zone (Control Tower, FinOps dashboards)

### 7. Blog
- CMS-managed markdown posts
- List view: title, date, excerpt, tags
- Detail page: full markdown rendered
- Tags/categories for filtering

### 8. Testimonials
- CMS-managed collection
- Grid of quote cards (not carousel)
- Fields: quote, author name, author role, company (optional)
- Placeholder testimonials initially

### 9. Contact
- Form (Formspree or Netlify Forms)
- Fields: name, email, subject (dropdown: Job Opportunity / Consulting / Other), message
- Honeypot for spam
- Social links repeated: LinkedIn, GitHub, Email

## Content Collections (Astro)

```
src/content/
├── blog/          # Markdown posts
├── projects/      # Case study markdown
└── testimonials/  # Testimonial entries
```

## Decap CMS Config

- Backend: git-gateway (Netlify) or github (direct)
- Collections: blog, projects, testimonials
- Media: `public/uploads/`
- Admin panel at `/admin/`

## File Structure

```
nhat-portfolio/
├── astro.config.mjs
├── package.json
├── public/
│   ├── admin/
│   │   ├── index.html      # Decap CMS entry
│   │   └── config.yml      # Decap CMS config
│   └── uploads/            # CMS media
├── src/
│   ├── layouts/
│   │   └── Base.astro      # HTML shell, head, fonts, scripts
│   ├── pages/
│   │   ├── index.astro     # Home (all sections)
│   │   ├── blog/
│   │   │   ├── index.astro # Blog list
│   │   │   └── [slug].astro # Blog post detail
│   │   └── projects/
│   │       └── [slug].astro # Project detail
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Skills.astro
│   │   ├── Services.astro
│   │   ├── Projects.astro
│   │   ├── Blog.astro
│   │   ├── Testimonials.astro
│   │   ├── Contact.astro
│   │   ├── Nav.astro
│   │   └── Footer.astro
│   ├── content/
│   │   ├── config.ts       # Astro content collection schemas
│   │   ├── blog/
│   │   │   └── hello-world.md
│   │   ├── projects/
│   │   │   ├── bdo-crm-pipeline.md
│   │   │   ├── terraform-blueprint.md
│   │   │   └── aws-landing-zone.md
│   │   └── testimonials/
│   │       ├── placeholder-1.md
│   │       └── placeholder-2.md
│   ├── styles/
│   │   └── global.css      # All styles
│   └── scripts/
│       └── main.js         # Interactions (scroll reveal, magnetic, etc.)
└── docs/
    └── superpowers/
```

## SEO
- Title: "Nhat Tran Minh | Platform Engineer & Release Manager"
- Meta description: "Senior Platform Engineer specializing in CI/CD pipelines, cloud infrastructure, and release management. AWS & GCP certified."
- OG/Twitter cards

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Out of Scope
- Dark/light theme toggle (dark only)
- Authentication
- Comments on blog posts
- Search functionality
- Analytics (can add later)
- Custom domain setup
