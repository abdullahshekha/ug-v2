import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/ui/PageHero";
import DealerForm from "@/components/sections/DealerForm";
import BlogsList from "./BlogsList";
import { blogs, blogCategories } from "./data";

export const metadata: Metadata = {
  title: "Blog | United Gypsum",
  description:
    "Guides and articles on gypsum board, ceiling systems, drywall accessories and finishing from United Gypsum.",
  alternates: { canonical: "/blogs/" },
};

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          breadcrumb="Blog"
          title="From the journal"
          subtitle="Practical guides on gypsum board, ceiling systems, drywall accessories and finishing."
        />
        <section className="bg-mist">
          <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
            <BlogsList blogs={blogs} categories={blogCategories} />
          </div>
        </section>

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
