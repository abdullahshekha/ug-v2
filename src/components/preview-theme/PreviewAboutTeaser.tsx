import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "12+", label: "years in gypsum manufacturing" },
  { value: "ISO", label: "9001-2015 & 14001-2015" },
  { value: "ASTM", label: "C472 / C473 / C474 / D3763" },
];

export default function PreviewAboutTeaser() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeading
              eyebrow="A proud past, a bright future"
              title="This is United Gypsum in a nutshell"
              lead="Our team is quick to address technical issues caused by environmental factors, and our top management stays involved in keeping every gypsum product&apos;s working life intact for the long term. Our mission is to solve construction-related challenges with an enduring technological acumen."
            />

            <dl className="mt-8 grid grid-cols-3 gap-5 border-t border-warm pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-red">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-grey">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about-us/"
                className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-grey"
              >
                About United Gypsum
              </Link>
              <Link
                href="/company-profile/"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Company profile
              </Link>
            </div>
          </div>

          <div className="relative -mr-4 overflow-hidden rounded-3xl border border-warm shadow-plaster-lg sm:-mr-8 lg:-mr-12 lg:rounded-l-3xl lg:rounded-r-none">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              preload="none"
              poster="/images/ug-factory-poster.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/videos/ug-factory-tour.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
