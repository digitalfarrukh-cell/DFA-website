export default function TwoStageSystem() {
  return (
    <section id="system" className="relative py-14 sm:py-20 dfa-glow-soft">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            The DFA System
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            A proven 2-stage roadmap
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-500">
            Build a strong base first, then add the advanced edge. That&apos;s the
            difference between an average marketer and a paid professional.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {/* Stage 1 */}
          <div className="dfa-card rounded-3xl p-8">
            <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1">
              STAGE 1 • Foundation
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Digital Marketing Foundation
            </h3>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              Build the base everything else stands on.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
              {[
                "Social Media Marketing (Meta, Instagram, TikTok)",
                "Content & branding strategy",
                "Lead generation fundamentals",
                "Client communication & profile setup",
              ].map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-slate-400">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Stage 2 — premium */}
          <div className="dfa-ring relative rounded-3xl p-8 bg-white shadow-lg shadow-red-500/5">
            <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ffb800] text-white text-xs font-bold px-3 py-1 shadow-lg shadow-red-500/30">
              ⭐ PREMIUM EDGE
            </div>
            <span className="inline-flex items-center rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
              STAGE 2 • Advanced
            </span>
            <h3 className="mt-4 text-2xl font-bold text-slate-900">
              Advanced Paid Ads & Growth
            </h3>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              The next-level strategies that generate real revenue — never found in
              free content.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
              {[
                "High-converting paid ad campaigns",
                "CRM mastery + advanced tracking & analytics",
                "Access to high-ticket international clients",
                "Pro-level funnels, scaling & optimization",
              ].map((i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-[#ff5e3a]">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Stage 1 → Stage 2: from beginner to a paid, in-demand professional.
        </p>
      </div>
    </section>
  );
}
