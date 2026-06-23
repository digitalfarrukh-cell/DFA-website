import { site, waLink } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function Pricing() {
  const { basic, premium } = site.plans;

  return (
    <section id="pricing" className="relative py-14 sm:py-20 dfa-glow">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Choose your path
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-500">
            Start with the Foundation, or go all-in with the Pro Career program that
            opens the door to high-ticket clients. ☀️ {site.summer.discount}.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5 items-start">
          {/* Foundation */}
          <div className="dfa-card rounded-3xl p-8">
            <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1">
              {basic.tag}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">{basic.name}</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-slate-900">{basic.price}</span>
              <span className="mb-1 text-slate-400">{basic.period}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{basic.note}</p>

            <ul className="mt-6 space-y-3">
              {basic.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-slate-600">
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-slate-100 text-slate-500 text-xs shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-slate-400">
              + {basic.addonNote} ({site.communityAddon})
            </p>

            <EnrollButton
              plan={basic.name}
              className="mt-5 w-full flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Enroll Now
            </EnrollButton>
          </div>

          {/* Pro Career — highlighted */}
          <div className="dfa-ring relative rounded-3xl p-8 bg-white shadow-xl shadow-red-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ffb800] text-white text-xs font-bold px-4 py-1.5 shadow-lg shadow-red-500/30 whitespace-nowrap">
              ⭐ {premium.tag}
            </div>

            <span className="inline-flex items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
              Best value
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">{premium.name}</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-slate-900">{premium.price}</span>
              <span className="mb-1 text-slate-400">{premium.period}</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{premium.note}</p>

            <ul className="mt-6 space-y-3">
              {premium.features.map((f, i) => (
                <li
                  key={f}
                  className={`flex gap-3 text-sm ${
                    i === 0 ? "text-slate-400 italic" : "text-slate-700"
                  }`}
                >
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <EnrollButton
              plan={premium.name}
              className="dfa-pulse mt-8 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition"
            >
              Enroll Now →
            </EnrollButton>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Not sure which plan fits you?{" "}
          <a href={waLink} className="text-red-600 font-medium underline underline-offset-4">
            Message us on WhatsApp
          </a>{" "}
          — we&apos;ll guide you.
        </p>
      </div>
    </section>
  );
}
