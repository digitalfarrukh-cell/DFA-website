// Safe helpers to fire Meta Pixel events from anywhere in the app.
// Agar pixel load na hua ho (ya ad-blocker ho) toh yeh chup-chaap ignore kar dete hain.

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
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
