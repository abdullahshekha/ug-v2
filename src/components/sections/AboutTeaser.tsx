import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: "12+", label: "years in gypsum manufacturing" },
  { value: "ISO", label: "9001-2015 & 14001-2015" },
  { value: "ASTM", label: "C472 / C473 / C474 / D3763" },
];

export default function AboutTeaser() {
  return (
    <section className="bg-plaster-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-warm shadow-plaster">
            <Image
              src="/images/hw12-1024x683-1.jpg"
              alt="United Gypsum manufacturing and installation work"
              width={1024}
              height={683}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="A proud past, a bright future"
              title="This is United Gypsum in a nutshell"
              lead="Our team is quick to address technical issues caused by environmental factors, and our top management stays involved in keeping every gypsum product's working life intact for the long term. Our mission is to solve construction-related challenges with an enduring technological acumen."
            />

            <dl className="mt-8 grid grid-cols-3 gap-5 border-t border-warm pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-extrabold text-brand-800">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-plaster-500">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about-us/"
                className="inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                About United Gypsum
              </Link>
              <Link
                href="/company-profile/"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-plaster-800 transition-colors hover:border-brand-300 hover:text-brand-800"
              >
                Company profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
