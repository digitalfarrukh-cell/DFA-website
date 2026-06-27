import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${site.brandFull}`,
  description: `The terms and conditions for using ${site.brandFull} (DFA) and enrolling in our programs.`,
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="27 June 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your use of the{" "}
        <strong>{site.brandFull}</strong> (&quot;DFA&quot;) website and the purchase of our digital
        marketing programs. By accessing this site or enrolling, you agree to these Terms.
      </p>

      <h2>1. About our programs</h2>
      <p>
        DFA provides educational digital marketing training, including live and recorded classes,
        learning materials, and related support. Program features, curriculum, and pricing are
        described on our website and may be updated from time to time.
      </p>

      <h2>2. Enrollment &amp; payment</h2>
      <ul>
        <li>Enrollment is confirmed once your payment is received and verified.</li>
        <li>
          Prices are listed in Pakistani Rupees (PKR) and are payable through the methods shown
          during enrollment.
        </li>
        <li>Access to course materials is granted to the enrolled student only and is non-transferable.</li>
      </ul>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Share, resell, record, or redistribute course content without written permission.</li>
        <li>Share your account or access credentials with others.</li>
        <li>Use the website or materials for any unlawful purpose.</li>
      </ul>
      <p>
        Violation of these rules may result in suspension or termination of access without refund.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        All course content, materials, templates, branding, and resources are the property of DFA and
        are protected by applicable intellectual property laws. They are provided for your personal,
        educational use only.
      </p>

      <h2>5. No guarantee of results</h2>
      <p>
        DFA teaches skills, systems, and strategies. We do not guarantee any specific income, job,
        client, or business outcome. Your results depend on your own effort, consistency, skill, and
        market conditions. Please see our{" "}
        <a href="/disclaimer">Earnings Disclaimer</a> for details.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, DFA is not liable for any indirect, incidental, or
        consequential damages arising from your use of our website or programs. Our total liability is
        limited to the amount you paid for the program.
      </p>

      <h2>7. Refunds</h2>
      <p>
        Refunds are handled in accordance with our <a href="/refund">Refund Policy</a>.
      </p>

      <h2>8. Changes to these Terms</h2>
      <p>
        We may revise these Terms at any time. Continued use of the website or programs after changes
        means you accept the updated Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms? Email <a href={`mailto:${site.email}`}>{site.email}</a> or
        message us on WhatsApp at {site.whatsapp}.
      </p>
    </LegalShell>
  );
}
