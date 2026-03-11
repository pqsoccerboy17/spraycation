# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This repo supports Zuzu Perkal's SPRAYCATION mural tour -- organizing knowledge, tracking sponsorship outreach, managing 2026 planning, and hosting the project website and dashboard.

## Key Context
- **Artist:** Zuzu Perkal (@zuzubee) -- Austin-based muralist, "Austin's Best Muralist" 2021-2024
- **Tour:** SPRAYCATION -- female-led traveling mural tour, theme "You Are Magic"
- **Goal:** Secure brand partnerships and funding for 2026 nationwide tour (8-10 cities)
- **2025 Recap:** 5 murals, 6,500+ miles, 5 cities, featured in Westword
- **Pricing tiers:** Magic Maker $25K / Culture Partner $15K / Community Ally $5K
- **Contact:** spraythefuture@gmail.com / partnerships@spraycationmuraltour.com

## Tech Stack
- Static HTML/CSS/JavaScript -- no build step, no package.json, no bundler
- GSAP + ScrollTrigger loaded via CDN for scroll animations
- Google Fonts (website: Dela Gothic One, Permanent Marker, Outfit; dashboard: Bebas Neue, DM Sans)
- No frameworks (React, Vue, etc.) -- everything is vanilla

## Development
Preview locally by opening HTML files directly or running a local server:
```
cd docs && python3 -m http.server 8000
cd dashboard && python3 -m http.server 8001
```

## File Structure
- `project-plan.md` -- Master checklist (source of truth across sessions)
- `knowledge-base/` -- zuzu-profile, spraycation-overview, tour recaps (2024/2025), brand-history, press-coverage, tour-2026-strategy
- `sponsorship/` -- funding-strategy, corporate-sponsor-targets, grant-opportunities, outreach-tracker, partnership-one-pager
- `sponsorship/templates/` -- cold-outreach-brand, warm-follow-up, grant-cover-letter
- `deliverables/` -- wrap-2025-checklist
- `docs/` -- Multi-page marketing site (index, about, cities, denver, partnerships, contact)
- `docs/css/shared.css` -- Design system: color tokens, typography scale, spacing, grid utilities, animation classes
- `docs/js/shared.js` -- Shared navigation, page transitions, GSAP scroll animations
- `dashboard/index.html` -- Single-page sponsorship dashboard with animated stats
- `assets/` -- Shared static assets
- `SPRAYCATION 2025/` -- Source materials (PDFs, photos, partnership deck .pptx)

## Website Architecture
- `css/shared.css` defines the full design system -- colors (electric blue #3452FF, hot pink #FF2D78, magenta, yellow, cyan), typography classes (t-hero, t-section, t-body, etc.), spacing scale (xs through 3xl), grid utilities (grid-2 through grid-6), and animation classes (reveal, reveal-left, reveal-right)
- `js/shared.js` handles nav behavior, page transition curtain effect, and GSAP ScrollTrigger setup
- Each page imports shared.css and shared.js, then adds page-specific inline styles/scripts
- Responsive breakpoints: 1024px, 768px, 480px

## Working With This Project
- Always check `project-plan.md` at session start for current status
- Update `sponsorship/outreach-tracker.md` when sponsor status changes
- The `SPRAYCATION 2025/` folder has source PDFs and the partnership deck -- reference these for detail

## Conventions
- Use plain, direct language (not corporate-speak) -- matches Zuzu's brand voice
- Track all sponsor outreach in `sponsorship/outreach-tracker.md`
- Keep `project-plan.md` updated as the canonical status tracker
