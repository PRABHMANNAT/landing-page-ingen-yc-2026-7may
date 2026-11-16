import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function ArticlePage({
  category,
  title,
  description,
  children,
}: {
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#faf9f5]">
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-5 py-12 md:py-20">
        <div className="mb-10 text-sm text-[#77736a]">
          <Link href="/">Home</Link>
          <span className="mx-3">/</span>
          {category}
        </div>
        <div className="grid md:grid-cols-[220px_1fr] gap-10 md:gap-16">
          <aside className="border-t border-[#d4d1c7] pt-5">
            <p className="eyebrow">{category}</p>
            <nav
              aria-label="Explore resources"
              className="flex flex-wrap md:flex-col gap-4 text-sm mt-6"
            >
              <Link href="/resources/docs">Getting started</Link>
              <Link href="/features">The workspace</Link>
              <Link href="/resources/help">Get help</Link>
            </nav>
          </aside>
          <article>
            <h1 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.08] mb-7">
              {title}
            </h1>
            <p className="text-xl leading-relaxed text-[#656259] mb-10">
              {description}
            </p>
            <div className="space-y-8 text-base leading-8 text-[#514e47] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:mb-4 [&_h2]:text-[#292824] [&_a]:underline [&_a]:underline-offset-4">
              {children}
            </div>
            <div className="mt-12 border-t border-[#d4d1c7] pt-7">
              <p className="text-sm text-[#656259]">
                Want to see how this fits your work?
              </p>
              <Link className="btn-outline mt-4" href="/book-demo">
                Book a walkthrough
              </Link>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
