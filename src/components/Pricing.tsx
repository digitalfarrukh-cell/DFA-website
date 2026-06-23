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
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Choose your path
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60">
            Start with the Foundation, or go all-in with the Pro Career program that
            opens the door to high-ticket clients. ☀️ {site.summer.discount}.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5 items-start">
          {/* Foundation */}
          <div className="dfa-card rounded-3xl p-8">
            <span className="inline-flex items-center rounded-full bg-white/8 text-white/75 text-xs font-semibold px-3 py-1">
              {basic.tag}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white">{basic.name}</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-white">{basic.price}</span>
              <span className="mb-1 text-white/50">{basic.period}</span>
            </div>
            <p className="mt-1 text-sm text-white/45">{basic.note}</p>

            <ul className="mt-6 space-y-3">
              {basic.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-white/75">
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-white/10 text-white/70 text-xs shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-xs text-white/45">
              + {basic.addonNote} ({site.communityAddon})
            </p>

            <EnrollButton
              plan={basic.name}
              className="mt-5 w-full flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Enroll Now
            </EnrollButton>
          </div>

          {/* Pro Career — highlighted */}
          <div className="dfa-ring relative rounded-3xl p-8 bg-gradient-to-b from-[#ff2424]/[0.10] to-transparent">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff2424] to-[#ffb800] text-[#0c0c10] text-xs font-bold px-4 py-1.5 shadow-lg shadow-red-500/30 whitespace-nowrap">
              ⭐ {premium.tag}
            </div>

            <span className="inline-flex items-center rounded-full bg-[#ff2424]/15 text-[#ff7a5a] text-xs font-semibold px-3 py-1">
              Best value
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white">{premium.name}</h3>
            <div className="mt-3 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-white">{premium.price}</span>
              <span className="mb-1 text-white/50">{premium.period}</span>
            </div>
            <p className="mt-1 text-sm text-white/45">{premium.note}</p>

            <ul className="mt-6 space-y-3">
              {premium.features.map((f, i) => (
                <li
                  key={f}
                  className={`flex gap-3 text-sm ${
                    i === 0 ? "text-white/50 italic" : "text-white/85"
                  }`}
                >
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-[#ff2424]/20 text-[#ff7a5a] text-xs shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <EnrollButton
              plan={premium.name}
              className="dfa-pulse mt-8 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition"
            >
              Enroll Now →
            </EnrollButton>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          Not sure which plan fits you?{" "}
          <a href={waLink} className="text-white underline underline-offset-4">
            Message us on WhatsApp
          </a>{" "}
          — we&apos;ll guide you.
        </p>
      </div>
    </section>
  );
}
