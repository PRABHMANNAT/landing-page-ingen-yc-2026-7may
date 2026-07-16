import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trust Center — iNGen",
  description:
    "Security, privacy, compliance, and AI safety practices at iNGen — for recruiters, students, and the data they trust us with.",
};

const LAST_UPDATED = "June 11, 2026";
const CONTACT_EMAIL = "contact@ingenworkspace.com";
const SECURITY_EMAIL = "contact@ingenworkspace.com";
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

const PILLARS = [
  {
    label: "Security",
    title: "Defence in depth",
    body: "Encryption in transit (TLS 1.2+) and at rest (AES-256), role-based access control, hardware-backed MFA for staff, isolated production environments, and continuous vulnerability scanning.",
  },
  {
    label: "Privacy",
    title: "Your data, your control",
    body: "Granular export, deletion, and access controls. No selling of personal information. No training of foundation models on your private content without explicit opt-in.",
  },
  {
    label: "AI Safety",
    title: "Evidence, not assumptions",
    body: "Aristotle and Sherlock outputs are evaluated against held-out benchmarks, audited for bias, and shown alongside the source signals so recruiters can verify rather than trust blindly.",
  },
  {
    label: "Compliance",
    title: "Built for global hiring",
    body: "Aligned with the Australian Privacy Principles, GDPR/UK GDPR, and CCPA/CPRA. SOC 2 Type II audit in progress (target 2026 Q4).",
  },
];

const SUBPROCESSORS: {
  name: string;
  purpose: string;
  region: string;
}[] = [
  { name: "Amazon Web Services", purpose: "Cloud hosting, storage, compute", region: "US, AU" },
  { name: "Supabase", purpose: "Application database & auth", region: "US, EU" },
  { name: "Vercel", purpose: "Edge hosting for marketing & app surfaces", region: "Global edge" },
  { name: "Anthropic", purpose: "Foundation model inference (Claude)", region: "US" },
  { name: "OpenAI", purpose: "Foundation model inference (selected features)", region: "US" },
  { name: "Stripe", purpose: "Payment processing", region: "US, AU" },
  { name: "Resend", purpose: "Transactional email", region: "US" },
  { name: "PostHog", purpose: "Product analytics (de-identified)", region: "US" },
  { name: "Sentry", purpose: "Error and performance monitoring", region: "US" },
];

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Data handling",
    body: (
      <>
        <p>
          We process two broad categories of data: profile signal you connect (GitHub,
          LinkedIn, projects, certifications) and recruiter inputs (job briefs,
          shortlists, candidate notes). Both stay scoped to your account or
          organisation.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Encryption in transit (TLS 1.2+) for every connection.</li>
          <li>Encryption at rest (AES-256) for databases, object storage, and backups.</li>
          <li>Logical isolation between customer tenants.</li>
          <li>Backups taken daily, retained for 30 days, restore-tested quarterly.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Access & authentication",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Role-based access control on every internal system.</li>
        <li>Hardware-backed MFA required for all staff and contractors.</li>
        <li>Just-in-time access to production with full audit logging.</li>
        <li>Quarterly access reviews; immediate revocation on role change or offboarding.</li>
        <li>SSO (SAML/OIDC) available on enterprise plans for customer accounts.</li>
      </ul>
    ),
  },
  {
    title: "AI safety & evaluation",
    body: (
      <>
        <p>
          iNGen&apos;s AI outputs are aids, not decisions. We design every surface so a
          human can verify the evidence.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Aristotle&apos;s roadmaps, briefs, and talking points are grounded in
            connected sources and shown with the underlying signal.
          </li>
          <li>
            Sherlock&apos;s proof scores are explainable: each score links back to the
            GitHub, project, hackathon, or testimonial signal that produced it.
          </li>
          <li>
            We run continuous bias and fairness evals on candidate-scoring outputs and
            document known limitations.
          </li>
          <li>
            We do not train foundation models on your private content without explicit
            opt-in.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Compliance & certifications",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Australian Privacy Principles (Privacy Act 1988, Cth).</li>
        <li>GDPR & UK GDPR — Standard Contractual Clauses for cross-border transfers.</li>
        <li>CCPA / CPRA for California residents.</li>
        <li>SOC 2 Type II — audit in progress (target 2026 Q4).</li>
        <li>ISO 27001 — roadmap (target 2027).</li>
      </ul>
    ),
  },
  {
    title: "Subprocessors",
    body: (
      <>
        <p>
          We use a small number of vetted subprocessors. We give 30 days&apos; notice
          before adding new ones, and customers can subscribe to subprocessor updates by
          emailing{" "}
          <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>.
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-black/5">
          <table className="w-full text-[13px]">
            <thead className="bg-brand-bg/60 text-left">
              <tr>
                <th className="px-3 py-2 font-medium text-brand-ink">Provider</th>
                <th className="px-3 py-2 font-medium text-brand-ink">Purpose</th>
                <th className="px-3 py-2 font-medium text-brand-ink">Region</th>
              </tr>
            </thead>
            <tbody>
              {SUBPROCESSORS.map((s) => (
                <tr key={s.name} className="border-t border-black/5 align-top">
                  <td className="px-3 py-3 font-medium text-brand-ink whitespace-nowrap">
                    {s.name}
                  </td>
                  <td className="px-3 py-3 text-brand-ink/80">{s.purpose}</td>
                  <td className="px-3 py-3 text-brand-ink/80 whitespace-nowrap">
                    {s.region}
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
    title: "Incident response",
    body: (
      <>
        <p>
          We run a documented incident response programme with 24/7 on-call coverage,
          severity tiers, and post-incident reviews. We notify affected customers
          without undue delay, and within the timeframes required by applicable law (72
          hours under GDPR for qualifying incidents).
        </p>
        <p>
          Found a vulnerability? Report it to{" "}
          <OrangeLink href={`mailto:${SECURITY_EMAIL}`}>{SECURITY_EMAIL}</OrangeLink>.
          We respond within two business days and don&apos;t pursue good-faith research.
        </p>
      </>
    ),
  },
  {
    title: "Business continuity",
    body: (
      <ul className="list-disc pl-5 space-y-1.5">
        <li>Multi-AZ deployments with automated failover.</li>
        <li>Recovery point objective (RPO): 1 hour. Recovery time objective (RTO): 4 hours.</li>
        <li>Quarterly disaster recovery exercises.</li>
        <li>Status page at <OrangeLink href="/signup" external>status.ingenworkspace.com</OrangeLink>.</li>
      </ul>
    ),
  },
  {
    title: "Contact",
    body: (
      <>
        <p>
          Trust, privacy, or compliance questions:{" "}
          <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>.
        </p>
        <p>
          Vulnerability reports:{" "}
          <OrangeLink href={`mailto:${SECURITY_EMAIL}`}>{SECURITY_EMAIL}</OrangeLink>.
        </p>
        <p>
          For data subject rights, see our{" "}
          <OrangeLink href="/privacy">Privacy Policy</OrangeLink>.
        </p>
      </>
    ),
  },
];

export default function TrustCenterPage() {
  return (
    <main className="bg-brand-bg">
      <Navbar />

      <section className="px-4 pt-10 pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-brand-ink/60">Trust</p>
          <h1 className="mt-3 font-display text-[30px] md:text-[40px] leading-tight text-brand-ink">
            Trust Center
          </h1>
          <p className="mt-3 text-[13px] text-brand-ink/70">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 pb-8">
        <div className="mx-auto max-w-3xl grid sm:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="rounded-xl border border-black/5 bg-white px-5 py-5 shadow-sm"
            >
              <p className="label-mono text-brand-purple">{p.label}</p>
              <h3 className="mt-2 font-display text-[18px] text-brand-ink leading-snug">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-brand-ink/75">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white px-5 py-7 md:px-8 md:py-10 shadow-sm">
          <div className="rounded-lg border border-black/5 bg-brand-bg/60 px-4 py-3 text-[13px] leading-6 text-brand-ink/80">
            <p>
              <span className="font-medium text-brand-ink">{ENTITY_NAME}</span> takes a
              proof-first approach to security as well as hiring: published controls,
              evidence on request, and human-in-the-loop on every AI decision.
            </p>
          </div>

          <div className="mt-8 space-y-7">
            {SECTIONS.map((s) => (
              <article key={s.title}>
                <h2 className="font-display text-[18px] md:text-[19px] text-brand-ink">
                  {s.title}
                </h2>
                <div className="mt-2 space-y-3 text-[14px] leading-7 text-brand-ink/80">
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
