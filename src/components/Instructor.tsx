import { site } from "@/lib/site";

export default function Instructor() {
  return (
    <section id="instructor" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="dfa-card rounded-3xl p-8 sm:p-12 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          {/* Photo */}
          <div className="mx-auto md:mx-0">
            <div className="relative h-80 w-64 rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-xl shadow-slate-300/40">
              {/* Photo file: public/muzammil.png */}
              <img
                src="/muzammil.png"
                alt={site.instructor.name}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
              Your Lead Instructor
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{site.instructor.name}</h2>
            <p className="mt-1 text-slate-500">{site.instructor.role}</p>

            <p className="mt-5 text-slate-600 leading-relaxed">{site.instructor.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={site.instructor.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] text-white text-sm font-semibold px-5 py-2.5 shadow-lg shadow-red-500/25 hover:opacity-95 transition"
              >
                ✓ View Verified Portfolio
              </a>
              <span className="text-sm text-slate-400">
                {site.instructor.portfolio.replace("https://", "")}
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500 italic">
              “I only teach what I&apos;ve actually done — no theory, just real, tested
              strategies.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
