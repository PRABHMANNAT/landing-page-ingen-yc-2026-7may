"use client";
import Link from "next/link";
export default function GlobeWaitlist() {
  return <section className="editorial-section">
    <div className="rounded-2xl bg-[#e9eddf] px-7 py-10 md:px-14 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="max-w-xl"><p className="eyebrow mb-4">An invitation to try a different approach</p><h2>Meet your next workspace.</h2><p className="mt-4 text-[#656259]">Get a closer look at iNGEN with the team, or join the waitlist for access updates.</p></div>
      <div className="flex shrink-0 flex-col gap-3"><Link href="/signup" className="btn-dark">Join the waitlist</Link><Link href="/book-demo" className="btn-outline">Book a demo</Link></div>
    </div>
  </section>;
}
