"use client";

import { motion } from "framer-motion";

const FEATURES = [
  "Sherlock GitHub deep-dive — commits, PRs, project cohesion",
  "University + club proof agent (verified affiliations)",
  "Work-history triangulation across LinkedIn + public sources",
  "Auto-drafted outreach with proof citations inline",
  "Slack handoff — agent posts shortlists to your hiring channel",
  "Scoped permissions per agent + audit log",
];

export default function AgentsAddOn() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-hairline bg-white">
          <PromoPanel />
          <DetailPanel />
        </div>
      </div>
    </section>
  );
}

function PromoPanel() {
  return (
    <div className="relative bg-gradient-to-br from-[#3D1A5B] via-[#4A1D6E] to-[#6B2BB8] p-10 md:p-14 min-h-[440px] overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-halftone bg-[length:18px_18px]" aria-hidden />
      <div className="absolute inset-0 diag-pattern opacity-25" aria-hidden />

      <span className="relative z-10 inline-block label-mono bg-white/15 text-white px-2.5 py-1 rounded-md">
        Agent Mesh
      </span>

      <p className="relative z-10 mt-3 text-white/75 text-[14px] max-w-sm">
        Drop autonomous Sherlock agents into any role. They prove, score, and hand off
        directly to your team.
      </p>

      <div className="relative z-10 mt-6 h-[280px] md:h-[300px]">
        <FloatingCard
          delay={0}
          className="absolute top-2 left-0 w-[220px] rotate-[-4deg]"
          title="Project manager agent"
          subtitle="Tracking 4 open roles · 12 candidates flagged"
          tint="bg-white"
        />
        <FloatingCard
          delay={0.15}
          className="absolute top-14 left-[120px] md:left-[160px] w-[230px] rotate-[3deg]"
          title="Data analyst agent"
          subtitle="Verifying SQL projects on GitHub"
          tint="bg-white"
        />
        <FloatingCard
          delay={0.3}
          className="absolute top-[140px] left-3 w-[250px] rotate-[-2deg]"
          title="Software engineer agent"
          subtitle="Sherlock score · 92 / 100"
          tint="bg-white"
        />
        <FloatingCard
          delay={0.45}
          className="absolute top-[200px] left-[160px] md:left-[210px] w-[210px] rotate-[5deg]"
          title="Profiles ready for review"
          subtitle="3 candidates · cleared for outreach"
          tint="bg-brand-tint"
          accent
        />
      </div>
    </div>
  );
}

function FloatingCard({
  className,
  title,
  subtitle,
  delay,
  tint,
  accent,
}: {
  className?: string;
  title: string;
  subtitle: string;
  delay: number;
  tint: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`${className} ${tint} rounded-lg shadow-lg p-3.5 border border-black/5`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            accent ? "bg-brand-purple" : "bg-brand-lavender"
          }`}
        />
        <span className="text-[12px] font-semibold text-brand-ink truncate">{title}</span>
      </div>
      <p className="mt-1 text-[11px] text-brand-muted leading-snug">{subtitle}</p>
    </motion.div>
  );
}

function DetailPanel() {
  return (
    <div className="p-10 md:p-14 bg-white">
      <span className="inline-block label-mono bg-brand-tint text-brand-purple px-2.5 py-1 rounded-md">
        Add on
      </span>

      <h2 className="mt-4 font-display text-[36px] md:text-[44px] tracking-tight leading-[1.05] text-brand-ink">
        Sherlock Agents
      </h2>

      <p className="mt-3 text-[16px] text-brand-muted max-w-md">
        Stack autonomous agents on top of any seat. Each agent runs proof workflows in
        parallel — so your team only sees candidates that are already cleared.
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-[34px] text-brand-ink">$199</span>
        <span className="text-[13px] text-brand-mute">per agent / month</span>
      </div>
      <p className="text-[12px] text-brand-mute mt-1">
        Available on Starter, Growth, and Business
      </p>

      <a href="/signup" className="mt-6 btn-dark">
        Get started
      </a>

      <ul className="mt-7 space-y-3">
        {FEATURES.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[14px] text-brand-ink/85"
          >
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
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
