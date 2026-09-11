import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Ruler,
  Wrench,
  SquareStack,
  CornerDownRight,
  type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SpecTable from "@/components/ui/SpecTable";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCta from "@/components/products/ProductCta";
import type { AccessoryIconName, Product } from "@/lib/products";

const icons: Record<AccessoryIconName, LucideIcon> = {
  Layers,
  Ruler,
  Wrench,
  SquareStack,
  CornerDownRight,
};

export default function AccessoryProductPage({ product }: { product: Product }) {
  const Icon = product.iconName ? icons[product.iconName] : Layers;

  return (
    <>
      <PageHero
        breadcrumb={product.name}
        title={product.name}
        subtitle={product.tagline}
      />

      <section className="bg-mist">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex justify-center">
              {product.image ? (
                <div className="relative h-72 w-full max-w-xs sm:h-80">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 20rem, 70vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-red">
                  <Icon className="h-9 w-9" />
                </span>
              )}
            </div>

            <div>
              <p className="text-lg leading-relaxed text-grey">
                {product.intro}
              </p>

              {product.application && (
                <div className="mt-6 rounded-2xl border border-warm bg-white p-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
                    Application
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-grey">
                    {product.application}
                  </p>
                </div>
              )}

              {product.sizes && (
                <div className="mt-6">
                  <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-grey">
                    Sizes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-warm bg-white px-4 py-2 text-sm font-semibold text-grey"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/#dealer"
                className="mt-8 inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Become a dealer
              </Link>
            </div>
          </div>

          {product.spec && (
            <div className="mt-16 border-t border-warm pt-16">
              <h2 className="text-2xl font-extrabold tracking-tight text-grey">
                Specifications
              </h2>
              <div className="mt-6">
                <SpecTable spec={product.spec} />
              </div>
            </div>
          )}
        </div>
      </section>

      <RelatedProducts slugs={product.related} />
      <ProductCta />
    </>
  );
}
