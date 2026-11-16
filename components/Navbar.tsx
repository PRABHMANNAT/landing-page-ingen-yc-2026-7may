"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useAudience } from "./AudienceContext";

export default function Navbar() {
  const { audience, setAudience } = useAudience();
  const pathname = usePathname();
  return <header className="sticky top-0 z-40 border-b border-[#dedbd2] bg-[#faf9f5]/95 backdrop-blur">
    <div className="mx-auto max-w-[1280px] px-5 md:px-8 flex min-h-[76px] items-center justify-between gap-5">
      <Link href="/" aria-label="iNGEN home"><Logo /></Link>
      <nav aria-label="Main navigation" className="hidden md:flex gap-6 text-sm">
        {[["Features","/features"],["Pricing","/pricing"],["Resources","/resources/docs"]].map(([label,href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className="hover:underline underline-offset-4">{label}</Link>)}
      </nav>
      <div className="hidden lg:flex gap-1 rounded-full border border-[#dedbd2] p-1" aria-label="Choose your audience">
        {(["recruiter","student"] as const).map(value => <button key={value} aria-pressed={audience === value} onClick={() => setAudience(value)} className={"rounded-full px-3 py-1.5 text-xs " + (audience === value ? "bg-[#292824] text-white" : "text-[#656259]")}>{value === "student" ? "For students" : "For recruiters"}</button>)}
      </div>
      <Link href="/signup" className="btn-dark">Join the waitlist</Link>
    </div>
    <div className="lg:hidden px-5 pb-3 flex flex-wrap gap-x-5 gap-y-3 items-center justify-center text-xs">
      <Link href="/features" className="md:hidden">Features</Link><Link href="/pricing" className="md:hidden">Pricing</Link>
      {(["recruiter","student"] as const).map(value => <button key={value} aria-pressed={audience === value} onClick={() => setAudience(value)} className={audience === value ? "underline underline-offset-4 font-semibold" : ""}>{value === "student" ? "For students" : "For recruiters"}</button>)}
    </div>
  </header>;
}
