"use client";
import Link from "next/link";
import { useAudience } from "../AudienceContext";
import HowItWorks from "../sections/HowItWorks";
import NextSteps from "../NextSteps";
export default function FeaturesShell() {
  const { audience } = useAudience();
  return <>
    <section className="editorial-hero"><p className="eyebrow">The iNGEN workspace</p><h1>{audience === "student" ? "Your next chapter,
in the making." : "From the first brief
to the right questions."}</h1><p className="hero-description">A shared place for plans, projects, and the evidence behind a decision. Explore the tools that make each step easier to follow.</p><div className="action-row"><Link href="/signup" className="btn-dark">Join the waitlist</Link><Link href="/book-demo" className="btn-outline">See it with the team</Link></div></section>
    <HowItWorks /><NextSteps />
    <section className="editorial-section border-t border-[#d4d1c7]"><div className="editorial-grid">
      {[["Aristotle","Plan the work","Turn an initial idea into a role brief or a learning roadmap.","/resources/aristotle"],["Sherlock","Review the evidence","Keep candidate claims, sources, and follow-up questions together.","/resources/sherlock"],["Columbus","Explore opportunities","Bring your interests and work samples to the search for a relevant role.","/resources/jobs"]].map(([name,title,body,href]) => <article key={name} className="editorial-card"><p className="eyebrow mb-4">{name}</p><h3>{title}</h3><p>{body}</p><Link href={href}>Meet {name} →</Link></article>)}
    </div></section>
  </>;
}
