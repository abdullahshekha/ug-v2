import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "2014", label: "Manufacturing since" },
  { value: "8", label: "Flagship products" },
  { value: "114+", label: "Clients served" },
];

export default function PreviewHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-y-0 right-0 w-[60%] bg-grey [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 pb-20 pt-36 sm:px-8 sm:pt-44 lg:px-12 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
              <span className="h-px w-6 bg-red" aria-hidden="true" />
              The smarter way to build
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-grey sm:text-5xl lg:text-7xl">
              Largest Manufacturer of Gypsum-based Products in Pakistan
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-grey">
              We employ a well-trained, committed and skilled workforce to
              keep continuous monitoring and quality control on every batch.
              Many United Gypsum products are environment-friendly by design:
              recyclable, and resistant to fire, impact, thermal radiation and
              humidity.
            </p>

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

          <div className="relative z-10">
            <Image
              src="/images/hero-mix-products.png"
              alt="The United Gypsum product family: boards, ceiling panels, grid and accessories"
              width={2400}
              height={800}
              className="h-auto w-full max-w-none object-contain [filter:drop-shadow(0_22px_30px_rgba(65,65,65,0.14))]"
              priority
            />
          </div>
        </div>

        <dl className="relative z-10 mt-16 grid grid-cols-3 gap-6 border-t border-warm pt-10 lg:max-w-2xl">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-4xl font-extrabold tracking-tight text-red sm:text-5xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-xs font-bold uppercase tracking-wide text-grey">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
