"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What's included in the free Explorer plan?",
    a: "Explorer gives one teammate Aristotle role-brief drafts, 25 candidate searches per month, and one active role. It's everything you need to test proof-first hiring on a single position before inviting your team.",
  },
  {
    q: "How does seat-based billing work?",
    a: "Each seat is a person on your team who can run Aristotle searches and review Sherlock proofs. You can add or remove seats at any time — we prorate to the day. Sherlock Agents are billed separately as add-ons and shared across your workspace.",
  },
  {
    q: "What's the difference between Aristotle and Sherlock?",
    a: "Aristotle is the workflow agent — it drafts the role brief, runs the search, and ranks candidates. Sherlock is the proof agent — it triangulates GitHub depth, work history, university affiliations, and club leadership to verify what candidates claim.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly plans cancel at the end of the current billing period. Annual plans can cancel mid-cycle and we refund the unused months. No phone calls, no retention emails.",
  },
  {
    q: "Do you support SOC 2, SSO, and SCIM?",
    a: "SOC 2 evidence is available on request for Growth and bundled into Business. SAML SSO and SCIM provisioning ship with Business. Trust Center documents and AI Audit Center reports are public.",
  },
  {
    q: "Do students get free access?",
    a: "Yes. iNGEN for students (Aristotle roadmaps + Columbus jobs) is free with a verified .edu email. The recruiter pricing on this page applies only to the proof-first hiring stack used by hiring teams.",
  },
];

export default function PricingFAQ() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="label-mono text-brand-purple">[06] FAQ</span>
          <h2 className="mt-3 font-display text-[40px] md:text-[52px] tracking-tight leading-[1.05] text-brand-ink">
            Your questions, answered.
          </h2>
          <p className="mt-5 text-[16px] text-brand-muted max-w-md">
            Still curious? Book 20 minutes with our team — we&rsquo;ll walk Aristotle and
            Sherlock through one of your live roles.
          </p>
          <a href="/signup" className="mt-7 inline-flex btn-dark">
            Book a demo
          </a>
        </div>

        <div className="lg:col-span-7 divide-y divide-hairline border-y border-hairline">
          {FAQS.map((f, i) => (
            <FaqRow key={f.q} faq={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-[18px] md:text-[20px] text-brand-ink group-hover:text-brand-purple transition-colors">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-8 h-8 rounded-full border border-hairline flex items-center justify-center text-brand-ink"
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5V12.5M1.5 7H12.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-[15px] text-brand-muted leading-relaxed max-w-[640px]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
