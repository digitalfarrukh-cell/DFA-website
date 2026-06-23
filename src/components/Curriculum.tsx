const modules = [
  {
    no: "01",
    title: "Digital Marketing Fundamentals",
    points: ["Market & audience research", "Choosing the right platforms", "Personal brand setup"],
  },
  {
    no: "02",
    title: "Social Media Marketing",
    points: ["Meta & Instagram growth", "TikTok strategy", "Content that engages"],
  },
  {
    no: "03",
    title: "Paid Ads — Foundation",
    points: ["Facebook/Instagram ads setup", "Pixel & tracking basics", "Budgeting fundamentals"],
  },
  {
    no: "04",
    title: "Advanced Paid Ads",
    points: ["High-converting campaigns", "Advanced targeting & scaling", "Pro optimization"],
    premium: true,
  },
  {
    no: "05",
    title: "CRM, Tracking & Funnels",
    points: ["CRM setup & automation", "Advanced analytics & attribution", "Funnels that convert"],
    premium: true,
  },
  {
    no: "06",
    title: "High-Ticket Client Acquisition",
    points: ["Finding international clients", "Pitching & pricing high-ticket", "Closing your first deal"],
    premium: true,
  },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            Curriculum
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            Exactly what you&apos;ll learn
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/60">
            Full transparency — every module is laid out below. Nothing hidden.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div
              key={m.no}
              className={`rounded-2xl p-6 transition hover:-translate-y-1 ${
                m.premium
                  ? "border border-[#ff2424]/30 bg-gradient-to-b from-[#ff2424]/[0.07] to-transparent"
                  : "dfa-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-extrabold ${
                    m.premium ? "text-[#ff5e3a]/70" : "text-white/15"
                  }`}
                >
                  {m.no}
                </span>
                {m.premium && (
                  <span className="rounded-full bg-[#ff2424]/15 text-[#ff7a5a] text-[10px] font-bold px-2.5 py-1">
                    PRO
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-white">{m.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-white/55">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className={m.premium ? "text-[#ff5e3a]" : "text-white/40"}>›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
