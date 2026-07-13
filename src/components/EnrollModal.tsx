"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { track, trackCustom, setUserData } from "@/lib/fbq";
import { compressImage } from "@/lib/enroll";

// Single active plan — Freelancer (summer offer).
const PLAN = site.plans.mid;
const PLAN_VALUE = Number(PLAN.price.replace(/[^0-9]/g, "")) || 0;
const QUESTIONS = site.screening;
const UPLOAD_ENABLED = site.enrollment.uploadEnabled;

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
  const [showPay, setShowPay] = useState(false);
  // Screenshot upload state
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  // Open the funnel — fires InitiateCheckout (funnel started).
  useEffect(() => {
    const handler = () => {
      setStep(0);
      setAnswers({});
      setName("");
      setPhone("");
      setLeadFired(false);
      setShowPay(false);
      setFile(null);
      setPreview(null);
      setUploading(false);
      setUploaded(false);
      setUploadErr(null);
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
      setUserData({ name, phone });
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

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadErr(null);
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const submitUpload = async () => {
    if (!file || uploading) return;
    setUploading(true);
    setUploadErr(null);
    try {
      let blob: Blob = file;
      try {
        blob = await compressImage(file);
      } catch {
        blob = file;
      }
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("plan", PLAN.name);
      fd.append(
        "answers",
        JSON.stringify(QUESTIONS.map((q) => ({ q: q.q, a: answers[q.id] ?? "" })))
      );
      fd.append("screenshot", blob, "payment.jpg");

      const res = await fetch("/api/enroll", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !j.ok) throw new Error("upload_failed");

      setUploaded(true);
      trackCustom("PaymentUploaded", {
        content_name: PLAN.name,
        currency: "PKR",
        value: PLAN_VALUE,
      });
      // Redirect to personal WhatsApp with details + "screenshot attached" note.
      window.open(waPaid, "_blank", "noopener,noreferrer");
    } catch {
      setUploadErr("Upload nahi ho saka — neechay WhatsApp pe bhej dein.");
    } finally {
      setUploading(false);
    }
  };

  // WhatsApp message — carries ALL screening answers with it, so the
  // moment the lead messages, you already have their full profile.
  const detailLines = QUESTIONS.map(
    (q) => `• ${q.q}\n   ${answers[q.id] ?? "—"}`
  ).join("\n");
  const msg =
    `🟢 NEW LEAD — ${PLAN.name} (${PLAN.price})\n\n` +
    `👤 Naam: ${name || "—"}\n` +
    `📱 WhatsApp: ${phone || "—"}\n\n` +
    `📋 Meri details:\n${detailLines}\n\n` +
    `Main enroll karna chahta/chahti hoon — please guide karein 🙏`;
  const wa = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    msg
  )}`;
  // After the screenshot upload — personal WhatsApp confirmation message.
  const waPaidMsg =
    `🟢 ENROLLMENT — ${PLAN.name} (${PLAN.price})\n\n` +
    `👤 Naam: ${name || "—"}\n` +
    `📱 WhatsApp: ${phone || "—"}\n\n` +
    `📋 Meri details:\n${detailLines}\n\n` +
    `✅ Maine fee bhej di hai.\n📎 Payment screenshot attached 👇`;
  const waPaid = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    waPaidMsg
  )}`;
  const waNumberPretty = site.whatsapp;

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  return (
    <div
      className="fixed inset-0 z-[70] grid justify-items-center items-start sm:items-center bg-slate-900/55 backdrop-blur-sm px-4 py-8 overflow-y-auto"
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
                autoFocus
                autoComplete="name"
                enterKeyHint="next"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aapka poora naam"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
              />
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                enterKeyHint="done"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (e.g. 03xx-xxxxxxx)"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
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

        {/* ---- Final step ---- */}
        {step === PAY_STEP && (
          <div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 text-[11px] font-semibold px-3 py-1">
                🎉 Bas ek aakhri step!
              </div>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {UPLOAD_ENABLED
                  ? "Pay & confirm your seat"
                  : "Apni details WhatsApp pe bhejein"}
              </h3>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-slate-400 line-through text-sm">
                  {PLAN.originalPrice}
                </span>
                <span className="text-xl font-extrabold text-slate-900">
                  {PLAN.price}
                </span>
                <span className="rounded-full bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5">
                  ☀️ Summer
                </span>
              </div>
            </div>

            {!uploaded && (
              <div className="mt-5 rounded-2xl border border-green-300 bg-green-50 p-4 text-center">
                <p className="text-sm font-semibold text-slate-800">
                  👥 Priority group join karo — hum yahan aapko personally guide karenge
                </p>
                <a
                  href={site.enrollment.leadGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("Contact", {
                      content_name: PLAN.name,
                      content_category: "priority_group",
                      currency: "PKR",
                      value: PLAN_VALUE,
                    })
                  }
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg shadow-green-500/25 hover:opacity-95 transition"
                >
                  👥 Join Priority Group →
                </a>
                <a
                  href={site.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-green-700 underline underline-offset-2"
                >
                  📢 Humara WhatsApp Channel bhi follow karo →
                </a>
              </div>
            )}

            {UPLOAD_ENABLED ? (
              uploaded ? (
                <div className="mt-6 rounded-2xl border border-green-300 bg-green-50 p-6 text-center">
                  <div className="text-4xl">✅</div>
                  <h4 className="mt-2 text-lg font-bold text-slate-900">
                    Ho gaya{name ? `, ${name}` : ""}!
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-600">
                    WhatsApp khul gaya hai — bas woh message <b>Send</b> kar do aur
                    wahin apna <b>payment screenshot bhi attach</b> kar do. Hum foran
                    aapko confirm kar denge. 🙌
                  </p>
                  <a
                    href={waPaid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/25 hover:opacity-95 transition"
                  >
                    WhatsApp na khula? Yahan tap karein →
                  </a>
                </div>
              ) : (
                <>
                  {/* Step 1 — pay */}
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Step 1 — Fee bhejein
                    </div>
                    <div className="mt-2 divide-y divide-slate-200">
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

                  {/* Step 2 — upload screenshot */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Step 2 — Payment screenshot upload karein
                    </div>
                    <label className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center hover:border-[#ff5e3a] transition">
                      {preview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={preview} alt="screenshot preview" className="max-h-40 rounded-lg" />
                      ) : (
                        <>
                          <span className="text-2xl">📷</span>
                          <span className="text-sm font-medium text-slate-600">
                            Tap to choose screenshot
                          </span>
                          <span className="text-[11px] text-slate-400">JPG / PNG</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFile}
                      />
                    </label>

                    {uploadErr && (
                      <p className="mt-2 text-center text-xs text-red-600">{uploadErr}</p>
                    )}

                    <button
                      disabled={!file || uploading}
                      onClick={submitUpload}
                      className="mt-3 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition enabled:hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {uploading ? "Uploading…" : "Upload & Confirm Enrollment"}
                    </button>
                  </div>

                  {/* WhatsApp fallback */}
                  <div className="mt-5 flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="text-[11px] uppercase tracking-wider text-slate-400">
                      ya
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("Contact", {
                        content_name: PLAN.name,
                        content_category: "whatsapp_lead",
                        currency: "PKR",
                        value: PLAN_VALUE,
                      })
                    }
                    className="mt-4 flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-50 px-6 py-3 font-semibold text-green-700 hover:bg-green-100 transition"
                  >
                    💬 Screenshot WhatsApp pe bhejein
                  </a>
                </>
              )
            ) : (
              <>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Hum aapko personally guide karenge aur seat confirm karenge. Aapke
                  saare jawab is message ke saath khud attach hain — bas Send dabayein.
                </p>

                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("Contact", {
                      content_name: PLAN.name,
                      content_category: "whatsapp_lead",
                      currency: "PKR",
                      value: PLAN_VALUE,
                    })
                  }
                  className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg shadow-green-500/25 hover:opacity-95 transition"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Send My Details on WhatsApp →
                </a>

                <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <span>WhatsApp na khule to number save karein:</span>
                  <button
                    onClick={() => copy(waNumberPretty)}
                    className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition"
                  >
                    {copied === waNumberPretty ? "Copied ✓" : `${waNumberPretty} · Copy`}
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <button
                    onClick={() => setShowPay((v) => !v)}
                    className="w-full flex items-center justify-between gap-3 text-left"
                  >
                    <span className="text-sm font-semibold text-slate-700">
                      💳 Abhi fee pay karni hai?{" "}
                      <span className="font-normal text-slate-400">(optional)</span>
                    </span>
                    <span
                      className={`text-[#ff5e3a] text-lg transition-transform ${
                        showPay ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {showPay && (
                    <div className="mt-3 divide-y divide-slate-200">
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
                      <p className="pt-2.5 text-[11px] text-slate-400">
                        Fee bhejne ke baad screenshot isi WhatsApp chat mein bhej dein.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-4 block mx-auto text-xs text-slate-400 hover:text-slate-600"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
