import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="editorial-hero">
        <p className="eyebrow">Page unavailable</p>
        <h1>
          Let’s find your
          <br />
          next step.
        </h1>
        <p className="hero-description">
          This address doesn’t lead to an iNGEN page. Explore the workspace or
          return to the homepage.
        </p>
        <div className="action-row">
          <Link className="btn-dark" href="/">
            Back to home
          </Link>
          <Link className="btn-outline" href="/features">
            Explore features
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
