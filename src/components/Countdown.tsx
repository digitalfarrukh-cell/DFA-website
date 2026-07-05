"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Evergreen countdown — never stops. Each visitor gets a fresh window
// (site.scarcity.countdownHours) on first visit, stored in localStorage.
// When it hits zero it restarts automatically, so it always keeps ticking.
const KEY = "dfa_deadline_v1";

export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const windowMs = site.scarcity.countdownHours * 3_600_000;

    const target = () => {
      const now = Date.now();
      let t = Number(localStorage.getItem(KEY));
      if (!t || Number.isNaN(t) || t <= now) {
        t = now + windowMs; // start (or restart) the window — evergreen
        localStorage.setItem(KEY, String(t));
      }
      return t;
    };

    const tick = () => setLeft(target() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (left === null) return null; // avoid SSR/hydration mismatch

  const clamp = Math.max(left, 0);
  const d = Math.floor(clamp / 86_400_000);
  const h = Math.floor((clamp % 86_400_000) / 3_600_000);
  const m = Math.floor((clamp % 3_600_000) / 60_000);
  const s = Math.floor((clamp % 60_000) / 1_000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="tabular-nums font-bold whitespace-nowrap">
      {d > 0 ? `${d}d ` : ""}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
