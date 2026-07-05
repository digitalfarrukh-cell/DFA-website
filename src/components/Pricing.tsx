import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function Pricing() {
  const plan = site.plans.mid; // Freelancer — the only offered plan

  return (
    <section id="pricing" className="relative py-14 sm:py-20 dfa-glow">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Enrollment
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            One complete program. One clear price.
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-slate-500">
            The <b>Freelancer</b> program takes you from zero to income-ready —
            deeper paid ads, Shopify, funnels and a full freelancing +
            client-hunting setup. ☀️ Limited-time summer price.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-md">
          <div className="dfa-ring relative rounded-3xl p-8 bg-white shadow-xl shadow-red-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ffb800] text-white text-xs font-bold px-4 py-1.5 shadow-lg shadow-red-500/30 whitespace-nowrap">
              ☀️ {plan.tag} — save Rs. 5,000
            </div>

            <span className="inline-flex items-center rounded-full text-xs font-semibold px-3 py-1 bg-red-50 text-red-600">
              Income-ready program
            </span>

            <h3 className="mt-4 text-2xl font-bold text-slate-900">{plan.name}</h3>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-2xl font-semibold text-slate-400 line-through">
                {plan.originalPrice}
              </span>
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
                      isLead ? "text-slate-400 italic" : "text-slate-700"
                    }`}
                  >
                    <span className="grid place-items-center h-5 w-5 rounded-full text-xs shrink-0 bg-red-100 text-red-600">
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
              className="dfa-pulse mt-6 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition"
            >
              Enroll Now →
            </EnrollButton>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Not sure if it&apos;s right for you?{" "}
          <EnrollButton className="text-red-600 font-medium underline underline-offset-4">
            Answer a few quick questions
          </EnrollButton>{" "}
          — we&apos;ll guide you first.
        </p>
      </div>
    </section>
  );
}
