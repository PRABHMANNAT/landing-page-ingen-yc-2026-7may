import Link from "next/link";
import { CookieSettingsButton } from "./PrivacyChoices";

const policies = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookies" },
  { href: "/refunds", label: "Refunds" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function PolicyLinks({ className = "" }: { className?: string }) {
  const linkClass = "inline-flex min-h-9 items-center rounded-md px-2 py-1.5 underline-offset-4 hover:underline focus-visible:underline";

  return (
    <nav aria-label="Policies" className={`flex flex-wrap items-center gap-x-1 gap-y-1 text-sm ${className}`}>
      {policies.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass}>{label}</Link>
      ))}
      <CookieSettingsButton className={`${linkClass} border border-current/25 font-medium`} />
    </nav>
  );
}
