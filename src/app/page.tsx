import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
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
import DealerForm from "@/components/sections/DealerForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientLogoMarquee />
        <AboutTeaser />
        <Pillars />
        <FlagshipProducts />
        <Accessories />
        <CeilingCalculator />
        <InTheirWords />
        <LandmarkProjects />
        <Certificates />
        <ResourceDownloads />
        <Events />
        <LatestBlogs />
        <PremiumQualityBanner />
        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
