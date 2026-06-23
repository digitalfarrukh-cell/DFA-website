import { site, waLink } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

export default function FinalCTA() {
  return (
    <section className="relative py-14 sm:py-20 dfa-glow">
      <div className="mx-auto max-w-3xl px-5">
        <div className="dfa-ring rounded-3xl bg-gradient-to-b from-[#ff2424]/12 to-transparent p-10 sm:p-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ff2424]/40 bg-[#ff2424]/10 px-4 py-1.5 text-xs font-medium text-white/85">
            ☀️ {site.summer.discount}
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold text-white leading-tight">
            Your marketing career
            <br />
            <span className="dfa-gradient-text">starts this summer break</span>
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-white/60">
            Seats are limited. Secure your spot and learn the complete system — from
            foundation to high-ticket clients.
          </p>

          <EnrollButton className="dfa-pulse mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] px-10 py-4 font-semibold text-white shadow-lg shadow-red-500/30 hover:opacity-95 transition">
            Enroll Now →
          </EnrollButton>

          <p className="mt-5 text-sm text-white/50">
            Or message us directly:{" "}
            <a href={waLink} className="text-white underline underline-offset-4">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
