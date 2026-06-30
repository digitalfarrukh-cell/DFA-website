"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/fbq";

const rows = [
  { label: "Account Title", value: site.payment.name },
  { label: "NayaPay ID", value: site.payment.nayapay },
  { label: "Account Number", value: site.payment.account },
  { label: "IBAN", value: site.payment.iban },
];

// Map each plan name to its numeric price so Meta events can carry value + currency.
const planValue: Record<string, number> = Object.fromEntries(
  Object.values(site.plans).map((p) => [p.name, Number(p.price.replace(/[^0-9]/g, "")) || 0])
);

export default function EnrollModal() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<string | undefined>();
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { plan?: string } | undefined;
      setPlan(detail?.plan);
      setOpen(true);
      track("InitiateCheckout", {
        content_name: detail?.plan ?? "DFA Enrollment",
        content_category: "course",
        currency: "PKR",
        value: detail?.plan ? planValue[detail.plan] ?? 0 : 0,
      });
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("dfa-enroll", handler);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("dfa-enroll", handler);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (!open) return null;

  const msg = `Hi DFA! I want to enroll${
    plan ? ` in the ${plan} plan` : ""
  }. Here is my payment receipt:`;
  const wa = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(msg)}`;

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-900/55 backdrop-blur-sm px-4 py-8 overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className="dfa-ring relative w-full max-w-md rounded-3xl bg-white p-7 sm:p-8 dfa-fade-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 text-xl"
        >
          ✕
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
            Complete your enrollment
          </div>
          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {plan ? `${plan} Plan` : "Enroll Now"}
          </h3>
          <p className="mt-1.5 text-sm text-slate-500">
            Send the fee to the account below, then confirm on WhatsApp.
          </p>
        </div>

        {/* Payment details */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="divide-y divide-slate-200">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">
                    {r.label}
                  </div>
                  <div className="text-sm text-slate-800 truncate">{r.value}</div>
                </div>
                <button
                  onClick={() => copy(r.value)}
                  className="shrink-0 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 transition"
                >
                  {copied === r.value ? "Copied ✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-3.5 text-center">
          <p className="text-xs text-amber-700 leading-relaxed">
            ⚠️ Your enrollment is confirmed only after you{" "}
            <span className="font-semibold text-amber-800">send the payment receipt on WhatsApp</span>.
          </p>
        </div>

        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("Lead", {
              content_name: plan ?? "DFA Enrollment",
              content_category: "course",
              currency: "PKR",
              value: plan ? planValue[plan] ?? 0 : 0,
            })
          }
          className="mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition"
        >
          Send Receipt on WhatsApp →
        </a>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          Having trouble? Just message us — we&apos;ll guide you through it.
        </p>
      </div>
    </div>
  );
}
