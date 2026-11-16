"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAudience } from "./AudienceContext";

const recruiterTaglines = [
  "Stop guessing from resumes. iNGEN shows recruiters the proof behind every candidate, then turns that evidence into shortlists, interview packs, and faster hiring decisions.",
  "iNGEN uses two agents — Aristotle builds the hiring workflow around your role. Sherlock checks the real signals behind each candidate : GitHub, work history, university, projects, and club activity.. so every interview starts with evidence, not assumptions.",
];

const recruiterPrompts = [
  "Find me a backend engineer in Sydney with 3+ years of experience",
  "Tell me who is actually worth interviewing for this role",
  "Deeply assess this student profile for a junior software role",
  "Verify this candidate across GitHub, work history, university, and clubs",
  "Build me an interview pack from this candidate’s proof",
  "Find high-signal AI interns with real project evidence",
];

const studentPlaceholders = [
  'Try: "Data Analyst roadmap — 360 hours, 9 months"',
  'Try: "AI Engineer plan — 520 hours, 14 months"',
  'Try: "Frontend Engineer in 12 months, 8 hrs a week"',
  'Try: "Switching careers into backend engineering"',
];

function RecruiterHero() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % recruiterTaglines.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (focused || value) return;
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = recruiterPrompts[phrase];
      if (!deleting) {
        char += 1;
        setTyped(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 42);
      } else {
        char -= 1;
        setTyped(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % recruiterPrompts.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [focused, value]);

  const goAuth = () => {
    const q = value.trim() ? `?q=${encodeURIComponent(value.trim())}` : "";
    router.push(`/signup${q}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div className="absolute inset-x-0 top-0 h-40 halftone-top opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 halftone-bottom opacity-90 pointer-events-none" />

      <div className="mx-auto max-w-[1320px] px-6 pt-20 pb-12 relative">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 label-mono text-white">
            <span className="text-brand-lavender">New</span>
            <span className="opacity-50">|</span>
            <span>Aristotle + Sherlock are live</span>
          </span>

          <h1 className="font-display mt-7 text-[64px] md:text-[88px] leading-[0.95] tracking-tightest text-white">
            Proof-first hiring.
          </h1>

          <p
            key={taglineIndex}
            className="mt-6 max-w-2xl mx-auto text-[17px] leading-relaxed text-white/85 animate-[fadeUp_600ms_ease-out] min-h-[78px]"
          >
            {recruiterTaglines[taglineIndex]}
          </p>

          <div className="mt-9 flex items-center justify-center gap-3">
            <a
              href="/signup"
              className="btn-dark !bg-white !text-brand-ink !transition-all !duration-200 hover:!bg-white hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.45)]"
            >
              Try for Free
            </a>
            <a
              href="/book-demo"
              className="btn-outline btn-outline-light !transition-all !duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:!bg-white hover:!text-brand-ink hover:!border-white hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.3)]"
            >
              Book a Demo
            </a>
          </div>
        </div>

        <div className="mt-16">
          <div className="text-center mb-3">
            <span className="inline-block bg-brand-ink text-white label-mono px-3 py-1.5 rounded-sm">
              TELL iNGEN WHO YOU NEED TO HIRE
            </span>
          </div>

          <div className="mx-auto max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden">
            <div className="px-4 pt-3">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-purple/30 bg-brand-tint px-2.5 py-1 text-[13px] text-brand-purple">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L9.5 6L13.5 7.5L9.5 9L8 13L6.5 9L2.5 7.5L6.5 6L8 2Z" fill="currentColor" />
                </svg>
                Aristotle · Hiring Agent
              </span>
            </div>
            <div className="flex items-center px-3 py-3 gap-2">
              <svg className="ml-1 text-brand-mute" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goAuth();
                  }
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={
                  focused || value
                    ? "Describe the role or paste a candidate profile…"
                    : typed
                      ? `${typed}▌`
                      : ""
                }
                className="flex-1 outline-none text-[15px] text-brand-ink placeholder:text-brand-mute py-1"
              />
              <button
                type="button"
                onClick={goAuth}
                aria-label="Search"
                className="w-9 h-9 rounded-md bg-brand-purple text-white flex items-center justify-center hover:bg-brand-purple/90 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentHero() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [phIndex, setPhIndex] = useState(0);

  const goAuth = () => {
    const q = value.trim() ? `?q=${encodeURIComponent(value.trim())}` : "";
    router.push(`/signup${q}`);
  };

  return (
    <section className="relative overflow-hidden bg-brand-deep text-white">
      <div className="absolute inset-x-0 top-0 h-40 halftone-top opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-56 halftone-bottom opacity-90 pointer-events-none" />

      <div className="mx-auto max-w-[1320px] px-6 pt-20 pb-12 relative">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 label-mono text-white">
            <span className="text-brand-lavender">New</span>
            <span className="opacity-50">|</span>
            <span>Aristotle + Columbus are live</span>
          </span>

          <h1 className="font-display mt-7 text-[64px] md:text-[88px] leading-[0.95] tracking-tightest text-white">
            Get placed faster, with proof.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-[17px] leading-relaxed text-white/85">
            FORGE turns raw experience into{" "}
            <span className="text-white">recruiter-ready proof</span>. Aristotle
            builds your time-bound roadmap, Columbus scouts roles ranked by fit,
            and your profile becomes evidence — not a resume.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3">
            <a href="/signup" className="btn-dark !bg-white !text-brand-ink hover:!bg-white/90">
              Build my roadmap
            </a>
            <a href="/book-demo" className="btn-outline btn-outline-light">
              Scout matching jobs
            </a>
          </div>

          <p className="mt-5 text-[13px] text-white/60">
            Roadmap · Jobs · Proof Profile · Collections — one workspace, two
            AI agents.
          </p>
        </div>

        <div className="mt-16">
          <div className="text-center mb-3">
            <span className="inline-block bg-brand-ink text-white label-mono px-3 py-1.5 rounded-sm">
              TELL ARISTOTLE THE ROLE YOU&apos;RE TRAINING FOR
            </span>
          </div>

          <div className="mx-auto max-w-2xl bg-white rounded-md shadow-2xl overflow-hidden">
            <div className="px-4 pt-3">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-purple/30 bg-brand-tint px-2.5 py-1 text-[13px] text-brand-purple">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L9.5 6L13.5 7.5L9.5 9L8 13L6.5 9L2.5 7.5L6.5 6L8 2Z" fill="currentColor" />
                </svg>
                Aristotle — roadmap generator
              </span>
            </div>
            <div className="flex items-center px-3 py-3 gap-2">
              <svg className="ml-1 text-brand-mute" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goAuth();
                  }
                }}
                onFocus={() => setPhIndex((i) => (i + 1) % studentPlaceholders.length)}
                placeholder={studentPlaceholders[phIndex]}
                className="flex-1 outline-none text-[15px] text-brand-ink placeholder:text-brand-mute py-1"
              />
              <button
                type="button"
                onClick={goAuth}
                aria-label="Search"
                className="w-9 h-9 rounded-md bg-brand-purple text-white flex items-center justify-center hover:bg-brand-purple/90 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-[13px] text-white/60">
            Aristotle plans the path. Columbus scouts the roles. You ship the
            proof.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const { audience } = useAudience();
  return audience === "student" ? <StudentHero /> : <RecruiterHero />;
}
