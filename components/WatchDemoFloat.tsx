"use client";

import { useAudience } from "./AudienceContext";

export default function WatchDemoFloat() {
  const { audience } = useAudience();

  if (audience === "student") {
    return (
      <a
        href="/signup"
        className="fixed bottom-5 right-5 z-50 hidden md:flex items-center gap-2 bg-forge-amber text-forge-ink px-3 py-2 rounded-full shadow-xl hover:brightness-105 transition"
      >
        <span className="w-7 h-7 rounded-full bg-forge-ink flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M3 2L9 6L3 10V2Z" fill="#F5A623" />
          </svg>
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
          Watch demo
        </span>
      </a>
    );
  }

  return (
    <a
      href="/signup"
      className="fixed bottom-5 right-5 z-50 hidden md:flex items-center gap-2 bg-brand-ink/95 text-white px-3 py-2 rounded-full shadow-xl hover:bg-brand-ink transition"
    >
      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
          <path d="M3 2L9 6L3 10V2Z" fill="white" />
        </svg>
      </span>
      <span className="label-mono">Watch Demo</span>
    </a>
  );
}
