import Image from "next/image";
import Link from "next/link";

const awardLogos = [
  { src: "/images/icons-03.png", alt: "Export Brand of the Year Award 2021" },
  { src: "/images/icons-04.png", alt: "StarBrands Award" },
  { src: "/images/icons-05.png", alt: "Go Green, do it for a healthy living" },
  { src: "/images/icons-06.png", alt: "Certified ISO 9001 and ISO 14001" },
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

      <div className="relative mx-auto max-w-[1600px] px-4 pb-16 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
              <span className="h-px w-6 bg-red" aria-hidden="true" />
              The smarter way to build
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-grey sm:text-5xl lg:text-6xl">
              Largest Manufacturer of Gypsum-based Products in Pakistan
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
              We employ a well-trained, committed and skilled workforce to keep
              continuous monitoring and quality control on every batch. Many United
              Gypsum products are environment-friendly by design: recyclable, and
              resistant to fire, impact, thermal radiation and humidity.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
              {awardLogos.map((g) => (
                <Image
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  width={280}
                  height={140}
                  className="h-20 w-auto object-contain"
                />
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-red px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Check our products
              </Link>
              <Link
                href="#distributor"
                className="inline-flex items-center rounded-full border border-warm bg-white px-7 py-3.5 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Become a Distributor
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
      </div>
    </section>
  );
}
