const pains = [
  {
    icon: "😮‍💨",
    title: "“I learned everything on YouTube, still no work”",
    text: "Scattered free videos create confusion — there's no clear roadmap or accountability.",
  },
  {
    icon: "📉",
    title: "Basic skills don't pay anymore",
    text: "Just ‘posting’ or ‘boosting’ isn't enough — thousands of people already do that.",
  },
  {
    icon: "🌍",
    title: "No access to international clients",
    text: "You never figure out where the high-paying clients are, or how to actually pitch them.",
  },
  {
    icon: "🧩",
    title: "Nobody teaches the real ‘edge’",
    text: "The advanced strategies that actually drive revenue are never in the free content.",
  },
];

export default function RealityCheck() {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Reality Check
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Regular marketing is now <span className="dfa-gradient-text">saturated</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-500">
            Basics alone won&apos;t cut it anymore. If you&apos;re facing these problems,
            you&apos;re not alone:
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {pains.map((p) => (
            <div key={p.title} className="dfa-card rounded-2xl p-6">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-red-50 text-2xl">
                {p.icon}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-lg text-slate-700">
          The fix? A <span className="text-slate-900 font-semibold">structured system</span> —
          foundation to advanced, step by step. 👇
        </p>
      </div>
    </section>
  );
}
