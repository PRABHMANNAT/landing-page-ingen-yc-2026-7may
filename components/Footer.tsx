"use client";

import Link from "next/link";
import Logo from "./Logo";
import PolicyLinks from "./PolicyLinks";
import { useAudience } from "./AudienceContext";

type FooterGroup = { title: string; links: [label: string, href: string][] };

const company: FooterGroup = {
  title: "Company",
  links: [
    ["About Us", "/resources/about"],
    ["Careers", "https://v0-ingen-labs-careers-page.vercel.app/"],
    ["Blog", "/resources/blog"],
    ["Media Kit", "/resources/media"],
    ["Press", "/resources/press"],
  ],
};

const recruiterGroups: FooterGroup[] = [
  { title: "Platform", links: [
    ["Dashboard", "/resources/dashboard"],
    ["Aristotle — workflow AI", "/resources/aristotle"],
    ["Sherlock — proof AI", "/resources/sherlock"],
    ["Interviews", "/resources/interviews"],
    ["Settings", "/resources/settings"],
  ] },
  { title: "Resources", links: [
    ["Docs", "/resources/docs"], ["Pricing", "/pricing"],
    ["Hiring playbook", "/resources/hiring-playbook"],
    ["Proof scoring guide", "/resources/proof-scoring"],
    ["Partners", "/resources/partners"], ["Help Center", "/resources/help"],
  ] },
  company,
  { title: "Security & Legal", links: [
    ["Trust Center", "/trust"], ["AI Audit Center", "/resources/ai-audit"],
    ["Privacy Choices", "/cookies"], ["Data handling", "/privacy"],
  ] },
];

const studentGroups: FooterGroup[] = [
  { title: "Platform", links: [
    ["Roadmap (Aristotle)", "/resources/roadmap"], ["Jobs (Columbus)", "/resources/jobs"],
    ["Manage Profile", "/resources/profile"], ["Collections", "/resources/collections"],
    ["Chrome Extension", "/resources/extension"],
  ] },
  { title: "Resources", links: [
    ["Docs", "/resources/docs"], ["Pricing", "/pricing"],
    ["Roadmap Library", "/resources/roadmap-library"], ["Sample Profiles", "/resources/sample-profiles"],
    ["Interview Prep", "/resources/interview-prep"], ["Help Center", "/resources/help"],
  ] },
  { title: "For Students", links: [
    ["Student access", "/resources/student-access"], ["Campus ambassadors", "/resources/ambassadors"],
    ["Referral", "/resources/referrals"], ["Discord community", "/resources/community"],
    ["Study guides", "/resources/study-guides"],
  ] },
  company,
];

export default function Footer() {
  const { audience } = useAudience();
  const groups = [
    ...(audience === "student" ? studentGroups : recruiterGroups),
    { title: "Get Started", links: [
      ["Join the waitlist", "/signup"], ["Sign up", "/signup"],
      ["Book a Demo", "/book-demo"], ["Request a walkthrough", "/book-demo"],
    ] } satisfies FooterGroup,
  ];

  return (
    <footer className="relative overflow-hidden bg-[#eeece5] text-[#292824]">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-16">
        <div className="grid grid-cols-2 gap-8 border-b border-black/10 pb-12 md:grid-cols-5">
          {groups.map(({ title, links }) => (
            <div key={title}>
              <h2 className="label-mono mb-4 text-black/55">{title}</h2>
              <ul className="space-y-2.5 text-[13px]">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-black/75 hover:text-black hover:underline">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="pointer-events-none mt-10 select-none font-display text-[clamp(68px,16vw,180px)] leading-none tracking-tightest text-black/10">iNGEN</div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-xs text-black/65">
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" aria-label="iNGEN home"><Logo /></Link>
            <span>© 2026 iNGEN · Proof-first hiring</span>
          </div>
          <PolicyLinks />
        </div>
      </div>
    </footer>
  );
}

