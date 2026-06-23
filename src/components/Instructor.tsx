import { site } from "@/lib/site";

export default function Instructor() {
  return (
    <section id="instructor" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="dfa-card rounded-3xl p-8 sm:p-12 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          {/* Photo */}
          <div className="mx-auto md:mx-0">
            <div className="relative h-80 w-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-red-500/10">
              {/* Photo file: public/muzammil.png */}
              <img
                src="/muzammil.png"
                alt={site.instructor.name}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
              Your Lead Instructor
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white">{site.instructor.name}</h2>
            <p className="mt-1 text-white/55">{site.instructor.role}</p>

            <p className="mt-5 text-white/70 leading-relaxed">{site.instructor.bio}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={site.instructor.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#060608] text-sm font-semibold px-5 py-2.5 hover:bg-white/90 transition"
              >
                ✓ View Verified Portfolio
              </a>
              <span className="text-sm text-white/45">
                {site.instructor.portfolio.replace("https://", "")}
              </span>
            </div>

            <p className="mt-5 text-sm text-white/45 italic">
              “I only teach what I&apos;ve actually done — no theory, just real, tested
              strategies.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
