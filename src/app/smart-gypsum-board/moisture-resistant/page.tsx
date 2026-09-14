import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import DistributorForm from "@/components/sections/DistributorForm";
import BoardVariantPage from "@/components/products/BoardVariantPage";
import { getBoardVariant } from "@/lib/boardVariants";

const variant = getBoardVariant("moisture-resistant")!;

export const metadata: Metadata = {
  title: `Smart ${variant.name} Gypsum Board | United Gypsum`,
  description: variant.metaDescription,
  alternates: { canonical: `/smart-gypsum-board/${variant.slug}/` },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <BoardVariantPage variant={variant} />
        <DistributorForm />
      </main>
      <Footer />
    </>
  );
}
