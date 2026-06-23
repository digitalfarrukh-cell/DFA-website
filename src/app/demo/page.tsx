import { site } from "@/lib/site";

// Standalone THEME PREVIEW — "Bright & Aspirational" direction.
// This page is isolated; the main site (/) is untouched.
export default function ThemeDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfaff] text-slate-900">
      {/* Soft optimistic blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-24 h-80 w-80 rounded-full bg-[#ff5e3a]/20 blur-3xl" />
        <div className="absolute top-10 right-0 h-80 w-80 rounded-full bg-[#7c3aed]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#ff2d2d]/10 blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="mx-auto max-w-6xl px-5 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-white overflow-hidden shadow-md ring-1 ring-slate-200">
            <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
          </span>
          <span className="font-semibold tracking-tight text-slate-900 leading-tight">
            Digital Fluxx
            <br />
            <span className="text-slate-400 text-xs font-normal">Academics</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <span>System</span>
          <span>Curriculum</span>
          <span>Pricing</span>
          <span>FAQ</span>
        </div>
        <button className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] text-white text-sm font-semibold px-5 py-2.5 shadow-lg shadow-red-500/25">
          Enroll Now
        </button>
      </nav>

      {/* Preview label */}
      <div className="mx-auto max-w-6xl px-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
          ✨ Theme preview — Bright &amp; Aspirational
        </span>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5e3a]" />
            🎓 On summer break? Make it count
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
            Learn Digital Marketing —
            <br /> then earn from{" "}
            <span className="bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] bg-clip-text text-transparent">
              high-ticket clients
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-500 leading-relaxed">
            On summer break from uni, college or school? Put it to work. DFA&apos;s
            proven 2-stage system takes you from a solid foundation to advanced paid
            ads, CRM and tracking — the skills that land real international clients.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-8 py-4 font-semibold text-white shadow-xl shadow-red-500/30">
              Enroll Now →
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition">
              View Plans &amp; Pricing
            </button>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <Stat value={site.stats.students} label="Students" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value={site.stats.rating} label="Avg. Rating" />
            <div className="h-8 w-px bg-slate-200" />
            <Stat value={site.stats.countries} label="Countries" />
          </div>
        </div>

        {/* Right visual */}
        <div className="relative">
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Your growth</span>
              <span className="rounded-full bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1">
                +218% ↑
              </span>
            </div>
            {/* Mock bar chart */}
            <div className="mt-6 flex items-end gap-3 h-40">
              {[35, 55, 45, 70, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-[#ff2d2d] to-[#ff8a5b]" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-violet-50 p-4">
                <div className="text-xs text-violet-500">Active clients</div>
                <div className="text-2xl font-bold text-violet-700">12</div>
              </div>
              <div className="rounded-2xl bg-red-50 p-4">
                <div className="text-xs text-red-500">This month</div>
                <div className="text-2xl font-bold text-red-600">$2,400</div>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100 flex items-center gap-3">
            <span className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[#ff2d2d] to-[#ff5e3a] text-white text-sm">★</span>
            <div className="text-xs">
              <div className="font-semibold text-slate-800">Certificate</div>
              <div className="text-slate-400">on completion</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
    </div>
  );
}
