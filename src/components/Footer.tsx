import { site, waLink } from "@/lib/site";

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
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-slate-900">
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {site.brandFull} ({site.brandShort}). All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
