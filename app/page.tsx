import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolMarquee from "@/components/ToolMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import GlobeWaitlist from "@/components/GlobeWaitlist";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ToolMarquee />
      <HowItWorks />
      <GlobeWaitlist />
      <FAQ />
      <Footer />
    </main>
  );
}
