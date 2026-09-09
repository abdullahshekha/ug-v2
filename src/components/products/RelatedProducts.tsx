import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProduct } from "@/lib/products";

export default function RelatedProducts({
  slugs,
  heading = "Related products",
}: {
  slugs: string[];
  heading?: string;
}) {
  const items = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section className="border-t border-warm bg-plaster-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
          {heading}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}/`}
              className="group flex flex-col rounded-2xl border border-warm bg-white p-5 shadow-plaster transition-transform hover:-translate-y-1"
            >
              <span className="text-sm font-extrabold text-brand-800">
                {p.name}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-plaster-600">
                {p.tagline}
              </span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-plaster-800 group-hover:text-brand-800">
                View product
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
