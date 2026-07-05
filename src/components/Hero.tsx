import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";
import FreeClassButton from "@/components/FreeClassButton";
import Countdown from "@/components/Countdown";

export default function Hero() {
  const plan = site.plans.mid;
  const highlights = [
    "Deeper Meta & Google paid ads",
    "Shopify store setup + product listings",
    "Upwork & Fiverr freelancing setup",
    "Landing pages & lead funnels",
    "1 live campaign + weekly support",
  ];
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

          {/* Free class — the new top-of-funnel lead magnet */}
          <div className="dfa-fade-up mt-5 rounded-2xl border border-red-200 bg-white p-4 shadow-sm max-w-xl">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-red-600">
              🎓 FREE Live Class
              <span className="text-slate-900">· {site.freeClass.scheduleLabel}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Fiverr/Upwork pe apna pehla client kaise laayein — har Saturday, live on Zoom. Bilkul free.
            </p>
            <div className="mt-2 text-xs text-slate-500">
              Next class in <Countdown weekly />
            </div>
          </div>

          <p className="dfa-fade-up mt-5 max-w-xl text-base sm:text-lg text-slate-500 leading-relaxed">
            On summer break from uni, college or school? Put it to work. DFA&apos;s
            proven 2-stage system takes you from a solid foundation to advanced paid
            ads, CRM and tracking.
          </p>

          <div className="dfa-fade-up mt-5 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/60 px-4 py-3 max-w-xl">
            <span className="text-xl leading-none">💼</span>
            <p className="text-sm text-slate-700 leading-relaxed">
              Learn the complete, proven path to{" "}
              <span className="font-semibold text-slate-900">win international clients</span>{" "}
              and build a real freelancing income — through{" "}
              <span className="font-semibold text-slate-900">direct client hunting</span>{" "}
              and top global platforms like{" "}
              <span className="font-semibold text-slate-900">Upwork &amp; Fiverr</span>.
            </p>
          </div>
          <p className="dfa-fade-up mt-2 text-xs text-slate-400 max-w-xl">
            *We teach the skills and system — your results depend on your effort
            and consistency.
          </p>

          <div className="dfa-fade-up mt-8 flex flex-col sm:flex-row items-center gap-3">
            <FreeClassButton className="dfa-pulse w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-8 py-4 font-semibold text-white shadow-xl shadow-red-500/30 hover:opacity-95 transition">
              🎓 Register for FREE Class →
            </FreeClassButton>
            <EnrollButton className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition">
              Enroll in full course
            </EnrollButton>
          </div>

          <p className="dfa-fade-up mt-4 text-sm text-slate-500">
            Not sure where to start?{" "}
            <EnrollButton className="font-semibold text-green-600 underline underline-offset-4 hover:text-green-700">
              💬 Get free guidance
            </EnrollButton>
          </p>

          <div className="dfa-fade-up mt-10 flex items-center gap-6 sm:gap-8 flex-wrap">
            <Stat value={site.stats.students} label="Students" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value={site.stats.rating} label="Avg. Rating" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value="🇵🇰" label="Made for Pakistan" />
          </div>
        </div>

        {/* Right visual */}
        <div className="dfa-fade-up relative">
          <div className="dfa-ring rounded-3xl bg-white p-6 sm:p-7 shadow-2xl shadow-red-500/10">
            {site.scarcity.on && (
              <div className="dfa-pulse -mt-1 mb-4 flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-2 text-center text-[11px] font-bold text-white">
                🔥 {site.scarcity.batch}: {site.scarcity.seatsLeft} seats left · Closes in{" "}
                <Countdown />
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
                ☀️ Summer Offer
              </span>
              <span className="rounded-full bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-1">
                Save Rs. 5,000
              </span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">{plan.name} Program</h3>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-lg font-semibold text-slate-400 line-through">
                {plan.originalPrice}
              </span>
              <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
              <span className="mb-1 text-sm text-slate-400">one-time</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">6–8 week program · beginner-friendly</p>

            <ul className="mt-4 space-y-2">
              {highlights.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-slate-700">
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
              📅 {site.classes.perWeek} classes/week · {site.classes.duration} each · live +
              recorded
            </div>

            <EnrollButton className="dfa-pulse mt-5 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition">
              Enroll Now →
            </EnrollButton>
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
