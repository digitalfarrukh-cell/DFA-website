"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/fbq";
import Countdown from "@/components/Countdown";

const FC = site.freeClass;
const channelLink = site.whatsappChannel;
const QUESTIONS = FC.screening;
const CONTACT_STEP = QUESTIONS.length; // last step: city + name + number
const TOTAL_STEPS = QUESTIONS.length + 1;

export default function FreeClassModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = () => {
      setStep(0);
      setAnswers({});
      setCity("");
      setName("");
      setPhone("");
      setSubmitting(false);
      setDone(false);
      setOpen(true);
      track("ViewContent", { content_name: "Free Class", content_category: "free_class" });
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("dfa-freeclass", handler);
    window.addEventListener("keydown", onKey);

    // Deep-link: /?register (or #register) auto-opens the registration form.
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("register") ||
      params.has("class") ||
      window.location.hash.toLowerCase().includes("register")
    ) {
      setTimeout(handler, 500);
    }

    return () => {
      window.removeEventListener("dfa-freeclass", handler);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const pick = (qid: string, option: string) => {
    setAnswers((a) => ({ ...a, [qid]: option }));
    setStep((s) => s + 1);
  };

  const canRegister =
    city.trim().length > 1 &&
    name.trim().length > 1 &&
    phone.replace(/[^0-9]/g, "").length >= 10;

  // WhatsApp message carries city + all answers → you know exactly who registered.
  const detailLines = QUESTIONS.map(
    (q) => `• ${q.q}\n   ${answers[q.id] ?? "—"}`
  ).join("\n");
  const waMsg =
    `🎓 FREE CLASS registration\n\n` +
    `👤 Naam: ${name || "—"}\n` +
    `📱 WhatsApp: ${phone || "—"}\n` +
    `🏙️ City: ${city || "—"}\n\n` +
    `📋 Details:\n${detailLines}\n\n` +
    `Main aapki FREE Saturday class (9 PM) join karna chahta/chahti hoon 🙏`;
  const wa = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    waMsg
  )}`;

  const register = async () => {
    if (!canRegister || submitting) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("type", "free-class");
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("plan", "FREE Class — " + FC.scheduleLabel);
      fd.append(
        "answers",
        JSON.stringify([
          { q: "City", a: city },
          ...QUESTIONS.map((q) => ({ q: q.q, a: answers[q.id] ?? "" })),
        ])
      );
      await fetch("/api/enroll", { method: "POST", body: fd });
    } catch {
      /* ignore — user still gets the WhatsApp step */
    }
    track("CompleteRegistration", {
      content_name: "Free Class",
      content_category: "free_class",
    });
    setSubmitting(false);
    setDone(true);
    window.open(wa, "_blank", "noopener,noreferrer");
  };

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

        {done ? (
          <div className="text-center py-4">
            <div className="text-4xl">✅</div>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Registered{name ? `, ${name}` : ""}!
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              WhatsApp khul gaya hai — bas woh message <b>Send</b> kar do (taake humein
              pata chale aap aa rahe ho). Phir humara <b>channel follow</b> kar lo — class
              link aur reminders wahin milenge. Milte hain <b>Saturday 9 PM</b>! 🎉
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/25 hover:opacity-95 transition"
            >
              Message na gaya? Yahan Send karo →
            </a>
            <a
              href={channelLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-green-700 underline underline-offset-2"
            >
              📢 Humara WhatsApp Channel bhi follow karo →
            </a>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="mt-1 mb-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {step < CONTACT_STEP ? (
              /* ---- Screening question ---- */
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-1">
                  🎓 FREE Class · Sawal {step + 1} / {QUESTIONS.length}
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
            ) : (
              /* ---- Contact: city + name + number ---- */
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-1">
                  🎓 Aakhri step
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900 leading-snug">
                  Apni details do — class link WhatsApp pe milega
                </h3>
                <p className="mt-1.5 text-sm text-slate-500">
                  {FC.scheduleLabel} · Live on Zoom · Bilkul free.
                </p>
                <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-2.5 text-center text-sm text-slate-600">
                  Next class in <Countdown weekly />
                </div>

                <div className="mt-5 space-y-3">
                  <input
                    type="text"
                    autoFocus
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Aapki City (e.g. Lahore) *"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
                  />
                  <input
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aapka poora naam *"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
                  />
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="WhatsApp number (03xx-xxxxxxx) *"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
                  />
                </div>

                <button
                  disabled={!canRegister || submitting}
                  onClick={register}
                  className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition enabled:hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Registering…" : "Register & Message on WhatsApp →"}
                </button>
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="mt-4 block mx-auto text-xs text-slate-400 hover:text-slate-600"
                >
                  ← Pichla sawal
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
