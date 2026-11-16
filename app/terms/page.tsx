import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — iNGen",
  description:
    "The terms that govern your use of iNGen's products, website, and services.",
};

const LAST_UPDATED = "November 16, 2026";
const EFFECTIVE_DATE = "May 18, 2026";
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
      <>
        <p>
          iNGen (&ldquo;iNGen&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
          is operated by {ENTITY_NAME}, an Australian registered company with ABN {ABN}. Our
          registered office is in Australia.
        </p>
        <p>
          Verify our registration on the Australian Business Register:{" "}
          <OrangeLink href={ABN_LINK} external>
            click here
          </OrangeLink>
          .
        </p>
      </>
    ),
  },
  {
    title: "2. Agreement to these terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you
          and iNGen. By creating an account, joining our waiting list, or using any part of
          our website, products, or services (the &ldquo;Service&rdquo;), you confirm that
          you have read, understood, and agree to be bound by these Terms.
        </p>
        <p>
          If you&apos;re using the Service on behalf of an organisation, you confirm you have
          authority to bind that organisation, and &ldquo;you&rdquo; refers to both you and
          the organisation. If you don&apos;t agree to these Terms, please don&apos;t use the
          Service.
        </p>
      </>
    ),
  },
  {
    title: "3. Eligibility & accounts",
    body: (
      <>
        <p>
          You must be at least 16 years old to use the Service. By using the Service you
          confirm you meet this requirement and have legal capacity to enter into these
          Terms.
        </p>
        <p>
          You agree to provide accurate, current, and complete information when you sign up
          or join the waiting list, and to keep that information up to date. You&apos;re
          responsible for keeping your login credentials confidential and for all activity
          that happens under your account. Notify us promptly at{" "}
          <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink> if you
          suspect unauthorised access.
        </p>
      </>
    ),
  },
  {
    title: "4. The waiting list",
    body: (
      <p>
        Joining our waiting list reserves your place but doesn&apos;t guarantee access. We
        roll out invites at our discretion based on capacity and fit. By joining, you agree
        to receive product updates, onboarding messages, and occasional announcements at the
        email you provide. You can unsubscribe at any time using the link in any email or by
        contacting us.
      </p>
    ),
  },
  {
    title: "5. Licence to use the Service",
    body: (
      <p>
        Subject to your compliance with these Terms, we grant you a limited, non-exclusive,
        non-transferable, revocable licence to access and use the Service for your internal
        business purposes. All rights not expressly granted are reserved by us.
      </p>
    ),
  },
  {
    title: "6. Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Break the law or any applicable regulation while using the Service.</li>
          <li>
            Copy, reverse-engineer, decompile, scrape, or extract source code, models, or
            data from the Service.
          </li>
          <li>
            Probe, scan, or test the security of the Service, or attempt to bypass
            authentication or rate limits.
          </li>
          <li>
            Submit content that is unlawful, deceptive, discriminatory, infringing, harmful,
            or that violates anyone&apos;s privacy.
          </li>
          <li>
            Use the Service to build a competing product or to train a competing model.
          </li>
          <li>
            Resell, sublicense, or share access to the Service without our written consent.
          </li>
          <li>Interfere with other users&apos; access to the Service.</li>
        </ul>
        <p>
          We may suspend or terminate accounts that violate this section, and may remove
          content that breaches these Terms.
        </p>
      </>
    ),
  },
  {
    title: "7. Your content",
    body: (
      <>
        <p>
          You retain ownership of all content, candidate information, and other data you
          submit to the Service (&ldquo;Your Content&rdquo;). You grant iNGen a worldwide,
          non-exclusive, royalty-free licence to host, store, process, transmit, and display
          Your Content solely to provide, secure, and improve the Service.
        </p>
        <p>
          You represent that you have all rights, consents, and authority required to submit
          Your Content, and that doing so doesn&apos;t violate any law or third-party right
          (including privacy laws applicable to candidates).
        </p>
      </>
    ),
  },
  {
    title: "8. Our intellectual property",
    body: (
      <p>
        The Service — including software, models, designs, interfaces, text, graphics, and
        logos — is owned by iNGen or its licensors and is protected by intellectual property
        laws. These Terms don&apos;t transfer any ownership rights to you. You may not use
        our brand, trademarks, or logos without our prior written consent.
      </p>
    ),
  },
  {
    title: "9. Feedback",
    body: (
      <p>
        If you send us feedback, suggestions, or ideas about the Service, you grant us a
        perpetual, irrevocable, worldwide, royalty-free licence to use them without
        restriction or compensation. We&apos;re not obligated to keep feedback confidential.
      </p>
    ),
  },
  {
    title: "10. Third-party services",
    body: (
      <p>
        The Service may link to or integrate with third-party services (for example,
        identity providers, calendar tools, or ATS systems). We don&apos;t control those
        services and aren&apos;t responsible for their content, terms, or privacy practices.
        Your use of third-party services is governed by their own terms.
      </p>
    ),
  },
  {
    title: "11. Beta features",
    body: (
      <p>
        We may make beta, preview, or experimental features available. These features are
        provided &ldquo;as is&rdquo;, may be unstable, may change or be removed without
        notice, and aren&apos;t covered by any service-level commitments.
      </p>
    ),
  },
  {
    title: "12. Privacy",
    body: (
      <p>
        Our handling of personal information is described in our Privacy Policy. By using
        the Service, you consent to that handling. We process personal information in line
        with the Australian Privacy Principles under the Privacy Act 1988 (Cth), and other
        privacy laws that apply to you.
      </p>
    ),
  },
  {
    title: "13. Fees & billing",
    body: (
      <p>
        Some features may require payment. Prices, billing cycles, and refund terms will be
        shown before you purchase. Unless stated otherwise or required by applicable law,
        fees are non-refundable. See our <OrangeLink href="/refunds">Refund Policy</OrangeLink>{" "}
        for help with a charge. Fees exclude taxes, which are your responsibility where
        applicable. You authorise us to charge your designated payment method for amounts due.
      </p>
    ),
  },
  {
    title: "14. Service changes & availability",
    body: (
      <p>
        We&apos;re continuously improving the Service. We may add, change, or remove
        features at any time. We&apos;ll give reasonable notice for material changes that
        adversely affect paid features. We don&apos;t guarantee the Service will be
        uninterrupted or error-free.
      </p>
    ),
  },
  {
    title: "15. Suspension & termination",
    body: (
      <p>
        You may stop using the Service and close your account at any time. We may suspend or
        terminate your access if you breach these Terms, fail to pay fees, or pose a risk to
        the Service or other users. Sections that by their nature should survive termination
        (including those covering content, intellectual property, disclaimers, liability,
        and governing law) will survive.
      </p>
    ),
  },
  {
    title: "16. Disclaimers",
    body: (
      <p>
        Except as expressly stated in these Terms and to the maximum extent permitted by
        law, the Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
        without warranties of any kind, whether express or implied, including warranties of
        merchantability, fitness for a particular purpose, non-infringement, and accuracy of
        outputs. iNGen&apos;s outputs are aids — final hiring decisions remain yours.
      </p>
    ),
  },
  {
    title: "17. Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, neither party will be liable for indirect,
        incidental, special, consequential, or punitive damages, or for loss of profits,
        revenue, data, or goodwill, arising out of or in connection with these Terms. Our
        total aggregate liability for any claim won&apos;t exceed the greater of (a) the
        fees you paid us in the twelve months before the claim, or (b) AUD 100. Nothing in
        these Terms limits liability that cannot be limited under applicable law.
      </p>
    ),
  },
  {
    title: "18. Australian Consumer Law",
    body: (
      <p>
        Some statutory guarantees (including under the Australian Consumer Law) cannot be
        excluded. Nothing in these Terms excludes, restricts, or modifies any right or
        remedy you have under those laws. Where we&apos;re permitted, our liability for
        breach of a non-excludable guarantee is limited to re-supplying the relevant
        services or paying the cost of re-supply.
      </p>
    ),
  },
  {
    title: "19. Indemnity",
    body: (
      <p>
        You agree to indemnify and hold harmless iNGen, its affiliates, and their personnel
        from any third-party claims, losses, or expenses (including reasonable legal fees)
        arising from your breach of these Terms, your misuse of the Service, or your
        violation of any law or third-party right.
      </p>
    ),
  },
  {
    title: "20. Force majeure",
    body: (
      <p>
        Neither party is liable for delays or failures caused by events beyond reasonable
        control, including natural disasters, internet outages, power failures, pandemics,
        labour disputes, or acts of government.
      </p>
    ),
  },
  {
    title: "21. Changes to these Terms",
    body: (
      <p>
        We may update these Terms from time to time. If we make material changes, we&apos;ll
        notify you by email or by posting a notice in the Service. Your continued use of the
        Service after changes take effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    title: "22. Governing law & disputes",
    body: (
      <p>
        These Terms are governed by the laws of New South Wales, Australia, without regard
        to conflict-of-law principles. The courts of New South Wales (and courts hearing
        appeals from them) have exclusive jurisdiction over any dispute, except that either
        party may seek urgent injunctive relief in any court of competent jurisdiction.
        Before starting formal proceedings, the parties will try to resolve the dispute in
        good faith for at least 30 days.
      </p>
    ),
  },
  {
    title: "23. General",
    body: (
      <>
        <p>
          <span className="font-medium text-brand-ink">Assignment.</span> You may not assign
          these Terms without our prior written consent. We may assign them to an affiliate
          or in connection with a merger or sale of our business.
        </p>
        <p>
          <span className="font-medium text-brand-ink">Severability.</span> If any part of
          these Terms is held unenforceable, the rest remains in effect.
        </p>
        <p>
          <span className="font-medium text-brand-ink">No waiver.</span> Failing to enforce a
          right doesn&apos;t waive it.
        </p>
        <p>
          <span className="font-medium text-brand-ink">Entire agreement.</span> These Terms
          (together with any order forms or policies we reference) are the entire agreement
          between you and iNGen about the Service and supersede earlier agreements.
        </p>
      </>
    ),
  },
  {
    title: "24. Contact",
    body: (
      <p>
        Questions about these Terms? Email us at{" "}
        <OrangeLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</OrangeLink>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="bg-brand-bg">
      <Navbar />

      <section className="px-4 pt-10 pb-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-mono text-brand-ink/60">Legal</p>
          <h1 className="mt-3 font-display text-[30px] md:text-[40px] leading-tight text-brand-ink">
            Terms of Service
          </h1>
          <p className="mt-3 text-[13px] text-brand-ink/70">
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-black/5 bg-white px-5 py-7 md:px-8 md:py-10 shadow-sm">
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

          <p className="mt-6 text-[14px] leading-7 text-brand-ink/80">
            These Terms explain how iNGen works and what we expect from each other.
            We&apos;ve aimed for plain language while covering the essentials. Please read
            them carefully — they include important information about your rights and ours.
          </p>

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
