import Image from "next/image";
import Link from "next/link";

const heroGraphics = [
  { src: "/images/icons-03.png", alt: "Fire-resistant gypsum systems" },
  { src: "/images/icons-04.png", alt: "Moisture-resistant gypsum systems" },
  { src: "/images/icons-05.png", alt: "Acoustic and thermal performance" },
  { src: "/images/icons-06.png", alt: "Impact-resistant partitions" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mist via-mist to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-mist via-transparent to-transparent" />
      </div>

      <div className="relative px-4 pb-16 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
              <span className="h-px w-6 bg-red" aria-hidden="true" />
              The smarter way to build
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-grey sm:text-5xl lg:text-6xl">
              Making groundbreaking products with quality, loyalty &amp;
              innovation
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
              We employ a well-trained, committed and skilled workforce to keep
              continuous monitoring and quality control on every batch. Many United
              Gypsum products are environment-friendly by design: recyclable, and
              resistant to fire, impact, thermal radiation and humidity.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Check our products
              </Link>
              <Link
                href="#dealer"
                className="inline-flex items-center rounded-full border border-warm bg-white px-7 py-3.5 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Become a dealer
              </Link>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/hero-mix-products.png"
              alt="The United Gypsum product family: boards, ceiling panels, grid and accessories"
              width={2400}
              height={800}
              className="h-auto w-full max-w-none scale-110 object-contain sm:scale-125 lg:scale-[1.35]"
              priority
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-warm pt-10 sm:grid-cols-4">
          {heroGraphics.map((g) => (
            <div
              key={g.src}
              className="flex items-center justify-center rounded-2xl bg-white p-5 shadow-plaster"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={140}
                height={140}
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
