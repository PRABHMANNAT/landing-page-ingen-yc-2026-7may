"use client";

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import {
  Search,
  BarChart3,
  Mail,
  Sparkles,
  FileText,
  LayoutDashboard,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useAudience } from "../AudienceContext";

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = {
  id: string;
  tabLabel: string;
  icon: LucideIcon;
  bgColor: string;
  accentColor: string;
  pillLabel: string;
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  visual: ReactNode;
};

/* ----------------------------- Visual mocks ----------------------------- */
/*
 * One cohesive premium card system shared by recruiter + student steps.
 * Prop signatures are intentionally unchanged so both audiences keep working.
 */

const ACCENT = "#EA7659"; // brand coral
const GOOD = "#2F8D6E"; // verified / positive
const WARN = "#B45309"; // risk / attention

/* Shared chrome: agent badge + label + right-side status pill */
function MockHeader({
  agent,
  label,
  status,
  tone = ACCENT,
}: {
  agent: string;
  label: string;
  status?: string;
  tone?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-ink/[0.08]">
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
        style={{ background: `${tone}1A` }}
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: tone }}
        />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-ink leading-none">
          {agent}
        </div>
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/45 mt-1">
          {label}
        </div>
      </div>
      {status && (
        <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.12em] text-ink/55 bg-ink/[0.04] border border-ink/[0.08] rounded-full px-2.5 py-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: GOOD }}
          />
          {status}
        </span>
      )}
    </div>
  );
}

function SignalBar({
  label,
  value,
  color,
  verified = false,
}: {
  label: string;
  value: number;
  color: string;
  verified?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 w-[110px] shrink-0">
        {verified && (
          <span
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${GOOD}1F` }}
          >
            <Check className="w-2.5 h-2.5" style={{ color: GOOD }} strokeWidth={3} />
          </span>
        )}
        <span className="text-[11px] text-ink/75 truncate">{label}</span>
      </div>
      <div className="flex-1 h-1.5 rounded-full bg-ink/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <div className="text-[11px] font-mono text-ink/55 w-9 text-right tabular-nums">
        {value}
      </div>
    </div>
  );
}

function ChipRow({ chips, accent }: { chips: string[]; accent?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((c, i) => (
        <span
          key={i}
          className="text-[10.5px] font-mono tracking-tight rounded-md px-2 py-1 border"
          style={
            accent
              ? {
                  color: ACCENT,
                  background: `${ACCENT}12`,
                  borderColor: `${ACCENT}33`,
                }
              : {
                  color: "rgba(29,22,29,0.62)",
                  background: "rgba(29,22,29,0.035)",
                  borderColor: "rgba(29,22,29,0.10)",
                }
          }
        >
          {c}
        </span>
      ))}
    </div>
  );
}

function InsightNote({ children }: { children: ReactNode }) {
  return (
    <div
      className="mt-4 rounded-lg p-3 border"
      style={{ background: `${ACCENT}0D`, borderColor: `${ACCENT}26` }}
    >
      <div className="flex items-start gap-2">
        <Sparkles
          className="w-3.5 h-3.5 mt-0.5 shrink-0"
          style={{ color: ACCENT }}
        />
        <div className="text-[12px] text-ink/75 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* 1 · ROLE INTAKE — Aristotle turns a rough need into a structured brief */
function RoleBriefCard({
  title,
  subtitle,
  chips,
  aiNote,
}: {
  title: string;
  subtitle: string;
  chips: string[];
  aiNote: string;
}) {
  return (
    <div>
      <MockHeader agent="Aristotle" label="Role Brief" status="Generated" />
      <div className="relative pl-3">
        <span
          className="absolute left-0 top-0.5 bottom-0.5 w-[3px] rounded-full"
          style={{ background: ACCENT }}
        />
        <div className="text-[16px] font-semibold text-ink leading-snug tracking-[-0.01em]">
          {title}
        </div>
        <div className="text-[12px] text-ink/55 mt-1">{subtitle}</div>
      </div>
      <div className="mt-4">
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/45 mb-2">
          Search criteria
        </div>
        <ChipRow chips={chips} accent />
      </div>
      <InsightNote>{aiNote}</InsightNote>
    </div>
  );
}

/* 2 · CANDIDATE SEARCH — shortlist ranked by evidence, not keywords */
function SearchResultsCard({
  resultsLabel,
  filterChips,
  rows,
  pillLeft,
  pillRight,
}: {
  resultsLabel: string;
  filterChips: string[];
  rows: { name: string; role: string; company: string; match: number }[];
  pillLeft: string;
  pillRight: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-ink/[0.08]">
        <span
          className="text-[9.5px] font-mono uppercase tracking-[0.12em] rounded-full px-2.5 py-1"
          style={{ background: `${ACCENT}1A`, color: ACCENT }}
        >
          {pillLeft}
        </span>
        <span
          className="text-[9.5px] font-mono uppercase tracking-[0.12em] rounded-full px-2.5 py-1"
          style={{ background: `${GOOD}1A`, color: GOOD }}
        >
          {pillRight}
        </span>
        <span className="ml-auto text-[10px] font-mono text-ink/40 tabular-nums">
          {rows.length} shown
        </span>
      </div>
      <div className="mb-3">
        <ChipRow chips={filterChips} />
      </div>
      <div className="text-[10px] font-mono text-ink/50 mb-1 uppercase tracking-[0.1em]">
        {resultsLabel}
      </div>
      <div>
        {rows.map((r, i) => {
          const initials = r.name
            .split(" ")
            .map((s) => s[0])
            .join("")
            .slice(0, 2);
          return (
            <div
              key={r.name}
              className="grid grid-cols-[20px,28px,1fr,auto] items-center gap-2.5 py-2.5 border-t border-ink/[0.06] first:border-t-0 group"
            >
              <span className="text-[10px] font-mono text-ink/35 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold"
                style={{ background: `${ACCENT}14`, color: ACCENT }}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-medium text-ink truncate">
                  {r.name}
                </div>
                <div className="text-[10.5px] text-ink/50 truncate">
                  {r.role} · {r.company}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-[3px]" aria-hidden>
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className="w-1 rounded-full"
                      style={{
                        height: 6 + b * 3,
                        background:
                          b < Math.round((r.match / 100) * 4)
                            ? GOOD
                            : "rgba(29,22,29,0.12)",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[11px] font-mono font-semibold rounded-md px-1.5 py-0.5 tabular-nums"
                  style={{ background: `${GOOD}14`, color: GOOD }}
                >
                  {r.match}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 3 · PROOF SCAN — Sherlock verifies the evidence behind a candidate */
function InsightsChartCard({
  resultsLabel,
  filterChips,
  bars,
}: {
  resultsLabel: string;
  filterChips: string[];
  bars: { label: string; value: number; color: string }[];
}) {
  const avg = Math.round(
    bars.reduce((a, b) => a + b.value, 0) / Math.max(1, bars.length),
  );
  const R = 26;
  const C = 2 * Math.PI * R;
  return (
    <div>
      <MockHeader agent="Sherlock" label="Proof Report" status="Verified" />
      <div className="flex items-center gap-5">
        <div className="relative w-[88px] h-[88px] shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke="rgba(29,22,29,0.08)"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r={R}
              fill="none"
              stroke={GOOD}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(avg / 100) * C} ${C}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[18px] font-mono font-semibold text-ink leading-none tabular-nums">
              {avg}
            </span>
            <span className="text-[8px] font-mono uppercase tracking-[0.14em] text-ink/45 mt-1">
              Confidence
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono text-ink/50 mb-2 uppercase tracking-[0.1em]">
            {resultsLabel}
          </div>
          <ChipRow chips={filterChips} />
        </div>
      </div>
      <div className="mt-5 pt-4 border-t border-ink/[0.08]">
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/45 mb-3">
          Sources triangulated
        </div>
        <div className="space-y-3">
          {bars.map((b) => (
            <SignalBar key={b.label} {...b} verified />
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4 · INTERVIEW COMMAND — proof turned into an interview briefing */
function EmailComposerCard({
  recipientsLabel,
  tokens,
  subjectLine,
}: {
  recipientsLabel: string;
  tokens: string[];
  subjectLine: string;
}) {
  return (
    <div>
      <MockHeader agent="Sherlock" label="Interview Brief" status="Ready" />
      <div className="rounded-lg border border-ink/[0.08] bg-ink/[0.02] px-3 py-2.5">
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/40 mb-1">
          Subject
        </div>
        <div className="text-[12px] text-ink/80 leading-snug">
          {recipientsLabel}
        </div>
      </div>
      <div className="mt-4">
        <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/45 mb-2">
          Briefing sections
        </div>
        <div className="grid grid-cols-2 gap-2">
          {tokens.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded-md border border-ink/[0.08] bg-white px-2.5 py-2"
            >
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${GOOD}1F` }}
              >
                <Check
                  className="w-2.5 h-2.5"
                  style={{ color: GOOD }}
                  strokeWidth={3}
                />
              </span>
              <span className="text-[11px] text-ink/75 truncate">{t}</span>
            </div>
          ))}
        </div>
      </div>
      <InsightNote>{subjectLine}</InsightNote>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-ink/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: "88%", background: GOOD }}
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink/55">
          Interview ready
        </span>
      </div>
    </div>
  );
}

/* 5 · HIRING DASHBOARD — the pipeline command center */
function HiringDashboardCard({
  stats,
  pipeline,
  insight,
  title = "Startup hiring dashboard",
}: {
  stats: { label: string; value: string }[];
  pipeline: string[];
  insight: string;
  title?: string;
}) {
  return (
    <div>
      <MockHeader agent={title} label="Command Center" status="Live" />
      <div className="grid grid-cols-2 gap-2 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-ink/[0.08] bg-white p-3 relative overflow-hidden"
          >
            <span
              className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
              style={{ background: ACCENT }}
            />
            <div className="text-[18px] font-mono font-semibold text-ink leading-none tabular-nums pl-2">
              {s.value}
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.14em] text-ink/50 mt-2 pl-2">
              {s.label}
            </div>
          </div>
        ))}
      </div>
      <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink/45 mb-3">
        Pipeline
      </div>
      <div className="flex items-center mb-1">
        {pipeline.map((p, i) => (
          <div key={p} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white"
                style={{
                  background: i === pipeline.length - 1 ? ACCENT : GOOD,
                }}
              />
              <span className="text-[9.5px] font-mono text-ink/60 whitespace-nowrap">
                {p}
              </span>
            </div>
            {i < pipeline.length - 1 && (
              <div
                className="flex-1 h-[2px] mx-1.5 -mt-4 rounded-full"
                style={{ background: `${GOOD}55` }}
              />
            )}
          </div>
        ))}
      </div>
      <InsightNote>{insight}</InsightNote>
    </div>
  );
}

/* --------------------------- Step data builders --------------------------- */

function recruiterSteps(): Step[] {
  return [
    {
      id: "intake",
      tabLabel: "ROLE INTAKE",
      icon: FileText,
      bgColor: "#5B2B8C",
      accentColor: "#C9B6E4",
      pillLabel: "ARISTOTLE · RECRUITING AGENT",
      heading: "Turn a messy hiring need into a real search.",
      body: "Tell Aristotle who you need to hire. It turns a rough role idea into a sharp brief, must-have criteria, search logic, and a candidate pipeline your team can actually act on.",
      primaryCta: { label: "BUILD THE ROLE", href: "/signup" },
      secondaryCta: { label: "BOOK A DEMO", href: "/signup" },
      visual: (
        <RoleBriefCard
          title="Founding Full-Stack Engineer"
          subtitle="Sydney / Remote · Seed-stage AI startup"
          chips={[
            "Brief generated",
            "Search ready",
            "12 candidates found",
            "5 high-signal profiles",
          ]}
          aiNote="Aristotle recommends prioritising candidates with shipped products, startup context, and strong GitHub evidence."
        />
      ),
    },
    {
      id: "search",
      tabLabel: "CANDIDATE SEARCH",
      icon: Search,
      bgColor: "#2F8D6E",
      accentColor: "#B8E2D1",
      pillLabel: "CANDIDATE SEARCH",
      heading: "Shortlists ranked by evidence, not resume polish.",
      body: "iNGEN finds candidates using the signals recruiters actually care about: shipped projects, GitHub depth, work history, university, clubs, open-source work, and role fit.",
      primaryCta: { label: "FIND CANDIDATES", href: "/signup" },
      secondaryCta: { label: "BOOK A DEMO", href: "/signup" },
      visual: (
        <SearchResultsCard
          pillLeft="Proof ranked"
          pillRight="High fit"
          filterChips={["GitHub", "Work history", "Projects", "University", "Clubs"]}
          resultsLabel="Aristotle shortlist · ranked by proof, not keywords"
          rows={[
            { name: "Maya Chen", role: "Founding FS", company: "Orbit", match: 93 },
            { name: "Alex Rivera", role: "Backend", company: "Hello AI", match: 92 },
            { name: "Anika Sharma", role: "Product Systems", company: "Sheridine", match: 91 },
            { name: "Owen Brooks", role: "Data Launch", company: "Stark", match: 90 },
          ]}
        />
      ),
    },
    {
      id: "proof",
      tabLabel: "PROOF SCAN",
      icon: BarChart3,
      bgColor: "#1F6F73",
      accentColor: "#9DD5D8",
      pillLabel: "SHERLOCK · PROOF AGENT",
      heading: "Know if the candidate is actually legit.",
      body: "Sherlock investigates the evidence behind every candidate. It checks GitHub, projects, work history, university, clubs, and public signals to show whether their profile holds up. No keyword theatre. Just receipts.",
      primaryCta: { label: "RUN PROOF SCAN", href: "/signup" },
      secondaryCta: { label: "BOOK A DEMO", href: "/signup" },
      visual: (
        <InsightsChartCard
          filterChips={["Alex Rivera", "92% confidence", "LOW risk"]}
          resultsLabel="Sherlock proof report · 5 sources verified"
          bars={[
            { label: "GitHub depth", value: 92, color: "#6B2F8E" },
            { label: "Work history", value: 84, color: "#B054E7" },
            { label: "Project evidence", value: 78, color: "#DDC73C" },
          ]}
        />
      ),
    },
    {
      id: "interview",
      tabLabel: "INTERVIEW COMMAND",
      icon: Mail,
      bgColor: "#2B3A6B",
      accentColor: "#A8B6E0",
      pillLabel: "INTERVIEW COMMAND",
      heading: "Walk into every interview already briefed.",
      body: "iNGEN turns candidate proof into interview context. Your team gets strengths, risks, proof sources, questions, red flags, and a scorecard before the call starts — every interview begins with evidence, not assumptions.",
      primaryCta: { label: "PREPARE INTERVIEW PACK", href: "/signup" },
      secondaryCta: { label: "BOOK A DEMO", href: "/signup" },
      visual: (
        <EmailComposerCard
          recipientsLabel="Pack ready · Maya Chen · Founding Full-Stack · LOW risk"
          tokens={["Why this candidate", "Proof summary", "Questions to ask", "Red flags"]}
          subjectLine="Interview pack — Maya Chen · 6 proof sources · technical screen"
        />
      ),
    },
    {
      id: "dashboard",
      tabLabel: "HIRING DASHBOARD",
      icon: LayoutDashboard,
      bgColor: "#7A3CA8",
      accentColor: "#D6BCF0",
      pillLabel: "HIRING DASHBOARD",
      heading: "Your hiring pipeline, without the spreadsheet chaos.",
      body: "Track candidates, interviews, budget, team capacity, pipeline movement, and next actions in one recruiter command center. Less hiring chaos. More hiring momentum.",
      primaryCta: { label: "OPEN DASHBOARD", href: "/signup" },
      secondaryCta: { label: "BOOK A DEMO", href: "/signup" },
      visual: (
        <HiringDashboardCard
          stats={[
            { label: "Budget left", value: "$16.4K" },
            { label: "Interviews this week", value: "5" },
            { label: "Offer-ready", value: "3" },
            { label: "Hiring runway", value: "6 wks" },
          ]}
          pipeline={["Shortlisted", "Selected", "Scheduled", "Offer-ready"]}
          insight="Finish interview packets before adding more candidates."
        />
      ),
    },
  ];
}

function studentSteps(): Step[] {
  return [
    {
      id: "roadmap",
      tabLabel: "ROADMAP",
      icon: FileText,
      bgColor: "#5B2B8C",
      accentColor: "#C9B6E4",
      pillLabel: "ARISTOTLE · ROADMAP",
      heading: "A time-bound path to the role you want.",
      body: "Tell Aristotle your target role, expertise level, and weekly study time. It generates a visual, role-based roadmap — Data Analyst (360h / 9 months), AI Engineer (520h / 14 months), Frontend Engineer (420h / 12 months) — with branch-by-branch topics and per-node completion tracking.",
      primaryCta: { label: "BUILD MY ROADMAP", href: "/signup" },
      secondaryCta: { label: "WATCH A DEMO", href: "/signup" },
      visual: (
        <RoleBriefCard
          title="Target role: Frontend Engineer"
          subtitle="Plan: 12 months · 420 hours · 52 topics"
          chips={[
            "Internet Fundamentals",
            "React · Hooks",
            "CSS Grid · Flexbox",
            "APIs",
          ]}
          aiNote="0% complete · 0 of 52 topics · Updated just now. No more “where do I start?” — Aristotle calibrates the roadmap to your goal and weekly budget."
        />
      ),
    },
    {
      id: "scout",
      tabLabel: "JOB SCOUT",
      icon: Search,
      bgColor: "#1F6F73",
      accentColor: "#9DD5D8",
      pillLabel: "COLUMBUS · JOB SCOUT",
      heading: "Columbus brings the roles to you.",
      body: "Columbus scrapes RemoteOK, HN Who’s Hiring, GitHub Jobs Archive, Adzuna, and company career pages — then ranks roles by match %, explains the fit, and stages dossiers with salary bands and an apply path. Filter by Remote, Full-time, Internship, Startups, MNC, or 90%+ Match.",
      primaryCta: { label: "START AN INTAKE", href: "/signup" },
      secondaryCta: { label: "WATCH A DEMO", href: "/signup" },
      visual: (
        <SearchResultsCard
          pillLeft="Scout active · 5 staged"
          pillRight="96% match"
          filterChips={["Remote", "Internship", "Startups", "90%+ Match"]}
          resultsLabel="Columbus found 5 roles · ranked by fit, sourced from RemoteOK, HN, GitHub Jobs, Adzuna."
          rows={[
            { name: "Backend Product Engineer", role: "Python · SQL · APIs · $76–94K", company: "Strong fit", match: 96 },
            { name: "Frontend Engineer", role: "React · TypeScript · $70–88K", company: "High fit", match: 93 },
            { name: "Data Analyst (New Grad)", role: "SQL · Python", company: "Good fit", match: 88 },
            { name: "ML Intern", role: "Projects · Repos", company: "Worth a look", match: 84 },
          ]}
        />
      ),
    },
    {
      id: "proof",
      tabLabel: "PROOF PROFILE",
      icon: BarChart3,
      bgColor: "#7A3CA8",
      accentColor: "#D6BCF0",
      pillLabel: "ARISTOTLE · PROOF PROFILE",
      heading: "A recruiter-grade dossier, verified by Aristotle.",
      body: "GitHub, projects, hackathons, certifications, testimonials, and society work get scored, verified, and stacked as evidence — skill confidence chips, proof-scored project cards, a role-fit summary with 5 signals, and a readiness meter per track (Frontend, Backend, AI Product).",
      primaryCta: { label: "BUILD MY PROOF PROFILE", href: "/signup" },
      secondaryCta: { label: "WATCH A DEMO", href: "/signup" },
      visual: (
        <InsightsChartCard
          filterChips={["82% Ready", "7 Projects", "12 Repos", "3 Certifications"]}
          resultsLabel="Verified by Aristotle · 4 project proofs (96 / 91 proof scores) · 5 role-fit signals."
          bars={[
            { label: "React", value: 93, color: "#6B2F8E" },
            { label: "TypeScript", value: 91, color: "#B054E7" },
            { label: "Python", value: 88, color: "#DDC73C" },
          ]}
        />
      ),
    },
    {
      id: "interview",
      tabLabel: "INTERVIEW PREP",
      icon: Mail,
      bgColor: "#2B3A6B",
      accentColor: "#A8B6E0",
      pillLabel: "ARISTOTLE · INTERVIEW COACH",
      heading: "Walk in already knowing the answers.",
      body: "Aristotle turns each project, repo, and signal in your profile into rehearsable talking points — role-fit answers tied to the JD, project stories that show shipped judgment, and a strength-and-gap read so you go into the room prepared, not improvising.",
      primaryCta: { label: "PREPARE MY INTERVIEW", href: "/signup" },
      secondaryCta: { label: "WATCH A DEMO", href: "/signup" },
      visual: (
        <EmailComposerCard
          recipientsLabel="Walk in prepared. Talk like someone who knows their work."
          tokens={["Project story", "Role-fit answer", "Strengths", "Gaps"]}
          subjectLine="Interview talking point — explain how your API project shows backend thinking, data flow, and production awareness."
        />
      ),
    },
    {
      id: "workspace",
      tabLabel: "COLLECTIONS",
      icon: LayoutDashboard,
      bgColor: "#2F8D6E",
      accentColor: "#B8E2D1",
      pillLabel: "COLLECTIONS · SAVED WORKSPACE",
      heading: "A tailored version of you for every role.",
      body: "Save Columbus job dossiers, Aristotle roadmaps, and tailored profile variants (Backend, IBM SDE, Frontend) in one library. High-signal saves stay in reach so each application gets the right version of you — not a generic resume.",
      primaryCta: { label: "OPEN MY COLLECTIONS", href: "/signup" },
      secondaryCta: { label: "WATCH A DEMO", href: "/signup" },
      visual: (
        <HiringDashboardCard
          title="Saved collection · 11 items"
          stats={[
            { label: "Saved Profiles", value: "4" },
            { label: "Job Shortlist", value: "4" },
            { label: "Roadmaps", value: "3" },
            { label: "High-signal saves", value: "6" },
          ]}
          pipeline={["Saved", "Tailored", "Applied", "Tracked"]}
          insight="IBM SDE version · React proof stack · 96% Match — one workspace, every variant."
        />
      ),
    },
  ];
}

/* ------------------------------- Section -------------------------------- */

type Props = {
  sectionNumber?: string;
  eyebrow?: string;
  title?: string;
};

export default function HowItWorks({
  sectionNumber = "01",
  eyebrow = "FEATURES",
  title,
}: Props) {
  const { audience } = useAudience();
  const reducedMotion = useReducedMotion();

  const steps = useMemo(
    () => (audience === "student" ? studentSteps() : recruiterSteps()),
    [audience],
  );
  const isStudent = audience === "student";
  const heading =
    title ?? (isStudent
      ? "From scattered experience to recruiter-grade proof."
      : "From role intent to interview-ready talent.");
  const eyebrowLabel = isStudent ? "FORGE · STUDENT WORKSPACE" : eyebrow;
  const studentSubheadline =
    "Aristotle builds your roadmap, profile, and interview prep. Columbus scouts roles ranked by fit. Collections keep every tailored version of you ready to apply.";

  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const offsetTop = el.offsetTop;
      const range = el.offsetHeight - window.innerHeight;
      const y = window.scrollY || window.pageYOffset || 0;
      const p =
        range > 0 ? Math.min(1, Math.max(0, (y - offsetTop) / range)) : 0;
      scrollYProgress.set(p);
      setActiveIndex(
        Math.min(
          steps.length - 1,
          Math.max(0, Math.floor(p * steps.length - 1e-6)),
        ),
      );
    };
    const onScroll = () => {
      update();
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scrollYProgress, steps.length]);

  // Smooth color crossfade between bgColors
  const bgColor = useTransform(
    scrollYProgress,
    steps.map((_, i) => i / Math.max(1, steps.length - 1)),
    steps.map((s) => s.bgColor),
  );

  // Subtle parallax for the visual card
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Heading lift-in on first pin
  const headingY = useTransform(scrollYProgress, [0, 0.08], [10, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  // Bottom progress bar scaleX
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Update tab indicator position on activeIndex / resize
  useEffect(() => {
    const update = () => {
      const el = tabRefs.current[activeIndex];
      const bar = tabBarRef.current;
      if (!el || !bar) return;
      const elRect = el.getBoundingClientRect();
      const barRect = bar.getBoundingClientRect();
      setIndicator({ x: elRect.left - barRect.left, w: elRect.width });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeIndex, steps.length]);

  // Track when section is in view (for keyboard arrow handling)
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.2 },
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToStep = (i: number) => {
    const c = containerRef.current;
    if (!c) return;
    const top = c.offsetTop + (i / steps.length) * c.offsetHeight + 1;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToStep(Math.min(steps.length - 1, activeIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToStep(Math.max(0, activeIndex - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, activeIndex, steps.length]);

  /* ------------------------- Mobile / reduced-motion ------------------------- */
  if (!isDesktop || reducedMotion) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 pt-16 lg:pt-24 pb-10">
          <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/60 mb-1.5">
            [{sectionNumber}] {eyebrowLabel}
          </div>
          <h2 className="font-display text-[32px] lg:text-[48px] leading-[1.0] tracking-[-0.02em] text-ink max-w-4xl">
            {heading}
          </h2>
          {audience === "recruiter" && (
            <p className="mt-4 max-w-2xl text-[15px] lg:text-[17px] leading-relaxed text-ink/70">
              iNGEN gives recruiters a proof-first hiring workflow: build the role, find candidates,
              verify evidence, prepare interviews, and move the pipeline — all with Aristotle and
              Sherlock working behind the scenes.
            </p>
          )}
          {isStudent && (
            <p className="mt-4 max-w-2xl text-[15px] lg:text-[17px] leading-relaxed text-ink/70">
              {studentSubheadline}
            </p>
          )}
        </div>
        <div className="space-y-16 pb-24">
          {steps.map((step) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="px-6"
            >
              <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/60 mb-3 inline-flex items-center gap-2">
                <step.icon className="w-3.5 h-3.5" />
                {step.tabLabel}
              </div>
              <div
                className="rounded-xl p-6 mb-6 relative overflow-hidden"
                style={{ background: step.bgColor }}
              >
                <div className="absolute inset-0 hatched opacity-25 pointer-events-none" />
                <div className="relative bg-white rounded-xl p-5 shadow-2xl border border-black/[0.06] max-w-[520px] mx-auto">
                  {step.visual}
                </div>
              </div>
              <span
                className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] rounded px-2 py-1 mb-3"
                style={{
                  background: `${step.accentColor}33`,
                  color: step.bgColor,
                }}
              >
                {step.pillLabel}
              </span>
              <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.02em] text-ink mb-3">
                {step.heading}
              </h3>
              <p className="text-[15px] leading-[1.55] text-ink/75 mb-5">
                {step.body}
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={step.primaryCta.href}
                  className="text-[12px] font-mono uppercase tracking-[0.1em] bg-ink text-white px-5 py-3"
                >
                  {step.primaryCta.label}
                </a>
                <a
                  href={step.secondaryCta.href}
                  className="text-[12px] font-mono uppercase tracking-[0.1em] border border-ink text-ink px-5 py-3"
                >
                  {step.secondaryCta.label}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        <style jsx>{`
          .hatched {
            background-image: repeating-linear-gradient(
              135deg,
              transparent 0 6px,
              rgba(255, 255, 255, 0.18) 6px 7px
            );
          }
        `}</style>
      </section>
    );
  }

  /* ----------------------------- Desktop pinned ----------------------------- */
  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: `${steps.length * 100}vh` }}
      aria-label="How it works"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
      >
        {/* Header */}
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto max-w-[1280px] w-full px-12 pt-16"
        >
          <div className="text-[13px] font-mono uppercase tracking-[0.18em] text-ink/60 mb-1.5">
            [{sectionNumber}] {eyebrowLabel}
          </div>
          <h2 className="font-display text-[48px] leading-[1.0] tracking-[-0.02em] text-ink max-w-4xl">
            {heading}
          </h2>
          {audience === "recruiter" && (
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/70">
              iNGEN gives recruiters a proof-first hiring workflow: build the role, find candidates,
              verify evidence, prepare interviews, and move the pipeline — all with Aristotle and
              Sherlock working behind the scenes.
            </p>
          )}
          {isStudent && (
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/70">
              {studentSubheadline}
            </p>
          )}
        </motion.div>

        {/* Tab strip */}
        <div
          ref={tabBarRef}
          className="relative mt-12 border-y border-ink/15 h-14 flex"
          role="tablist"
          aria-label="Feature steps"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeIndex === i;
            return (
              <button
                key={step.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`hiw-panel-${step.id}`}
                onClick={() => scrollToStep(i)}
                className={`relative flex items-center gap-2 px-4 flex-1 min-w-[180px] max-w-[240px] border-r border-ink/15 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink ${
                  isActive ? "text-ink" : "text-ink/40 hover:text-ink/70"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-mono tracking-[0.1em] truncate">
                  {step.tabLabel}
                </span>
              </button>
            );
          })}
          <div
            className="flex-1 hatched-light"
            aria-hidden
            style={{ minWidth: 0 }}
          />
          <motion.div
            className="absolute bottom-[-1px] h-[2px] bg-ink"
            initial={false}
            animate={{ x: indicator.x, width: indicator.w }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute bottom-[-1px] left-0 h-[2px] bg-ink/80 origin-left"
            style={{ scaleX: progressScale, width: "100%" }}
            aria-hidden
          />
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-2 flex-1 min-h-0">
          {/* Left visual */}
          <motion.div
            className="relative overflow-hidden"
            style={{ background: bgColor }}
          >
            <div className="absolute inset-0 hatched-on-color pointer-events-none" />
            <div className="relative h-full w-full flex items-center justify-center px-12">
              <motion.div style={{ y: visualY }} className="w-full max-w-[520px]">
                <motion.div
                  key={steps[activeIndex].id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="bg-white rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] border border-black/[0.06] p-5"
                >
                  {steps[activeIndex].visual}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right text */}
          <div className="relative bg-white">
            <div className="h-full w-full px-16 py-16 flex items-center">
                <motion.div
                  key={steps[activeIndex].id + "-text"}
                  id={`hiw-panel-${steps[activeIndex].id}`}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="max-w-[520px]"
                >
                  <span
                    className="inline-block text-[11px] font-mono uppercase tracking-[0.18em] rounded px-2 py-1 mb-5"
                    style={{
                      background: `${steps[activeIndex].accentColor}33`,
                      color: steps[activeIndex].bgColor,
                    }}
                  >
                    {steps[activeIndex].pillLabel}
                  </span>
                  <h3 className="font-display text-[32px] leading-[1.05] tracking-[-0.02em] text-ink mb-4">
                    {steps[activeIndex].heading}
                  </h3>
                  <p className="text-[16px] leading-[1.55] text-ink/75 mb-7">
                    {steps[activeIndex].body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={steps[activeIndex].primaryCta.href}
                      className="text-[12px] font-mono uppercase tracking-[0.1em] bg-ink text-white px-5 py-3"
                    >
                      {steps[activeIndex].primaryCta.label}
                    </a>
                    <a
                      href={steps[activeIndex].secondaryCta.href}
                      className="text-[12px] font-mono uppercase tracking-[0.1em] border border-ink text-ink px-5 py-3"
                    >
                      {steps[activeIndex].secondaryCta.label}
                    </a>
                  </div>
                </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hatched-light {
          background-image: repeating-linear-gradient(
            135deg,
            transparent 0 6px,
            rgba(29, 22, 29, 0.18) 6px 7px
          );
        }
        .hatched-on-color {
          background-image: repeating-linear-gradient(
            135deg,
            transparent 0 8px,
            rgba(255, 255, 255, 0.12) 8px 9px
          );
        }
      `}</style>
    </section>
  );
}
