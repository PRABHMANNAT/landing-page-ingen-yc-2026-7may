"use client";
import { useState } from "react";
import Link from "next/link";
import { useAudience } from "../AudienceContext";
import PricingCards from "./PricingCards";
import CompareTable from "./CompareTable";
import FAQ from "../FAQ";
export default function PricingShell() {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const { audience } = useAudience();
  return <>
    <section className="editorial-hero"><p className="eyebrow">Plans and pricing</p><h1>Room to get started.<br />Space to grow.</h1><p className="hero-description">{audience === "student" ? "Start with the student waitlist. We’ll share access and plan details before you commit." : "Choose the plan that fits your hiring team. Join the waitlist to discuss access and availability."}</p></section>
    {audience === "student" ? <section className="editorial-section !pt-0"><article className="max-w-xl mx-auto rounded-2xl border border-[#d4d1c7] p-8 bg-white"><p className="eyebrow mb-4">For students</p><h2>Build your next step.</h2><p className="mt-5">Roadmaps, proof profiles, job discovery, and interview preparation in one student workspace.</p><ul className="my-6 space-y-3 text-sm"><li>✓ Plan learning around a target role</li><li>✓ Organise projects and work samples</li><li>✓ Keep saved opportunities together</li></ul><Link className="btn-dark w-full" href="/signup">Join the student waitlist</Link><p className="mt-4 text-xs text-[#656259]">No payment is required to join the waitlist.</p></article></section> : <>
    <div className="flex justify-center gap-2 mb-9" aria-label="Billing period">{(["monthly","yearly"] as const).map(value => <button key={value} aria-pressed={cycle === value} onClick={() => setCycle(value)} className={"rounded-full px-5 py-2 text-sm border border-[#d4d1c7] " + (cycle === value ? "bg-[#292824] text-white" : "")}>{value === "monthly" ? "Monthly" : "Yearly"}</button>)}</div><PricingCards cycle={cycle} /><div className="editorial-section"><h2 className="mb-4">Compare the details.</h2><p className="text-[#656259]">Published plan details are subject to availability. Confirm pricing and terms before purchase.</p></div><CompareTable /></>}
    <FAQ />
  </>;
}
