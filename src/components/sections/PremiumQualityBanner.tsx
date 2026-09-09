import Link from "next/link";

export default function PremiumQualityBanner() {
  return (
    <section className="bg-plaster-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl">
          <span className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-eyebrow text-brand-300">
            <span className="h-px w-6 bg-brand-300/60" aria-hidden="true" />
            Decisive, economical and dynamic benefits every day
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Premium quality gypsum manufacturing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-plaster-300">
            Every product is manufactured in accordance with the ISO 9001-2015
            quality management standard and complies with ASTM requirements &mdash;
            C472, C473, C474 and D3763 &mdash; using best-quality raw materials and
            state-of-the-art equipment under strict quality control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/company-profile/"
              className="inline-flex items-center rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              View company profile
            </Link>
            <Link
              href="#dealer"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/70"
            >
              Become a dealer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
