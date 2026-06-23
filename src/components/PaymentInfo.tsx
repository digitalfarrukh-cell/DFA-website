"use client";

import { useState } from "react";
import { site, waLink } from "@/lib/site";

const rows = [
  { label: "Account Title", value: site.payment.name },
  { label: "NayaPay ID", value: site.payment.nayapay },
  { label: "Account Number", value: site.payment.account },
  { label: "IBAN", value: site.payment.iban },
];

export default function PaymentInfo() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section id="payment" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">
            How to Enroll
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">3 simple steps</h2>
        </div>

        {/* Steps */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {[
            { n: "1", t: "Pay the fee", d: "Send payment via NayaPay or bank transfer." },
            { n: "2", t: "Send screenshot", d: "Share the payment proof on WhatsApp." },
            { n: "3", t: "Get access", d: "We add you to classes & community right away." },
          ].map((s) => (
            <div key={s.n} className="dfa-card rounded-2xl p-5 text-center">
              <div className="mx-auto grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-[#ff2424] to-[#ff5e3a] text-white font-bold text-sm">
                {s.n}
              </div>
              <h3 className="mt-3 font-semibold text-white text-sm">{s.t}</h3>
              <p className="mt-1 text-xs text-white/50">{s.d}</p>
            </div>
          ))}
        </div>

        {/* Account details */}
        <div className="mt-6 dfa-card rounded-3xl p-6 sm:p-8">
          <h3 className="font-semibold text-white">Payment Details</h3>
          <div className="mt-4 divide-y divide-white/8">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-white/40">
                    {r.label}
                  </div>
                  <div className="text-sm text-white/90 truncate">{r.value}</div>
                </div>
                <button
                  onClick={() => copy(r.value)}
                  className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 transition"
                >
                  {copied === r.value ? "Copied ✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition"
          >
            Send Payment Proof on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
