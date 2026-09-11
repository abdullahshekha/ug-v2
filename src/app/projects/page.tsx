import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDown, Download } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCta from "@/components/products/ProductCta";
import DealerForm from "@/components/sections/DealerForm";
import {
  sectors,
  regions,
  projectCount,
  exportMarkets,
} from "@/lib/projects";

export const metadata: Metadata = {
  title: "Project Portfolio | United Gypsum",
  description: `United Gypsum systems are specified on more than ${projectCount} projects across Pakistan, from motorways, dams and high courts to hospitals, malls and residential towers, plus export markets.`,
  alternates: { canonical: "/projects/" },
};

function listPdfHref() {
  try {
    fs.accessSync(
      path.join(process.cwd(), "public", "resources", "projects-list.pdf"),
    );
    return "/resources/projects-list.pdf";
  } catch {
    return null;
  }
}

const stats = [
  { value: `${projectCount}+`, label: "named projects" },
  { value: `${sectors.length}`, label: "sectors served" },
  { value: "Nationwide", label: "plus export markets" },
];

export default function ProjectsPage() {
  const pdf = listPdfHref();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Projects"
          title="Project portfolio"
          subtitle="United Gypsum systems are specified across Pakistan's public and private sectors, from motorways, dams and high courts to hospitals, malls and residential towers."
        />

        {/* Stats */}
        <section className="border-b border-warm bg-mist">
          <div className="px-4 py-12 sm:px-8 lg:px-12">
            <dl className="grid gap-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-extrabold text-red">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-grey">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Sector nav */}
        <section className="bg-mist">
          <div className="px-4 pt-14 sm:px-8 lg:px-12">
            <ul className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-block rounded-full border border-warm bg-white px-4 py-1.5 text-xs font-bold text-grey transition-colors hover:border-red hover:text-red"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sector logo walls */}
        {sectors.map((sector, i) => (
          <section
            key={sector.slug}
            id={sector.slug}
            className={`scroll-mt-24 ${i % 2 === 0 ? "bg-mist" : "bg-white"}`}
          >
            <div className="px-4 py-14 sm:px-8 sm:py-16 lg:px-12">
              <h2 className="text-xl font-extrabold tracking-tight text-grey sm:text-2xl">
                {sector.name}
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {sector.logos.map((l) => (
                  <li
                    key={l.logo}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-warm bg-white p-4 text-center shadow-plaster"
                  >
                    <span className="flex h-20 w-full items-center justify-center">
                      <Image
                        src={l.logo}
                        alt={l.name}
                        width={200}
                        height={100}
                        className="max-h-full w-auto object-contain grayscale transition hover:grayscale-0"
                      />
                    </span>
                    <span className="text-xs font-semibold leading-snug text-grey">
                      {l.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        {/* Full list by region */}
        <section className="border-t border-warm bg-white">
          <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <SectionHeading
              eyebrow="The full list"
              title="Every project, by region"
              lead="A complete list of named projects supplied by United Gypsum and its authorised distributors."
            />
            <div className="mt-8 divide-y divide-warm rounded-3xl border border-warm">
              {regions.map((region) => (
                <details key={region.name} className="group px-5 py-4 sm:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-grey">
                    <span>
                      {region.name}{" "}
                      <span className="text-grey">
                        ({region.projects.length})
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-grey transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-4 columns-1 gap-x-8 text-sm text-grey sm:columns-2 lg:columns-3">
                    {region.projects.map((p) => (
                      <li key={p} className="mb-2 break-inside-avoid">
                        {p}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <p className="mt-8 text-sm text-grey">
              Exported to {exportMarkets.slice(0, -1).join(", ")} and{" "}
              {exportMarkets[exportMarkets.length - 1]} by authorised
              distributors.
            </p>

            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-warm bg-mist p-5 shadow-plaster transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <Download className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-grey">
                    Full project list (PDF)
                  </span>
                  <span className="block text-xs text-grey">
                    All regions, one document
                  </span>
                </span>
              </a>
            )}
          </div>
        </section>

        <ProductCta
          heading="Building something we should be part of?"
          body="Talk to our team about specifying United Gypsum systems on your project."
        />

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
