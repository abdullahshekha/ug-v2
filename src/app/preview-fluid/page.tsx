import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import RoomBuildIntro from "@/components/preview-fluid/RoomBuildIntro";
import Reveal from "@/components/preview-fluid/Reveal";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import AboutTeaser from "@/components/sections/AboutTeaser";
import Pillars from "@/components/sections/Pillars";
import FlagshipProducts from "@/components/sections/FlagshipProducts";
import Accessories from "@/components/sections/Accessories";
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
  title: "Homepage preview: Fluid room build | United Gypsum",
  robots: { index: false, follow: false },
};

export default function PreviewFluidPage() {
  return (
    <>
      <Navbar />
      <main>
        <RoomBuildIntro />
        <Reveal>
          <ClientLogoMarquee />
        </Reveal>
        <Reveal>
          <AboutTeaser />
        </Reveal>
        <Reveal>
          <Pillars />
        </Reveal>
        <Reveal>
          <FlagshipProducts />
        </Reveal>
        <Reveal>
          <Accessories />
        </Reveal>
        <Reveal>
          <CeilingCalculator />
        </Reveal>
        <Reveal>
          <InTheirWords />
        </Reveal>
        <Reveal>
          <LandmarkProjects />
        </Reveal>
        <Reveal>
          <Certificates />
        </Reveal>
        <Reveal>
          <ResourceDownloads />
        </Reveal>
        <Reveal>
          <Events />
        </Reveal>
        <Reveal>
          <LatestBlogs />
        </Reveal>
        <Reveal>
          <PremiumQualityBanner />
        </Reveal>
        <Reveal>
          <DistributorForm />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
