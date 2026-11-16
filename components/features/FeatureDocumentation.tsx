import Link from "next/link";
import { platformGuides } from "@/data/platformGuides";
import { studentDocumentation } from "@/data/studentDocumentation";
import WorkflowVisual from "../WorkflowVisual";

const recruiter = [
  ["Start with the role brief", "aristotle"], ["Check candidate evidence", "sherlock"],
  ["Prepare a consistent interview", "interviews"], ["Track decisions and access", "dashboard"],
];
const student = [
  ["Plan your learning", "roadmap"], ["Check the jobs you shortlist", "jobs"],
  ["Document your strongest work", "profile"], ["Organise each application", "collections"],
];

export default function FeatureDocumentation({ isStudent }: { isStudent: boolean }) {
  const chapters = isStudent ? student : recruiter;
  return (
    <section aria-labelledby="feature-guide" className="mt-16 border-t border-forge-line pt-12 sm:mt-24 sm:pt-16">
      <div className="max-w-2xl">
        <h2 id="feature-guide" className="font-display text-3xl sm:text-4xl">{isStudent ? "Using the student workspace" : "Using the recruiter workspace"}</h2>
        <p className="mt-4 text-lg leading-8 text-brand-muted">{isStudent
          ? "Work through a first roadmap, then use the projects you finish to build a profile and choose what to apply for."
          : "Follow one role from the first brief to the interview. Keep the evidence and decisions in view as the hiring team reviews candidates."}</p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {chapters.map(([title, slug]) => {
          const guide = platformGuides[slug];
          const documentation = studentDocumentation[slug];
          return <article key={slug} className="flex flex-col gap-5 rounded-2xl border border-forge-line bg-white p-5 shadow-sm sm:p-7">
            <div>
              <h3 className="font-display text-2xl leading-tight">{title}</h3>
              <p className="mt-3 leading-7 text-brand-muted">{guide.example}</p>
            </div>
            <WorkflowVisual title="Practice checklist" steps={documentation?.labels ?? guide.steps} details={documentation?.notes} />
            <p className="border-l-2 border-[#c99178] pl-3 text-sm leading-6 text-brand-muted">{guide.review}</p>
            <Link href={`/resources/${slug}`} className="workflow-action workflow-action-secondary mt-auto self-start" aria-label={`Read the guide: ${title}`}>Read the guide <span aria-hidden>↗</span></Link>
          </article>;
        })}
      </div>
      <Link href="/resources/docs" className="workflow-action workflow-action-primary mt-8">Explore the documentation <span aria-hidden>↗</span></Link>
    </section>
  );
}
