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
    <section className="relative overflow-hidden bg-plaster-50">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.jpg"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plaster-50 via-plaster-50/90 to-plaster-50/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-plaster-50 via-transparent to-plaster-50/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 sm:pt-44 lg:px-8 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-800">
              <span className="h-px w-6 bg-brand-800/50" aria-hidden="true" />
              The smarter way to build
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-plaster-800 sm:text-5xl lg:text-6xl">
              Making groundbreaking products with quality, loyalty &amp;
              innovation
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-plaster-600">
              We employ a well-trained, committed and skilled workforce to keep
              continuous monitoring and quality control on every batch. Many United
              Gypsum products are environment-friendly by design: recyclable, and
              resistant to fire, impact, thermal radiation and humidity.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-brand-800 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-900"
              >
                Check our products
              </Link>
              <Link
                href="#dealer"
                className="inline-flex items-center rounded-full border border-warm bg-white px-7 py-3.5 text-sm font-bold text-plaster-800 transition-colors hover:border-brand-300 hover:text-brand-800"
              >
                Become a dealer
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-white/50 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-warm bg-white p-6 shadow-plaster-lg">
              <Image
                src="/images/Smart-Products-02-1024x336.png"
                alt="The United Gypsum product family: boards, ceiling panels, grid and accessories"
                width={1024}
                height={336}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 border-t border-warm pt-10 sm:grid-cols-4">
          {heroGraphics.map((g) => (
            <div
              key={g.src}
              className="flex items-center justify-center rounded-2xl bg-white/70 p-5 shadow-plaster"
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
