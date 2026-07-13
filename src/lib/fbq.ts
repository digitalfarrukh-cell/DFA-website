// Safe helpers to fire Meta Pixel events from anywhere in the app.
// Agar pixel load na hua ho (ya ad-blocker ho) toh yeh chup-chaap ignore kar dete hain.

import { site } from "@/lib/site";

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Advanced Matching — re-init the pixel with the lead's details so Meta can
// match events to real users (better match quality → better ad optimization).
// Values are passed un-hashed; the Meta Pixel normalizes + SHA-256 hashes them
// client-side before sending.
export function setUserData(u: { name?: string; phone?: string; city?: string }) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const data: Record<string, string> = { country: "pk" };

  if (u.name && u.name.trim()) {
    const parts = u.name.trim().toLowerCase().split(/\s+/);
    data.fn = parts[0];
    if (parts.length > 1) data.ln = parts.slice(1).join(" ");
  }
  if (u.phone) {
    let p = u.phone.replace(/[^0-9]/g, "");
    if (p.startsWith("0")) p = "92" + p.slice(1); // PK local (03xx) → 923xx
    if (p) data.ph = p;
  }
  if (u.city && u.city.trim()) {
    data.ct = u.city.trim().toLowerCase().replace(/\s+/g, "");
  }

  window.fbq("init", site.metaPixelId, data);
}

// Standard Meta events (Lead, InitiateCheckout, Contact, etc.)
export function track(event: string, params?: FbqParams) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}

// Custom (non-standard) events
export function trackCustom(event: string, params?: FbqParams) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, params);
  }
}
