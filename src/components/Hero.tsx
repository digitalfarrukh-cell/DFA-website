import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden dfa-glow pt-28 pb-16 sm:pt-44 sm:pb-24">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dfa-blob absolute top-10 -left-20 h-72 w-72 rounded-full bg-[#ff2424]/20 blur-3xl" />
        <div className="dfa-blob absolute bottom-0 -right-10 h-80 w-80 rounded-full bg-[#ff5e3a]/15 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-4xl px-5 text-center">
        {/* Summer badge */}
        <div className="dfa-fade-up inline-flex items-center gap-2 rounded-full border border-[#ff2424]/40 bg-[#ff2424]/10 px-4 py-1.5 text-xs font-medium text-white/85">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e3a] animate-pulse" />
          {site.summer.headline}
        </div>

        <h1 className="dfa-fade-up mt-6 text-[1.7rem] sm:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] text-white">
          Learn Digital Marketing —
          <br className="hidden sm:block" /> then earn from{" "}
          <span className="dfa-gradient-text">high-ticket clients</span>
          <br className="hidden sm:block" /> with Advanced Paid Ads
        </h1>

        <p className="dfa-fade-up mt-6 mx-auto max-w-2xl text-base sm:text-lg text-white/65 leading-relaxed">
          On summer break from uni, college or school? Put it to work. DFA&apos;s
          proven 2-stage system takes you from a rock-solid foundation to advanced
          paid ads, CRM and tracking — the skills that land real international clients.
        </p>

        <div className="dfa-fade-up mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <EnrollButton className="dfa-pulse w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] px-8 py-4 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition">
            Enroll Now →
          </EnrollButton>
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/80 hover:bg-white/10 transition"
          >
            View Plans & Pricing
          </a>
        </div>

        <div className="dfa-fade-up mt-12 flex items-center justify-center gap-6 sm:gap-12 text-center flex-wrap">
          <Stat value={site.stats.students} label="Students" />
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <Stat value={site.stats.rating} label="Avg. Rating" />
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <Stat value={site.stats.countries} label="Countries Served" />
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <Stat value={site.stats.hours} label="Hours Content" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45">{label}</div>
    </div>
  );
}
