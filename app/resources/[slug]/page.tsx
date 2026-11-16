import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticlePage from "@/components/ArticlePage";
import { resources } from "@/data/resources";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(resources).map((slug) => ({ slug }));
}

function getResource(slug: string) {
  if (!Object.prototype.hasOwnProperty.call(resources, slug)) notFound();
  return resources[slug];
}

export function generateMetadata({ params }: Props): Metadata {
  const resource = getResource(params.slug);
  return { title: `${resource.title} — iNGEN`, description: resource.description };
}

export default function ResourcePage({ params }: Props) {
  const { title, description, guidance, next } = getResource(params.slug);

  return (
    <ArticlePage category="Resources" title={title} description={description}>
      <p>{guidance}</p>
      <p><Link href={next.href}>{next.label}</Link></p>
    </ArticlePage>
  );
}
