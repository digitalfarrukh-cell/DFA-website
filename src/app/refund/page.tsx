import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Refund Policy — ${site.brandFull}`,
  description: `Refund and cancellation policy for ${site.brandFull} (DFA) programs.`,
};

export default function RefundPage() {
  return (
    <LegalShell title="Refund Policy" updated="27 June 2026">
      <p>
        We want you to feel confident enrolling in <strong>{site.brandFull}</strong> (&quot;DFA&quot;).
        This policy explains when refunds are and are not available.
      </p>

      <h2>1. Cooling-off period</h2>
      <p>
        If you change your mind, you may request a refund within <strong>3 days</strong> of
        enrollment, <strong>provided that</strong> you have not accessed more than the first session
        or downloaded the premium resources. After this period, or once substantial course content has
        been accessed, the fee is non-refundable.
      </p>

      <h2>2. Non-refundable situations</h2>
      <ul>
        <li>You have completed or accessed a significant portion of the program.</li>
        <li>The refund request is made after the 3-day cooling-off period.</li>
        <li>Access was suspended or terminated due to a breach of our <a href="/terms">Terms of Service</a>.</li>
        <li>Optional add-ons (such as community access) that have already been activated.</li>
      </ul>

      <h2>3. How to request a refund</h2>
      <p>
        To request a refund, contact us at <a href={`mailto:${site.email}`}>{site.email}</a> or via
        WhatsApp at {site.whatsapp} with your name and payment reference. Eligible refunds are
        processed back to your original payment method within 7–14 business days.
      </p>

      <h2>4. Program changes</h2>
      <p>
        If DFA cancels a program before it begins, you will receive a full refund or the option to
        transfer to the next available batch.
      </p>

      <h2>5. Questions</h2>
      <p>
        If you have any questions about this policy, please reach out before enrolling — we&apos;re
        happy to help at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
