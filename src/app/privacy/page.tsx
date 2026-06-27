import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.brandFull}`,
  description: `How ${site.brandFull} (DFA) collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="27 June 2026">
      <p>
        This Privacy Policy explains how <strong>{site.brandFull}</strong> (&quot;DFA&quot;,
        &quot;we&quot;, &quot;us&quot;) collects, uses, and protects information when you visit our
        website or enroll in our programs. By using this website you agree to the practices
        described below.
      </p>

      <h2>1. Information we collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li>
          <strong>Information you give us</strong> — your name, phone number, email address, city,
          and any message you send when you contact us via WhatsApp, email, or our enrollment form.
        </li>
        <li>
          <strong>Payment information</strong> — when you enroll, you share payment confirmation
          details (e.g. transaction reference). We do <strong>not</strong> collect or store your bank
          login, card numbers, or PIN.
        </li>
        <li>
          <strong>Automatic information</strong> — basic technical data such as your browser type,
          device, approximate location, and pages visited, collected through cookies and analytics
          tools.
        </li>
      </ul>

      <h2>2. Cookies &amp; tracking (Meta Pixel)</h2>
      <p>
        We use cookies and similar technologies, including the <strong>Meta (Facebook) Pixel</strong>,
        to understand how visitors use our site, measure the performance of our advertising, and show
        relevant ads on Meta platforms (Facebook and Instagram). The Meta Pixel may collect data such
        as pages viewed and actions taken (for example, starting an enrollment or contacting us).
      </p>
      <p>
        You can control or disable cookies through your browser settings, and you can manage ad
        preferences in your Facebook/Instagram account settings. Learn more in{" "}
        <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">
          Meta&apos;s Privacy Policy
        </a>
        .
      </p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To respond to your enquiries and process your enrollment.</li>
        <li>To deliver course access, materials, and support.</li>
        <li>To send important updates about your program.</li>
        <li>To improve our website, content, and advertising.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>4. Sharing your information</h2>
      <p>
        We do not sell your personal information. We may share limited data with trusted service
        providers who help us operate our business — for example messaging platforms (WhatsApp),
        email providers, and advertising/analytics platforms (Meta) — and only as needed to provide
        our services or as required by law.
      </p>

      <h2>5. Data retention</h2>
      <p>
        We keep your information only as long as necessary to provide our services and to meet legal
        or accounting requirements, after which it is deleted or anonymised.
      </p>

      <h2>6. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information at any
        time. To make a request, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>7. Children&apos;s privacy</h2>
      <p>
        Our programs are intended for users aged 16 and above. We do not knowingly collect data from
        children under 13.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The latest version will always be posted
        on this page with an updated date.
      </p>

      <h2>9. Contact us</h2>
      <p>
        For any privacy questions, contact <strong>{site.brandFull}</strong> at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or via WhatsApp at {site.whatsapp}.
      </p>
    </LegalShell>
  );
}
