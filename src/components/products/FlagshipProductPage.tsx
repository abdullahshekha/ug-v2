import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Check, Download } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SpecTable from "@/components/ui/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCta from "@/components/products/ProductCta";
import type { Product } from "@/lib/products";

function dataSheetHref(file?: string) {
  if (!file) return null;
  try {
    fs.accessSync(path.join(process.cwd(), "public", "resources", file));
    return `/resources/${file}`;
  } catch {
    return null;
  }
}

export default function FlagshipProductPage({ product }: { product: Product }) {
  const sheet = dataSheetHref(product.dataSheet);
  const showCalculator =
    product.slug === "smart-gypsum-board" ||
    product.slug === "smart-ceiling-panel" ||
    product.slug === "smart-grid";

  return (
    <>
      <PageHero
        breadcrumb={product.name}
        title={product.name}
        subtitle={product.tagline}
      />

      {/* Intro */}
      <section className="bg-plaster-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {product.image && (
              <div className="overflow-hidden rounded-3xl border border-warm shadow-plaster">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={520}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            )}
            <div>
              <p className="text-lg leading-relaxed text-plaster-700">
                {product.intro}
              </p>

              {product.highlights && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-plaster-700"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-700" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#dealer"
                  className="inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-900"
                >
                  Become a dealer
                </Link>
                {showCalculator && (
                  <Link
                    href="/ceiling-calculator/"
                    className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-plaster-800 transition-colors hover:border-brand-300 hover:text-brand-800"
                  >
                    Ceiling calculator
                  </Link>
                )}
                {sheet && (
                  <a
                    href={sheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-plaster-800 transition-colors hover:border-brand-300 hover:text-brand-800"
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

      {/* Variants */}
      {product.variants && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800 sm:text-3xl">
              {product.slug === "smart-grid" ? "Two systems" : "The range"}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {product.variants.map((v) => (
                <article
                  key={v.name}
                  className="rounded-3xl border border-warm bg-plaster-50 p-6 shadow-plaster"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-brand-800">
                      {v.name}
                    </h3>
                    {v.badge && (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-800">
                        {v.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-plaster-600">
                    {v.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Finishes (Ceiling Panel) */}
      {product.finishes && (
        <section className="border-t border-warm bg-plaster-100">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
              Available finishes
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-plaster-600">
              Vinyl laminates come in three pattern families. Ask for the full
              shade card to choose an exact colour and texture.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {product.finishes.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-warm bg-white px-4 py-2 text-sm font-semibold text-plaster-700"
                >
                  {f}
                </span>
              ))}
            </div>
            {sheet && (
              <a
                href={sheet}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-800"
              >
                <Download className="h-4 w-4" />
                Open the shade card
              </a>
            )}
          </div>
        </section>
      )}

      {/* Spec table */}
      {product.spec && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
              Specifications
            </h2>
            <div className="mt-6">
              <SpecTable spec={product.spec} />
            </div>
          </div>
        </section>
      )}

      {/* Notes */}
      {product.notes && (
        <section className="border-t border-warm bg-plaster-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <dl className="grid gap-8 sm:grid-cols-3">
              {product.notes.map((n) => (
                <div key={n.title}>
                  <dt className="text-sm font-extrabold uppercase tracking-wide text-brand-800">
                    {n.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-plaster-600">
                    {n.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <RelatedProducts slugs={product.related} />
      <ProductCta showCalculator={showCalculator} />
    </>
  );
}
