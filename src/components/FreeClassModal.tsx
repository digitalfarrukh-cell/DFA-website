"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/fbq";
import Countdown from "@/components/Countdown";

const FC = site.freeClass;
const wa = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
  FC.waMessage
)}`;

export default function FreeClassModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = () => {
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

  const canSubmit =
    name.trim().length > 1 && phone.replace(/[^0-9]/g, "").length >= 10;

  const register = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    // Fire the registration notification email (best-effort — don't block WA).
    try {
      const fd = new FormData();
      fd.append("type", "free-class");
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("plan", "FREE Class — " + FC.dateLabel);
      fd.append("answers", "[]");
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
              WhatsApp khul gaya hai — bas woh message <b>Send</b> kar do, hum aapko
              class ka <b>link</b> aur reminders bhej denge. Milte hain{" "}
              <b>{FC.dateLabel}</b>! 🎉
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/25 hover:opacity-95 transition"
            >
              WhatsApp na khula? Yahan tap karein →
            </a>
          </div>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-[11px] font-semibold px-3 py-1">
              🎓 FREE Live Class
            </div>
            <h3 className="mt-3 text-xl font-bold text-slate-900 leading-snug">
              Fiverr/Upwork pe apna Pehla Client — live
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              {FC.dateLabel} · Live on Zoom · Bilkul free. Register karo, hum WhatsApp
              pe link bhej denge.
            </p>
            <div className="mt-3 rounded-2xl bg-slate-50 px-4 py-2.5 text-center text-sm text-slate-600">
              Starts in{" "}
              <Countdown targetISO={FC.targetISO} />
            </div>

            <div className="mt-5 space-y-3">
              <input
                type="text"
                autoFocus
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aapka poora naam"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
              />
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp number (e.g. 03xx-xxxxxxx)"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-800 outline-none focus:border-[#ff5e3a]"
              />
            </div>

            <button
              disabled={!canSubmit || submitting}
              onClick={register}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 transition enabled:hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Registering…" : "Register & Get Link on WhatsApp →"}
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-400">
              Register karte hi WhatsApp khulega — bas message send karna hai.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
