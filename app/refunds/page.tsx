import type { Metadata } from "next";
import Link from "next/link";
import ArticlePage from "@/components/ArticlePage";

export const metadata: Metadata = {
  title: "Refunds — iNGEN",
  description: "How to request a refund or get help with a charge from iNGEN.",
};

export default function RefundsPage() {
  return (
    <ArticlePage category="Legal" title="Refund Policy" description="This policy explains how to ask INGEN LABS PTY LTD for help with a charge or request a refund for an iNGEN purchase.">
      <section>
        <h2>Before you purchase</h2>
        <p>Where a paid service is offered, review the price, billing cycle, and any refund or cancellation terms presented before you buy. See our <Link href="/terms">Terms &amp; Conditions</Link> for how fees are handled. Joining the waitlist does not require a payment.</p>
      </section>
      <section>
        <h2>Your consumer rights</h2>
        <p>Any refund terms are subject to rights and remedies that cannot be excluded under applicable law, including the Australian Consumer Law where it applies. The <a href="https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/repair-replace-refund-cancel">ACCC explains when a refund or other remedy may be available</a>.</p>
      </section>
      <section>
        <h2>Request a refund or report a billing issue</h2>
        <p>Email <a href="mailto:contact@ingenworkspace.com?subject=Billing%20or%20refund%20request">contact@ingenworkspace.com</a> with the email address used to purchase, the invoice number or date of the charge, and a description of the issue. Leave out payment card numbers and passwords.</p>
      </section>
    </ArticlePage>
  );
}
