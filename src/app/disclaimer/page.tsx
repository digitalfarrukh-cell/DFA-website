import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Earnings Disclaimer — ${site.brandFull}`,
  description: `Earnings and results disclaimer for ${site.brandFull} (DFA) programs.`,
};

export default function DisclaimerPage() {
  return (
    <LegalShell title="Earnings Disclaimer" updated="27 June 2026">
      <p>
        <strong>{site.brandFull}</strong> (&quot;DFA&quot;) provides education and training in digital
        marketing. The purpose of this disclaimer is to set clear, honest expectations.
      </p>

      <h2>No guarantee of income or results</h2>
      <p>
        We do <strong>not</strong> guarantee that you will earn any specific amount of money, land any
        particular client, get a job, or achieve any specific business result. Any examples of
        earnings, clients, or outcomes mentioned on this website or in our materials are
        illustrative and are <strong>not</strong> promises or guarantees.
      </p>

      <h2>Your results depend on you</h2>
      <p>
        Success in digital marketing and freelancing depends on many factors that are outside our
        control — including your effort, consistency, existing skills, time invested, the
        market, and your ability to apply what you learn. Different students will get different
        results.
      </p>

      <h2>Educational purpose only</h2>
      <p>
        All content is provided for educational and informational purposes. It is not financial,
        legal, or professional advice. You are responsible for your own decisions and for complying
        with the terms and policies of any platform (such as Meta, Upwork, or Fiverr) you use.
      </p>

      <h2>Testimonials</h2>
      <p>
        Any testimonials or student stories reflect individual experiences and are not a guarantee
        that you will achieve the same or similar results.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> before enrolling.
      </p>
    </LegalShell>
  );
}
