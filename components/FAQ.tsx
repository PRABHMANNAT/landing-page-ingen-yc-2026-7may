"use client";
import Link from "next/link";
import { useAudience } from "./AudienceContext";

const recruiter = [
  ["Who is iNGEN for?", "Recruiters, founders, and hiring teams who want to organise role requirements, candidate evidence, and interview preparation in one place."],
  ["How do I get access?", "Join the waitlist with your email address. You can also book a demo to discuss your hiring workflow with the team."],
  ["What does Sherlock do?", "Sherlock helps review the evidence behind a candidate’s profile. Hiring teams should check source material and make the final decision."],
  ["Can I use it with my team?", "The workspace is designed around shared hiring decisions. Book a demo to discuss seats, permissions, and the features your team needs."],
  ["Can I bring my existing tools?", "Tell us which tools you use when booking a demo. We can walk through the current integration options and your requirements."]
];
const student = [
  ["What is the student workspace?", "A place to plan your learning, organise work samples, explore roles, and prepare for interviews."],
  ["How do I build a roadmap?", "Start with a target role, your current experience, and the time you can spend each week. Use those details to choose manageable learning goals."],
  ["What belongs in my profile?", "Projects, work samples, and a clear explanation of your contribution. Share links you have permission to publish."],
  ["Can I tailor my applications?", "Collections helps organise different work samples and saved roles so you can prepare for each application."],
  ["How do I join?", "Join the waitlist using the email address where you want to receive access updates."]
];
export default function FAQ() {
  const { audience } = useAudience();
  return <section className="editorial-section grid gap-10 md:grid-cols-[.8fr_1.2fr]">
    <div><p className="eyebrow mb-4">Questions, answered</p><h2>A few things<br />to know.</h2><p className="mt-5 text-[#656259]">Have something else in mind?</p><Link href="/book-demo" className="inline-block mt-4 underline underline-offset-4">Talk to the team →</Link></div>
    <div>{(audience === "student" ? student : recruiter).map(([question, answer]) => <details key={question} className="group border-b border-[#d4d1c7] py-5">
      <summary className="cursor-pointer flex justify-between gap-6 list-none font-medium">{question}<span aria-hidden className="group-open:rotate-45 transition-transform text-xl">+</span></summary><p className="mt-4 pr-6 text-[#656259] text-sm">{answer}</p>
    </details>)}</div>
  </section>;
}
