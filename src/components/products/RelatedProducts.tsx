import Image from "next/image";
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
    <section className="border-t border-warm bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <h2 className="text-2xl font-extrabold tracking-tight text-grey">
          {heading}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p.slug}
              href={`/${p.slug}/`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-warm bg-white shadow-plaster transition-transform hover:-translate-y-1"
            >
              {p.image && (
                <div className="flex h-44 items-center justify-center bg-white p-5">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={400}
                    height={260}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <span className="text-sm font-extrabold text-red">
                  {p.name}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-grey">
                  {p.tagline}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-grey group-hover:text-red">
                  View product
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
