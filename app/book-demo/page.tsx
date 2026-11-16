"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";
import Logo from "@/components/Logo";
import PolicyLinks from "@/components/PolicyLinks";

const CALENDLY_URL =
  "https://calendly.com/contact-ingenworkspace/product-demo?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=ea7659";

export default function BookDemoPage() {
  // Handle client-side navigation: if widget.js is already loaded it won't
  // auto-scan again, so init the embed manually when it's empty.
  useEffect(() => {
    const w = window as unknown as {
      Calendly?: {
        initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void;
      };
    };
    const el = document.getElementById("calendly-embed");
    if (w.Calendly && el && !el.querySelector("iframe")) {
      w.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: el });
    }
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-brand-bg flex items-center justify-center px-3 sm:px-6 pt-16 sm:pt-10 pb-6 sm:pb-10">
      <Link
        href="/"
        aria-label="Go back to home"
        title="Go back to home"
        className="group fixed top-4 left-4 sm:top-5 sm:left-5 z-30 inline-flex items-center h-10 rounded-full border border-black/[0.08] bg-white/85 text-brand-ink shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur-md pl-[11px] pr-[11px] hover:pr-4 transition-all duration-300 ease-out hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-[2px]"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="overflow-hidden whitespace-nowrap text-[13px] font-medium max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:ml-1.5 transition-[max-width,opacity,margin] duration-300 ease-out">
          Go back
        </span>
      </Link>

      {/* Booking card — full width, centered */}
      <div className="relative flex w-full max-w-[1080px] flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] lg:flex-row">
        {/* LEFT: existing event info column */}
        <div className="border-b border-black/[0.07] px-8 py-9 lg:w-[38%] lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
          <Link href="/" aria-label="iNGen home" className="inline-flex">
            <Logo />
          </Link>

          <h2 className="mt-8 font-display text-[28px] leading-tight text-brand-ink">
            iNGen Product Demo
          </h2>

          <p className="mt-6 text-[14.5px] leading-relaxed text-brand-ink/70">
            A live walkthrough of iNGen — Aristotle, Sherlock, and the full
            proof-first hiring pipeline. Bring your toughest hiring questions and
            we&apos;ll show you exactly how the workspace handles them.
          </p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href={CALENDLY_URL} className="underline underline-offset-4">Open booking calendar</a>
            <a href="mailto:contact@ingenworkspace.com?subject=Product%20demo" className="underline underline-offset-4">Email us to book</a>
          </p>
          <PolicyLinks className="mt-6 text-brand-ink/75" />
        </div>

        {/* RIGHT: Calendly inline widget */}
        <div className="flex-1 px-2 py-4 sm:px-4 lg:px-2 lg:py-2">
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ height: 700 }}
          />
        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
