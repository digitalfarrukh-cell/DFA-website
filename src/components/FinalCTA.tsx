import { site, waLink } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function FinalCTA() {
  return (
    <section className="relative py-14 sm:py-20 dfa-glow">
      <div className="mx-auto max-w-3xl px-5">
        <div className="dfa-ring rounded-3xl bg-white p-10 sm:p-14 text-center shadow-xl shadow-red-500/10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-medium text-red-600">
            ☀️ {site.summer.discount}
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Your marketing career
            <br />
            <span className="dfa-gradient-text">starts this summer break</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-slate-500">
            Seats are limited. Secure your spot and learn the complete system — from
            foundation to high-ticket clients.
          </p>

          <EnrollButton className="dfa-pulse mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-10 py-4 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition">
            Enroll Now →
          </EnrollButton>

          <p className="mt-5 text-sm text-slate-500">
            Or message us directly:{" "}
            <a href={waLink} className="text-red-600 font-medium underline underline-offset-4">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
