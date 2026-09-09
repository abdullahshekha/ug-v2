import Link from "next/link";

export default function ProductCta({
  showCalculator = false,
}: {
  showCalculator?: boolean;
}) {
  return (
    <section className="bg-plaster-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          Specifying this product on a project?
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-plaster-300">
          Talk to our team about quantities, lead times and becoming a stockist.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/#dealer"
            className="inline-flex items-center rounded-full bg-brand-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            Become a dealer
          </Link>
          {showCalculator && (
            <Link
              href="/ceiling-calculator/"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/70"
            >
              Ceiling calculator
            </Link>
          )}
          <Link
            href="/contact-us/"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white/70"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
