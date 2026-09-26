interface PullQuoteBandProps {
  eyebrow: string;
  quote: string;
}

export default function PullQuoteBand({ eyebrow, quote }: PullQuoteBandProps) {
  return (
    <section className="bg-grey">
      <div className="mx-auto max-w-[1600px] px-4 py-16 text-center sm:px-8 sm:py-24 lg:px-12">
        <span className="text-[11px] font-extrabold uppercase tracking-eyebrow text-white">
          {eyebrow}
        </span>
        <p className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {quote}
        </p>
      </div>
    </section>
  );
}
