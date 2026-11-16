"use client";

import { useState } from "react";
import PricingHero from "./PricingHero";
import PricingCards from "./PricingCards";
import AgentsAddOn from "./AgentsAddOn";
import TrustBar from "./TrustBar";
import CompareTable from "./CompareTable";
import PricingFAQ from "./PricingFAQ";

export default function PricingShell() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  return (
    <>
      <PricingHero cycle={cycle} onCycleChange={setCycle} />
      <PricingCards cycle={cycle} />
      <DiagonalBand />
      <AgentsAddOn />
      <TrustBar />
      <CompareTable />
      <PricingFAQ />
    </>
  );
}

function DiagonalBand() {
  return (
    <div
      aria-hidden
      className="h-8 md:h-10 diag-pattern border-y border-hairline"
    />
  );
}
