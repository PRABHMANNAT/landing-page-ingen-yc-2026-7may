"use client";

import { motion } from "framer-motion";

type Cycle = "monthly" | "yearly";

export default function PricingHero({
  cycle,
  onCycleChange,
}: {
  cycle: Cycle;
  onCycleChange: (c: Cycle) => void;
}) {
  return (
    <section className="relative pt-20 md:pt-28 pb-14 md:pb-16">
      <FoldedCorner />

      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-brand-tint text-brand-purple label-mono px-3 py-1.5 rounded-md"
        >
          Pricing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 font-display text-[44px] sm:text-[64px] md:text-[80px] leading-[1.02] tracking-tightest text-brand-ink max-w-[1080px] mx-auto"
        >
          Flexible plans for every hiring stage.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-5 text-[17px] md:text-[18px] text-brand-muted max-w-2xl mx-auto"
        >
          From your first proof-first hire to org-wide deployment — Aristotle and Sherlock
          scale with you. Pay per seat, add agents when you need them.
        </motion.p>

        <div className="mt-10 flex justify-center">
          <BillingToggle cycle={cycle} onCycleChange={onCycleChange} />
        </div>
      </div>
    </section>
  );
}

function BillingToggle({
  cycle,
  onCycleChange,
}: {
  cycle: Cycle;
  onCycleChange: (c: Cycle) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      className="relative inline-flex items-center bg-white border border-hairline rounded-full p-1 shadow-sm"
    >
      {(["monthly", "yearly"] as Cycle[]).map((c) => {
        const active = cycle === c;
        return (
          <button
            key={c}
            role="tab"
            aria-selected={active}
            onClick={() => onCycleChange(c)}
            className={`relative label-mono px-5 py-2.5 rounded-full transition-colors duration-300 ${
              active ? "text-white" : "text-brand-ink/65 hover:text-brand-ink"
            }`}
          >
            {active && (
              <motion.span
                aria-hidden
                layoutId="billing-pill"
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="absolute inset-0 rounded-full bg-brand-purple shadow-sm"
              />
            )}
            <span className="relative z-10">
            {c === "monthly" ? (
              "Monthly"
            ) : (
              <span className="inline-flex items-center gap-2">
                Yearly
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active
                      ? "bg-white/20 text-white"
                      : "bg-brand-tint text-brand-purple"
                  }`}
                >
                  15% OFF
                </span>
              </span>
            )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FoldedCorner() {
  return (
    <svg
      aria-hidden
      className="absolute top-4 right-6 md:right-10 w-[68px] h-[68px] text-brand-purple/35"
      viewBox="0 0 80 80"
      fill="none"
    >
      <path
        d="M2 2H58L78 22V78H2V2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M58 2V22H78"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M58 2L78 22"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeDasharray="2 3"
      />
    </svg>
  );
}
