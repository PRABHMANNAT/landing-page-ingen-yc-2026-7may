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
  const linkClass = "underline-offset-4 hover:underline focus-visible:underline";

  return (
    <nav aria-label="Policies" className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs ${className}`}>
      {policies.map(({ href, label }) => (
        <Link key={href} href={href} className={linkClass}>{label}</Link>
      ))}
      <CookieSettingsButton className={linkClass} />
    </nav>
  );
}
