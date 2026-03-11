# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This repo supports Zuzu Perkal's SPRAYCATION mural tour -- organizing knowledge, tracking sponsorship outreach, managing 2026 planning, and hosting the project website and dashboard.

## Key Context
- **Artist:** Zuzu Perkal (@zuzubee) -- Austin-based muralist, "Austin's Best Muralist" 2021-2024
- **Tour:** SPRAYCATION -- female-led traveling mural tour, theme "You Are Magic"
- **Goal:** Secure brand partnerships and funding for 2026 nationwide tour (8-10 cities)
- **2025 Recap:** 5 murals, 6,500+ miles, 5 cities, featured in Westword
- **Pricing tiers:** Magic Maker $60K / Culture Partner $25K / Community Ally $10K / Community Supporter $2.5K
- **Contact:** spraythefuture@gmail.com / partnerships@spraycationmuraltour.com

## Tech Stack
- Static HTML/CSS/JavaScript -- no build step, no package.json, no bundler
- GSAP + ScrollTrigger + ScrollToPlugin loaded via CDN for scroll animations
- Google Fonts (website: Dela Gothic One, Permanent Marker, Outfit; dashboard: Bebas Neue, DM Sans)
- No frameworks (React, Vue, etc.) -- everything is vanilla

## Development
Preview locally by opening HTML files directly or running a local server:
```
cd docs && python3 -m http.server 8000
cd dashboard && python3 -m http.server 8001
```

## Deployment
- GitHub Pages serves from `main` branch `/docs` folder
- Pushes to main auto-deploy (no build step needed)
- `.nojekyll` in docs/ skips Jekyll processing
- Live site: https://pqsoccerboy17.github.io/spraycation/
- GitHub Actions is currently disabled at the account level -- deploy uses branch-based serving instead
- `.github/workflows/deploy-website.yml` exists for when Actions is re-enabled

## File Structure
- `project-plan.md` -- Master checklist (source of truth across sessions)
- `knowledge-base/` -- zuzu-profile, spraycation-overview, tour recaps (2024/2025), brand-history, press-coverage, tour-2026-strategy
- `sponsorship/` -- funding-strategy, corporate-sponsor-targets, grant-opportunities, outreach-tracker, partnership-one-pager, contact-database
- `sponsorship/templates/` -- cold-outreach-brand, warm-follow-up, grant-cover-letter
- `deliverables/` -- wrap-2025-checklist
- `docs/` -- Multi-page marketing site (index, about, cities, denver, impact, partnerships, planning, scout, contact)
- `docs/css/shared.css` -- Design system: color tokens, typography scale, spacing, grid utilities, animation classes
- `docs/js/shared.js` -- Shared navigation, page transitions, GSAP scroll animations
- `dashboard/index.html` -- Single-page sponsorship dashboard with animated stats (separate design system: Bebas Neue + DM Sans)
- `assets/` -- Shared static assets
- `SPRAYCATION 2025/` -- Source materials (PDFs, photos, partnership deck .pptx)

## Website Architecture

### Page Template Pattern
Every page follows this structure:
1. `<head>` with shared.css + page-specific inline `<style>`
2. `<nav class="site-nav">` with `.nav-links` (desktop) -- 9 links including Planning
3. `<div class="nav-overlay">` (mobile menu) -- same 9 links
4. Hero section (`.page-hero`)
5. Content sections (`.section` > `.container`), separated by drip divider SVGs
6. Footer (`.site-footer`)
7. Sparkles + grain overlay + page transition elements
8. CDN scripts (GSAP, ScrollTrigger, ScrollToPlugin) then `shared.js` then page-specific `<script>`

### Navigation Sync
The nav exists in two places per page: `.nav-links` (desktop) and `.nav-overlay` (mobile). Both must be updated together on all 9 HTML files when adding/removing pages. The current page gets `class="active"`.

### Design System (shared.css)
**Colors:** `--electric-blue: #3452FF`, `--hot-pink: #FF2D78` (primary accent), `--magenta: #B5227B`, `--yellow: #FFE135`, `--cyan: #00D4FF`, `--black: #0A0A0F`, `--charcoal: #141420`, `--charcoal-light: #1E1E30`

**Typography classes:** `.t-hero` (display, clamp 3.5-11.5rem), `.t-section` (clamp 2.5-5.5rem), `.t-card-title`, `.t-body-lg`, `.t-body`, `.t-small`, `.t-stat-number`, `.t-label`

**Spacing:** 8px base, `--space-xs` (4px) through `--space-3xl` (128px), `--section-pad` (clamp 80-160px)

**Grid:** `.grid-2` through `.grid-6` (collapse at 1024px/768px breakpoints)

**Animations:** `.reveal` (fade up on scroll via IntersectionObserver), `.reveal-left`, `.reveal-right`, `.delay-1` through `.delay-5`

**Components:** `.card` (charcoal bg, hover lift), `.card--featured` (pink border), `.btn--primary` (gradient), `.btn--outline`, `.badge--pink/blue/yellow`

**Gradients:** `.c-gradient` (text gradient), `.c-pink`, `.c-yellow`, `.c-muted` (color utility classes)

### shared.js Functions
All pages can call these after importing shared.js:
- `staggerReveal(selector, triggerSelector, options)` -- GSAP stagger animation for groups
- `heroParallax(contentSelector, triggerSelector)` -- Parallax fade on hero sections
- `horizontalScroll(containerSelector, trackSelector)` -- Horizontal scroll on pin
- `pinnedNarrative(containerSelector, panelSelector)` -- Pinned image with cycling text
- `velocityMarquee(trackSelector)` -- Scroll-speed-adjusted marquee
- `animateCounter(element, target, duration)` -- Number count-up animation
- `initCounters()` -- Auto-triggers counters on `[data-counter]` elements
- `imageOverlayBg(imagePath, opacity)` -- Dark overlay + background image helper

### Responsive Breakpoints
1024px (tablet), 768px (mobile nav switch), 480px (compact)

## Planning Page Data Architecture
`docs/planning.html` is the outreach command center. All data is hardcoded in JS arrays, not fetched from APIs. Render functions build DOM dynamically.

### BRANDS Array (38 entries)
```
{ name, category, tier, tierAmount, priority, status, warmth,
  nextStep, rationale, approach, contactName, contactTitle,
  contactEmail, linkedIn, notes }
```
- **Categories:** paint, beverage, lifestyle, vehicle, tech, women, food, arts
- **Tiers:** magic-maker ($60K), culture-partner ($25K), community-ally ($10K)
- **Status:** lead, contacted, in-kind, proposal-sent, confirmed
- **Warmth:** cold, warm (determines which email template is used)

### GRANTS Array (8 entries)
`{ name, amount, deadline, deadlineDate, type, url, notes }`

### TEMPLATES Object
Cold and warm email templates with `{{BRAND}}`, `{{CONTACT}}`, `{{RATIONALE}}` placeholders.

### Key Render Functions
- `renderQuickActions()` -- Top 7 priority brands with copy-to-clipboard email
- `renderBrandCards()` -- Filterable card grid with expandable contact/email sections
- `renderGrants()` -- Grant list with countdown timers
- `getFilteredBrands()` -- Applies activeFilters state to BRANDS array

## Working With This Project
- Always check `project-plan.md` at session start for current status
- Update `sponsorship/outreach-tracker.md` when sponsor status changes
- When updating brand data, edit the BRANDS array in `planning.html` -- the page re-renders automatically
- The `SPRAYCATION 2025/` folder has source PDFs and the partnership deck -- reference these for detail
- The `sponsorship/contact-database.md` has full enriched contacts (names, titles, LinkedIn, notes) for all 38 brands

## Conventions
- Use plain, direct language (not corporate-speak) -- matches Zuzu's brand voice
- Track all sponsor outreach in `sponsorship/outreach-tracker.md`
- Keep `project-plan.md` updated as the canonical status tracker
- Tier pricing must stay in sync across: partnerships.html (public), planning.html (BRANDS array + TEMPLATES), outreach-tracker.md, contact-database.md, corporate-sponsor-targets.md
