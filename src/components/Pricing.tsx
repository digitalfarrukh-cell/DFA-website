import { site, waLink } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

type Plan = {
  name: string;
  tag: string;
  price: string;
  period: string;
  note: string;
  features: readonly string[];
  addonNote?: string;
};

function PlanCard({ plan, highlight }: { plan: Plan; highlight?: boolean }) {
  return (
    <div
      className={
        highlight
          ? "dfa-ring relative rounded-3xl p-8 bg-white shadow-xl shadow-red-500/10 md:-mt-4 md:mb-4"
          : "dfa-card rounded-3xl p-8"
      }
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ffb800] text-white text-xs font-bold px-4 py-1.5 shadow-lg shadow-red-500/30 whitespace-nowrap">
          ⭐ {plan.tag}
        </div>
      )}

      <span
        className={`inline-flex items-center rounded-full text-xs font-semibold px-3 py-1 ${
          highlight ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600"
        }`}
      >
        {highlight ? "Best value for money" : plan.tag}
      </span>

      <h3 className="mt-4 text-2xl font-bold text-slate-900">{plan.name}</h3>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
        <span className="mb-1 text-slate-400">{plan.period}</span>
      </div>
      <p className="mt-1 text-sm text-slate-400">{plan.note}</p>

      <ul className="mt-6 space-y-3">
        {plan.features.map((f) => {
          const isLead = f.startsWith("Everything in");
          return (
            <li
              key={f}
              className={`flex gap-3 text-sm ${
                isLead ? "text-slate-400 italic" : highlight ? "text-slate-700" : "text-slate-600"
              }`}
            >
              <span
                className={`grid place-items-center h-5 w-5 rounded-full text-xs shrink-0 ${
                  highlight ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                }`}
              >
                ✓
              </span>
              {f}
            </li>
          );
        })}
      </ul>

      {plan.addonNote && (
        <p className="mt-5 text-xs text-slate-400">
          + {plan.addonNote} ({site.communityAddon})
        </p>
      )}

      <EnrollButton
        plan={plan.name}
        className={
          highlight
            ? "dfa-pulse mt-6 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition"
            : "mt-6 w-full flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-50 transition"
        }
      >
        Enroll Now {highlight ? "→" : ""}
      </EnrollButton>
    </div>
  );
}

export default function Pricing() {
  const { basic, mid, premium } = site.plans;

  return (
    <section id="pricing" className="relative py-14 sm:py-20 dfa-glow">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Choose your path
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-500">
            Start with the Foundation, become freelance-ready with Freelancer, or go
            all-in with Pro Career for high-ticket clients. ☀️ {site.summer.discount}.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 items-start">
          <PlanCard plan={basic} />
          <PlanCard plan={mid} highlight />
          <PlanCard plan={premium} />
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
