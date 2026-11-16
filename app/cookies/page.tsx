import EditorialCover from "@/components/EditorialCover";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CookieSettingsButton } from "@/components/PrivacyChoices";

export const metadata: Metadata = {
  title: "Cookie Policy — iNGen",
  description:
    "How iNGen uses cookies and similar technologies across its website and product.",
};

const LAST_UPDATED = "November 16, 2026";
const EFFECTIVE_DATE = "June 11, 2026";
const CONTACT_EMAIL = "contact@ingenworkspace.com";
const ENTITY_NAME = "INGEN LABS PTY LTD";

const OrangeLink = ({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => (
  <a
    href={href}
    className="text-brand-purple hover:underline font-medium"
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
  >
    {children}
  </a>
);

const COOKIE_CATEGORIES: {
  name: string;
  purpose: string;
  examples: string;
  optional: boolean;
}[] = [
  {
    name: "Strictly necessary",
    purpose:
      "Required to log you in, keep your session secure, remember your role (recruiter or student), and load balance traffic. The site won't work without these.",
    examples: "session token, CSRF token, audience preference",
    optional: false,
  },
  {
    name: "Preferences",
    purpose:
      "Remember UI choices — light/dark mode, Aristotle panel state, last-viewed tab, dismissed notices — so the workspace looks the way you left it.",
    examples: "theme, sidebar state, tour-dismissed flags",
    optional: true,
  },
  {
    name: "Analytics",
    purpose:
      "Help us understand which features are used, where users get stuck, and what to improve. Aggregated and de-identified wherever possible.",
    examples: "page views, feature interactions, performance metrics",
    optional: true,
  },
  {
    name: "Marketing",
    purpose:
      "Measure the effectiveness of campaigns that bring people to iNGen, and avoid showing the same content twice. We don't sell this data.",
    examples: "campaign attribution, conversion pixels",
    optional: true,
  },
];

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. What cookies are",
    body: (
      <p>
        Cookies are small text files stored on your device when you visit a website.
        Similar technologies include local storage, session storage, pixels, and SDKs in
        mobile apps. In this policy, &ldquo;cookies&rdquo; covers all of these.
      </p>
    ),
  },
  {
    title: "2. Who sets them",
    body: (
      <p>
        <span className="font-medium text-brand-ink">First-party cookies</span> are set
        by iNGen ({ENTITY_NAME}).{" "}
        <span className="font-medium text-brand-ink">Third-party cookies</span> are set
        by partners we use for analytics, payments, support chat, or campaign
        measurement. Our subprocessor list is in the{" "}
        <OrangeLink href="/trust">Trust Center</OrangeLink>.
      </p>
    ),
  },
  {
    title: "3. Public website and product storage",
    body: (
      <>
        <p>The public site uses browser local storage to remember whether you chose the recruiter or student view (<code>ingen.audience</code>) and to save your cookie choice (<code>ingen.cookie-preferences</code>). Website analytics are currently off. The demo and booking tools are hosted by third parties that may use their own storage.</p>
        <p>The product may use the following categories of cookies and similar technologies:</p>
        <div className="mt-2 overflow-x-auto rounded-lg border border-black/5">
          <table className="w-full text-[13px]">
            <thead className="bg-brand-bg/60 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-brand-ink">Category</th>
                <th className="px-3 py-2 font-medium text-brand-ink">Purpose</th>
                <th className="px-3 py-2 font-medium text-brand-ink">Optional?</th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_CATEGORIES.map((c) => (
                <tr key={c.name} className="border-t border-black/5 align-top">
                  <td className="px-3 py-3 font-medium text-brand-ink whitespace-nowrap">
                    {c.name}
                  </td>
                  <td className="px-3 py-3 text-brand-ink/80">
                    {c.purpose}
                    <span className="block mt-1 text-[12px] text-brand-ink/55">
                      Examples: {c.examples}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-brand-ink/80 whitespace-nowrap">
                    {c.optional ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: "4. Your choices",
    body: (
      <>
        <p>
          You can change your website analytics preference at any time in{" "}
          <CookieSettingsButton className="font-medium text-brand-ink underline decoration-brand-purple underline-offset-4" />.
          You can also clear this site&apos;s browser data to reset both saved preferences.
        </p>
        <p>
          Most browsers also let you block or delete cookies (Chrome, Safari, Firefox,
          Edge). Blocking strictly necessary cookies will break parts of the site —
          you&apos;ll be signed out and your role toggle, theme, and tour state will
          reset.
        </p>
      </>
    ),
  },
  {
    title: "5. Do Not Track",
    body: (
      <p>
        Browsers send a &ldquo;Do Not Track&rdquo; signal that isn&apos;t consistently
        defined across the industry. We honour explicit cookie choices made in our
        banner, and the Global Privacy Control (GPC) where supported.
      </p>
    ),
  },
  {
    title: "6. Retention",
    body: (
      <p>
        The two public website preferences remain in local storage until you clear the site data.
        Session cookies disappear when you close your browser. Persistent cookies last
        from a few minutes (CSRF tokens) up to 13 months (campaign attribution). We
        review retention periods regularly to keep them as short as practical.
      </p>
    ),
  },
  {
    title: "7. Updates",
    body: (
      <p>
        We may update this policy as we add or retire cookies. The &ldquo;Last
        updated&rdquo; date at the top reflects the current version.
      </p>
    ),
  },
  {
    title: "8. Contact",
    body: (
      <p>
        Questions about cookies? Email{" "}
        <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>. For
        broader privacy questions, see our{" "}
        <OrangeLink href="/privacy">Privacy Policy</OrangeLink>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <main className="bg-brand-bg">
      <Navbar />
      <EditorialCover photo="privacy" />

      <section className="px-4 pt-10 pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-brand-ink/60">Legal</p>
          <h1 className="mt-3 font-display text-[38px] md:text-[56px] leading-tight text-brand-ink">
            Cookie Policy
          </h1>
          <p className="mt-3 text-[13px] text-brand-ink/70">
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/5 bg-white px-5 py-7 md:px-8 md:py-10 shadow-sm">
          <p className="text-[16px] leading-8 text-brand-ink/80">
            This page explains the cookies and similar technologies iNGen uses on our
            website and in the product, why we use them, and how you can control them.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-forge-line bg-brand-bg p-4 sm:p-5">
            <div>
              <p className="font-semibold text-brand-ink">Your cookie preferences</p>
              <p className="mt-1 text-sm text-brand-muted">Review or change the choice saved on this browser.</p>
            </div>
            <CookieSettingsButton className="workflow-action workflow-action-primary" />
          </div>

          <div className="mt-8 space-y-10">
            {SECTIONS.map((s) => (
              <article key={s.title}>
                <h2 className="font-display text-[22px] md:text-[26px] text-brand-ink">
                  {s.title}
                </h2>
                <div className="mt-2 space-y-3 text-[16px] leading-8 text-brand-ink/80">
                  {s.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
