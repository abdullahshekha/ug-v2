import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import ClientLogoMarquee from "@/components/sections/ClientLogoMarquee";
import Pillars from "@/components/sections/Pillars";
import AboutTeaser from "@/components/sections/AboutTeaser";
import FlagshipProducts from "@/components/sections/FlagshipProducts";
import Accessories from "@/components/sections/Accessories";
import CeilingCalculator from "@/components/sections/CeilingCalculator";
import ResourceDownloads from "@/components/sections/ResourceDownloads";
import Certificates from "@/components/sections/Certificates";
import LatestBlogs from "@/components/sections/LatestBlogs";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Events from "@/components/sections/Events";
import PremiumQualityBanner from "@/components/sections/PremiumQualityBanner";
import DealerForm from "@/components/sections/DealerForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientLogoMarquee />
        <Pillars />
        <AboutTeaser />
        <FlagshipProducts />
        <Accessories />
        <CeilingCalculator />
        <ResourceDownloads />
        <Certificates />
        <LatestBlogs />
        <FeaturedProjects />
        <Events />
        <PremiumQualityBanner />
        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
