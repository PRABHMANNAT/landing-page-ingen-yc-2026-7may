import type { Metadata } from "next";
import ArticlePage from "@/components/ArticlePage";

export const metadata: Metadata = {
  title: "Accessibility — iNGEN",
  description: "Report an accessibility barrier or request help using the iNGEN website.",
};

export default function AccessibilityPage() {
  return (
    <ArticlePage category="Policies" title="Accessibility Statement" description="We aim to make the iNGEN website usable by people with disabilities. This statement applies to the public website.">
      <section>
        <h2>Accessibility standard</h2>
        <p>The <a href="https://www.w3.org/TR/WCAG22/">Web Content Accessibility Guidelines (WCAG) 2.2</a> are our reference for improving website accessibility. The site has not been formally assessed for conformance.</p>
      </section>
      <section>
        <h2>Get help with the site</h2>
        <p>If a form, interactive demo, or booking tool is hard to use, email <a href="mailto:contact@ingenworkspace.com?subject=Website%20accessibility">contact@ingenworkspace.com</a> for help completing the task another way.</p>
      </section>
      <section>
        <h2>Report an accessibility barrier</h2>
        <p>Please include the page address, what you were trying to do, and what went wrong. If you are comfortable sharing them, your browser, device, and assistive technology can help us understand the issue.</p>
      </section>
    </ArticlePage>
  );
}
