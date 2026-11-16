import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveDemo from "@/components/sections/LiveDemo";

export const metadata: Metadata = {
  title: "Live product preview — iNGEN",
  description: "Explore the iNGEN recruiting and student workspaces in the interactive product preview.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main><LiveDemo /></main>
      <Footer />
    </>
  );
}
