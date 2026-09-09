import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import AccessoryProductPage from "@/components/products/AccessoryProductPage";
import { getProduct } from "@/lib/products";

const product = getProduct("smart-tape")!;

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
        <AccessoryProductPage product={product} />
      </main>
      <Footer />
    </>
  );
}
