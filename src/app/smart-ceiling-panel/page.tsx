import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import DealerForm from "@/components/sections/DealerForm";
import FlagshipProductPage from "@/components/products/FlagshipProductPage";
import { getProduct } from "@/lib/products";

const product = getProduct("smart-ceiling-panel")!;

export const metadata: Metadata = {
  title: `${product.name} | United Gypsum`,
  description: product.metaDescription,
  alternates: { canonical: `/${product.slug}/` },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <FlagshipProductPage product={product} />
        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
