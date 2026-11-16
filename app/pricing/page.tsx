import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingShell from "@/components/pricing/PricingShell";

export const metadata: Metadata = {
  title: "Pricing — iNGEN",
  description:
    "Flexible plans for every hiring stage. Aristotle and Sherlock scale with you — pay per seat, add agents when you need them.",
};

export default function PricingPage() {
  return (
    <main>
      <AnnouncementBar />
      <Navbar />
      <PricingShell />
      <Footer />
    </main>
  );
}
