import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import DealerForm from "@/components/sections/DealerForm";
import ShadeCardFlipbook from "@/components/shade-card/ShadeCardFlipbook";

export const metadata: Metadata = {
  title: "Smart Ceiling Panel Shade Card | United Gypsum",
  description:
    "Browse every Smart Ceiling Panel vinyl laminate finish from the United Gypsum shade card, page by page.",
  alternates: { canonical: "/smart-ceiling-panel/shade-card/" },
};

function countShadeCardPages() {
  const dir = path.join(process.cwd(), "public", "images", "shade-card");
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".jpg")).length;
  } catch {
    return 0;
  }
}

export default function ShadeCardPage() {
  const pageCount = countShadeCardPages();

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Shade Card"
          title="Smart Ceiling Panel shade card"
          subtitle="Every vinyl laminate finish in the Smart Ceiling Panel range. Turn the page to browse, or use the arrows on desktop."
        />

        <section className="bg-mist">
          <div className="px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            {pageCount > 0 ? (
              <ShadeCardFlipbook pageCount={pageCount} />
            ) : (
              <p className="mx-auto max-w-md text-center text-sm text-grey">
                The shade card is being prepared and will appear here shortly.
              </p>
            )}
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
