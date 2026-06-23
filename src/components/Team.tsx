import { site } from "@/lib/site";

export default function Team() {
  return (
    <section id="team" className="relative py-14 sm:py-20 dfa-glow-soft">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Behind DFA
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Taught by working professionals
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60">{site.team.blurb}</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {site.team.roles.map((r) => (
            <div key={r.title} className="dfa-card rounded-2xl p-6 text-center">
              <div className="mx-auto grid place-items-center h-12 w-12 rounded-full bg-gradient-to-br from-[#ff2424] to-[#ff5e3a] text-white font-bold">
                {r.title.charAt(0)}
              </div>
              <h3 className="mt-4 font-semibold text-white text-sm">{r.title}</h3>
              <p className="mt-1.5 text-xs text-white/50 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/45">
          Real practitioners. Real campaigns. Real client results — not recycled theory.
        </p>
      </div>
    </section>
  );
}
