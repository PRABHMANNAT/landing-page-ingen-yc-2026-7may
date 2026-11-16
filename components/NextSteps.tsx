"use client";
import Link from "next/link";
import { useAudience } from "./AudienceContext";

export default function NextSteps() {
  const { audience } = useAudience();
  const student = audience === "student";
  return <section className="editorial-section">
    <p className="eyebrow mb-4">A little preparation goes a long way</p>
    <h2 className="max-w-2xl mb-9">{student ? "Put your work to work." : "Make room for a better conversation."}</h2>
    <div className="editorial-grid">
      <article className="editorial-card"><h3>{student ? "Choose a direction" : "Agree on the role"}</h3><p>{student ? "Pick a target role and a project small enough to finish. A clear next step makes progress easier to see." : "Write down what success looks like before you start searching. Give everyone the same criteria to work from."}</p><Link href={student ? "/resources/roadmap-library" : "/resources/hiring-playbook"}>Read the guide →</Link></article>
      <article className="editorial-card"><h3>Keep the evidence close</h3><p>{student ? "Collect the projects, decisions, and results that show how you think. Give each work sample a little context." : "Keep source material beside each recommendation so reviewers can ask better questions and spot missing context."}</p><Link href={student ? "/resources/profile" : "/resources/proof-scoring"}>Explore proof profiles →</Link></article>
      <article className="editorial-card"><h3>Prepare together</h3><p>Turn what you’ve learned into questions worth asking. Keep notes, discuss the tradeoffs, and decide what comes next.</p><Link href="/resources/interview-prep">Prepare for an interview →</Link></article>
    </div>
  </section>;
}
