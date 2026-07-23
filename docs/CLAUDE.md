# CLAUDE.md — Valista Packaging Website

This file gives Claude Code full context on this project. It is loaded automatically when working in this folder. Read it before making changes.

---

## 1. Project idea

Build a **top-tier, modern website for a corrugated box manufacturer** that can compete with — and outperform — the best websites in the corrugated packaging industry.

The working brand name is **Valista Packaging**, inferred from delivery-truck signage in client-supplied photos ("VALISTA PACKAGING" / "CORRUGATED CARTONS," contact `076 588 75 76`, `011 240 0838`, `valista.lk`, `info@valista.lk`). **Confirm this is the correct legal/brand name with the client before treating it as final** — it was inferred, not explicitly stated.

The goal is explicitly **not to copy any competitor** but to build a unique, premium, industry-standard site that follows modern web design best practices while providing an outstanding user experience — validated through design mockups before full development begins.

## 2. Competitive research (why this site is shaped the way it is)

Two direct competitors were analyzed in depth: **unidil.com** and **packwell.lk**.

**Unidil.com** — static hand-coded HTML, no CMS, thin product pages (image + title only, zero specs or descriptions), one unattributed testimonial, a broken placeholder WhatsApp number (`wa.me/9477XXXXXXX`), and a copyright footer frozen at 2020 (signals an unmaintained site).

**Packwell.lk** — WordPress + WooCommerce, custom theme, the stronger of the two competitors. Strengths worth matching/beating: real descriptive product copy organized by industry-use-case (not just box type), 4 real certifications with downloadable PDFs (ISO 9001, FSC CoC, HACCP, GMP), an interactive year-by-year company history timeline (1978–today), awards with specifics, client logos grouped by sector, working WhatsApp/contact channels. Gaps even Packwell has: no technical spec data (flute type, GSM, ECT/burst rating) on any product, no case studies, no RFQ/quote tool (just a generic contact form), no blog/content engine.

**The core strategic opportunity** identified from this research, and the thing this whole site is designed around: **neither competitor publishes real technical specification data on their products.** A buyer/engineer can't shortlist either company without a phone call. This site's single biggest differentiator is a **spec-rich product page** (flute type, board grade/GSM, ECT/burst-test rating, standard sizes, downloadable PDF spec sheet) plus a **structured multi-step RFQ tool** instead of a generic contact form, plus a **case studies** content type that neither competitor has at all.

Full competitive analysis: see `competitor-analysis-and-website-strategy.md`.

## 3. Sitemap

```
Home
├── Our Company
│   ├── About / History (interactive year-by-year timeline, filterable by milestone type)
│   ├── Leadership Team
│   ├── Certifications & Policies (downloadable PDFs, visible renewal/status dates)
│   └── Awards & Recognition
├── Products & Solutions
│   ├── Browse by industry (Food & Beverage, E-Commerce, Pharma, Agriculture, Textile,
│   │   Industrial, Electronics, Promotional, and similar)
│   ├── Browse by box type (RSC, Die-Cut, Multiwall Sacks, Display/POS, Custom)
│   └── Product detail page (×N) — spec table is the key differentiator, see §5
├── Sustainability
│   ├── Certifications dashboard (live-feeling status, not static prose)
│   ├── Environmental metrics / targets
│   └── Circular economy initiatives
├── Case Studies
│   ├── Listing (filterable by industry)
│   └── Detail page (×N) — challenge / solution / results structure, real data only
├── Resources (blog — packaging guides, sustainability, industry news; long-term SEO asset)
├── Careers (open roles listing + role detail)
├── Get a Quote — multi-step RFQ tool (industry → box type → dimensions/quantity →
│   artwork upload → contact details → confirmation)
└── Contact (form + map + WhatsApp + phone/email, all verified working — never a
    placeholder number)
```

Full wireframes for every page: `sitemap-and-wireframes.html`.

## 4. Design system

### Color palette
Derived directly from client-supplied factory photos (kraft board, warehouse steel, printed carton branding) — not a generic industrial preset.

```css
--charcoal:      #1F2937   /* headings, nav, primary text, dark hero background */
--charcoal-deep: #141A22   /* darkest background layer */
--kraft:         #8A5A34   /* PRIMARY brand color — primary CTAs only */
--kraft-dark:    #6E4527   /* primary CTA hover state */
--kraft-light:   #B98652   /* accents on dark backgrounds */
--steel:         #378ADD   /* SECONDARY action color — secondary CTAs only */
--steel-dark:    #1F5C96
--steel-tint:    #E6F1FB
--sand:          #F5F2EC   /* page background */
--sand-deep:     #EAE1CF   /* alternate section background */
--green:         #1D9E75   /* RESERVED EXCLUSIVELY for sustainability content — do not
                               use decoratively elsewhere, it must carry consistent
                               meaning site-wide */
--terracotta:    #C9502C   /* sparing highlight only (e.g. urgent badges) */
```

**Color-role rules (do not deviate without updating this file):**
- Kraft brown = the only primary CTA / brand-action color.
- Steel blue = the only secondary-action color (e.g. "View products" next to "Get a quote", "Download spec sheet" next to "Request a quote").
- Charcoal = headings and navigation, always.
- Sand / off-white = section backgrounds, always.
- Forest green = sustainability content only. Check before adding green anywhere else.

### Typography
- **Display (headings):** Space Grotesk, weights 500/600/700 — geometric, technical, distinctly not a serif (deliberately avoids the generic "cream background + serif + terracotta" AI-design cliché).
- **Body:** Inter, weights 400/500/600.
- **Mono (stats, spec tables, data):** IBM Plex Mono, weights 500/600 — used specifically to reinforce the "we publish real data" positioning; every stat, spec value, and certification code should be set in mono.

### Signature element
A **corrugated flute-wave** graphic (an SVG repeating wave pattern, literally shaped like a cross-section of corrugated board) used as the hero-to-content divider and, sparingly, as a small underline accent. This is the one deliberate "signature" visual risk for the whole design — restrained everywhere else, per design principle: spend boldness in one place.

### Other design principles in force
- Dark charcoal hero (not cream/sand) — a deliberate choice to avoid reading as a templated "premium AI site."
- Real client photography (factory floor, machinery, delivery fleet, facility exterior) used throughout instead of stock imagery.
- WCAG 2.1 AA baseline: visible keyboard focus states, semantic headings, alt text, adequate contrast.
- `prefers-reduced-motion` respected everywhere.

## 5. Key differentiating features (do not scope these out)

1. **Product detail spec table** — flute type, board grade/GSM, ECT rating, burst strength, standard sizes, max load, all in mono type, with a downloadable PDF spec sheet per SKU. This is the single most important page on the site.
2. **Multi-step RFQ ("Get a Quote") tool** — industry → box type → dimensions/quantity → artwork upload → contact details → confirmation. Replaces a generic contact form entirely.
3. **Case studies** as a first-class content type (challenge/solution/results), with real, verified result figures only — never fabricated client stories or invented metrics.
4. **Certifications & awards** as a dedicated page with downloadable PDFs and visible issue/renewal dates — not buried in an About page.
5. **Filterable/searchable product catalog** — by industry, box type, material, and certification.
6. **Auto-updating copyright year** and generally active-maintenance signals (this directly fixes a credibility problem found on the Unidil competitor site).

## 6. Reference deliverables already produced (in this project's docs)

- `competitor-analysis-and-website-strategy.md` — full competitive analysis and strategic rationale.
- `sitemap-and-wireframes.html` — low-fidelity wireframes for every page in the sitemap above.
- `homepage-and-product-preview.html` — high-fidelity mockup of the homepage and product detail page, styled per the design system above, using real client photography embedded as base64. **This is the approved (or approval-pending) visual direction — match it exactly in the real build**, including exact hex values, type choices, spacing rhythm, and the primary/secondary CTA pairing pattern.
- `website-feature-list.md` — full feature list per page, tagged 🔴 P1 / 🔵 P2 / ⚪ P3, with a suggested three-phase build order (Foundation → Trust layer → Ongoing growth).

## 7. Tech stack decisions

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS — Tailwind config should encode the design tokens in §4 directly (colors, font families) rather than hand-coded hex values scattered through components.
- **CMS:** Headless CMS (Sanity or Contentful — Sanity preferred for faster custom schema setup). Content models needed:
  - **Product** — name, industry tags, gallery, spec fields (flute type, board grade, ECT rating, burst strength, standard sizes, max load), PDF spec sheet, related products.
  - **Case study** — industry, challenge, solution, results (verified figures only), photos, optional real client quote.
  - **Certification** — name, badge/image, issue date, renewal status, PDF.
  - **Article** — for Resources/blog (lower priority, phase 3).
- **Hosting:** Vercel (natural fit for Next.js).

## 8. Build order (per the feature list's phased plan)

1. **Foundation (P1):** design tokens/Tailwind config, nav + footer, homepage, product listing with filters, product detail template (with spec table), Get a Quote RFQ tool, Contact page.
2. **Trust layer (P2):** Certifications & Awards page, Our Company/history (with interactive timeline), Case studies.
3. **Ongoing growth (P3):** Sustainability dashboard, Resources/blog, Careers.

## 9. Important content caveats — do not treat as real data

Everything below appeared in the mockup/wireframes as illustrative placeholder content and **must be replaced with real, verified information before launch**:
- Homepage stats (founding year "1994", "10M+ boxes/month", "500+ customers", "65+ countries") — placeholders.
- The spec-table numbers on the product detail mockup (flute type, GSM, ECT rating, etc.) — illustrative, not verified real specs.
- Client logos — generic placeholder blocks, not real trademarked logos. Real client logos must only be used with explicit permission.
- The "case study" / fleet section on the homepage is explicitly flagged as a placeholder — never fabricate a client testimonial or outcome metric to fill this slot.
- Address (`No. 89/K, Samanthi Mawatha, Sri Lanka`) and phone numbers were pulled from truck signage in client photos — verify these are current and correct before publishing.

## 10. Open questions to resolve with the client before/while building

- Confirm "Valista Packaging" is the correct name to use everywhere (see §1).
- Real founding year, production volume, customer count, and export country count for the stats band.
- Real technical specifications for every product to be listed.
- Whether any named clients have given permission to display their logo.
- CMS choice confirmation (Sanity vs. Contentful) if there's a preference.
- CRM/email routing target for RFQ tool submissions.
