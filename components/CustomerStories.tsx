"use client";

import Image from "next/image";
import { useAudience } from "./AudienceContext";

const recruiterStories = [
  { co: "Hello AI", headline: "How a 4-person founding team made their first three engineering hires on triangulated proof, not LinkedIn intuition", bg: "from-orange-200 to-orange-100" },
  { co: "Orbit Commerce", headline: "Cutting time-to-shortlist from 11 days to 38 minutes with Aristotle's 2-minute brief intake", bg: "from-blue-200 to-purple-100" },
  { co: "Sheridine Studio", headline: "Why their seed-stage product designer hire ran on Sherlock's confidence score, not portfolio screenshots", bg: "from-emerald-200 to-teal-100" },
  { co: "iNGEN Labs", headline: "Closing offers inside a $24k hiring budget — runway, spend, and pipeline in one dashboard", bg: "from-amber-200 to-yellow-100" },
];

function RecruiterStories() {
  return (
    <section className="bg-brand-bg">
      <div className="mx-auto max-w-[1320px] px-6 py-24">
        <div className="label-mono text-brand-mute mb-3">[04] Founder &amp; recruiter stories</div>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-[44px] md:text-[58px] leading-[1.05] tracking-tightest text-brand-ink max-w-3xl">
            How startup teams hire on proof, not resume claims
          </h2>
          <a href="/signup" className="btn-outline">View all stories</a>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {recruiterStories.map((s) => (
            <a key={s.co} href="/signup" className="group bg-white rounded-md overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <div className={`relative h-56 bg-gradient-to-br ${s.bg} flex items-center justify-center`}>
                <div className="text-[44px] font-display text-white/80 tracking-tightest drop-shadow-sm">{s.co}</div>
              </div>
              <div className="p-6">
                <div className="label-mono text-brand-mute mb-2">Customer Story</div>
                <h3 className="font-display text-[22px] leading-snug text-brand-ink group-hover:text-brand-purple transition-colors">{s.headline}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- STUDENT: Stories -------------------- */

const featuredCard = {
  tag: "Aristotle · Roadmap",
  img: "/student/roadmap-frontend.png",
  headline: "52 topics. 420 hours. Your curriculum, built from scratch — not a template.",
  sub: "Aristotle reads your background, target role, and available hours, then ships a week-by-week Frontend Engineering plan with a live readiness gauge. Switch between mind-map canvas and linear pathway without losing progress.",
  stats: ["52 topics", "420 hrs", "12-month plan", "Mind-map + linear"],
};

const smallCards = [
  {
    tag: "Columbus · Job Scout",
    img: "/student/jobs-columbus.png",
    headline: "3 ranked roles. 96% match. Salary, fit, and one-click prep — all in one dossier.",
    sub: "Columbus scouts RemoteOK, HN Who's Hiring, GitHub Jobs, and Adzuna, then ranks every opening by proof alignment.",
    stats: ["96% top match", "4 sources"],
  },
  {
    tag: "iNGEN · Profile",
    img: "/student/profile-readiness.png",
    headline: "React 93%. Proof 96. Every skill scored, every project verified.",
    sub: "Role-fit summaries generated per target — IBM SDE, Backend, Frontend — ready to share or export in seconds.",
    stats: ["82% ready", "TypeScript 91%"],
  },
  {
    tag: "iNGEN · Collections",
    img: "/student/collections-saved.png",
    headline: "IBM SDE, Backend, Frontend, PM — four profiles in one workspace.",
    sub: "Save a profile version per track, shortlist roles against each, and switch contexts in a single click. No tab chaos.",
    stats: ["4 profiles", "11 saves"],
  },
];

function StudentStories() {
  return (
    <section className="bg-brand-bg">
      <div className="mx-auto max-w-[1320px] px-6 py-24">
        <div className="label-mono text-brand-mute mb-3">[04] iNGEN in action</div>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <h2 className="font-display text-[44px] md:text-[58px] leading-[1.05] tracking-tightest text-brand-ink max-w-3xl">
            Build proof, hit readiness,<br className="hidden md:block" /> land the role
          </h2>
          <a href="/signup" className="btn-outline">See all features</a>
        </div>

        {/* Featured card — full width, horizontal */}
        <a href="/signup" className="group flex flex-col md:flex-row bg-brand-deep rounded-xl overflow-hidden border border-white/5 shadow-lg hover:shadow-2xl transition-all duration-300 mb-6">
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-lavender/40 bg-brand-lavender/10 px-3 py-1 text-[11px] font-medium text-brand-lavender mb-6">
                {featuredCard.tag}
              </span>
              <h3 className="font-display text-[28px] md:text-[34px] leading-[1.1] tracking-tightest text-white mb-4 group-hover:text-brand-lavender transition-colors">
                {featuredCard.headline}
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-md">
                {featuredCard.sub}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {featuredCard.stats.map((s) => (
                <span key={s} className="label-mono text-[10px] bg-white/10 text-white/70 px-2.5 py-1 rounded-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="relative md:w-[52%] min-h-[240px] md:min-h-0 overflow-hidden">
            <Image
              src={featuredCard.img}
              alt={featuredCard.tag}
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-deep to-transparent hidden md:block" />
          </div>
        </a>

        {/* Three smaller cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {smallCards.map((s) => (
            <a key={s.tag} href="/signup" className="group flex flex-col bg-white rounded-xl overflow-hidden border border-black/6 shadow-sm hover:shadow-lg hover:border-brand-purple/25 transition-all duration-300">
              <div className="relative w-full overflow-hidden bg-gray-50" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={s.img}
                  alt={s.tag}
                  fill
                  className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-brand-purple border border-brand-purple/20 shadow-sm">
                    {s.tag}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.stats.map((st) => (
                    <span key={st} className="label-mono text-[9px] bg-brand-tint text-brand-purple px-2 py-0.5 rounded-sm">
                      {st}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-[18px] leading-snug text-brand-ink group-hover:text-brand-purple transition-colors mb-2">
                  {s.headline}
                </h3>
                <p className="text-[12px] text-brand-mute leading-relaxed flex-1">{s.sub}</p>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-medium text-brand-purple opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  Explore
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CustomerStories() {
  const { audience } = useAudience();
  return audience === "student" ? <StudentStories /> : <RecruiterStories />;
}
