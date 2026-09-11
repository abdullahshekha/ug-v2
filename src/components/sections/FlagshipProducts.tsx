import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const products = [
  {
    name: "Smart Gypsum Board",
    href: "/smart-gypsum-board/",
    image: "/images/flagship-gypsum-board.png",
    blurb:
      "An incombustible gypsum core covered with extra-tough paper on both sides for strength and durability, made in coherence with ASTM C472, C473, C474 and D3763. Standard, Fire, Moisture and Foil-backed variants.",
  },
  {
    name: "Smart Ceiling Panel",
    href: "/smart-ceiling-panel/",
    image: "/images/flagship-ceiling-panel.png",
    blurb:
      "A non-combustible gypsum core bound by tough paper on both sides, available in a wide range of vinyl laminates (plain, embossed and printed), plus a foil-backed option that reflects thermal radiation.",
  },
  {
    name: "Smart Grid",
    href: "/smart-grid/",
    image: "/images/flagship-grid.png",
    blurb:
      "A suspended ceiling T-bar system in galvanized, zinc-coated steel with a thick polyester top coat. Smart Grid 38 for cinemas, auditoriums and warehouses; Smart Grid 32 for shops and small offices.",
  },
];

export default function FlagshipProducts() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Flagship products"
          title="Engineered gypsum systems"
          lead="Three core systems, backed by decades of gypsum know-how and international standards."
        />

        <div className="mt-14 space-y-16">
          {products.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={p.name}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i > 0 ? "border-t border-warm pt-16" : ""
                }`}
              >
                <div className={reversed ? "lg:order-2" : ""}>
                  <h3 className="text-2xl font-extrabold tracking-tight text-red sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-grey">
                    {p.blurb}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-grey transition-colors hover:text-red"
                  >
                    View product
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div
                  className={`relative mx-auto h-96 w-full max-w-xl sm:h-[28rem] ${
                    reversed ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 36rem, 90vw"
                    className="object-contain"
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
