"use client";

import { useAudience } from "./AudienceContext";

export default function AnnouncementBar() {
  const { audience } = useAudience();

  if (audience === "student") {
    return (
      <div className="w-full bg-brand-purple text-white text-[12px] py-2 px-4 text-center relative z-50">
        <span className="font-medium">
          iNGEN is live — Aristotle now ships role-fit roadmaps in under 30 seconds
        </span>
        <span className="mx-2 opacity-70">→</span>
        <a href="/signup" className="underline underline-offset-2 hover:opacity-90">
          See the launch
        </a>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-purple text-white text-[12px] py-2 px-4 text-center relative z-50">
      <span className="font-medium">
        iNGEN for recruiters is live — Sherlock now triangulates GitHub, work, university &amp; club proofs in seconds
      </span>
      <span className="mx-2 opacity-70">→</span>
      <a href="/signup" className="underline underline-offset-2 hover:opacity-90">
        See how proof-first hiring works
      </a>
    </div>
  );
}
