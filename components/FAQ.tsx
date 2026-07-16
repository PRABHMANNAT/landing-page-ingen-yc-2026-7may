"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudience } from "./AudienceContext";

const recruiterFaqs = [
  {
    q: "Who can use iNGen?",
    a: "iNGen is built for recruiters, founders, and hiring leads at startups between Idea and Series A — anyone hunting hard-to-find engineering talent on a constrained budget.",
  },
  {
    q: "Can I try iNGen for free?",
    a: "Yes. iNGen offers a free pilot for one active role so you can run Aristotle's intake, Sherlock's proof investigation, and the dashboard end-to-end before committing. No card required to start.",
  },
  {
    q: "Can I use iNGen with my team?",
    a: "Absolutely. iNGen workspaces support multiple seats, shared candidate pools, role-based permissions, and a unified spend dashboard so your hiring manager, recruiter, and engineering lead all stay in sync.",
  },
  {
    q: "How long does it take to set up and start using iNGen?",
    a: "Under five minutes. Connect GitHub, LinkedIn, Google Calendar, and Gmail, drop in a draft JD, and Aristotle generates your brief, LinkedIn post, and Boolean search in a single two-minute conversation.",
  },
  {
    q: "Does iNGen have global candidate data?",
    a: "Yes. Sherlock triangulates GitHub, university records, club affiliations, and verified work history across global sources, with default currency support for AUD, USD, GBP, and EUR on the spend dashboard.",
  },
  {
    q: "Will it integrate with my ATS or CRM?",
    a: "GitHub, LinkedIn, Google Calendar, Gmail, Notion, and Slack are first-class integrations today. ATS connectors for Greenhouse, Lever, and Ashby are on the rolling roadmap — talk to us about your stack.",
  },
];

const studentFaqs = [
  {
    q: "What is FORGE?",
    a: "FORGE is iNGEN’s student platform — an AI-assisted career workspace anchored by two agents: Aristotle (roadmap, proof profile, interview prep) and Columbus (job scout). It turns scattered experience into recruiter-grade proof.",
  },
  {
    q: "How does the roadmap work?",
    a: "Tell Aristotle your target role, expertise level (No experience → Master), and weekly study time. It generates a time-bound visual roadmap — e.g. Data Analyst (360h / 9 months), AI Engineer (520h / 14 months), Frontend Engineer (420h / 12 months) — with per-topic completion tracking.",
  },
  {
    q: "How is Columbus different from LinkedIn or Indeed?",
    a: "Columbus scouts RemoteOK, HN Who’s Hiring, GitHub Jobs Archive, Adzuna, and company career pages, then ranks each role by match %, explains the fit, and stages dossiers with salary bands and an apply path — no doom-scrolling.",
  },
  {
    q: "Is this just another resume builder?",
    a: "No. Your proof profile is verified by Aristotle — skill confidence chips (e.g. React 93%, TypeScript 91%, Python 88%), proof-scored project cards, a role-fit summary with 5 signals, testimonials, and a readiness meter per track.",
  },
  {
    q: "Can I keep different profiles for different jobs?",
    a: "Yes. Collections lets you save tailored profile variants (Backend, IBM SDE, Frontend) alongside job shortlists and roadmap versions, so every application gets the right version of you.",
  },
  {
    q: "What does the readiness score mean?",
    a: "Your “Overall Recruiter Readiness” (e.g. 82%) and per-track meters (Frontend, Backend, AI Product) give you an honest, quantified view of how close you are to interview-ready — preparation as a measurable loop.",
  },
];

const itemVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  open: { opacity: 1, height: "auto", marginTop: 8 },
};

function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <ul className="border-y border-black/15 divide-y divide-black/15">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group w-full text-left py-5 px-5 flex items-start justify-between gap-6 transition-colors hover:bg-black/[0.02]"
            >
              <span className="text-[15px] font-medium text-black leading-snug">
                {f.q}
              </span>
              <span className="relative w-4 h-4 mt-1 shrink-0">
                <span
                  className={`absolute inset-x-0 top-1/2 h-px bg-black transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute inset-y-0 left-1/2 w-px bg-black transition-transform duration-300 ${
                    isOpen ? "-rotate-45" : ""
                  }`}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={itemVariants}
                  transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="text-[14px] leading-relaxed pb-6 px-5 pr-12 max-w-2xl text-black/70"
                  >
                    {f.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function FAQSection({
  items,
  intro,
  ctaLabel,
  heading = "Your questions, answered",
}: {
  items: { q: string; a: string }[];
  intro: string;
  ctaLabel: string;
  heading?: string;
}) {
  return (
    <section className="relative bg-brand-bg">
      {/* outer vertical guide rules — like the screenshot edges */}
      <div className="pointer-events-none absolute inset-y-0 left-3 w-px vertical-rule" />
      <div className="pointer-events-none absolute inset-y-0 right-3 w-px vertical-rule" />

      <div className="mx-auto max-w-[1320px] px-6 py-24 grid lg:grid-cols-2 gap-16">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          {/* inner vertical guide rule on the left card edge */}
          <div className="pointer-events-none absolute -left-6 top-0 bottom-0 w-px vertical-rule hidden lg:block" />

          <div className="label-mono text-black/55 mb-3">[06] FAQ</div>
          <h2 className="font-display text-[44px] md:text-[58px] leading-[1.04] tracking-tightest text-black">
            {heading}
          </h2>
          <p className="mt-5 text-[15px] text-black/65 max-w-md leading-relaxed">
            {intro}
          </p>
          <a href="/signup" className="btn-dark mt-7">{ctaLabel}</a>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          {/* diagonal hatching corners — matches Juicebox FAQ */}
          <div className="absolute -top-8 left-0 right-0 h-7 diag-pattern" />
          <div className="absolute -bottom-8 left-0 right-0 h-7 diag-pattern" />
          {/* tiny vertical ticks on either end of the bands */}
          <div className="absolute -top-8 left-0 h-7 w-px bg-black/15" />
          <div className="absolute -top-8 right-0 h-7 w-px bg-black/15" />
          <div className="absolute -bottom-8 left-0 h-7 w-px bg-black/15" />
          <div className="absolute -bottom-8 right-0 h-7 w-px bg-black/15" />

          <FAQList items={items} />
        </motion.div>
      </div>
    </section>
  );
}

export default function FAQ() {
  const { audience } = useAudience();
  if (audience === "student") {
    return (
      <FAQSection
        items={studentFaqs}
        heading="FORGE questions, answered"
        intro="Everything you need to know about Aristotle, Columbus, and the four-module student workspace."
        ctaLabel="Start free"
      />
    );
  }
  return (
    <FAQSection
      items={recruiterFaqs}
      intro="We're here to help. Reach out to our team for guidance on how to integrate iNGen — Aristotle for workflow, Sherlock for proof — into your hiring stack."
      ctaLabel="Book a Demo"
    />
  );
}
