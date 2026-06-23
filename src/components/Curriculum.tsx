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
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Exactly what you&apos;ll learn
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-500">
            Full transparency — every module is laid out below. Nothing hidden.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => (
            <div
              key={m.no}
              className={`rounded-2xl p-6 transition hover:-translate-y-1 ${
                m.premium
                  ? "border border-red-200 bg-red-50/40"
                  : "dfa-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-extrabold ${
                    m.premium ? "text-[#ff5e3a]/80" : "text-slate-200"
                  }`}
                >
                  {m.no}
                </span>
                {m.premium && (
                  <span className="rounded-full bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1">
                    PRO
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{m.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className={m.premium ? "text-[#ff5e3a]" : "text-slate-400"}>›</span>
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
