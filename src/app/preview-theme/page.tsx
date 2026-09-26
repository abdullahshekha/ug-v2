import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PreviewHero from "@/components/preview-theme/PreviewHero";
import PullQuoteBand from "@/components/preview-theme/PullQuoteBand";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import PreviewAboutTeaser from "@/components/preview-theme/PreviewAboutTeaser";
import Pillars from "@/components/sections/Pillars";
import PreviewFlagshipProducts from "@/components/preview-theme/PreviewFlagshipProducts";
import PreviewAccessories from "@/components/preview-theme/PreviewAccessories";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import InTheirWords from "@/components/sections/InTheirWords";
import LandmarkProjects from "@/components/sections/LandmarkProjects";
import Certificates from "@/components/sections/Certificates";
import ResourceDownloads from "@/components/sections/ResourceDownloads";
import Events from "@/components/sections/Events";
import LatestBlogs from "@/components/sections/LatestBlogs";
import PremiumQualityBanner from "@/components/sections/PremiumQualityBanner";
import DistributorForm from "@/components/sections/DistributorForm";

export const metadata = {
  title: "Homepage preview: Editorial Asymmetric | United Gypsum",
  robots: { index: false, follow: false },
};

export default function PreviewThemePage() {
  return (
    <>
      <Navbar />
      <main>
        <PreviewHero />
        <ClientLogoMarquee />
        <PreviewAboutTeaser />
        <Pillars />
        <PullQuoteBand
          eyebrow="Since 2014"
          quote="Pakistan&apos;s largest manufacturer of gypsum-based products, built on quality, loyalty and innovation."
        />
        <PreviewFlagshipProducts />
        <PreviewAccessories />
        <CeilingCalculator />
        <InTheirWords />
        <PullQuoteBand
          eyebrow="In their words"
          quote="Trusted on landmark projects across Pakistan, from five-star hotels to national landmarks."
        />
        <LandmarkProjects />
        <Certificates />
        <ResourceDownloads />
        <Events />
        <LatestBlogs />
        <PremiumQualityBanner />
        <DistributorForm />
      </main>
      <Footer />
    </>
  );
}
