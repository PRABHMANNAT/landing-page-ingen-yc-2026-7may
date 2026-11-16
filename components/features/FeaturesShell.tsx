"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck2,
  ChevronDown,
  ClipboardList,
  FileCheck2,
  FolderKanban,
  LayoutDashboard,
  ListFilter,
  MessagesSquare,
  NotebookPen,
  Route,
  ScanSearch,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { useAudience } from "@/components/AudienceContext";
import { platformGuides } from "@/data/platformGuides";
import { studentDocumentation } from "@/data/studentDocumentation";
import FeatureHero from "./FeatureHero";
import FeatureDocumentation from "./FeatureDocumentation";
import WorkflowVisual from "../WorkflowVisual";

type Feature = {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  details: [string, string];
  guide: string;
};

const recruiterFeatures: Feature[] = [
  {
    icon: LayoutDashboard,
    label: "Hiring overview",
    title: "Hiring dashboard",
    description: "See what’s coming up and who needs to act across your open roles.",
    details: ["Track interviews and candidate stages", "Review budget, capacity, and next actions"],
    guide: "dashboard",
  },
  {
    icon: ClipboardList,
    label: "Role planning",
    title: "Job brief builder",
    description: "Turn a conversation with Aristotle into a brief the hiring team can review.",
    details: ["Define responsibilities and role requirements", "Draft a job post and search query from the brief"],
    guide: "aristotle",
  },
  {
    icon: ListFilter,
    label: "Candidate sourcing",
    title: "Candidate search",
    description: "Start with a draft job description, then refine the search around the requirements the team agrees on.",
    details: ["Use a sample role or paste your own brief", "Review a ranked shortlist against your criteria"],
    guide: "aristotle",
  },
  {
    icon: ScanSearch,
    label: "Evidence review",
    title: "Profile analysis",
    description: "Use Sherlock to check the source and context behind a candidate’s claims.",
    details: ["Review work samples and their sources", "Record unanswered questions for follow-up"],
    guide: "sherlock",
  },
  {
    icon: CalendarCheck2,
    label: "Interview preparation",
    title: "Interview workspace",
    description: "Bring the relevant candidate evidence into the interview so the team can ask better questions.",
    details: ["Review candidate status and source material", "Prepare role-specific interview questions"],
    guide: "interviews",
  },
  {
    icon: SlidersHorizontal,
    label: "Team administration",
    title: "Workspace settings",
    description: "Set up your workspace around how your team hires and reviews candidates.",
    details: ["Review agent and sourcing preferences", "Configure supported integrations"],
    guide: "settings",
  },
];

const studentFeatures: Feature[] = [
  {
    icon: Route,
    label: "Learning plan",
    title: "Roadmap",
    description: "Tell Aristotle your target role and weekly study time. Turn the plan into milestones you can adjust as you go.",
    details: ["Plan around your experience and weekly hours", "Track completed topics and project milestones"],
    guide: "roadmap",
  },
  {
    icon: ListFilter,
    label: "Job discovery",
    title: "Job search",
    description: "Use Columbus to find roles worth reading and see how they relate to your experience.",
    details: ["Filter by work type and location", "Review why a role matches and check the source listing"],
    guide: "jobs",
  },
  {
    icon: FileCheck2,
    label: "Work samples",
    title: "Proof profile",
    description: "Bring projects, repositories, and certifications together so a reviewer can see what you contributed.",
    details: ["Add evidence and context to each project", "Use work samples to prepare interview talking points"],
    guide: "profile",
  },
  {
    icon: FolderKanban,
    label: "Application organisation",
    title: "Collections",
    description: "Keep the jobs, roadmaps, and profile versions you need for each application in one place.",
    details: ["Group saved jobs and work samples by role", "Keep tailored profiles alongside your shortlist"],
    guide: "collections",
  },
  {
    icon: MessagesSquare,
    label: "Planning assistant",
    title: "Aristotle chat",
    description: "Ask for help with the roadmap or profile you’re working on without leaving the workspace.",
    details: ["Start with a suggested prompt or your own question", "Collapse the chat when you need more room"],
    guide: "roadmap",
  },
  {
    icon: NotebookPen,
    label: "Workspace layout",
    title: "Student workspace",
    description: "Move between your roadmap, profile, and applications from a single workspace.",
    details: ["Choose light or dark mode", "Find project evidence and saved materials from the workspace"],
    guide: "collections",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const documentation = studentDocumentation[feature.guide];
  const steps = documentation?.labels ?? platformGuides[feature.guide].steps;

  return (
    <article className="flex min-w-0 flex-col self-start rounded-2xl border border-[#e4dbcf] bg-white p-5 shadow-[0_12px_28px_-25px_rgba(57,36,22,0.35)] sm:p-6">
      <div className="flex items-center gap-3.5">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#e8dac8] bg-[#f5eadc] text-[#694833]">
          <Icon size={23} strokeWidth={1.65} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#755747]">{feature.label}</p>
          <h3 className="mt-0.5 font-display text-xl leading-6 text-brand-ink">{feature.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-brand-muted">{feature.description}</p>
      <ul className="mt-4 space-y-2 border-l border-[#e5d5c4] pl-3 text-sm leading-5 text-[#594e45]">
        {feature.details.map(detail => <li key={detail}>{detail}</li>)}
      </ul>
      <details className="group/preview mt-5 rounded-xl border border-[#ebe2d6] bg-[#fcfaf6] px-3 group-open/preview:pb-3">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-[#714c37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87503c] [&::-webkit-details-marker]:hidden">
          Try the workflow
          <ChevronDown size={16} className="shrink-0 motion-safe:transition-transform group-open/preview:rotate-180" aria-hidden />
        </summary>
        <WorkflowVisual title={feature.title} steps={steps} details={documentation?.notes} className="mb-3" />
        <Link href={`/resources/${feature.guide}`} className="inline-flex items-center gap-1.5 px-1 text-sm font-medium text-[#714c37] underline-offset-4 hover:underline">
          Read the guide <ArrowUpRight size={14} aria-hidden />
        </Link>
      </details>
    </article>
  );
}

export default function FeaturesShell() {
  const { audience, setAudience } = useAudience();
  const isStudent = audience === "student";
  const features = isStudent ? studentFeatures : recruiterFeatures;

  return (
    <>
      <FeatureHero isStudent={isStudent} />
      <section aria-labelledby="feature-overview" className="bg-brand-bg px-5 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-[1180px]">
          <h2 id="feature-overview" className="mb-5 font-display text-2xl text-brand-ink sm:text-[28px]">
            {isStudent ? "Tools for planning and applying" : "Tools for each stage of hiring"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(feature => <FeatureCard key={feature.title} feature={feature} />)}
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
