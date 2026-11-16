"use client";

import Link from "next/link";
import { useAudience } from "./AudienceContext";

export default function Hero() {
  const { audience } = useAudience();
  const student = audience === "student";
  return (
    <section className="editorial-hero">
      <p className="eyebrow">{student ? "iNGEN for students" : "iNGEN for hiring teams"}</p>
      <h1>{student ? <>Make your next<br />move a good one.</> : <>Good people.<br />Clearer decisions.</>}</h1>
      <p className="hero-description">{student ? "A place to plan what to learn, collect the work you’re proud of, and prepare for the role you want." : "Turn a hiring brief into a considered shortlist. Plan with Aristotle, review the evidence with Sherlock, and keep your team in the conversation."}</p>
      <div className="action-row"><Link href="/signup" className="btn-dark">Join the waitlist</Link><Link href="/book-demo" className="btn-outline">Book a demo</Link></div>
      <p className="hero-note">Built for the work behind every opportunity.</p>
    </section>
  );
}
