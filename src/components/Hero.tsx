import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden dfa-glow pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Soft optimistic blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dfa-blob absolute -top-20 -left-24 h-80 w-80 rounded-full bg-[#ff5e3a]/20 blur-3xl" />
        <div className="dfa-blob absolute top-10 right-0 h-80 w-80 rounded-full bg-[#7c3aed]/15 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        {/* Left */}
        <div>
          <div className="dfa-fade-up inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e3a] animate-pulse" />
            {site.summer.headline}
          </div>

          <h1 className="dfa-fade-up mt-6 text-[1.9rem] sm:text-5xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.1] text-slate-900">
            Learn Digital Marketing —
            <br className="hidden sm:block" /> then earn from{" "}
            <span className="dfa-gradient-text">high-ticket clients</span>
          </h1>

          <p className="dfa-fade-up mt-5 max-w-xl text-base sm:text-lg text-slate-500 leading-relaxed">
            On summer break from uni, college or school? Put it to work. DFA&apos;s
            proven 2-stage system takes you from a solid foundation to advanced paid
            ads, CRM and tracking.
          </p>

          <div className="dfa-fade-up mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3 max-w-xl">
            <span className="text-xl leading-none">💰</span>
            <p className="text-sm text-slate-700 leading-relaxed">
              We teach you the complete, proven path to{" "}
              <span className="font-semibold text-slate-900">earn $1000+ a month</span> —
              through <span className="font-semibold text-slate-900">direct client hunting</span>{" "}
              and top global freelance platforms like{" "}
              <span className="font-semibold text-slate-900">Upwork &amp; Fiverr</span>.
            </p>
          </div>
          <p className="dfa-fade-up mt-2 text-xs text-slate-400 max-w-xl">
            *Earnings depend on your skill, effort and consistency — we teach the
            system, you put in the work.
          </p>

          <div className="dfa-fade-up mt-8 flex flex-col sm:flex-row items-center gap-3">
            <EnrollButton className="dfa-pulse w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-8 py-4 font-semibold text-white shadow-xl shadow-red-500/30 hover:opacity-95 transition">
              Enroll Now →
            </EnrollButton>
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              View Plans &amp; Pricing
            </a>
          </div>

          <div className="dfa-fade-up mt-10 flex items-center gap-6 sm:gap-8 flex-wrap">
            <Stat value={site.stats.students} label="Students" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value={site.stats.rating} label="Avg. Rating" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value={site.stats.countries} label="Countries" />
          </div>
        </div>

        {/* Right visual */}
        <div className="dfa-fade-up relative">
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Your growth</span>
              <span className="rounded-full bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1">
                +218% ↑
              </span>
            </div>
            <div className="mt-6 flex items-end gap-3 h-40">
              {[35, 55, 45, 70, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-[#ff2d2d] to-[#ff8a5b]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <div className="text-xs text-violet-500">Active clients</div>
                <div className="text-2xl font-bold text-violet-700">12</div>
              </div>
              <div className="rounded-2xl bg-red-50 p-4">
                <div className="text-xs text-red-500">This month</div>
                <div className="text-2xl font-bold text-red-600">$2,400</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 flex items-center gap-3 dfa-float">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[#ff2d2d] to-[#ff5e3a] text-white text-sm">
              ★
            </span>
            <div className="text-xs">
              <div className="font-semibold text-slate-800">Certificate</div>
              <div className="text-slate-400">on completion</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  );
}
