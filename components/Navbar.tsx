"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useAudience, Audience } from "./AudienceContext";

const navItems = [
  { label: "Features", hasMenu: false, href: "/features" },
  { label: "Pricing", hasMenu: false, href: "/pricing" },
];

function AudienceSwitch() {
  const { audience, setAudience } = useAudience();
  const router = useRouter();
  const pathname = usePathname();
  const opts: { key: Audience; label: string }[] = [
    { key: "recruiter", label: "For Recruiters" },
    { key: "student", label: "For Students" },
  ];

  const handleSelect = (key: Audience) => {
    setAudience(key);
    if (pathname !== "/") router.push("/");
  };

  return (
    <div
      role="tablist"
      aria-label="Audience"
      className="relative inline-flex items-center bg-black/5 border border-black/10 rounded-full p-1"
    >
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-brand-ink shadow-sm transition-transform duration-300 ease-out ${
          audience === "student" ? "translate-x-[calc(100%+0px)]" : "translate-x-0"
        }`}
        style={{ left: 4 }}
      />
      {opts.map((o) => {
        const active = audience === o.key;
        return (
          <button
            key={o.key}
            role="tab"
            aria-selected={active}
            onClick={() => handleSelect(o.key)}
            className={`relative z-10 label-mono px-3.5 py-1.5 rounded-full transition-colors ${
              active ? "text-white" : "text-brand-ink/70 hover:text-brand-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { audience } = useAudience();
  const isStudent = audience === "student";

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur border-b transition-colors ${
        isStudent
          ? "bg-forge-cream/90 border-forge-line"
          : "bg-brand-bg/95 border-black/5"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 h-[68px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`label-mono flex items-center gap-1.5 ${
                isStudent
                  ? "text-forge-ink/80 hover:text-forge-ink"
                  : "text-brand-ink/85 hover:text-brand-ink"
              }`}
            >
              {item.label}
              {item.hasMenu && (
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <AudienceSwitch />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="label-mono px-4 py-2 rounded-full bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors shadow-sm"
          >
            Join Waitlist
          </Link>
          <a
            href="/book-demo"
            className="group relative hidden md:inline-flex items-center label-mono px-4 py-2 rounded-full bg-black backdrop-blur-md border border-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-white/25 hover:bg-neutral-900 transition-all overflow-hidden"
          >
            <span className="relative z-10">View Demo</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
          </a>
        </div>
      </div>

      <div
        className={`md:hidden border-t px-6 py-2 flex justify-center ${
          isStudent ? "border-forge-line" : "border-black/5"
        }`}
      >
        <AudienceSwitch />
      </div>
    </header>
  );
}
