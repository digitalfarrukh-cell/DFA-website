import Link from "next/link";
import { site, waLink } from "@/lib/site";

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund", label: "Refund Policy" },
  { href: "/disclaimer", label: "Earnings Disclaimer" },
  { href: "/contact", label: "Contact" },
];

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      {/* Simple header */}
      <header className="border-b border-slate-200 bg-[#fbfaff]/85 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid place-items-center h-10 w-10 rounded-xl bg-white overflow-hidden shadow-md ring-1 ring-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
            </span>
            <span className="font-semibold tracking-tight text-slate-900">
              {site.brandFull}
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: {updated}</p>
          <div className="dfa-legal mt-8 space-y-6 text-slate-600 leading-relaxed">
            {children}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-3xl px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-slate-900">
                {l.label}
              </Link>
            ))}
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} {site.brandFull} ({site.brandShort}). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
