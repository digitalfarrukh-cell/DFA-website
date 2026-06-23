// NOTE: Placeholder testimonials. Replace with real student names/cities/results
// (WhatsApp screenshots convert best here) once you have them.

const testimonials = [
  {
    name: "Ali R.",
    city: "Lahore",
    text: "Landed my first international client right after the program. The advanced ads module was a game-changer.",
  },
  {
    name: "Hira S.",
    city: "Karachi",
    text: "I used to only know posting. Now I run proper ad campaigns and CRM pipelines for clients.",
  },
  {
    name: "Bilal A.",
    city: "Islamabad",
    text: "The structured roadmap ended all my confusion. Everything finally made sense, step by step.",
  },
];

export default function Results() {
  return (
    <section id="results" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Results
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            What our students say
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60">
            Real students, real progress. No fake guarantees — just a tested system
            and your effort.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="dfa-card rounded-2xl p-6">
              <div className="text-[#ffb800] text-sm">★★★★★</div>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">“{t.text}”</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[#ff2424] to-[#ff5e3a] text-xs font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/45">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          * Results depend on each student&apos;s effort, consistency and market
          conditions. No guaranteed-income claims.
        </p>
      </div>
    </section>
  );
}
