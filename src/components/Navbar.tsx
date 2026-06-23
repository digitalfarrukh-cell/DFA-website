"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import EnrollButton from "@/components/EnrollButton";

const links = [
  { href: "#system", label: "System" },
  { href: "#curriculum", label: "Curriculum" },
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
      {site.summer.on && showBar && (
        <div className="relative bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] text-white text-xs sm:text-sm">
          <div className="mx-auto max-w-6xl px-5 py-2 flex items-center justify-center gap-2 text-center">
            <span className="font-semibold">{site.summer.headline}</span>
            <span className="hidden sm:inline opacity-90">— {site.summer.discount}</span>
            <EnrollButton className="ml-1 underline underline-offset-2 font-semibold hover:opacity-90">
              Claim now
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
          scrolled ? "bg-[#060608]/85 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid place-items-center h-11 w-11 rounded-xl bg-white overflow-hidden shadow-lg shadow-black/30">
              <img src="/dfa-logo.jpg" alt="DFA" className="h-full w-full object-cover scale-110" />
            </span>
            <span className="hidden sm:block font-semibold tracking-tight text-white/90 leading-tight">
              Digital Fluxx
              <br />
              <span className="text-white/45 text-xs font-normal">Academics</span>
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm text-white/70">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <EnrollButton className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] text-white text-sm font-semibold px-5 py-2.5 shadow-lg shadow-red-500/25 hover:opacity-95 transition">
              Enroll Now
            </EnrollButton>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="md:hidden grid place-items-center h-10 w-10 rounded-lg border border-white/15 text-white"
            >
              <span className="text-lg">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#060608]/95 backdrop-blur-md">
          <ul className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-white/75 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <button
              onClick={openEnroll}
              className="mt-2 inline-flex justify-center rounded-full bg-gradient-to-r from-[#ff2424] to-[#ff5e3a] text-white font-semibold px-5 py-3"
            >
              Enroll Now
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}
