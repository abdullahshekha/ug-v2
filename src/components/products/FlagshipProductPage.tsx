import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Check, Download, Package, Info, ArrowUpRight } from "lucide-react";
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
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
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
                  href="/#distributor"
                  className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
                >
                  Become a Distributor
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
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey sm:text-3xl">
              {product.slug === "smart-grid" ? "Two systems" : "The Range"}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {product.variants.map((v) => {
                const href =
                  product.slug === "smart-gypsum-board" && v.slug
                    ? `/smart-gypsum-board/${v.slug}/`
                    : null;
                const media = v.image ? (
                  <div className="flex h-96 items-center justify-center bg-white p-6">
                    <Image
                      src={v.image}
                      alt={v.name}
                      width={900}
                      height={670}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="p-6 pb-0">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red text-white">
                      <Package className="h-5 w-5" />
                    </span>
                  </div>
                );
                const body = (
                  <div className="p-6">
                    <div className="flex items-center gap-2">
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
                    {href && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-grey group-hover:text-red">
                        View details
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                );
                if (href) {
                  return (
                    <Link
                      key={v.name}
                      href={href}
                      className="group block overflow-hidden rounded-3xl border border-warm bg-mist shadow-plaster transition-transform hover:-translate-y-1"
                    >
                      {media}
                      {body}
                    </Link>
                  );
                }
                return (
                  <article
                    key={v.name}
                    className="overflow-hidden rounded-3xl border border-warm bg-mist shadow-plaster"
                  >
                    {media}
                    {body}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Shade card flipbook (Ceiling Panel) */}
      {shadeCardPages > 0 && (
        <section className="border-t border-warm bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              Browse the shade card
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-grey">
              Turn the page to see every finish, or use the arrows. Vinyl
              laminates come in a wide range of patterns and colours.
            </p>
            <div className="mt-8">
              <ShadeCardViewer pageCount={shadeCardPages} />
            </div>
            {sheet && (
              <div className="mt-8 flex justify-center">
                <a
                  href={sheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:text-red"
                >
                  <Download className="h-4 w-4" />
                  Download the shade card (PDF)
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Spec table */}
      {product.spec && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
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
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
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

      {/* Installation and application photos */}
      {product.installationImages && (
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              In practice
            </h2>
            <div
              className={`mt-6 grid gap-5 ${
                product.installationImages.length > 1
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-1"
              }`}
            >
              {product.installationImages.map((img) => (
                <figure
                  key={img.src}
                  className="overflow-hidden rounded-3xl border border-warm bg-mist shadow-plaster"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={900}
                    height={600}
                    className="h-full w-full object-contain bg-white"
                  />
                  {img.caption && (
                    <figcaption className="border-t border-warm p-4 text-xs text-grey">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedProducts slugs={product.related} />
      <ProductCta showCalculator={showCalculator} />
    </>
  );
}
