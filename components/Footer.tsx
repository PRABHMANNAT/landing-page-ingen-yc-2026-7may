"use client";

import Logo from "./Logo";
import { useAudience } from "./AudienceContext";

const linkHrefs: Record<string, string> = {
  Careers: "https://v0-ingen-labs-careers-page.vercel.app/",
  "Trust Center": "/trust",
  "Privacy Choices": "/privacy",
  "Data handling": "/privacy",
};

const recruiterCols = [
  { title: "Platform", links: ["Dashboard", "Aristotle — workflow AI", "Sherlock — proof AI", "Interviews", "Settings"] },
  { title: "Resources", links: ["Docs", "Pricing", "Hiring playbook", "Proof scoring guide", "Partners", "Help Center"] },
  { title: "Company", links: ["About Us", "Careers", "Blog", "Media Kit", "Press"] },
  { title: "Security & Legal", links: ["Trust Center", "AI Audit Center", "Privacy Choices", "Data handling"] },
];

const studentCols = [
  { title: "Platform", links: ["Roadmap (Aristotle)", "Jobs (Columbus)", "Manage Profile", "Collections", "Chrome Extension"] },
  { title: "Resources", links: ["Docs", "Pricing", "Roadmap Library", "Sample Profiles", "Interview Prep", "Help Center"] },
  { title: "For Students", links: ["Free tier", "Campus ambassadors", "Referral", "Discord community", "Study guides"] },
  { title: "Company", links: ["About Us", "Careers", "Blog", "Media Kit", "Press"] },
];

function RecruiterFooter() {
  return (
    <footer className="bg-brand-deep text-white relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {recruiterCols.map((c) => (
            <div key={c.title}>
              <h4 className="label-mono text-white/55 mb-4">{c.title}</h4>
              <ul className="space-y-2.5 text-[13px]">
                {c.links.map((l) => {
                  const href = linkHrefs[l] ?? "/signup";
                  const external = href.startsWith("http");
                  return (
                    <li key={l}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-white/85 hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-mono text-white/55 mb-4">Get Started</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="/signup" className="text-white/85 hover:text-white">Free Trial</a></li>
              <li><a href="/signup" className="text-white/85 hover:text-white">Sign In</a></li>
              <li><a href="/signup" className="text-white/85 hover:text-white">Book a Demo</a></li>
            </ul>
            <a href="/signup" className="mt-5 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 transition rounded-md px-3 py-2 text-[12px]">
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 2L9 6L3 10V2Z" fill="white" /></svg>
              </span>
              Watch Sherlock prove a profile
            </a>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="font-display text-[120px] md:text-[180px] leading-none text-white/5 tracking-tightest select-none pointer-events-none">
            iNGEN
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/60">
            <div className="flex items-center gap-3">
              <Logo light />
              <span>© 2026 iNGEN</span>
              <span className="opacity-60">·</span>
              <span>Proof-first hiring</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={linkHrefs.Careers} target="_blank" rel="noopener noreferrer" className="hover:text-white">Careers</a>
              <span className="opacity-40">·</span>
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <span className="opacity-40">·</span>
              <a href="/terms" className="hover:text-white">Terms</a>
              <span className="opacity-40">·</span>
              <a href="/cookies" className="hover:text-white">Cookies</a>
              <span className="opacity-40">·</span>
              <a href="/trust" className="hover:text-white">Trust Center</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StudentFooter() {
  return (
    <footer className="bg-brand-deep text-white relative overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {studentCols.map((c) => (
            <div key={c.title}>
              <h4 className="label-mono text-white/55 mb-4">{c.title}</h4>
              <ul className="space-y-2.5 text-[13px]">
                {c.links.map((l) => {
                  const href = linkHrefs[l] ?? "/signup";
                  const external = href.startsWith("http");
                  return (
                    <li key={l}>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-white/85 hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="label-mono text-white/55 mb-4">Get Started</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="/signup" className="text-white/85 hover:text-white">Start free</a></li>
              <li><a href="/signup" className="text-white/85 hover:text-white">Sign In</a></li>
              <li><a href="/signup" className="text-white/85 hover:text-white">Book a Demo</a></li>
            </ul>
            <a href="/signup" className="mt-5 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 transition rounded-md px-3 py-2 text-[12px]">
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 2L9 6L3 10V2Z" fill="white" /></svg>
              </span>
              Watch Aristotle build a roadmap
            </a>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="font-display text-[120px] md:text-[180px] leading-none text-white/5 tracking-tightest select-none pointer-events-none">
            iNGEN
          </div>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 text-[12px] text-white/60">
            <div className="flex items-center gap-3">
              <Logo light />
              <span>© 2026 iNGEN</span>
              <span className="opacity-60">·</span>
              <span>Proof-first hiring</span>
            </div>
            <div className="flex items-center gap-5">
              <a href={linkHrefs.Careers} target="_blank" rel="noopener noreferrer" className="hover:text-white">Careers</a>
              <span className="opacity-40">·</span>
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <span className="opacity-40">·</span>
              <a href="/terms" className="hover:text-white">Terms</a>
              <span className="opacity-40">·</span>
              <a href="/cookies" className="hover:text-white">Cookies</a>
              <span className="opacity-40">·</span>
              <a href="/trust" className="hover:text-white">Trust Center</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Footer() {
  const { audience } = useAudience();
  return audience === "student" ? <StudentFooter /> : <RecruiterFooter />;
}
