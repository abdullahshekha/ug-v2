import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Check, Download, Info, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SpecTable from "@/components/ui/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCta from "@/components/products/ProductCta";
import { boardVariants, type BoardVariant } from "@/lib/boardVariants";
import { getProduct } from "@/lib/products";

function dataSheetHref(file?: string) {
  if (!file) return null;
  try {
    fs.accessSync(path.join(process.cwd(), "public", "resources", file));
    return `/resources/${file}`;
  } catch {
    return null;
  }
}

export default function BoardVariantPage({ variant }: { variant: BoardVariant }) {
  const board = getProduct("smart-gypsum-board")!;
  const sheet = dataSheetHref(board.dataSheet);
  const otherVariants = Object.values(boardVariants).filter(
    (v) => v.slug !== variant.slug
  );

  return (
    <>
      <PageHero
        parent={{ label: "Smart Gypsum Board", href: "/smart-gypsum-board/" }}
        breadcrumb={variant.name}
        title={`Smart ${variant.name} Gypsum Board`}
        subtitle={variant.tagline}
      />

      {/* Intro */}
      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-warm bg-white p-8 shadow-plaster">
              <Image
                src={variant.image}
                alt={`Smart ${variant.name} Gypsum Board`}
                width={800}
                height={667}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-lg leading-relaxed text-grey">
                {variant.intro}
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {variant.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-grey"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#distributor"
                  className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
                >
                  Become a Distributor
                </Link>
                <Link
                  href="/ceiling-calculator/"
                  className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:text-red"
                >
                  Ceiling calculator
                </Link>
                {sheet && (
                  <a
                    href={sheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:text-red"
                  >
                    <Download className="h-4 w-4" />
                    Data sheet
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards followed */}
      {variant.standards && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Standards followed
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {variant.standards.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-warm bg-mist px-4 py-2 text-sm font-bold text-grey"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Layered note (Heat Resistant) */}
      {variant.layeredNote && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="flex items-start gap-3 rounded-3xl border border-warm bg-mist p-6">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-red" />
              <p className="text-sm leading-relaxed text-grey">
                {variant.layeredNote}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Sizes and weights */}
      {variant.sizeSpec && (
        <section className="border-t border-warm bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Sizes and weights
            </h2>
            <div className="mt-6">
              <SpecTable spec={variant.sizeSpec} />
            </div>
          </div>
        </section>
      )}

      {/* Test results */}
      {variant.testResults && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Performance data
            </h2>
            <div className="mt-6">
              <SpecTable spec={variant.testResults} />
            </div>
          </div>
        </section>
      )}

      {/* Other board types */}
      <section className="border-t border-warm bg-mist">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Other Smart Gypsum Board types
            </h2>
            <Link
              href="/smart-gypsum-board/"
              className="inline-flex items-center gap-1 text-sm font-bold text-grey transition-colors hover:text-red"
            >
              View the full range
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherVariants.map((v) => (
              <Link
                key={v.slug}
                href={`/smart-gypsum-board/${v.slug}/`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1"
              >
                <div className="flex h-32 items-center justify-center bg-white p-4">
                  <Image
                    src={v.image}
                    alt={v.name}
                    width={300}
                    height={250}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-sm font-extrabold text-red">
                    {v.name}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-grey group-hover:text-red">
                    View details
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedProducts slugs={board.related} />
      <ProductCta showCalculator />
    </>
  );
}
