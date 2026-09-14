import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { Download, TrendingUp, Award } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import StandardsStrip from "@/components/ui/StandardsStrip";
import RelatedProducts from "@/components/products/RelatedProducts";
import ProductCta from "@/components/products/ProductCta";
import DistributorForm from "@/components/sections/DistributorForm";

export const metadata: Metadata = {
  title: "Company Profile | United Gypsum",
  description:
    "United Gypsum's business model, quality policy and standards: design, manufacture and distribution of gypsum boards, ceiling panels, grid and drywall accessories to ISO 9001-2015 and ASTM.",
  alternates: { canonical: "/company-profile/" },
};

const categories = [
  "Gypsum Plaster",
  "Gypsum Board",
  "Gypsum Ceiling Panel",
  "Drywall Accessories",
];

function profilePdfHref() {
  const file = "company-profile.pdf";
  try {
    fs.accessSync(path.join(process.cwd(), "public", "resources", file));
    return `/resources/${file}`;
  } catch {
    return null;
  }
}

export default function CompanyProfilePage() {
  const pdf = profilePdfHref();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Company Profile"
          title="Company Profile"
          subtitle="Our business model, quality policy and the standards every product is held to."
        />

        {/* Business model */}
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <SectionHeading
                  eyebrow="Business model"
                  title="How United Gypsum works"
                />
                <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-grey">
                  <p>
                    United Gypsum has evolved on the basis of an ever-growing
                    portfolio of innovative gypsum products, backed by an
                    unparalleled focus on customer challenges.
                  </p>
                  <p>
                    Our business model is our platform for success. We design,
                    manufacture and distribute a wide range of construction
                    materials, and every product is manufactured in
                    accordance with the international ISO 9001-2015 quality
                    management system and complies with ASTM requirements.
                  </p>
                  <p>
                    As a principle, we employ a well-trained, committed and
                    skilled workforce to keep continuous monitoring and
                    quality control. That strict quality assurance is
                    reflected in products that are safe, durable, economical,
                    aesthetically pleasing, and easy to install or dismantle.
                  </p>
                </div>

                <ul className="mt-8 flex flex-wrap gap-3">
                  {categories.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-warm bg-white px-4 py-2 text-sm font-semibold text-grey"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-1 overflow-hidden rounded-3xl border border-warm shadow-plaster lg:order-2">
                <Image
                  src="/images/ug-factory-poster.jpg"
                  alt="United Gypsum manufacturing facility at Port Qasim, Karachi"
                  width={1024}
                  height={683}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <RelatedProducts
          slugs={["smart-gypsum-board", "smart-ceiling-panel", "smart-grid"]}
          heading="What we make"
        />

        {/* Quality policy */}
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionHeading
              eyebrow="Quality policy"
              title="Continual improvement, everyday reliability"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-warm bg-mist p-7 shadow-plaster">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-red">
                  Improvement
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">
                  United Gypsum operates in a manner of continual improvement by
                  ensuring that our products and services are of the highest
                  achievable quality.
                </p>
              </article>
              <article className="rounded-3xl border border-warm bg-mist p-7 shadow-plaster">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-red">
                  Reliability
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">
                  Our focal point is to provide superior gypsum products that
                  bring decisive, economical and dynamic benefits to our clients
                  every day, maximising the sense of reliability for our company.
                </p>
              </article>
            </div>
          </div>
        </section>

        <StandardsStrip />

        {/* Sustainability */}
        <section className="border-t border-warm bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <SectionHeading
              eyebrow="Sustainability"
              title="Products built to last and to be reused"
              lead="Many United Gypsum products are environment-friendly thanks to their maintainability, recycling capability and technical features that make them resistant to fire, impact, thermal radiation and humidity. Using the best available raw materials on state-of-the-art equipment under strict quality control, we are determined to establish ourselves as leaders of the Pakistani construction industry."
            />
          </div>
        </section>

        {/* Company profile PDF */}
        <section className="border-t border-warm bg-white">
          <div className="mx-auto max-w-[1600px] px-4 py-14 sm:px-8 sm:py-16 lg:px-12">
            {pdf ? (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-2xl border border-warm bg-mist p-5 shadow-plaster transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <Download className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-grey">
                    Company Profile (PDF)
                  </span>
                  <span className="block text-xs text-grey">
                    Full corporate profile
                  </span>
                </span>
              </a>
            ) : (
              <p className="text-sm text-grey">
                A full company profile document is available on request. Contact
                our team for a copy.
              </p>
            )}
          </div>
        </section>

        <ProductCta
          heading="Work with United Gypsum"
          body="Become a stockist, specify our systems on a project, or ask our team a question."
        />

        <DistributorForm />
      </main>
      <Footer />
    </>
  );
}
