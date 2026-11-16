import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export default function NotFound() {
  return (
    <ArticlePage category="Page unavailable" title="This page could not be found." description="Choose a destination below to continue exploring iNGEN.">
      <div className="flex flex-wrap gap-3">
        <Link className="btn-dark" href="/">Back to home</Link>
        <Link className="btn-outline" href="/features">Explore features</Link>
      </div>
    </ArticlePage>
  );
}
