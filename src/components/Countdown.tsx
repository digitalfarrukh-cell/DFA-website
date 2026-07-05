"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Two modes:
// • targetISO given → count down to that fixed moment (e.g. the free class).
//   When it passes, shows "Live now 🔴".
// • no prop → evergreen: each visitor gets a fresh scarcity window that
//   restarts when it hits zero, so it never stops.
const KEY = "dfa_deadline_v1";

export default function Countdown({ targetISO }: { targetISO?: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let tick: () => void;

    if (targetISO) {
      const t = new Date(targetISO).getTime();
      tick = () => setLeft(t - Date.now());
    } else {
      const windowMs = site.scarcity.countdownHours * 3_600_000;
      const target = () => {
        const now = Date.now();
        let t = Number(localStorage.getItem(KEY));
        if (!t || Number.isNaN(t) || t <= now) {
          t = now + windowMs;
          localStorage.setItem(KEY, String(t));
        }
        return t;
      };
      tick = () => setLeft(target() - Date.now());
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  if (left === null) return null;
  if (targetISO && left <= 0) {
    return <span className="font-bold whitespace-nowrap">Live now 🔴</span>;
  }

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
