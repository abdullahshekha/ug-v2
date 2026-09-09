import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const products = [
  {
    name: "Smart Gypsum Board",
    href: "/smart-gypsum-board/",
    image: "/images/image-26-800x430-1.jpg",
    blurb:
      "An incombustible gypsum core covered with extra-tough paper on both sides for strength and durability, made in coherence with ASTM C472, C473, C474 and D3763. Standard, Fire, Moisture and Foil-backed variants.",
  },
  {
    name: "Smart Ceiling Panel",
    href: "/smart-ceiling-panel/",
    image: "/images/st5r.jpg",
    blurb:
      "A non-combustible gypsum core bound by tough paper on both sides, available in a wide range of vinyl laminates — plain, embossed and printed — plus a foil-backed option that reflects thermal radiation.",
  },
  {
    name: "Smart Grid",
    href: "/smart-grid/",
    image: "/images/smart-grid-01-e1590745474521.jpg",
    blurb:
      "A suspended ceiling T-bar system in galvanized, zinc-coated steel with a thick polyester top coat. Smart Grid 38 for cinemas, auditoriums and warehouses; Smart Grid 32 for shops and small offices.",
  },
];

export default function FlagshipProducts() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Flagship products"
          title="Engineered gypsum systems"
          lead="Three core systems, backed by decades of gypsum know-how and international standards."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article
              key={p.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-warm bg-plaster-50 shadow-plaster transition-transform hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={430}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-extrabold text-brand-800">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-plaster-600">
                  {p.blurb}
                </p>
                <Link
                  href={p.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-plaster-800 transition-colors hover:text-brand-800"
                >
                  View product
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
