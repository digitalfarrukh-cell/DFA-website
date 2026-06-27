import type { Metadata } from "next";
import LegalShell from "@/components/LegalShell";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${site.brandFull}`,
  description: `Get in touch with ${site.brandFull} (DFA) — WhatsApp, email and support.`,
};

export default function ContactPage() {
  return (
    <LegalShell title="Contact Us" updated="27 June 2026">
      <p>
        Have a question about a program, enrollment, or payment? We&apos;re happy to help. Reach{" "}
        <strong>{site.brandFull}</strong> through any of the channels below and we&apos;ll get back to
        you as soon as possible.
      </p>

      <h2>WhatsApp</h2>
      <p>
        The fastest way to reach us. Message us at{" "}
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          {site.whatsapp}
        </a>
        .
      </p>

      <h2>Email</h2>
      <p>
        For detailed queries or support, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Founder &amp; instructor</h2>
      <p>
        {site.instructor.name} — {site.instructor.role}. View work and background at{" "}
        <a href={site.instructor.portfolio} target="_blank" rel="noopener noreferrer">
          {site.instructor.portfolio.replace(/^https?:\/\//, "")}
        </a>
        .
      </p>

      <h2>Business hours</h2>
      <p>
        We typically respond Monday to Saturday, 10:00 AM – 8:00 PM (PKT). Messages sent outside these
        hours are answered the next working day.
      </p>
    </LegalShell>
  );
}
