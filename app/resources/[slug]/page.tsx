import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { resources } from "@/data/resources";
import ResourceGuide from "@/components/ResourceGuide";

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

  return (
    <ArticlePage category="Resources" title={title} description={description}>
      <section>
        <h2>Put it into practice</h2>
        <p>{guidance}</p>
      </section>
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
