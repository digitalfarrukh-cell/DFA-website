import { site } from "@/lib/site";

export default function ClassFormat() {
  const c = site.classes;
  const cards = [
    {
      icon: "📅",
      title: `${c.perWeek} classes / week`,
      desc: "A steady, doable pace so you actually finish and retain what you learn.",
    },
    {
      icon: "⏱️",
      title: `${c.duration} each`,
      desc: "Focused live sessions — no filler, everything practical and to the point.",
    },
    {
      icon: "🚀",
      title: "Class 1 = Introduction",
      desc: "Your first session is a full orientation, so you know exactly how everything works.",
    },
  ];

  return (
    <section id="schedule" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            How it works
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            A simple weekly schedule
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-slate-500">
            Consistent, beginner-friendly, and easy to fit around your studies or job.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.title} className="dfa-card rounded-3xl p-6 text-center">
              <div className="mx-auto grid place-items-center h-12 w-12 rounded-2xl bg-red-50 text-2xl">
                {card.icon}
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{card.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">🎥 {c.recordings}</p>
      </div>
    </section>
  );
}
