"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";
import Countdown from "@/components/Countdown";

const links = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#schedule", label: "Schedule" },
  { href: "#pricing", label: "Pricing" },
  { href: "#team", label: "Team" },
  { href: "#instructor", label: "Instructor" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openEnroll = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("dfa-enroll", { detail: {} }));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Summer announcement strip */}
      {site.scarcity.on && showBar && (
        <div className="relative bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] text-white text-xs sm:text-sm">
          <div className="mx-auto max-w-6xl px-5 py-2 flex items-center justify-center gap-2 text-center">
            <span className="font-semibold">
              🔥 {site.scarcity.batch} — only {site.scarcity.seatsLeft} seats left · Closes in{" "}
              <Countdown />
            </span>
            <EnrollButton className="ml-1 underline underline-offset-2 font-semibold hover:opacity-90">
              Enroll now
            </EnrollButton>
          </div>
          <button
            onClick={() => setShowBar(false)}
            aria-label="Close"
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Nav row */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? "bg-[#fbfaff]/85 backdrop-blur-md border-b border-slate-200" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid place-items-center h-11 w-11 rounded-xl bg-white overflow-hidden shadow-md ring-1 ring-slate-200">
              <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
            </span>
            <span className="hidden sm:block font-semibold tracking-tight text-slate-900 leading-tight">
              Digital Fluxx
              <br />
              <span className="text-slate-400 text-xs font-normal">Academics</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm text-slate-600">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-slate-900 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <EnrollButton className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] text-white text-sm font-semibold px-5 py-2.5 shadow-lg shadow-red-500/25 hover:opacity-95 transition">
              Enroll Now
            </EnrollButton>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden grid place-items-center h-10 w-10 rounded-lg border border-slate-300 text-slate-700"
            >
              <span className="text-lg">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
          <ul className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-slate-700 hover:text-slate-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <button
              onClick={openEnroll}
              className="mt-2 inline-flex justify-center rounded-full bg-gradient-to-r from-[#ff2d2d] to-[#ff5e3a] text-white font-semibold px-5 py-3"
            >
              Enroll Now
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}
