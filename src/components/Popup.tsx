"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Popup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("dfa_popup_seen")) return;

    const trigger = () => {
      setOpen(true);
      sessionStorage.setItem("dfa_popup_seen", "1");
      cleanup();
    };

    const timer = setTimeout(trigger, 12000);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", onLeave);

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onLeave);
    }
    return cleanup;
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/50 backdrop-blur-sm px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="dfa-ring relative w-full max-w-md rounded-3xl bg-white p-8 text-center dfa-fade-up shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 text-xl"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-600 text-xs font-semibold px-3 py-1">
          ☀️ {site.summer.discount}
        </div>

        <h3 className="mt-4 text-2xl font-bold text-slate-900">
          Your break = your head-start
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {site.summer.sub} Lock your seat and finish these holidays with a skill
          that actually pays.
        </p>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs text-slate-400">Foundation plan starts at</div>
          <div className="text-3xl font-extrabold text-slate-900">
            {site.plans.basic.price}
            <span className="text-base font-medium text-slate-400">
              {" "}
              {site.plans.basic.period}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new CustomEvent("dfa-enroll", { detail: {} }));
          }}
          className="mt-5 w-full flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-red-500/25 hover:opacity-95 transition"
        >
          Claim My Summer Seat →
        </button>
        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-xs text-slate-400 hover:text-slate-600"
        >
          No thanks, maybe later
        </button>
      </div>
    </div>
  );
}
