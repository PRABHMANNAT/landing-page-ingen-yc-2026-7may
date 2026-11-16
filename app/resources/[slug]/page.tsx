import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { resources } from "@/data/resources";
import ResourceGuide from "@/components/ResourceGuide";
import EditorialCover from "@/components/EditorialCover";
import WorkflowVisual from "@/components/WorkflowVisual";
import { platformGuides } from "@/data/platformGuides";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(resources).map((slug) => ({ slug }));
}

function getResource(slug: string) {
  if (!Object.prototype.hasOwnProperty.call(resources, slug)) notFound();
  return resources[slug];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = getResource((await params).slug);
  return {
    title: `${resource.title} — iNGEN`,
    description: resource.description,
  };
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  if (slug === "docs") return <ResourceGuide />;
  const { title, description, guidance, next } = getResource(
    slug,
  );
  const guide = platformGuides[slug];

  return (
    <ArticlePage category="Resources" title={title} description={description} cover={slug === "ai-audit" ? <EditorialCover photo="audit" /> : undefined}>
      {slug === "ai-audit" && <>
        <section>
          <h2>What to record in an AI review</h2>
          <p>Record the recommendation, the source material available to the reviewer, the rule or job requirement used to assess it, and the eventual human decision. Keep a short note explaining any disagreement with the recommendation.</p>
        </section>
        <section>
          <h2>Check outcomes across candidates</h2>
          <p>Use the same criteria for candidates applying for the same role. Look for cases where missing public evidence, inaccessible work samples, or irrelevant information changed a recommendation. Return to the original evidence before drawing conclusions.</p>
        </section>
        <section>
          <h2>Escalate inaccurate or sensitive results</h2>
          <p>Set the recommendation aside until a reviewer can verify it. Share a brief, de-identified example with the team through the <Link href="/trust">Trust Center</Link>. Keep private candidate materials within the authorised workspace.</p>
        </section>
      </>}
      {guide && <WorkflowVisual title={title} steps={guide.steps} />}
      <section>
        <h2>Put it into practice</h2>
        <p>{guidance}</p>
      </section>
      {guide && <>
        <section><h2>Worked example</h2><p>{guide.example}</p></section>
        <section><h2>Before you move on</h2><p>{guide.review}</p></section>
      </>}
      <section>
        <h2>Continue exploring</h2>
        <p>
          <Link href={next.href}>{next.label}</Link>
        </p>
        <p className="mt-4">
          For questions about availability or your workspace,{" "}
          <Link href="/resources/help">contact the iNGEN team</Link>.
        </p>
      </section>
    </ArticlePage>
  );
}
