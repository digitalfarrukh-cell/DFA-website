"use client";

import { useEffect, useState } from "react";
import { site, waConsultLink } from "@/lib/site";
import { track } from "@/lib/fbq";

// Single active plan — Freelancer (summer offer).
const PLAN = site.plans.mid;
const PLAN_VALUE = Number(PLAN.price.replace(/[^0-9]/g, "")) || 0;
const QUESTIONS = site.screening;

// Funnel steps: [Q1..Qn] → contact (name/number) → payment
const NAME_STEP = QUESTIONS.length;
const PAY_STEP = QUESTIONS.length + 1;
const TOTAL_STEPS = QUESTIONS.length + 2;

const payRows = [
  { label: "Account Title", value: site.payment.name },
  { label: "NayaPay ID", value: site.payment.nayapay },
  { label: "Account Number", value: site.payment.account },
  { label: "IBAN", value: site.payment.iban },
];

export default function EnrollModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [leadFired, setLeadFired] = useState(false);

  // Open the funnel — fires InitiateCheckout (funnel started).
  useEffect(() => {
    const handler = () => {
      setStep(0);
      setAnswers({});
      setName("");
      setPhone("");
      setLeadFired(false);
      setOpen(true);
      track("InitiateCheckout", {
        content_name: PLAN.name,
        content_category: "course",
        currency: "PKR",
        value: PLAN_VALUE,
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

  // Fire Lead ONCE — only when a screened, qualified user reaches the
  // payment screen. This is the event campaigns should optimize for.
  useEffect(() => {
    if (open && step === PAY_STEP && !leadFired) {
      track("Lead", {
        content_name: PLAN.name,
        content_category: "course",
        currency: "PKR",
        value: PLAN_VALUE,
      });
      setLeadFired(true);
    }
  }, [open, step, leadFired]);

  if (!open) return null;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const pick = (qid: string, option: string) => {
    setAnswers((a) => ({ ...a, [qid]: option }));
    setStep((s) => s + 1); // auto-advance
  };

  const canContinueContact =
    name.trim().length > 1 && phone.replace(/[^0-9]/g, "").length >= 10;

  // WhatsApp message — carries ALL screening answers with it, so the
  // moment the lead messages, you already have their full profile.
  const detailLines = QUESTIONS.map(
    (q) => `• ${q.q}\n   ${answers[q.id] ?? "—"}`
  ).join("\n");
  const msg =
    `Hi DFA! 🙌 Main *${PLAN.name}* plan (${PLAN.price}) mein enroll karna chahta/chahti hoon.\n` +
    `Maine fee bhej di hai — payment screenshot attach kar raha/rahi hoon 👇\n\n` +
    `👤 Naam: ${name || "—"}\n` +
    `📱 WhatsApp: ${phone || "—"}\n\n` +
    `📋 Meri details:\n${detailLines}`;
  const wa = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    msg
  )}`;
  const waNumberPretty = site.whatsapp;

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-slate-900/55 backdrop-blur-sm px-4 py-8 overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div
        className="dfa-ring relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 dfa-fade-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 text-xl"
        >
          ✕
        </button>

        {/* Progress bar */}
        <div className="mt-1 mb-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* ---- Screening questions ---- */}
        {step < NAME_STEP && (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-1">
              Sawal {step + 1} / {QUESTIONS.length}
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900 leading-snug">
              {QUESTIONS[step].q}
            </h3>
            <div className="mt-5 grid gap-2.5">
              {QUESTIONS[step].options.map((opt) => {
                const selected = answers[QUESTIONS[step].id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => pick(QUESTIONS[step].id, opt)}
                    className={`w-full text-left rounded-2xl border px-4 py-3.5 text-sm font-medium transition ${
                      selected
                        ? "border-[#ff5e3a] bg-red-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:border-[#ff5e3a]/60 hover:bg-red-50/40"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-5 text-xs text-slate-400 hover:text-slate-600"
              >
                ← Pichla sawal
              </button>
            )}
          </div>
        )}

        {/* ---- Name + WhatsApp number ---- */}
        {step === NAME_STEP && (
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-1">
              Aakhri step
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Apna naam &amp; WhatsApp number likhein
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Taake hum aapko course &amp; class access bhej sakein.
            </p>

            <div className="mt-5 space-y-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aapka poora naam"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#ff5e3a]"
              />
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (e.g. 03xx-xxxxxxx)"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-[#ff5e3a]"
              />
            </div>

            <button
              disabled={!canContinueContact}
              onClick={() => setStep(PAY_STEP)}
              className="mt-5 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition enabled:hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 block mx-auto text-xs text-slate-400 hover:text-slate-600"
            >
              ← Pichla sawal
            </button>
          </div>
        )}

        {/* ---- Payment ---- */}
        {step === PAY_STEP && (
          <div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold px-3 py-1">
                🎉 Bas ek aakhri kadam!
              </div>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {PLAN.name} Plan
              </h3>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="text-slate-400 line-through text-sm">
                  {PLAN.originalPrice}
                </span>
                <span className="text-2xl font-extrabold text-slate-900">
                  {PLAN.price}
                </span>
                <span className="rounded-full bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5">
                  ☀️ Summer
                </span>
              </div>
              <p className="mt-1.5 text-sm text-slate-500">
                Neeche diye account mein <b>{PLAN.price}</b> bhejein, phir WhatsApp
                par screenshot send karein.
              </p>
            </div>

            {/* Payment details */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="divide-y divide-slate-200">
                {payRows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
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

            <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-3.5 text-center">
              <p className="text-xs text-amber-700 leading-relaxed">
                ⚠️ Enrollment tabhi confirm hogi jab aap{" "}
                <span className="font-semibold text-amber-800">
                  payment screenshot WhatsApp par bhejenge
                </span>
                . Aapke saare jawab is message ke saath khud attach ho jayenge.
              </p>
            </div>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Contact", {
                  content_name: PLAN.name,
                  content_category: "whatsapp_checkout",
                  currency: "PKR",
                  value: PLAN_VALUE,
                })
              }
              className="mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition"
            >
              Send Payment Screenshot on WhatsApp →
            </a>

            {/* Fallback for in-app browsers (Instagram/Facebook) where wa.me
                sometimes fails to open WhatsApp. */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <span>WhatsApp na khule to yeh number save karein:</span>
              <button
                onClick={() => copy(waNumberPretty)}
                className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition"
              >
                {copied === waNumberPretty ? "Copied ✓" : `${waNumberPretty} · Copy`}
              </button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-[11px] uppercase tracking-wider text-slate-400">
                or
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <a
              href={waConsultLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Contact", {
                  content_name: PLAN.name,
                  content_category: "whatsapp_consult",
                })
              }
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-50 px-6 py-3 font-semibold text-green-700 hover:bg-green-100 transition"
            >
              💬 Pay karne se pehle sawal? Free guidance lein
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
