# Homepage Redesign Concepts: Design

## Context

The client reviewed the completed redesign pass (4-color system, real photography, section-by-section rebuild described in `CLAUDE.md`) and liked the content, but said the theme "is still the same overall": specifically, the page architecture still reads as stacked generic blocks (heading, text, image, repeat) and the visual style feels plain/corporate even with the new palette. The client asked for two more homepage designs, using the same brand colors, so they can choose a direction:

1. A new theme: same colors, genuinely different layout and art direction.
2. A "fluid UI" concept with scroll animation: the client's own pitch is an empty room that gets built as you scroll (ceiling grid, then panels, then drywall, then finish).

This spec covers both concepts. Scope is **homepage only**, per the client.

## Deliverable

Both concepts are built as real, live, interactive Next.js routes on the deployed site, not static mockups, so the client can scroll and resize them like a real visitor:

- `/preview-theme/`: Theme 1 (Editorial Asymmetric).
- `/preview-fluid/`: Theme 2 (Fluid/animated room build).

Both are additive. The live homepage (`src/app/page.tsx` at `/`) is untouched by this work. Once the client picks a direction (or asks for changes), a follow-up pass replaces `/` with the winner and deletes the losing preview route and its now-unused components. Both previews reuse the existing data layer (`src/lib/products.ts`, `src/lib/projects.ts`, `src/lib/events.ts`, etc.) and existing photography; this is a layout and motion pass, not a content or asset pass.

## Theme 1: Editorial Asymmetric (`/preview-theme/`)

**Problem it answers:** the client's complaint that the layout still reads as generic stacked sections, and that the visual style feels plain/corporate, even after the color and photography pass.

**Direction:**
- **Hero:** a diagonal clip-path band (grey) breaks up the flat rectangle hero background; the product cutout photo breaks out of its frame rather than sitting fully boxed; the four award/certification logos are replaced or supplemented with 2 to 3 oversized numeral stat callouts (for example "2014", "8 Products", "114+ Clients") as a bolder, less corporate opening statement.
- **Alternating offset rows:** sections that are currently "text column, image column, both boxed at 50/50" (FlagshipProducts, Accessories, AboutTeaser) move to varied asymmetric splits (for example 40/60 or 55/45, varying per section rather than fixed), with images allowed to bleed past the content column's edge on at least one side, breaking the container's implied grid line.
- **Pull-quote breaks:** 2 to 3 full-width dark (`grey`) bands, each carrying a single oversized stat or testimonial line, inserted between major section groups as a stronger section-to-section signal than a plain background color swap.
- **Everything else** (product data, certificates, distributor map and form, resource downloads, blog grid, footer) keeps its current content, data source, and interaction logic; only its layout and visual treatment changes to match the new rhythm.

**Design system compliance:** strictly the existing 4 colors (`red #90192c`, `grey #414141`, `white`, `mist #faf7f3`) plus the existing `border-warm` hairline exception. No new color, no opacity-on-text. Montserrat only, same weight scale as today.

**Technical approach:** achievable entirely with Tailwind's existing utilities (`clip-path` via arbitrary values, CSS grid/flex for asymmetric splits) plus the tokens already in `tailwind.config.ts`. **No new dependency required.**

## Theme 2: Fluid/animated (`/preview-fluid/`)

**Problem it answers:** the client's own request for a distinctive, animated "wow" homepage, pitched as a room being built as you scroll.

**The room asset:** one isometric SVG illustration (a 3/4 angled view showing ceiling, one wall, and floor at once, chosen over a flat front-on view or an exploded axonometric view specifically because an isometric view is the only one of the three where "a room gets built" reads immediately and literally, and because it gives the ceiling grid, ceiling panels, and board each their own clearly visible plane). The SVG is built as a stack of layered `<g>` groups, all in the site's 4-color palette:

1. Empty room shell (floor, one wall, empty ceiling opening).
2. Ceiling grid (T-bar lines).
3. Ceiling panels (filling the grid).
4. Wall board/drywall (covering the bare wall framing).
5. Finished room (paint tone, a light fixture, a hint of furnishing).

Each layer is a distinct group that Framer Motion animates independently (opacity plus a small slide or scale-in), never a set of swapped full-frame images.

**Intro scroll mechanics:**
- The room sits inside a tall (approximately 250vh) sticky container.
- Framer Motion's `useScroll` tracks scroll progress through that container; `useTransform` maps progress ranges to each layer's opacity/transform, so the build is driven deterministically by scroll position, not by time or an autoplaying animation. Approximate checkpoints: grid at ~20% progress, panels at ~45%, board at ~70%, finished room at ~90%.
- As each layer appears, a small text label and CTA appears alongside it naming the real matching product ("Smart Grid", "Smart Ceiling Panel", "Smart Gypsum Board", linking to that product's page), so the room build doubles as a literal product tour rather than being purely decorative.
- Once the intro container's scroll range is exhausted, the page returns to normal (non-pinned, non-sticky) document flow for the remaining sections.

**Motion elsewhere on the page:** every section after the intro (client logo marquee, pillars, flagship products, testimonials, landmark projects, certificates, blog, distributor form, etc.) gets a Framer Motion `whileInView` fade-and-rise reveal as it enters the viewport, so the same motion language continues site-wide without scroll-jacking every individual section the way the intro does.

**Accessibility:** `prefers-reduced-motion: reduce` is checked once (a small hook wrapping `window.matchMedia`) and threaded through both the intro and the section reveals:
- Reduced-motion visitors see the room fully built and static immediately; the sticky/pinned container and all scroll-linked transforms are skipped entirely, not merely shortened.
- Every other section's `whileInView` reveal drops to a plain opacity fade with no transform, so no content's visibility depends on motion completing.

**Mobile behavior:** the pinned, scroll-scrubbed intro is the largest jank and "stuck scroll" risk on a phone, where scroll-linked pinning is both harder to get right and more likely to feel broken. Below the `md` breakpoint, the intro drops pinning entirely: the room illustration stays in normal document flow at a fixed size, and its layers fade in via ordinary `whileInView` reveals as the room scrolls into and through the viewport, same visual idea (grid, then panels, then board, then finished) with no scroll-jacking. Desktop keeps the full scrubbed, pinned sequence.

**New dependency:** `framer-motion`, chosen over GSAP + ScrollTrigger (more powerful for complex pinning, but an imperative library bolted onto React rather than designed for it, plus its own bundle weight and learning curve) and over native CSS scroll-driven animations (`animation-timeline: scroll()`, zero bundle cost but incomplete browser support as of this writing, meaning a JS fallback would be needed anyway).

## Out of Scope

- Any change to the live `/` homepage, `layout.tsx`, or any inner page. Both concepts are isolated to their own new preview routes and whatever new components/assets they introduce.
- Any new content, copy, or photography. Both previews reuse existing data from `src/lib/*` and existing images in `public/images/`.
- Google Analytics, reCAPTCHA, or the distributor/contact form backend (tracked separately; unaffected by this work).
- Deciding a winner. This spec produces two comparable previews; picking one (or asking for a hybrid, or more iteration) is the client's decision after seeing them live.
- Applying either new visual language to inner pages (product pages, About Us, etc.). The client's ask was homepage-only.

## Testing / Verification

- `npm run build` stays clean with both new preview routes added (they are ordinary static routes with client-side animation, no new env vars or server-side dependencies).
- Both `/preview-theme/` and `/preview-fluid/` are manually checked in a real browser at mobile, tablet, and desktop widths.
- `/preview-fluid/` is manually checked with the OS/browser "reduce motion" setting enabled, confirming the room renders fully built with no pinned scroll-jacking and other sections fall back to plain fades.
- `/preview-fluid/` is manually checked on a throttled/mobile viewport to confirm the intro's non-pinned mobile fallback doesn't jank or visually pop between layers.
- The standard project sweep applies to any new copy introduced (labels, CTAs, product callouts in the room tour): grep for em dash, en dash, and raw `'`/`&` in JSX text before calling either preview done.

## Open Questions for Implementation Planning

None blocking; both concepts are fully specified above. The implementation plan should decide file/component boundaries (for example, whether the isometric SVG lives as a standalone React component with named layer props, versus inline JSX in the intro section) and the exact Tailwind/Framer Motion utility choices, but those are plan-level details, not open design decisions.
