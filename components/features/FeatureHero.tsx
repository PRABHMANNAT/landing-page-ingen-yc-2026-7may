import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Circle, ClipboardList, FileCheck2, Route } from "lucide-react";

const studentPreview = {
  label: "Roadmap example",
  title: "Frontend portfolio",
  description: "From your first sketch to a shareable project.",
  rows: [
    { title: "Pick a project", detail: "A searchable product catalogue", icon: Route, done: true },
    { title: "Build and test", detail: "Search, filters, and keyboard access", icon: Check, done: false },
    { title: "Publish your proof", detail: "Link the demo and explain one tradeoff", icon: FileCheck2, done: false },
  ],
};

const recruiterPreview = {
  label: "Hiring workflow example",
  title: "Frontend engineer",
  description: "Keep the brief, evidence, and interview together.",
  rows: [
    { title: "Agree on the brief", detail: "Define what the first hire needs to deliver", icon: ClipboardList, done: true },
    { title: "Review work samples", detail: "Check the source and the candidate’s contribution", icon: FileCheck2, done: false },
    { title: "Prepare the interview", detail: "Give each reviewer a question and a criterion", icon: CalendarDays, done: false },
  ],
};

export default function FeatureHero({ isStudent }: { isStudent: boolean }) {
  const preview = isStudent ? studentPreview : recruiterPreview;
  return (
    <section aria-labelledby="features-title" className="bg-brand-bg px-5 pt-7 sm:px-6 sm:pt-10">
      <div className="mx-auto grid max-w-[1180px] items-center gap-9 overflow-hidden rounded-[24px] border border-[#e3d8c9] bg-[#f5eddf] p-6 sm:p-10 lg:grid-cols-[1fr_0.91fr] lg:gap-12 lg:p-12">
        <div>
          <p className="text-sm font-semibold text-[#7d4932]">{isStudent ? "FORGE for students" : "iNGEN for recruiters"}</p>
          <h1 id="features-title" className="mt-4 text-balance font-display text-[clamp(2.45rem,5vw,4rem)] leading-[1.04] tracking-tightest text-[#231c17]">
            {isStudent ? "Build proof of what you can do." : "Make hiring decisions you can explain."}
          </h1>
          <p className="mt-5 max-w-[43ch] text-base leading-7 text-[#5e5148] sm:text-[17px]">
            {isStudent
              ? "Plan what to learn, find roles that fit, and turn your projects into work samples you can share with recruiters."
              : "Write a clear role brief, check the evidence behind each candidate’s experience, and bring that context into the interview."}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={isStudent ? "/signup" : "/book-demo"} className="workflow-action workflow-action-primary">
              {isStudent ? "Join the FORGE waitlist" : "Book a demo"} <ArrowRight size={16} aria-hidden />
            </Link>
            <Link href="/demo" className="workflow-action workflow-action-secondary">See the live preview</Link>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-[#e6d8c7] bg-[#fbf6ee] p-3 sm:p-4">
          <figure className="rounded-xl border border-[#e5ded5] bg-white shadow-[0_12px_24px_-20px_rgba(56,37,24,0.35)]">
            <figcaption className="border-b border-[#ece5dc] px-4 py-3 text-xs font-semibold text-[#745847] sm:px-5">{preview.label}</figcaption>
            <div className="px-4 pt-4 sm:px-5">
              <p className="font-display text-xl text-brand-ink">{preview.title}</p>
              <p className="mt-1 text-sm text-brand-muted">{preview.description}</p>
            </div>
            <ol className="space-y-1 p-3 sm:p-4">
              {preview.rows.map(({ title, detail, icon: Icon, done }) => (
                <li key={title} className="flex items-center gap-3 rounded-lg border border-[#f0e9e0] bg-[#fcfaf6] p-2.5 sm:p-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#f0e5d6] text-[#74513d]"><Icon size={16} strokeWidth={1.6} aria-hidden /></span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-5 text-brand-ink">{title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-brand-muted">{detail}</p>
                  </div>
                  {done
                    ? <Check size={17} className="shrink-0 text-[#3f694d]" aria-label="Done in this example" />
                    : <Circle size={12} className="shrink-0 text-[#a68e7b]" aria-label="Upcoming in this example" />}
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </div>
    </section>
  );
}
