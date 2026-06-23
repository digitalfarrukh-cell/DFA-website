import { site, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center h-12 w-12 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/30">
              <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
            </span>
            <div>
              <div className="font-semibold text-white/90">{site.brandFull}</div>
              <div className="text-xs text-white/45">{site.tagline}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/55">
            <a
              href={site.instructor.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Portfolio
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-white/35">
          © {new Date().getFullYear()} {site.brandFull} ({site.brandShort}). All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
