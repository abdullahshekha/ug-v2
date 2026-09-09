import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import CeilingCalculator from "@/components/sections/CeilingCalculator";

export const metadata: Metadata = {
  title: "Ceiling Material Calculator | United Gypsum",
  description:
    "Estimate boards or ceiling panels, screws, filler, tape and suspended-grid components for a room from its dimensions.",
  alternates: { canonical: "/ceiling-calculator/" },
};

export default function CeilingCalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Ceiling Calculator"
          title="Ceiling material calculator"
          subtitle="Enter a room's dimensions to get a first-pass bill of materials for a gypsum board ceiling or a suspended ceiling-panel grid."
        />

        <CeilingCalculator variant="full" />

        <section className="bg-plaster-50">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-plaster-800">
              How the estimate works
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-plaster-600">
              <p>
                The calculator derives ceiling area and perimeter from your room
                length and width, then applies standard coverage rates: a{" "}
                <strong>4 ft &times; 8 ft</strong> gypsum board covers 32 sq ft, and
                a <strong>595 &times; 595 mm</strong> ceiling panel covers about 4 sq
                ft. Screws, filler bags and tape rolls are estimated from the number
                of units and the taped joint length, and your wastage allowance is
                added before every quantity is rounded up.
              </p>
              <p>
                For the suspended <strong>Ceiling Panel</strong> system it also
                estimates main runners, cross tees and perimeter wall angle on a
                2&nbsp;ft &times; 2&nbsp;ft module, plus any access panels you ask
                for.
              </p>
              <p>
                These are planning figures based on industry-standard rates. Final
                quantities are reconciled against the UG Application Booklet, so
                talk to our team before placing an order.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-brand-800 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Explore the products
              </Link>
              <Link
                href="/#dealer"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-plaster-800 transition-colors hover:border-brand-300 hover:text-brand-800"
              >
                Become a dealer
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
