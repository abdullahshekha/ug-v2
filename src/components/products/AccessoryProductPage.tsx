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

      <section className="bg-plaster-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-50 text-brand-800">
                <Icon className="h-9 w-9" />
              </span>
              {product.sizes && (
                <div className="mt-8">
                  <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-plaster-500">
                    Sizes
                  </p>
                  <ul className="mt-3 space-y-2">
                    {product.sizes.map((s) => (
                      <li
                        key={s}
                        className="rounded-xl border border-warm bg-white px-4 py-2 text-sm font-semibold text-plaster-700"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <p className="text-lg leading-relaxed text-plaster-700">
                {product.intro}
              </p>
              {product.application && (
                <div className="mt-6 rounded-2xl border border-warm bg-white p-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-800">
                    Application
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-plaster-600">
                    {product.application}
                  </p>
                </div>
              )}
              <Link
                href="/#dealer"
                className="mt-8 inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-900"
              >
                Become a dealer
              </Link>
            </div>
          </div>

          {product.spec && (
            <div className="mt-14">
              <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
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
