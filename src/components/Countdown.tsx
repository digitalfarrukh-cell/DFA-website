"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Modes:
// • weekly → counts down to the next weekly occurrence (site.freeClass:
//   weekday/startHour/endHour/tzOffset). Auto-rolls to next week; shows
//   "Live now 🔴" during the class window.
// • targetISO → counts down to a fixed moment.
// • neither → evergreen scarcity window that restarts, so it never stops.
const KEY = "dfa_deadline_v1";
const HOUR = 3_600_000;

function weeklySchedule() {
  const fc = site.freeClass;
  const now = Date.now();
  // Shift to the PKT "wall clock" so we can read the local weekday/date.
  const pkt = new Date(now + fc.tzOffset * HOUR);
  const dow = pkt.getUTCDay();
  // This calendar day's start instant (real UTC).
  const todayStart =
    Date.UTC(pkt.getUTCFullYear(), pkt.getUTCMonth(), pkt.getUTCDate(), fc.startHour, 0, 0) -
    fc.tzOffset * HOUR;
  const daysUntil = (fc.weekday - dow + 7) % 7;
  let start = todayStart + daysUntil * 24 * HOUR;
  const durationMs = (fc.endHour - fc.startHour) * HOUR;
  if (now >= start + durationMs) start += 7 * 24 * HOUR; // this week's class ended → next week
  return { start, live: now >= start && now < start + durationMs };
}

export default function Countdown({
  targetISO,
  weekly,
}: {
  targetISO?: string;
  weekly?: boolean;
}) {
  const [left, setLeft] = useState<number | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let tick: () => void;

    if (weekly) {
      tick = () => {
        const s = weeklySchedule();
        setLive(s.live);
        setLeft(s.start - Date.now());
      };
    } else if (targetISO) {
      const t = new Date(targetISO).getTime();
      tick = () => setLeft(t - Date.now());
    } else {
      const windowMs = site.scarcity.countdownHours * HOUR;
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
  }, [targetISO, weekly]);

  if (left === null) return null;
  if (weekly && live) {
    return <span className="font-bold whitespace-nowrap">Live now 🔴</span>;
  }
  if (targetISO && left <= 0) {
    return <span className="font-bold whitespace-nowrap">Live now 🔴</span>;
  }

  const clamp = Math.max(left, 0);
  const d = Math.floor(clamp / 86_400_000);
  const h = Math.floor((clamp % 86_400_000) / HOUR);
  const m = Math.floor((clamp % HOUR) / 60_000);
  const s = Math.floor((clamp % 60_000) / 1_000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <span className="tabular-nums font-bold whitespace-nowrap">
      {d > 0 ? `${d}d ` : ""}
      {pad(h)}:{pad(m)}:{pad(s)}
    </span>
  );
}
