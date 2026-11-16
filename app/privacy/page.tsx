import EditorialCover from "@/components/EditorialCover";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — iNGen",
  description:
    "How iNGen collects, uses, stores, and protects personal information across recruiter and student workflows.",
};

const LAST_UPDATED = "June 11, 2026";
const EFFECTIVE_DATE = "June 11, 2026";
const CONTACT_EMAIL = "contact@ingenworkspace.com";
const ABN = "63 688 809 145";
const ABN_LINK = "https://abr.business.gov.au/ABN/View?abn=63688809145";
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

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Who we are",
    body: (
      <p>
        iNGen (&ldquo;iNGen&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is operated by{" "}
        {ENTITY_NAME}, an Australian registered company with ABN {ABN}. We&apos;re the
        controller of personal information described in this policy. Verify our
        registration on the Australian Business Register:{" "}
        <OrangeLink href={ABN_LINK} external>
          click here
        </OrangeLink>
        .
      </p>
    ),
  },
  {
    title: "2. Scope",
    body: (
      <p>
        This policy covers personal information we handle through our website, the iNGen
        recruiter platform (Aristotle, Sherlock), and the FORGE student platform
        (Aristotle, Columbus). It applies to candidates, students, recruiters, customers,
        and visitors.
      </p>
    ),
  },
  {
    title: "3. What we collect",
    body: (
      <>
        <p>Depending on how you use iNGen, we may collect:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <span className="font-medium text-brand-ink">Account data</span> — name,
            email, role, organisation, password hashes.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Profile signal</span> — GitHub,
            LinkedIn, project descriptions, certifications, hackathon entries,
            testimonials, education, and other proof you connect.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Recruiter inputs</span> — job
            briefs, candidate notes, shortlists, interview packs, and ATS data you import.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Usage data</span> — pages
            viewed, features used, interaction timings, device and browser metadata, IP
            address.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Communications</span> — messages
            you send us, support tickets, and survey responses.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Cookies & similar tech</span> —
            see our{" "}
            <OrangeLink href="/cookies">Cookie Policy</OrangeLink>.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. How we use it",
    body: (
      <>
        <p>We use personal information to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Run the Service — generate roadmaps, score skills, scout jobs, verify proof,
            build candidate dossiers, and stage interview prep.
          </li>
          <li>Personalise outputs to your role, goal, and weekly time budget.</li>
          <li>Authenticate accounts and prevent abuse, fraud, and security incidents.</li>
          <li>Improve the Service, including model evaluation and quality assurance.</li>
          <li>
            Send transactional emails (account, billing, security) and product updates
            you&apos;ve opted into.
          </li>
          <li>
            Meet legal, tax, and regulatory obligations under Australian and other
            applicable law.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Model training",
    body: (
      <p>
        We do <span className="font-medium text-brand-ink">not</span> train foundation
        models on your private content (your roadmaps, profile data, candidate
        information, or job briefs) without explicit opt-in. Aggregate, de-identified
        usage analytics may be used to improve product quality.
      </p>
    ),
  },
  {
    title: "6. Legal bases (where relevant)",
    body: (
      <p>
        Where the GDPR or UK GDPR applies, we rely on: (a) performance of a contract to
        provide the Service; (b) legitimate interests in operating, securing, and
        improving the Service; (c) consent for marketing and optional features; and (d)
        compliance with legal obligations.
      </p>
    ),
  },
  {
    title: "7. Sharing",
    body: (
      <>
        <p>We share personal information only with:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <span className="font-medium text-brand-ink">Service providers</span> —
            cloud hosting, email delivery, analytics, error reporting, payment
            processing. Listed in our{" "}
            <OrangeLink href="/trust">Trust Center</OrangeLink>.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Your organisation</span> — if
            you use iNGen through an employer or campus account, your usage and outputs
            may be visible to that organisation.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Legal & safety</span> — when
            required by law, court order, or to protect rights, property, or safety.
          </li>
          <li>
            <span className="font-medium text-brand-ink">Corporate events</span> — as
            part of a merger, acquisition, or sale, subject to confidentiality.
          </li>
        </ul>
        <p>We don&apos;t sell personal information.</p>
      </>
    ),
  },
  {
    title: "8. International transfers",
    body: (
      <p>
        We&apos;re based in Australia and primarily process data in Australia and the
        United States. Where we transfer personal data across borders, we use
        appropriate safeguards (such as Standard Contractual Clauses) and only work with
        providers that meet our security standards.
      </p>
    ),
  },
  {
    title: "9. Retention",
    body: (
      <p>
        We keep personal information for as long as your account is active and for a
        reasonable period afterwards to meet legal, tax, and operational needs. You can
        request deletion at any time (see Section 11). Aggregate, de-identified data
        may be retained indefinitely.
      </p>
    ),
  },
  {
    title: "10. Security",
    body: (
      <p>
        We use encryption in transit and at rest, role-based access control, audit
        logging, and continuous monitoring. No system is perfectly secure — if you
        believe your account has been compromised, contact{" "}
        <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>{" "}
        immediately.
      </p>
    ),
  },
  {
    title: "11. Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have rights to access, correct, delete,
          export, restrict, or object to our processing of your personal information,
          and to withdraw consent.
        </p>
        <p>
          To exercise these rights, email{" "}
          <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>. We
          may need to verify your identity. If you&apos;re in Australia and aren&apos;t
          satisfied with our response, you can contact the Office of the Australian
          Information Commissioner (OAIC).
        </p>
      </>
    ),
  },
  {
    title: "12. Children",
    body: (
      <p>
        iNGen is not directed to children under 16. We don&apos;t knowingly collect
        personal information from anyone under 16. If you believe a child has provided
        us personal information, contact us and we&apos;ll delete it.
      </p>
    ),
  },
  {
    title: "13. Candidate data (recruiter customers)",
    body: (
      <p>
        When recruiters import or paste candidate information into iNGen, the recruiter
        is the controller of that data. We process it as a processor on their behalf in
        line with our terms. Candidates may contact the recruiter directly to exercise
        their rights, or email us and we&apos;ll route the request.
      </p>
    ),
  },
  {
    title: "14. Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. For material changes, we&apos;ll
        notify you by email or in-product. The &ldquo;Last updated&rdquo; date at the
        top of this page always reflects the current version.
      </p>
    ),
  },
  {
    title: "15. Contact",
    body: (
      <p>
        Privacy questions or requests? Email{" "}
        <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-brand-bg">
      <Navbar />
      <EditorialCover photo="data" />

      <section className="px-4 pt-10 pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-brand-ink/60">Legal</p>
          <h1 className="mt-3 font-display text-[38px] md:text-[56px] leading-tight text-brand-ink">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[13px] text-brand-ink/70">
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/5 bg-white px-5 py-7 md:px-8 md:py-10 shadow-sm">
          <div className="rounded-lg border border-black/5 bg-brand-bg/60 px-4 py-3 text-[13px] leading-6 text-brand-ink/80">
            <p>
              <span className="font-medium text-brand-ink">{ENTITY_NAME}</span> · Australian
              registered company · ABN {ABN}
            </p>
            <p className="mt-1">
              Verify our registration on the Australian Business Register:{" "}
              <OrangeLink href={ABN_LINK} external>
                click here
              </OrangeLink>
              .
            </p>
          </div>

          <p className="mt-6 text-[16px] leading-8 text-brand-ink/80">
            This policy explains what personal information iNGen handles, why, who we
            share it with, and the choices you have. We&apos;ve aimed for plain language;
            specifics are in the sections below.
          </p>

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
