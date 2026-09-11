import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Check, Download, Package, Info } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SpecTable from "@/components/ui/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCta from "@/components/products/ProductCta";
import ShadeCardViewer from "@/components/shade-card/ShadeCardViewer";
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

function shadeCardPageCount() {
  try {
    const dir = path.join(process.cwd(), "public", "images", "shade-card");
    return fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).length;
  } catch {
    return 0;
  }
}

export default function FlagshipProductPage({ product }: { product: Product }) {
  const sheet = dataSheetHref(product.dataSheet);
  const showCalculator =
    product.slug === "smart-gypsum-board" ||
    product.slug === "smart-ceiling-panel" ||
    product.slug === "smart-grid";
  const shadeCardPages =
    product.slug === "smart-ceiling-panel" ? shadeCardPageCount() : 0;

  return (
    <>
      <PageHero
        breadcrumb={product.name}
        title={product.name}
        subtitle={product.tagline}
      />

      {/* Intro */}
      <section className="bg-mist">
        <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {product.image && (
              <div
                className={`overflow-hidden rounded-3xl border border-warm shadow-plaster ${
                  product.imageFit === "contain" ? "bg-white p-8" : ""
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={520}
                  className={`h-full w-full ${
                    product.imageFit === "contain" ? "object-contain" : "object-cover"
                  }`}
                  priority
                />
              </div>
            )}
            <div>
              <p className="text-lg leading-relaxed text-grey">
                {product.intro}
              </p>

              {product.highlights && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {product.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-grey"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-red" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#dealer"
                  className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
                >
                  Become a dealer
                </Link>
                {showCalculator && (
                  <Link
                    href="/ceiling-calculator/"
                    className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:text-red"
                  >
                    Ceiling calculator
                  </Link>
                )}
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

      {/* Variants */}
      {product.variants && (
        <section className="border-t border-warm bg-white">
          <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey sm:text-3xl">
              {product.slug === "smart-grid" ? "Two systems" : "The range"}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {product.variants.map((v) => (
                <article
                  key={v.name}
                  className="rounded-3xl border border-warm bg-mist p-6 shadow-plaster"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white">
                    <Package className="h-5 w-5" />
                  </span>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="text-lg font-extrabold text-red">
                      {v.name}
                    </h3>
                    {v.badge && (
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red">
                        {v.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-grey">
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
        <section className="border-t border-warm bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Available finishes
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-grey">
              Vinyl laminates come in a wide range of patterns and colours.
              Browse the full shade card to choose an exact finish.
            </p>
            {sheet && (
              <a
                href={sheet}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-grey transition-colors hover:text-red"
              >
                <Download className="h-4 w-4" />
                Download the shade card (PDF)
              </a>
            )}
          </div>
        </section>
      )}

      {/* Shade card flipbook (Ceiling Panel) */}
      {shadeCardPages > 0 && (
        <section className="border-t border-warm bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Browse the shade card
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-grey">
              Turn the page to see every finish, or use the arrows.
            </p>
            <div className="mt-8">
              <ShadeCardViewer pageCount={shadeCardPages} />
            </div>
          </div>
        </section>
      )}

      {/* Spec table */}
      {product.spec && (
        <section className="border-t border-warm bg-white">
          <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
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
        <section className="border-t border-warm bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <dl className="grid gap-8 sm:grid-cols-3">
              {product.notes.map((n) => (
                <div key={n.title}>
                  <dt className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-red">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    {n.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-grey">
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
