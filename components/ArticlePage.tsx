import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ArticlePage({ category, title, description, children }: {
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-brand-bg">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <header className="mb-7 text-center">
          <p className="label-mono text-brand-ink/60">{category}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-brand-ink md:text-[40px]">{title}</h1>
        </header>
        <article className="space-y-6 rounded-2xl border border-black/5 bg-white px-5 py-7 text-sm leading-7 text-brand-ink/80 shadow-sm md:p-10 [&_a]:font-medium [&_a]:text-brand-ink [&_a]:underline [&_a]:decoration-brand-purple [&_a]:underline-offset-4 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-brand-ink">
          <p>{description}</p>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}
