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
    <section className="relative mx-auto max-w-[1320px] px-5 pt-8 pb-9 sm:px-8 sm:pt-12">


      <div className="relative isolate overflow-hidden rounded-[28px] border border-[#eadbcf] bg-[#f8eee4] px-5 py-12 text-center sm:px-10 sm:py-16 [background-image:radial-gradient(ellipse_at_top,#ffe0c7,transparent_60%),linear-gradient(120deg,#fcf9f4,#f4e8df)]">
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
          className="mt-5 font-display text-[40px] sm:text-[56px] md:text-[70px] leading-[1.02] tracking-tightest text-brand-ink max-w-[850px] mx-auto"
        >
          Flexible plans for every hiring stage.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mt-5 text-[17px] md:text-[18px] text-brand-muted max-w-2xl mx-auto"
        >
          Compare plans for your first role or a growing hiring team. Choose monthly or yearly billing to see the price per seat.
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
      role="group"
      aria-label="Billing cycle"
      className="relative inline-flex items-center bg-white border border-hairline rounded-full p-1 shadow-sm"
    >
      {(["monthly", "yearly"] as Cycle[]).map((c) => {
        const active = cycle === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
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
