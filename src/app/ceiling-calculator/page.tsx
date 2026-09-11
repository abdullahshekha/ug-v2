import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import DealerForm from "@/components/sections/DealerForm";

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

        <section className="bg-mist">
          <div className="px-4 py-16 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-grey">
              How the estimate works
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-grey">
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
                className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Explore the products
              </Link>
              <Link
                href="/#dealer"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Become a dealer
              </Link>
            </div>
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
