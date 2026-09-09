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
        <section className="border-b border-warm bg-plaster-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <dl className="grid gap-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-extrabold text-brand-800">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-plaster-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Sector nav */}
        <section className="bg-plaster-50">
          <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
            <ul className="flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="inline-block rounded-full border border-warm bg-white px-4 py-1.5 text-xs font-bold text-plaster-700 transition-colors hover:border-brand-300 hover:text-brand-800"
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
            className={`scroll-mt-24 ${i % 2 === 0 ? "bg-plaster-50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
              <h2 className="text-xl font-extrabold tracking-tight text-plaster-800 sm:text-2xl">
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
                    <span className="text-xs font-semibold leading-snug text-plaster-600">
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
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <SectionHeading
              eyebrow="The full list"
              title="Every project, by region"
              lead="A complete list of named projects supplied by United Gypsum and its authorised distributors."
            />
            <div className="mt-8 divide-y divide-warm rounded-3xl border border-warm">
              {regions.map((region) => (
                <details key={region.name} className="group px-5 py-4 sm:px-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-plaster-800">
                    <span>
                      {region.name}{" "}
                      <span className="text-plaster-400">
                        ({region.projects.length})
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-plaster-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-4 columns-1 gap-x-8 text-sm text-plaster-600 sm:columns-2 lg:columns-3">
                    {region.projects.map((p) => (
                      <li key={p} className="mb-2 break-inside-avoid">
                        {p}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <p className="mt-8 text-sm text-plaster-600">
              Exported to {exportMarkets.slice(0, -1).join(", ")} and{" "}
              {exportMarkets[exportMarkets.length - 1]} by authorised
              distributors.
            </p>

            {pdf && (
              <a
                href={pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-warm bg-plaster-50 p-5 shadow-plaster transition-transform hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <Download className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold text-plaster-800">
                    Full project list (PDF)
                  </span>
                  <span className="block text-xs text-plaster-500">
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
      </main>
      <Footer />
    </>
  );
}
