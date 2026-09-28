# Homepage Redesign Preview Themes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build two live, interactive preview routes, `/preview-theme/` (Editorial
Asymmetric) and `/preview-fluid/` (Fluid/animated room build), so the client can
compare two new homepage directions without touching the live `/` homepage.

**Architecture:** Both routes are ordinary Next.js App Router pages that compose
a mix of brand-new components and the existing `src/components/sections/*`
components (same data, same interaction logic, unchanged). Theme 1 adds five
new presentational components under `src/components/preview-theme/` (no new
dependency, pure Tailwind). Theme 2 adds a `framer-motion`-powered intro plus a
reusable scroll-reveal wrapper under `src/components/preview-fluid/`, and a
`prefers-reduced-motion` hook shared by both. Neither theme edits `src/app/page.tsx`,
`src/app/layout.tsx`, or any existing section/component file.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3.4,
lucide-react, `framer-motion` (new dependency, Theme 2 only).

**Spec:** `docs/superpowers/specs/2026-09-26-homepage-redesign-concepts-design.md`

**Testing note:** This project has no unit test runner (no Jest/Vitest configured;
confirmed via a repo-wide search for `*.test.*`, none present outside
`node_modules`). Per this project's own established convention (`CLAUDE.md`
sections 2 and 9), verification is: `npm run build` (TypeScript type-check plus
static generation) after each task, plus the project's standard grep sweep for
em dash / en dash / raw `'`/`&` in new JSX text, plus manual browser checks.
Every task below uses these in place of a unit-test red/green cycle.

## Global Constraints

- Exactly 4 colors anywhere in new UI: `red #90192c`, `grey #414141`, `white`,
  `mist #faf7f3`, plus the existing `border-warm` hairline exception. No new
  color, no opacity-on-text (opacity is allowed only on borders/shadows/SVG
  decorative fills, never on rendered text).
- Montserrat only, same weight scale as the rest of the site (`font-extrabold`
  headings, `tracking-tight`).
- `<Image>` from `next/image`, never `<img>`; `<Link>` from `next/link` for
  internal navigation, never a bare `<a>`.
- No inline styles except where Framer Motion requires a `style` prop to bind a
  `MotionValue` (the one sanctioned exception, matching `PageHero`'s existing
  dot-grid exception for CSS).
- In JSX text use `&apos;` and `&amp;`, never raw `'`/`&`. No em dashes or en
  dashes anywhere in new copy, alt text, or code comments.
- Mobile-first: base styles, then `sm:`/`md:`/`lg:`.
- Both previews are additive only: `src/app/page.tsx`, `src/app/layout.tsx`,
  and every existing file under `src/components/sections/`, `src/components/ui/`,
  `src/lib/` stay unmodified. Only new files are created.
- Both previews reuse existing data (`src/lib/products.ts`, etc.) and existing
  images in `public/images/`. No new content, copy, or photography.
- `framer-motion` is the only new dependency; Theme 1 needs none.
- Never set `overflow-x` on `body` (only `html` already has it) — a prior fix
  documented in `CLAUDE.md` notes this breaks `position: sticky` for every
  descendant, which matters here since `DistributorForm`'s right column is
  `lg:sticky` and both preview routes render it unchanged.

## Review Focus

- **`prefers-reduced-motion: reduce` visitors on `/preview-fluid/`:** the room
  must render fully built immediately, no pinned/scrubbed scroll section at
  all, not just a shorter animation. Covered in Task 10.
- **Mobile visitors (`< md`) on `/preview-fluid/`:** the ~250vh pinned/sticky
  intro must not render at all below `md`; only the non-pinned, `whileInView`-
  driven fallback should mount. Covered in Task 10.
- **Preview routes leaking into search results before the client picks a
  winner:** both new routes should be marked `noindex` so they don't compete
  with `/` while both variants are live. Covered in Tasks 8 and 12.
- **New JSX copy introducing a banned character:** every new label, heading,
  CTA, or product callout text is a place a stray `'`, `&`, or dash could slip
  in. Covered by the grep sweep in Task 13, run against every file this plan
  creates.
- **`npm run build` breaking because of the new `framer-motion` dependency or
  an SVG/TypeScript prop mismatch in `RoomIllustration`:** Framer Motion's
  `MotionValue`-typed props are easy to get wrong (e.g. passing a plain number
  where a `MotionValue<number>` is expected). Covered by running `npm run build`
  at the end of every task from Task 1 onward, not just at the end.

---

## File Structure

```
src/
├── app/
│   ├── preview-theme/page.tsx          new: Theme 1 route
│   └── preview-fluid/page.tsx          new: Theme 2 route
├── components/
│   ├── preview-theme/
│   │   ├── PreviewHero.tsx             new: diagonal hero + numeral stats
│   │   ├── PullQuoteBand.tsx           new: reusable dark full-width band
│   │   ├── PreviewAboutTeaser.tsx      new: asymmetric split, video bleed
│   │   ├── PreviewFlagshipProducts.tsx new: varied asymmetric split rows
│   │   └── PreviewAccessories.tsx      new: asymmetric card grid
│   └── preview-fluid/
│       ├── RoomIllustration.tsx        new: isometric SVG, 5 layered groups
│       ├── RoomBuildIntro.tsx          new: sticky scroll-scrubbed intro
│       └── Reveal.tsx                  new: whileInView fade-rise wrapper
└── lib/
    └── useReducedMotion.ts             new: shared prefers-reduced-motion hook
```

No existing file is modified by this plan.

---

### Task 1: Install `framer-motion`

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (generated by npm)

**Interfaces:**
- Produces: the `framer-motion` package, available to import in Theme 2 files
  from Task 9 onward.

- [ ] **Step 1: Install the dependency**

Run: `npm install framer-motion`

- [ ] **Step 2: Verify it landed in `package.json`**

Open `package.json` and confirm a `"framer-motion": "^..."` line was added
under `"dependencies"`.

- [ ] **Step 3: Confirm the build still passes**

Run: `npm run build`
Expected: PASS, clean, same route count as before (no new routes yet, since
no preview page exists).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion for the fluid homepage preview"
```

---

### Task 2: Shared `useReducedMotion` hook

**Files:**
- Create: `src/lib/useReducedMotion.ts`

**Interfaces:**
- Produces: `useReducedMotion(): boolean`, a client hook returning `true` when
  the OS/browser has `prefers-reduced-motion: reduce` set, reactive to changes.
  Consumed by `RoomBuildIntro.tsx` (Task 10) and `Reveal.tsx` (Task 11).

- [ ] **Step 1: Write the hook**

```ts
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS. The file isn't imported anywhere yet, so this only confirms
it type-checks in isolation (no unused-export lint error, since it's a named
export from a `.ts` file `next lint` doesn't flag as dead code).

- [ ] **Step 3: Commit**

```bash
git add src/lib/useReducedMotion.ts
git commit -m "feat: add shared prefers-reduced-motion hook"
```

---

### Task 3: Theme 1 — `PullQuoteBand` component

**Files:**
- Create: `src/components/preview-theme/PullQuoteBand.tsx`

**Interfaces:**
- Produces: `PullQuoteBand({ eyebrow: string, quote: string }): JSX.Element`,
  a full-width dark band. Consumed by `src/app/preview-theme/page.tsx` (Task 8).

- [ ] **Step 1: Write the component**

```tsx
interface PullQuoteBandProps {
  eyebrow: string;
  quote: string;
}

export default function PullQuoteBand({ eyebrow, quote }: PullQuoteBandProps) {
  return (
    <section className="bg-grey">
      <div className="mx-auto max-w-[1600px] px-4 py-16 text-center sm:px-8 sm:py-24 lg:px-12">
        <span className="text-[11px] font-extrabold uppercase tracking-eyebrow text-white">
          {eyebrow}
        </span>
        <p className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {quote}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-theme/PullQuoteBand.tsx
git commit -m "feat: add PullQuoteBand for the Editorial Asymmetric preview"
```

---

### Task 4: Theme 1 — `PreviewHero` component

**Files:**
- Create: `src/components/preview-theme/PreviewHero.tsx`

**Interfaces:**
- Produces: `PreviewHero(): JSX.Element`, the diagonal-clip hero with numeral
  stat callouts. Consumed by `src/app/preview-theme/page.tsx` (Task 8).
- Consumes: `/images/hero-mix-products.png` (existing asset, same as the live
  `Hero.tsx`).

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2014", label: "Manufacturing since" },
  { value: "8", label: "Flagship products" },
  { value: "114+", label: "Clients served" },
];

export default function PreviewHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-y-0 right-0 w-[60%] bg-grey [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
              <span className="h-px w-6 bg-red" aria-hidden="true" />
              The smarter way to build
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-grey sm:text-5xl lg:text-7xl">
              Largest Manufacturer of Gypsum-based Products in Pakistan
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
              We employ a well-trained, committed and skilled workforce to
              keep continuous monitoring and quality control on every batch.
              Many United Gypsum products are environment-friendly by design:
              recyclable, and resistant to fire, impact, thermal radiation and
              humidity.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Check our products
              </Link>
              <Link
                href="#distributor"
                className="inline-flex items-center rounded-full border border-warm bg-white px-7 py-3.5 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Become a Distributor
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <Image
              src="/images/hero-mix-products.png"
              alt="The United Gypsum product family: boards, ceiling panels, grid and accessories"
              width={2400}
              height={800}
              className="h-auto w-full max-w-none object-contain drop-shadow-plaster-lg"
              priority
            />
          </div>
        </div>

        <dl className="relative z-10 mt-16 grid grid-cols-3 gap-6 border-t border-warm pt-10 lg:max-w-2xl">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-4xl font-extrabold tracking-tight text-red sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-xs font-bold uppercase tracking-wide text-grey">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

Note: `drop-shadow-plaster-lg` isn't in `tailwind.config.ts`'s `dropShadow` key
(only `boxShadow`), so it produces no CSS. Replace it with an inline arbitrary
value that reuses the same rgba the config already defines for
`plaster-lg`, so no new token is introduced:

```tsx
className="h-auto w-full max-w-none object-contain [filter:drop-shadow(0_22px_30px_rgba(65,65,65,0.14))]"
```

- [ ] **Step 2: Apply that correction before building**

Use the corrected `className` from the note above in the `<Image>` element.

- [ ] **Step 3: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/preview-theme/PreviewHero.tsx
git commit -m "feat: add PreviewHero with diagonal clip-path and numeral stats"
```

---

### Task 5: Theme 1 — `PreviewAboutTeaser` component

**Files:**
- Create: `src/components/preview-theme/PreviewAboutTeaser.tsx`

**Interfaces:**
- Produces: `PreviewAboutTeaser(): JSX.Element`, an asymmetric (0.85fr/1.15fr)
  split with the factory-tour video bleeding past the container edge.
  Consumed by `src/app/preview-theme/page.tsx` (Task 8).
- Consumes: `SectionHeading` from `@/components/ui/SectionHeading` (existing,
  unmodified), `/videos/ug-factory-tour.mp4` and `/images/ug-factory-poster.jpg`
  (existing assets, same as the live `AboutTeaser.tsx`).

- [ ] **Step 1: Write the component**

```tsx
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "12+", label: "years in gypsum manufacturing" },
  { value: "ISO", label: "9001-2015 & 14001-2015" },
  { value: "ASTM", label: "C472 / C473 / C474 / D3763" },
];

export default function PreviewAboutTeaser() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="A proud past, a bright future"
              title="This is United Gypsum in a nutshell"
              lead="Our team is quick to address technical issues caused by environmental factors, and our top management stays involved in keeping every gypsum product&apos;s working life intact for the long term. Our mission is to solve construction-related challenges with an enduring technological acumen."
            />

            <dl className="mt-8 grid grid-cols-3 gap-5 border-t border-warm pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-red">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-grey">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about-us/"
                className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-grey"
              >
                About United Gypsum
              </Link>
              <Link
                href="/company-profile/"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Company profile
              </Link>
            </div>
          </div>

          <div className="relative -mr-4 overflow-hidden rounded-3xl border border-warm shadow-plaster-lg sm:-mr-8 lg:-mr-12 lg:rounded-l-3xl lg:rounded-r-none">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              preload="none"
              poster="/images/ug-factory-poster.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/videos/ug-factory-tour.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-theme/PreviewAboutTeaser.tsx
git commit -m "feat: add PreviewAboutTeaser with asymmetric split and video bleed"
```

---

### Task 6: Theme 1 — `PreviewFlagshipProducts` component

**Files:**
- Create: `src/components/preview-theme/PreviewFlagshipProducts.tsx`

**Interfaces:**
- Produces: `PreviewFlagshipProducts(): JSX.Element`, three product rows each
  with a different asymmetric split (55/45, 40/60, 60/40) and an image that
  bleeds past the container edge. Consumed by `src/app/preview-theme/page.tsx`
  (Task 8).
- Consumes: `SectionHeading` (existing, unmodified), the same three flagship
  product images as the live `FlagshipProducts.tsx`.

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const products = [
  {
    name: "Smart Gypsum Board",
    href: "/smart-gypsum-board/",
    image: "/images/flagship-gypsum-board.png",
    blurb:
      "An incombustible gypsum core covered with extra-tough paper on both sides for strength and durability, made in coherence with ASTM C472, C473, C474 and D3763. Standard, Fire, Moisture and Foil-backed variants.",
    split: "lg:grid-cols-[0.55fr_0.45fr]",
    bleed: "lg:-mr-12",
    reversed: false,
  },
  {
    name: "Smart Ceiling Panel",
    href: "/smart-ceiling-panel/",
    image: "/images/flagship-ceiling-panel.png",
    blurb:
      "A non-combustible gypsum core bound by tough paper on both sides, available in a wide range of vinyl laminates (plain, embossed and printed), plus a foil-backed option that reflects thermal radiation.",
    split: "lg:grid-cols-[0.4fr_0.6fr]",
    bleed: "lg:-ml-12",
    reversed: true,
  },
  {
    name: "Smart Grid",
    href: "/smart-grid/",
    image: "/images/flagship-grid.png",
    blurb:
      "A suspended ceiling T-bar system in galvanized, zinc-coated steel with a thick polyester top coat. Smart Grid 38 for cinemas, auditoriums and warehouses; Smart Grid 32 for shops and small offices.",
    split: "lg:grid-cols-[0.6fr_0.4fr]",
    bleed: "lg:-mr-12",
    reversed: false,
  },
] as const;

export default function PreviewFlagshipProducts() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Flagship products"
          title="Engineered gypsum systems"
          lead="Three core systems, backed by decades of gypsum know-how and international standards."
        />

        <div className="mt-14 space-y-16">
          {products.map((p, i) => (
            <article
              key={p.name}
              className={`grid items-center gap-10 lg:gap-16 ${p.split} ${
                i > 0 ? "border-t border-warm pt-16" : ""
              }`}
            >
              <div className={p.reversed ? "lg:order-2" : ""}>
                <h3 className="text-2xl font-extrabold tracking-tight text-red sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-grey">
                  {p.blurb}
                </p>
                <Link
                  href={p.href}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-grey transition-colors hover:text-red"
                >
                  View product
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div
                className={`relative mx-auto h-96 w-full max-w-xl sm:h-[28rem] ${
                  p.reversed ? "lg:order-1" : ""
                } ${p.bleed}`}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 36rem, 90vw"
                  className="object-contain"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-theme/PreviewFlagshipProducts.tsx
git commit -m "feat: add PreviewFlagshipProducts with varied asymmetric splits"
```

---

### Task 7: Theme 1 — `PreviewAccessories` component

**Files:**
- Create: `src/components/preview-theme/PreviewAccessories.tsx`

**Interfaces:**
- Produces: `PreviewAccessories(): JSX.Element`, an asymmetric card grid
  (Smart Filler spans 2x2, Smart Bead spans 2x1, the rest are single cells).
  Consumed by `src/app/preview-theme/page.tsx` (Task 8).
- Consumes: `SectionHeading` (existing, unmodified), the same five accessory
  images as the live `Accessories.tsx`.

- [ ] **Step 1: Write the component**

```tsx
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const accessories = [
  {
    name: "Smart Filler",
    href: "/smart-filler/",
    image: "/images/accessory-filler.png",
    imageWidth: 700,
    imageHeight: 700,
    note: "Ready-mixed joint filler for flush jointing and a paint-ready finish.",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    name: "Smart Tape",
    href: "/smart-tape/",
    image: "/images/accessory-tape.png",
    imageWidth: 700,
    imageHeight: 499,
    note: "Self-adhesive fiberglass mesh tape that resists shrinkage and cracking.",
    span: "",
  },
  {
    name: "Smart Screws",
    href: "/smart-screws/",
    image: "/images/accessory-screws.png",
    imageWidth: 700,
    imageHeight: 567,
    note: "Fine-thread carbon-steel drywall screws for fixing board to metal studs.",
    span: "",
  },
  {
    name: "Smart Access",
    href: "/smart-access/",
    image: "/images/accessory-access.png",
    imageWidth: 700,
    imageHeight: 757,
    note: "Powder-coated aluminium access panels in 300, 400 and 600 mm sizes.",
    span: "",
  },
  {
    name: "Smart Bead",
    href: "/smart-bead/",
    image: "/images/accessory-bead.png",
    imageWidth: 700,
    imageHeight: 689,
    note: "Paper-faced metal corner bead for strong, chip-resistant drywall edges.",
    span: "sm:col-span-2",
  },
] as const;

export default function PreviewAccessories() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Drywall accessories"
            title="Everything the system needs"
          />
          <Link
            href="/#distributor"
            className="text-sm font-bold text-red transition-colors hover:text-grey"
          >
            Explore all accessories
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {accessories.map(
            ({ name, href, image, imageWidth, imageHeight, note, span }) => (
              <Link
                key={name}
                href={href}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1 ${span}`}
              >
                <div className="flex h-32 items-center justify-center sm:h-full sm:min-h-[8rem]">
                  <Image
                    src={image}
                    alt={name}
                    width={imageWidth}
                    height={imageHeight}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="mt-4 text-sm font-extrabold text-grey group-hover:text-red">
                  {name}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-grey">
                  {note}
                </p>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-theme/PreviewAccessories.tsx
git commit -m "feat: add PreviewAccessories with asymmetric card grid"
```

---

### Task 8: Assemble the `/preview-theme/` route

**Files:**
- Create: `src/app/preview-theme/page.tsx`

**Interfaces:**
- Consumes: `PreviewHero`, `PullQuoteBand`, `PreviewAboutTeaser`,
  `PreviewFlagshipProducts`, `PreviewAccessories` (Tasks 3 to 7), plus the
  unmodified `Navbar`, `Footer`, `ClientLogoMarquee`, `Pillars`,
  `CeilingCalculator`, `InTheirWords`, `LandmarkProjects`, `Certificates`,
  `ResourceDownloads`, `Events`, `LatestBlogs`, `PremiumQualityBanner`,
  `DistributorForm` from `src/components/sections/` and `src/components/ui/`.
- Produces: the live route `/preview-theme/`.

This section order matches the live homepage (`src/app/page.tsx`) with the
Theme 1 replacements swapped in and two `PullQuoteBand`s inserted between
major section groups, per the spec's "2 to 3 full-width dark bands... between
major section groups." Every section not named in the spec's Theme 1 direction
(`ClientLogoMarquee`, `Pillars`, `CeilingCalculator`, `InTheirWords`,
`LandmarkProjects`, `Certificates`, `ResourceDownloads`, `Events`,
`LatestBlogs`, `PremiumQualityBanner`, `DistributorForm`) is reused unchanged,
per the spec's "everything else keeps its current content, data source, and
interaction logic; only its layout and visual treatment changes to match the
new rhythm" — here that new rhythm comes from the two pull-quote bands
breaking up the unchanged sections' plain background-color alternation, not
from rewriting each one individually.

`Navbar`'s transparent-over-hero behavior only triggers on `usePathname() === "/"`
(see `CLAUDE.md` section 4), so on `/preview-theme/` it renders solid, the same
as it does on every existing inner page. That is expected, not a bug to fix
here.

- [ ] **Step 1: Write the page**

```tsx
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PreviewHero from "@/components/preview-theme/PreviewHero";
import PullQuoteBand from "@/components/preview-theme/PullQuoteBand";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import PreviewAboutTeaser from "@/components/preview-theme/PreviewAboutTeaser";
import Pillars from "@/components/sections/Pillars";
import PreviewFlagshipProducts from "@/components/preview-theme/PreviewFlagshipProducts";
import PreviewAccessories from "@/components/preview-theme/PreviewAccessories";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import InTheirWords from "@/components/sections/InTheirWords";
import LandmarkProjects from "@/components/sections/LandmarkProjects";
import Certificates from "@/components/sections/Certificates";
import ResourceDownloads from "@/components/sections/ResourceDownloads";
import Events from "@/components/sections/Events";
import LatestBlogs from "@/components/sections/LatestBlogs";
import PremiumQualityBanner from "@/components/sections/PremiumQualityBanner";
import DistributorForm from "@/components/sections/DistributorForm";

export const metadata = {
  title: "Homepage preview: Editorial Asymmetric | United Gypsum",
  robots: { index: false, follow: false },
};

export default function PreviewThemePage() {
  return (
    <>
      <Navbar />
      <main>
        <PreviewHero />
        <ClientLogoMarquee />
        <PreviewAboutTeaser />
        <Pillars />
        <PullQuoteBand
          eyebrow="Since 2014"
          quote="Pakistan&apos;s largest manufacturer of gypsum-based products, built on quality, loyalty and innovation."
        />
        <PreviewFlagshipProducts />
        <PreviewAccessories />
        <CeilingCalculator />
        <InTheirWords />
        <PullQuoteBand
          eyebrow="In their words"
          quote="Trusted on landmark projects across Pakistan, from five-star hotels to national landmarks."
        />
        <LandmarkProjects />
        <Certificates />
        <ResourceDownloads />
        <Events />
        <LatestBlogs />
        <PremiumQualityBanner />
        <DistributorForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Confirm the build passes and the route is generated**

Run: `npm run build`
Expected: PASS. The build output's route list now includes `/preview-theme`
as a static route (look for it in the `Route (app)` table `next build` prints).

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/preview-theme/`, and confirm:
- The hero shows the diagonal grey band behind the product photo and the
  "2014 / 8 / 114+" stat row beneath the intro paragraph.
- Two dark pull-quote bands appear, one after Pillars and one after
  InTheirWords.
- The three flagship product rows show visibly different split ratios and the
  product image bleeds past the text column's edge on alternating sides.
- The accessories grid shows Smart Filler as a large 2x2 tile and Smart Bead
  as a wide 2x1 tile, not a uniform grid.
- Every other section (calculator, testimonials, projects, certificates,
  downloads, events, blogs, banner, distributor form, footer) renders exactly
  as it does on the live `/` homepage.

- [ ] **Step 4: Commit**

```bash
git add src/app/preview-theme/page.tsx
git commit -m "feat: assemble the /preview-theme/ Editorial Asymmetric route"
```

---

### Task 9: Theme 2 — `RoomIllustration` component

**Files:**
- Create: `src/components/preview-fluid/RoomIllustration.tsx`

**Interfaces:**
- Produces: `RoomIllustration({ progress: MotionValue<number>, revealMode?: boolean }): JSX.Element`.
  - `progress`: a Framer Motion `MotionValue<number>` in `[0, 1]`. Each of the
    4 built layers (grid, panels, board, finish) maps a sub-range of
    `progress` to that layer's opacity and a small upward slide, via
    `useTransform`, at approximately the checkpoints the spec calls out (grid
    ~20%, panels ~45%, board ~70%, finished ~90%). Passing a constant
    `MotionValue` of `1` (via Framer Motion's `useMotionValue(1)`) renders
    every layer fully built and static, since `1` is past every layer's range
    and `useTransform` clamps to the range's end value by default. This is
    how the reduced-motion fallback (Task 10) gets a fully-built room from
    the same component with no special-casing.
  - `revealMode`: when `true`, ignores `progress` and instead animates each
    layer with Framer Motion's `whileInView`, staggered grid then panels then
    board then finished. This is the mobile (`< md`) fallback path (Task 10).
- Consumes: `framer-motion`'s `motion`, `useTransform`, and the `MotionValue`
  type (Task 1).

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface RoomIllustrationProps {
  /** Scroll progress through the intro container, 0 to 1. Pass a constant
   * MotionValue of 1 (via useMotionValue(1)) to render every layer fully
   * built and static. Ignored when revealMode is true. */
  progress: MotionValue<number>;
  /** Mobile/reduced-motion fallback: each layer fades in via an ordinary
   * whileInView reveal, staggered grid then panels then board then
   * finished, instead of mapping opacity to scroll progress. */
  revealMode?: boolean;
}

export default function RoomIllustration({
  progress,
  revealMode = false,
}: RoomIllustrationProps) {
  const gridOpacity = useTransform(progress, [0.15, 0.22], [0, 1]);
  const gridY = useTransform(progress, [0.15, 0.22], [16, 0]);
  const panelsOpacity = useTransform(progress, [0.4, 0.47], [0, 1]);
  const panelsY = useTransform(progress, [0.4, 0.47], [16, 0]);
  const boardOpacity = useTransform(progress, [0.65, 0.72], [0, 1]);
  const boardY = useTransform(progress, [0.65, 0.72], [16, 0]);
  const finishOpacity = useTransform(progress, [0.85, 0.92], [0, 1]);
  const finishY = useTransform(progress, [0.85, 0.92], [16, 0]);

  const revealProps = (index: number) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.4, delay: index * 0.15 },
  });

  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      role="img"
      aria-label="An empty room being built, in isometric view: ceiling grid, ceiling panels, wall board and finished room"
    >
      <g id="room-shell">
        <polygon
          points="80,420 400,540 720,420 400,300"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.13"
        />
        <polygon
          points="80,420 80,180 400,60 400,300"
          fill="#ffffff"
          stroke="#414141"
          strokeOpacity="0.13"
        />
        <polygon
          points="400,300 400,60 720,180 720,420"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.13"
        />
      </g>

      <motion.g
        id="ceiling-grid"
        style={revealMode ? undefined : { opacity: gridOpacity, y: gridY }}
        {...(revealMode ? revealProps(0) : {})}
      >
        <line x1="440" y1="90" x2="680" y2="210" stroke="#414141" strokeWidth="2" />
        <line x1="480" y1="70" x2="720" y2="190" stroke="#414141" strokeWidth="2" />
        <line x1="520" y1="50" x2="400" y2="110" stroke="#414141" strokeWidth="2" />
        <line x1="600" y1="90" x2="480" y2="150" stroke="#414141" strokeWidth="2" />
      </motion.g>

      <motion.g
        id="ceiling-panels"
        style={revealMode ? undefined : { opacity: panelsOpacity, y: panelsY }}
        {...(revealMode ? revealProps(1) : {})}
      >
        <polygon
          points="400,60 560,140 560,180 400,100"
          fill="#ffffff"
          stroke="#414141"
          strokeOpacity="0.2"
        />
        <polygon
          points="560,140 720,220 720,260 560,180"
          fill="#faf7f3"
          stroke="#414141"
          strokeOpacity="0.2"
        />
      </motion.g>

      <motion.g
        id="wall-board"
        style={revealMode ? undefined : { opacity: boardOpacity, y: boardY }}
        {...(revealMode ? revealProps(2) : {})}
      >
        <polygon
          points="400,300 400,60 720,180 720,420"
          fill="#ffffff"
          stroke="#90192c"
          strokeOpacity="0.13"
        />
      </motion.g>

      <motion.g
        id="finished-room"
        style={revealMode ? undefined : { opacity: finishOpacity, y: finishY }}
        {...(revealMode ? revealProps(3) : {})}
      >
        <circle cx="560" cy="140" r="10" fill="#90192c" />
        <rect x="140" y="380" width="90" height="60" rx="4" fill="#414141" fillOpacity="0.07" />
      </motion.g>
    </svg>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS. This is the main check that the `MotionValue<number>` typing
is correct (a wrong type here fails `next build`'s TypeScript check, which is
this project's equivalent of a failing test for this file).

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-fluid/RoomIllustration.tsx
git commit -m "feat: add isometric RoomIllustration SVG with 5 layered groups"
```

---

### Task 10: Theme 2 — `RoomBuildIntro` component

**Files:**
- Create: `src/components/preview-fluid/RoomBuildIntro.tsx`

**Interfaces:**
- Produces: `RoomBuildIntro(): JSX.Element`, the full intro section. Consumed
  by `src/app/preview-fluid/page.tsx` (Task 12).
- Consumes: `RoomIllustration` (Task 9), `useReducedMotion` (Task 2),
  `framer-motion`'s `useScroll`, `useMotionValue` (Task 1).

Three render paths, selected in this order:
1. `prefers-reduced-motion: reduce` → a plain, non-sticky section with the
   room rendered fully built via `RoomIllustration` given a constant
   `progress` of `1`. No `250vh` container, no pinning, no scroll listener
   driving any transform.
2. `md` and up, motion allowed → a `250vh` container with a `sticky top-0`
   inner wrapper; `useScroll` tracks progress through that container and
   feeds it straight into `RoomIllustration`.
3. Below `md`, motion allowed → the room stays in normal document flow at a
   fixed size, with `RoomIllustration`'s `revealMode` driving a `whileInView`
   staggered build as it scrolls into view. Rendered via Tailwind's
   `md:hidden` next to the `hidden md:block` pinned version, so no JS media
   query is needed to pick between paths 2 and 3 (only path 1 needs one,
   since it must skip the pinned container's markup entirely rather than just
   hide it with CSS).

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { useMotionValue, useScroll } from "framer-motion";
import RoomIllustration from "./RoomIllustration";
import { useReducedMotion } from "@/lib/useReducedMotion";

const callouts = [
  {
    key: "grid",
    name: "Smart Grid",
    copy: "Galvanized steel T-bar suspended ceiling system.",
    href: "/smart-grid/",
  },
  {
    key: "panels",
    name: "Smart Ceiling Panel",
    copy: "Non-combustible gypsum core in vinyl-laminated or foil-backed finishes.",
    href: "/smart-ceiling-panel/",
  },
  {
    key: "board",
    name: "Smart Gypsum Board",
    copy: "Incombustible gypsum core faced with extra-tough paper on both sides.",
    href: "/smart-gypsum-board/",
  },
] as const;

function IntroCopy() {
  return (
    <div>
      <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
        <span className="h-px w-6 bg-red" aria-hidden="true" />
        Watch the room come together
      </span>
      <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-grey sm:text-5xl">
        From an empty shell to a finished room, one system at a time
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-grey">
        Keep scrolling: the grid goes up, the panels drop in, the walls get
        boarded and the room comes to life, each step built from a real
        United Gypsum product.
      </p>
      <div className="mt-8 grid gap-4">
        {callouts.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
          >
            <h3 className="text-sm font-extrabold text-red">{c.name}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-grey">
              {c.copy}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function RoomBuildIntro() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const staticProgress = useMotionValue(1);

  if (reducedMotion) {
    return (
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <IntroCopy />
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <RoomIllustration progress={staticProgress} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative hidden md:block"
        style={{ height: "250vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-mist">
          <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-4 sm:px-8 md:grid-cols-2 lg:px-12">
            <IntroCopy />
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <RoomIllustration progress={scrollYProgress} />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-mist md:hidden">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8">
          <IntroCopy />
          <div className="relative mx-auto mt-10 aspect-square w-full max-w-md">
            <RoomIllustration progress={staticProgress} revealMode />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-fluid/RoomBuildIntro.tsx
git commit -m "feat: add RoomBuildIntro with scroll-scrubbed, reduced-motion and mobile fallback paths"
```

---

### Task 11: Theme 2 — `Reveal` component

**Files:**
- Create: `src/components/preview-fluid/Reveal.tsx`

**Interfaces:**
- Produces: `Reveal({ children: ReactNode }): JSX.Element`, a `whileInView`
  fade-and-rise wrapper (fade-only under reduced motion). Consumed by
  `src/app/preview-fluid/page.tsx` (Task 12) around every section after the
  intro.
- Consumes: `useReducedMotion` (Task 2), `framer-motion`'s `motion` (Task 1).

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealProps {
  children: ReactNode;
}

export default function Reveal({ children }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Confirm the build passes**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/preview-fluid/Reveal.tsx
git commit -m "feat: add Reveal whileInView wrapper with reduced-motion fallback"
```

---

### Task 12: Assemble the `/preview-fluid/` route

**Files:**
- Create: `src/app/preview-fluid/page.tsx`

**Interfaces:**
- Consumes: `RoomBuildIntro` (Task 10), `Reveal` (Task 11), plus the
  unmodified `Navbar`, `Footer`, `ClientLogoMarquee`, `AboutTeaser`, `Pillars`,
  `FlagshipProducts`, `Accessories`, `CeilingCalculator`, `InTheirWords`,
  `LandmarkProjects`, `Certificates`, `ResourceDownloads`, `Events`,
  `LatestBlogs`, `PremiumQualityBanner`, `DistributorForm` from
  `src/components/sections/` and `src/components/ui/` (all unchanged; Theme 2
  does not need Theme 1's bespoke section variants).
- Produces: the live route `/preview-fluid/`.

Every section after the intro is wrapped in `Reveal` so the "motion elsewhere
on the page" requirement applies uniformly, per the spec's "every section
after the intro... gets a Framer Motion whileInView fade-and-rise reveal."

- [ ] **Step 1: Write the page**

```tsx
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import RoomBuildIntro from "@/components/preview-fluid/RoomBuildIntro";
import Reveal from "@/components/preview-fluid/Reveal";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import AboutTeaser from "@/components/sections/AboutTeaser";
import Pillars from "@/components/sections/Pillars";
import FlagshipProducts from "@/components/sections/FlagshipProducts";
import Accessories from "@/components/sections/Accessories";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import InTheirWords from "@/components/sections/InTheirWords";
import LandmarkProjects from "@/components/sections/LandmarkProjects";
import Certificates from "@/components/sections/Certificates";
import ResourceDownloads from "@/components/sections/ResourceDownloads";
import Events from "@/components/sections/Events";
import LatestBlogs from "@/components/sections/LatestBlogs";
import PremiumQualityBanner from "@/components/sections/PremiumQualityBanner";
import DistributorForm from "@/components/sections/DistributorForm";

export const metadata = {
  title: "Homepage preview: Fluid room build | United Gypsum",
  robots: { index: false, follow: false },
};

export default function PreviewFluidPage() {
  return (
    <>
      <Navbar />
      <main>
        <RoomBuildIntro />
        <Reveal>
          <ClientLogoMarquee />
        </Reveal>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <Reveal>
          <Pillars />
        </Reveal>
        <Reveal>
          <FlagshipProducts />
        </Reveal>
        <Reveal>
          <Accessories />
        </Reveal>
        <Reveal>
          <CeilingCalculator />
        </Reveal>
        <Reveal>
          <InTheirWords />
        </Reveal>
        <Reveal>
          <LandmarkProjects />
        </Reveal>
        <Reveal>
          <Certificates />
        </Reveal>
        <Reveal>
          <ResourceDownloads />
        </Reveal>
        <Reveal>
          <Events />
        </Reveal>
        <Reveal>
          <LatestBlogs />
        </Reveal>
        <Reveal>
          <PremiumQualityBanner />
        </Reveal>
        <Reveal>
          <DistributorForm />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Confirm the build passes and the route is generated**

Run: `npm run build`
Expected: PASS. The build output's route list now includes `/preview-fluid`
alongside `/preview-theme`.

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/preview-fluid/`, and confirm:
- At desktop width, scrolling through the intro scrubs the room build: grid
  lines appear first, then panels, then the wall board, then the light
  fixture/furnishing hint, roughly at the 20/45/70/90% scroll marks, and each
  layer's matching product callout (`Smart Grid`, `Smart Ceiling Panel`,
  `Smart Gypsum Board`) is visible and links to that product's page.
- Once the intro's scroll range is exhausted, the page returns to normal
  (non-sticky) scrolling for every remaining section.
- Every section after the intro fades and rises into view as it's scrolled
  to, and `DistributorForm`'s right column still sticks (`lg:sticky`) while
  its left column (map/form) scrolls, unchanged from the live homepage.

- [ ] **Step 4: Commit**

```bash
git add src/app/preview-fluid/page.tsx
git commit -m "feat: assemble the /preview-fluid/ room-build route"
```

---

### Task 13: Full verification pass

**Files:** none (verification only; no code changes expected).

- [ ] **Step 1: Clean production build**

Run: `npm run build`
Expected: PASS, no warnings, both `/preview-theme` and `/preview-fluid` listed
as static routes alongside the existing 66.

- [ ] **Step 2: Grep sweep for banned characters in every new file**

Run (from the repo root):

```bash
grep -rnE $'[–—]' src/app/preview-theme src/app/preview-fluid src/components/preview-theme src/components/preview-fluid src/lib/useReducedMotion.ts
grep -rn "&mdash;\|&ndash;" src/app/preview-theme src/app/preview-fluid src/components/preview-theme src/components/preview-fluid
grep -rnE "[^&]'[a-zA-Z]|[a-zA-Z]'[^s ]" src/app/preview-theme src/app/preview-fluid src/components/preview-theme src/components/preview-fluid
```

Expected: no matches in any of the three. If the third grep flags a false
positive (it's a coarse heuristic), manually confirm the flagged line uses
`&apos;` for any apostrophe in rendered JSX text, not a raw `'`.

- [ ] **Step 3: Confirm no existing file was touched**

Run: `git diff --stat main -- src/app/page.tsx src/app/layout.tsx src/components/sections src/components/ui src/lib/products.ts src/lib/projects.ts src/lib/events.ts`
Expected: empty output (no changes), confirming both previews are purely
additive.

- [ ] **Step 4: Manual browser check, both routes, three widths**

With `npm run dev` running, open both `/preview-theme/` and `/preview-fluid/`
in a real browser and resize (or use device toolbar) to a phone width
(~390px), a tablet width (~768px), and a desktop width (~1440px). Confirm no
horizontal scrollbar appears at any width on either route, and that both
route's layouts read correctly at each size (Theme 1's asymmetric splits
stack to single-column below `lg`; Theme 2's intro drops its pinned/sticky
behavior below `md` per Task 10).

- [ ] **Step 5: Reduced-motion check on `/preview-fluid/`**

Enable "reduce motion" in the OS or browser (Chrome DevTools: Rendering tab →
"Emulate CSS media feature prefers-reduced-motion: reduce"), reload
`/preview-fluid/`, and confirm:
- The room renders fully built immediately, with no `250vh` tall intro
  section and no scroll-jacked pinning at any width.
- Every section after the intro still becomes visible as it's scrolled to,
  with a plain fade only, no slide.

- [ ] **Step 6: Throttled mobile check on `/preview-fluid/`**

With the browser's device toolbar set to a mobile viewport and network/CPU
throttled (Chrome DevTools: Performance tab CPU throttling, 4x-6x slowdown),
reload `/preview-fluid/` and scroll through the intro. Confirm the room's
layers fade in smoothly one at a time as they scroll into view (grid, then
panels, then board, then finished), with no visual pop where a layer appears
fully formed with no transition, and no stuck/janked scrolling.

- [ ] **Step 7: Report status**

No commit for this task (verification only). If every check above passes,
both preview routes are ready for the client to review. If any check fails,
fix the specific issue in the task that owns the affected file, re-run that
task's build/manual checks, then re-run this task's full sweep from Step 1.
