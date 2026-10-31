import type { Metadata } from "next";
import Link from "next/link";
import { LayoutPanelTop, Grid3x3 } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import DistributorForm from "@/components/sections/DistributorForm";

export const metadata: Metadata = {
  title: "Ceiling/Partitions Material Calculator | United Gypsum",
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
          title="Ceiling/Partitions Material Calculator"
          subtitle="Enter a room's dimensions to get a first-pass bill of materials for a gypsum board ceiling or a suspended ceiling-panel grid."
        />

        <CeilingCalculator variant="full" />

        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
            <SectionHeading
              eyebrow="How it works"
              title="Three systems, three sets of quantities"
              lead="The calculator derives ceiling area and perimeter from your room length and width and applies United Gypsum coverage and packing figures, rounding every quantity up to whole boards, panels, pieces and boxes."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article className="rounded-3xl border border-warm bg-white p-7 shadow-plaster">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <LayoutPanelTop className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-red">
                  Gypsum Board
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">
                  A <strong>4 ft &times; 8 ft</strong> board covers 32 sq ft.
                  Each board takes 32 screws (500 per box) and 24 ft of tape
                  (90 m per roll); filler comes in 5 kg and 25 kg buckets, a
                  5 kg bucket covering 100 sq ft. Pick a room type in
                  the calculator to get the right board variant: Standard,
                  Moisture, Fire or Heat Resistant.
                </p>
              </article>
              <article className="rounded-3xl border border-warm bg-white p-7 shadow-plaster">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red text-white">
                  <Grid3x3 className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-red">
                  Ceiling Panel
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-grey">
                  A <strong>603 &times; 603 mm</strong> panel sits in a suspended
                  grid, estimated piece by piece: short tees, cross tees and
                  main runners on a 2 ft &times; 2 ft module, plus perimeter
                  wall angle.
                </p>
              </article>
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-grey">
              These are planning figures based on industry-standard rates.
              Final quantities are reconciled against the United Gypsum
              Application Booklet, so confirm with your applicator before
              placing order with our registered Distributors.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/smart-gypsum-board/"
                className="inline-flex items-center rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-grey"
              >
                Explore the products
              </Link>
              <Link
                href="/#distributor"
                className="inline-flex items-center rounded-full border border-warm bg-white px-6 py-3 text-sm font-bold text-grey transition-colors hover:border-red hover:text-red"
              >
                Become a Distributor
              </Link>
            </div>
          </div>
        </section>

        <DistributorForm />
      </main>
      <Footer />
    </>
  );
}
