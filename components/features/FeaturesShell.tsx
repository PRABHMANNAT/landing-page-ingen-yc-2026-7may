"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Search,
  Brain,
  Users,
  Settings,
  Route,
  Briefcase,
  UserCircle,
  BookMarked,
  MessageSquare,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useAudience } from "@/components/AudienceContext";
import { platformGuides } from "@/data/platformGuides";
import { studentDocumentation } from "@/data/studentDocumentation";
import FeatureDocumentation from "./FeatureDocumentation";
import WorkflowVisual from "../WorkflowVisual";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  agent: "Aristotle" | "Sherlock" | "Columbus" | "Workspace";
  title: string;
  body: string;
  bullets: string[];
  guide: string;
};

const RECRUITER_FEATURES: Feature[] = [
  {
    icon: LayoutDashboard,
    agent: "Workspace",
    title: "Startup Hiring Dashboard",
    guide: "dashboard",
    body: "Your daily command center — interviews, budget, capacity, and the next action, all in one grid.",
    bullets: [
      "Month calendar with interview dots and today marker",
      "Upcoming interviews with stage tags and confirmed/pending status",
      "Live hiring budget, spend breakdown, and runway view",
      "Now / Next / Then action queue curated by Aristotle",
      "Pipeline: Shortlisted → Selected → Scheduled → Offer-ready",
    ],
  },
  {
    icon: FileText,
    agent: "Aristotle",
    title: "Job Brief Builder",
    guide: "aristotle",
    body: "Two-minute conversational intake that emits a recruiter-ready brief, a LinkedIn post, and a Boolean search query in one pass.",
    bullets: [
      "Chat-first intake with quick-start chips",
      "Live brief renders as you answer",
      "LinkedIn post and candidate search query auto-generated",
      "Ready to paste into your sourcing tools",
    ],
  },
  {
    icon: Search,
    agent: "Aristotle",
    title: "Candidate Search & Intake",
    guide: "aristotle",
    body: "Paste a draft JD or describe the role roughly. Aristotle turns it into a structured candidate intake and discovery surface.",
    bullets: [
      "Pre-set quick-start chips: Backend MVP, Data analyst, Founding full-stack, Product designer v1",
      "Composer accepts pasted JDs or filter refinements",
      "Outputs a ranked candidate panel calibrated to your stage",
    ],
  },
  {
    icon: Brain,
    agent: "Sherlock",
    title: "Analyse Profile",
    guide: "sherlock",
    body: "Sherlock triangulates GitHub, LinkedIn, university, work, and club signals into a verified proof score — investigation, not vibes.",
    bullets: [
      "Deep-dive proof investigation on any candidate",
      "Confidence scoring with explainable signal trail",
      "Letter-by-letter “S-h-e-r-l-o-c-k” loading reinforces the agent identity",
      "Triangulates work, university, OSS, club, and certification signals",
    ],
  },
  {
    icon: Users,
    agent: "Sherlock",
    title: "Interview Command Live",
    guide: "interviews",
    body: "Sherlock-powered triage and prep — every candidate ready for screen, with proof sources visible at a glance.",
    bullets: [
      "Top Proof Sources constellation (USYD, MS, AMZ, GH, AWS, K8S…)",
      "Sortable table: Candidate · Role · Confidence · Proofs · Interview · Risk",
      "Status pills: READY, VIP, HIGH FIT, REVIEW",
      "Quick actions: priority interviews, prep technical screens, open profile",
    ],
  },
  {
    icon: Settings,
    agent: "Workspace",
    title: "Workspace Settings",
    guide: "settings",
    body: "Tune the agents, your hiring defaults, interview flow, and integrations to match how your startup hires.",
    bullets: [
      "Stage-aware ranking: Idea / Pre-seed / Seed / Series A",
      "Aristotle tone (Concise / Detailed / Aggressive) + auto-briefs",
      "Sherlock strictness (Balanced / Strict / Very strict) + GitHub pull",
      "Integrations: GitHub, LinkedIn, Google Calendar, Gmail, Notion, Slack",
    ],
  },
];

const STUDENT_FEATURES: Feature[] = [
  {
    icon: Route,
    agent: "Aristotle",
    title: "Roadmap",
    guide: "roadmap",
    body: "Tell Aristotle your target role, expertise level, and weekly study time. Get a visual, time-bound roadmap calibrated to your goal.",
    bullets: [
      "Quick suggestions: Data Analyst (360h / 9mo), AI Engineer (520h / 14mo), Frontend (420h / 12mo)",
      "Customize by expertise (No experience → Master), goal, and weekly hours",
      "Mind-map canvas with branch expand and per-node completion",
      "See completed topics and update your study schedule as you go",
    ],
  },
  {
    icon: Briefcase,
    agent: "Columbus",
    title: "Jobs · Columbus Scout",
    guide: "jobs",
    body: "Columbus scrapes the open web, ranks roles by fit, explains why they match, and stages dossiers ready to apply.",
    bullets: [
      "Sources: RemoteOK, HN Who’s Hiring, GitHub Jobs Archive, Adzuna, company career pages",
      "Filter pills: Remote · Full-time · Internship · Startups · MNC · 90%+ Match",
      "Match scores, salary bands, and a one-line relevance summary on every card",
      "“Columbus found 5 roles · Scout active” headline keeps the agent visible",
    ],
  },
  {
    icon: UserCircle,
    agent: "Aristotle",
    title: "Manage Profile · Proof Profile",
    guide: "profile",
    body: "Your scattered experience — GitHub, projects, hackathons, certifications, testimonials — verified, scored, and stacked as evidence.",
    bullets: [
      "Skill confidence chips (React 93% · TypeScript 91% · Python 88%)",
      "Stat cards: 4 hackathons · 7 projects · 12 repos · 3 certifications",
      "Role-fit summary with 5 signals; project cards with proof scores (96 / 91 proof)",
      "Readiness meter per track — Frontend 92% · Backend 70% · AI Product 84%",
      "Interview talking points rehearsable before the room",
    ],
  },
  {
    icon: BookMarked,
    agent: "Workspace",
    title: "Collections",
    guide: "collections",
    body: "Every Columbus dossier, tailored profile variant, and Aristotle roadmap saved in one library — a tailored version of you for every role.",
    bullets: [
      "Filter pills: All · Saved Profiles · Jobs · Roadmaps",
      "Summary tiles: 4 Saved Profiles · 4 Job Shortlist · 3 Roadmaps · 6 High-signal saves",
      "Profile variants: Backend Engineer · IBM SDE I · Frontend role version",
      "One workspace for the multi-application strategy",
    ],
  },
  {
    icon: MessageSquare,
    agent: "Aristotle",
    title: "Aristotle Chat",
    guide: "roadmap",
    body: "A persistent left-rail assistant with contextual prompts and quick-suggestion chips, collapsible to free up canvas.",
    bullets: [
      "Quick prompts: “Update my profile for backend role at DoorDash”",
      "“Show leadership and NEXUS society proof”",
      "“Prepare my profile for AI product internships”",
      "Chat input always at the bottom of the rail",
    ],
  },
  {
    icon: Sparkles,
    agent: "Workspace",
    title: "Warm Engineering Notebook",
    guide: "collections",
    body: "Cream paper, dotted grid, indigo intelligence, orange highlighter — a workspace that reads like an engineer’s notebook, not a dashboard.",
    bullets: [
      "Light and dark modes that preserve accent palette",
      "Pill buttons, stat tiles, proof badges, quick-prompt chips",
      "Verified-by-Aristotle marks and proof-score overlays",
      "“STUDENT” role indicator in the rail; iNGEN logo branding above it",
    ],
  },
];

function AgentChip({ agent }: { agent: Feature["agent"] }) {
  const styles: Record<Feature["agent"], string> = {
    Aristotle: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/25",
    Sherlock: "bg-[#7A3CA8]/10 text-[#6B2F8E] border-[#7A3CA8]/25",
    Columbus: "bg-[#1F6F73]/10 text-[#1F6F73] border-[#1F6F73]/25",
    Workspace: "bg-black/[0.04] text-brand-ink/70 border-black/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.12em] ${styles[agent]}`}
    >
      {agent === "Workspace" ? "Workspace tool" : `Powered by ${agent}`}
    </span>
  );
}

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const Icon = f.icon;
  const documentation = studentDocumentation[f.guide];
  const steps = documentation?.labels ?? platformGuides[f.guide].steps;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-black/5 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-[#e6c9b9] bg-[#f8e8df]">
          <Icon className="size-6 text-[#87503c]" />
        </div>
        <AgentChip agent={f.agent} />
      </div>
      <h3 className="font-display text-[20px] sm:text-[22px] leading-snug text-brand-ink">
        {f.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-brand-ink/70">{f.body}</p>
      <ul className="mt-4 space-y-1.5">
        {f.bullets.map((b) => (
          <li
            key={b}
            className="relative pl-4 text-[13px] leading-6 text-brand-ink/75 before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-purple/70"
          >
            {b}
          </li>
        ))}
      </ul>
      <details className="group/preview mt-5 border-t border-forge-line pt-4">
        <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-[#87503c] [&::-webkit-details-marker]:hidden">
          Try the {f.title === "Roadmap" ? "roadmap" : "workflow"} demo
          <ChevronDown size={16} className="motion-safe:transition-transform group-open/preview:rotate-180" aria-hidden />
        </summary>
        <WorkflowVisual title={f.title} steps={steps} details={documentation?.notes} className="mt-3" />
      </details>
    </motion.article>
  );
}

export default function FeaturesShell() {
  const { audience, setAudience } = useAudience();
  const isStudent = audience === "student";
  const features = isStudent ? STUDENT_FEATURES : RECRUITER_FEATURES;

  const eyebrow = isStudent ? "FORGE · STUDENT FEATURES" : "RECRUITER FEATURES";
  const heading = isStudent
    ? "From scattered experience to recruiter-grade proof."
    : "A proof-first command center for startup hiring.";
  const sub = isStudent
    ? "Aristotle plans your roadmap, profile, and interview prep. Columbus scouts roles ranked by fit. Collections keeps every tailored version of you ready to apply."
    : "Aristotle compresses sourcing and brief creation. Sherlock triangulates GitHub, LinkedIn, university, and club signals into a confidence-scored pipeline. One workspace — calendar, budget, candidates, interviews — for founders and recruiters at Idea → Series A.";

  const primaryHref = isStudent ? "/signup" : "/book-demo";
  const primaryLabel = isStudent ? "Join the FORGE waitlist" : "Book a demo";
  const secondaryHref = "/demo";
  const secondaryLabel = "See the live preview";

  return (
    <>
      <section
        className={`relative overflow-hidden ${
          isStudent ? "bg-[#F5EDE0] text-forge-ink" : "bg-brand-bg text-brand-ink"
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(14,14,16,0.18)_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6 pt-14 sm:pt-20 pb-10 sm:pb-14 relative">
          <div className="text-center max-w-[820px] mx-auto">
            <p className="label-mono text-brand-ink/55">{eyebrow}</p>
            <h1 className="mt-4 font-display text-[34px] sm:text-[44px] md:text-[56px] leading-[1.02] tracking-tightest">
              {heading}
            </h1>
            <p className="mt-5 text-[15px] sm:text-[17px] leading-relaxed text-brand-ink/70">
              {sub}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <Link
                href={primaryHref}
                className="workflow-action workflow-action-primary"
              >
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="workflow-action workflow-action-secondary"
              >
                {secondaryLabel}
              </Link>
            </div>
            <p className="mt-5 text-[12px] font-mono uppercase tracking-[0.18em] text-brand-ink/45">
              {isStudent
                ? "Aristotle · Columbus · Roadmap · Jobs · Proof Profile · Collections"
                : "Aristotle · Sherlock · Dashboard · Briefs · Search · Interviews · Settings"}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-bg px-5 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>

          <div className="mt-16 sm:mt-20 rounded-2xl border border-black/5 bg-white p-6 sm:p-10 shadow-sm text-center">
            <p className="label-mono text-brand-ink/55">
              The proof profile
            </p>
            <h2 className="mt-3 font-display text-[26px] sm:text-[34px] leading-tight text-brand-ink max-w-[640px] mx-auto">
              {isStudent
                ? "Recruiters see the same proof you build."
                : "Students arrive with the proof you already need."}
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-brand-ink/70 max-w-[640px] mx-auto">
              {isStudent
                ? "Sherlock — the recruiter-side proof AI — reads the exact signals your FORGE profile surfaces. Build it once, apply many times."
                : "FORGE students build proof profiles Sherlock can read instantly — verified projects, GitHub evidence, hackathons, and testimonials, scored before they hit your pipeline."}
            </p>
            <div className="mx-auto mt-7 max-w-xl text-left">
              <WorkflowVisual key={audience} title="From project to interview"
                steps={["Share a work sample", "Review the source and contribution", "Discuss the work in an interview"]}
                details={[
                  "Include a permitted link, your contribution, and one outcome the reviewer can check.",
                  "Open the source and separate what it demonstrates from what still needs a follow-up.",
                  "Ask about one decision, alternative, or test result using the same role criteria for each candidate.",
                ]} />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => setAudience(isStudent ? "recruiter" : "student")} className="workflow-action workflow-action-primary">{isStudent ? "See the recruiter view" : "See the student view"}</button>
              <Link
                href="/pricing"
                className="workflow-action workflow-action-secondary"
              >
                See pricing
              </Link>
            </div>
          </div>
          <FeatureDocumentation isStudent={isStudent} />
        </div>
      </section>
    </>
  );
}
