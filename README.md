# United Gypsum

Marketing website for United Gypsum (Pvt.) Ltd. — a rebuild of unitedgypsum.com
on **Next.js 15** (App Router, TypeScript) with **Tailwind CSS** and the
**Montserrat** typeface.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 |
| Icons | lucide-react |
| Font | Montserrat via `next/font/google` |

## Structure

```
src/
├── app/                  routes, layout, global styles
│   ├── page.tsx          homepage
│   ├── ceiling-calculator/
│   └── blogs/data.ts     blog seed data
├── lib/
│   └── ceilingCalc.ts    ceiling material estimator (pure logic)
└── components/
    ├── ui/               Navbar, Footer, SectionHeading, PageHero
    └── sections/         homepage sections
```

## Status

Homepage and the ceiling material calculator are live. Inner pages (products,
about, contact, blog, projects) and the dealer-enquiry backend are in progress.
