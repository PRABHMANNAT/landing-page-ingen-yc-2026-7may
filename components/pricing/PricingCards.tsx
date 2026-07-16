"use client";

import { motion, AnimatePresence } from "framer-motion";

type Cycle = "monthly" | "yearly";

const PLANS = [
  {
    name: "Explorer",
    description: "Try Aristotle on a single role with one teammate.",
    monthly: 0,
    yearly: 0,
    period: "free forever",
    cta: "Start free",
    ctaHref: "/signup",
    features: [
      "1 active role",
      "25 candidate searches / month",
      "Aristotle role-brief drafts",
      "Manual proof verification",
      "Single workspace",
    ],
  },
  {
    name: "Starter",
    description: "For solo recruiters running multiple proof-first roles.",
    monthly: 49,
    yearly: 41,
    period: "per seat / month",
    cta: "Get started",
    ctaHref: "/signup",
    features: [
      "5 active roles per seat",
      "1,000 searches / seat / month",
      "Sherlock proof-triangulation (basic)",
      "GitHub + work-history signals",
      "ATS exports (CSV / Greenhouse)",
      "Email outreach sequencing",
    ],
  },
  {
    name: "Growth",
    description: "Built for hiring teams shipping Idea → Series A.",
    monthly: 99,
    yearly: 84,
    period: "per seat / month",
    cta: "Get started",
    ctaHref: "/signup",
    popular: true,
    features: [
      "Unlimited roles per seat",
      "Unlimited Aristotle searches",
      "Sherlock advanced proofs (uni + club + GitHub depth)",
      "Shared workspaces & collaboration",
      "ATS + CRM bi-directional sync",
      "Smart outreach with reply detection",
      "Slack + Linear integrations",
    ],
  },
  {
    name: "Business",
    description: "Org-wide deployment with admin controls and SLAs.",
    monthly: null,
    yearly: null,
    period: "tailored to your org",
    cta: "Contact sales",
    ctaHref: "/signup",
    features: [
      "Everything in Growth",
      "SAML SSO + SCIM provisioning",
      "Custom proof-scoring policies",
      "Dedicated Sherlock cluster",
      "SOC 2 evidence packet",
      "Named CSM + 99.9% SLA",
    ],
  },
] as const;

export default function PricingCards({ cycle }: { cycle: Cycle }) {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="rounded-2xl border border-hairline bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(107,47,142,0.18)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-hairline">
            {PLANS.map((p) => (
              <PlanColumn key={p.name} plan={p} cycle={cycle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanColumn({
  plan,
  cycle,
}: {
  plan: (typeof PLANS)[number];
  cycle: Cycle;
}) {
  const popular = (plan as { popular?: boolean }).popular;
  const price = cycle === "monthly" ? plan.monthly : plan.yearly;
  const isCustom = price === null;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`relative p-7 md:p-8 ${
        popular ? "bg-brand-tint/40" : "bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[26px] md:text-[28px] tracking-tight text-brand-ink">
          {plan.name}
        </h3>
        {popular && (
          <span className="label-mono bg-brand-purple text-white px-2.5 py-1 rounded-md">
            Popular
          </span>
        )}
      </div>

      <p className="mt-2 text-[14px] text-brand-muted min-h-[42px]">
        {plan.description}
      </p>

      <div className="mt-5 min-h-[60px]">
        {isCustom ? (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[34px] text-brand-ink">Custom</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`${plan.name}-${cycle}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="font-display text-[34px] text-brand-ink"
              >
                ${price}
              </motion.span>
            </AnimatePresence>
            <span className="text-[13px] text-brand-mute">{plan.period}</span>
          </div>
        )}
        <p className="mt-1 text-[12px] text-brand-mute">
          {isCustom ? plan.period : `Billed ${cycle === "monthly" ? "monthly" : "annually"}`}
        </p>
      </div>

      <a
        href={plan.ctaHref}
        className="mt-5 btn-dark w-full justify-center"
      >
        {plan.cta}
      </a>

      <div className="mt-6 h-px dotted-divider" />

      <ul className="mt-5 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-brand-ink/85">
            <CheckMark />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CheckMark() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className="mt-[3px] shrink-0 text-brand-magenta"
      fill="none"
    >
      <path
        d="M3 8.5L6.5 12L13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
