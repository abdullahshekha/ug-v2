import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StandardsStrip from "@/components/ui/StandardsStrip";
import Pillars from "@/components/sections/Pillars";
import ProductCta from "@/components/products/ProductCta";
import DealerForm from "@/components/sections/DealerForm";

export const metadata: Metadata = {
  title: "About Us | United Gypsum",
  description:
    "United Gypsum has manufactured premium gypsum products in Pakistan since 2014. Our story, our leadership, and the mission and values behind the company.",
  alternates: { canonical: "/about-us/" },
};

const stats = [
  { value: "Since 2014", label: "manufacturing gypsum in Pakistan" },
  { value: "ISO 9001 & 14001", label: "quality and environmental management" },
  { value: "ASTM compliant", label: "C472 / C473 / C474 / D3763" },
];

const leadership = [
  "After spending the past 12 years within the gypsum industry, I feel privileged to write this message, having witnessed a great deal of change.",
  "Our company's core mission is to solve construction-related challenges with an enduring technological acumen. This principle has been evident since we laid the base to build a premium quality gypsum manufacturing company.",
  "The values we share are embodied in what goes on at United Gypsum from day to day. Team members are expected to act ethically and put clients first, and United Gypsum offers a safe, healthy workplace for all employees. In that environment, sound decision making and dedication flow naturally from the give-and-take of daily business.",
  "Looking ahead, we are focused on accelerating our growth strategy while continuing to build on the strength of the United Gypsum brand, helping our clients by sharing knowledge and creating innovation.",
];

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="About Us"
          title="A proud past and a bright future"
          subtitle="United Gypsum designs, manufactures and distributes gypsum-based construction materials from Port Qasim, Karachi."
        />

        {/* Our story */}
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-warm shadow-plaster">
                <Image
                  src="/images/ug-factory-poster.jpg"
                  alt="United Gypsum manufacturing facility at Port Qasim, Karachi"
                  width={1024}
                  height={683}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div>
                <SectionHeading
                  eyebrow="Our story"
                  title="This is United Gypsum in a nutshell"
                />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-grey">
                  <p>
                    Our team is quick to address technical issues caused by
                    environmental factors, and our top management stays closely
                    involved in keeping every gypsum product&apos;s working life
                    intact for the long term.
                  </p>
                  <p>
                    The mission has been the same since we laid the base for a
                    premium quality gypsum manufacturing company: to solve
                    construction-related challenges with an enduring technological
                    acumen.
                  </p>
                </div>

                <dl className="mt-8 grid gap-5 border-t border-warm pt-8 sm:grid-cols-3">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-lg font-extrabold text-red">
                        {s.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-grey">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership message */}
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionHeading
              eyebrow="From the leadership"
              title="A message from our leadership"
            />
            <div className="mt-8 border-l-2 border-red pl-6 sm:pl-8">
              <div className="max-w-prose space-y-4 text-base leading-relaxed text-grey">
                {leadership.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
              <p className="mt-6 text-sm font-bold text-grey">
                United Gypsum leadership
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="border-t border-warm bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-warm bg-white p-7 shadow-plaster">
                <h2 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
                  Mission
                </h2>
                <p className="mt-3 text-lg font-semibold leading-snug text-grey">
                  To solve construction-related challenges with an enduring
                  technological acumen.
                </p>
              </article>
              <article className="rounded-3xl border border-warm bg-white p-7 shadow-plaster">
                <h2 className="text-[11px] font-extrabold uppercase tracking-eyebrow text-red">
                  Vision
                </h2>
                <p className="mt-3 text-lg font-semibold leading-snug text-grey">
                  To become the largest manufacturer of gypsum products and
                  related accessories in the South Asia region, leveraging our
                  position as a cost-effective producer and a provider of
                  client-centric solutions.
                </p>
              </article>
            </div>
          </div>
        </section>

        <Pillars />
        <StandardsStrip />

        <ProductCta
          heading="Work with United Gypsum"
          body="Become a stockist, specify our systems on a project, or ask our team a question."
        />

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
