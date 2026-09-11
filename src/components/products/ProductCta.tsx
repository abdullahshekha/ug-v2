import Link from "next/link";

interface ProductCtaProps {
  showCalculator?: boolean;
  heading?: string;
  body?: string;
}

export default function ProductCta({
  showCalculator = false,
  heading = "Specifying this product on a project?",
  body = "Talk to our team about quantities, lead times and becoming a stockist.",
}: ProductCtaProps) {
  return (
    <section className="bg-grey">
      <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-white">
          {body}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/#dealer"
            className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
          >
            Become a dealer
          </Link>
          {showCalculator && (
            <Link
              href="/ceiling-calculator/"
              className="inline-flex items-center rounded-full border border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-grey"
            >
              Ceiling calculator
            </Link>
          )}
          <Link
            href="/contact-us/"
            className="inline-flex items-center rounded-full border border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-grey"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
