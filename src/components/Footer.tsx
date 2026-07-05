import Link from "next/link";
import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/disclaimer", label: "Earnings Disclaimer" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-white overflow-hidden shadow-md ring-1 ring-slate-200">
              <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
            </span>
            <div>
              <div className="font-semibold text-slate-900">{site.brandFull}</div>
              <div className="text-xs text-slate-400">{site.tagline}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a
              href={site.instructor.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900"
            >
              Portfolio
            </a>
            <EnrollButton className="hover:text-slate-900">WhatsApp</EnrollButton>
            <a href={`mailto:${site.email}`} className="hover:text-slate-900">
              Email
            </a>
          </div>
        </div>

        {/* Legal / policy links — required for ad-platform compliance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-slate-900">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {site.brandFull} ({site.brandShort}). All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
