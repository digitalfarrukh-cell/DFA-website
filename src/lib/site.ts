// ============================================================
// DFA — Digital Fluxx Academics  •  Central config
// Edit everything from one place: number, prices, links, plans.
// ============================================================

export const site = {
  brandShort: "DFA",
  brandFull: "Digital Fluxx Academics",
  tagline: "Pakistan's practical digital marketing academy",

  // Instructor / founder
  instructor: {
    name: "Muzammil Farrukh",
    role: "Digital Marketing Specialist & Founder, DFA",
    portfolio: "https://muzammilfarrukh.com",
    bio: "I've spent years in the trenches of digital marketing and paid advertising — running campaigns for international clients and delivering real, measurable results. Now I teach that exact system, step by step, to the next generation of Pakistani marketers.",
  },

  // Contact / enrollment
  whatsapp: "+923190667050",
  whatsappMessage: "Hi DFA! I'd like to enroll in the Digital Marketing program.",
  email: "hello@digitalfluxxacademics.com",

  // Meta (Facebook) Pixel — paste your Pixel ID from Events Manager here.
  // Jab tak "YOUR_PIXEL_ID" hai, pixel load nahi hoga (safe).
  metaPixelId: "1738284993831222",

  // Payment details (manual enrollment)
  payment: {
    name: "Hafiz Muhammad Muzammil Farrukh",
    nayapay: "farrukhmuzammil7@nayapay",
    account: "03190667050",
    iban: "PK71NAYA1234503190667050",
  },

  // Summer campaign — targeting student summer vacations (uni / college / school)
  summer: {
    on: true,
    headline: "On summer break? Make it count 🎓",
    sub: "Uni, college & school off for the summer? Don't waste these holidays — use them to learn a real, income-ready skill.",
    discount: "Student summer offer",
  },

  // Proof numbers (update when real)
  stats: {
    students: "500+",
    rating: "4.9/5",
    hours: "40+",
  },

  // Optional add-on
  communityAddon: "Rs. 799 / month",

  // Two pricing plans
  plans: {
    basic: {
      name: "Foundation",
      tag: "Best to start",
      price: "Rs. 3,499",
      period: "one-time",
      note: "One-time payment • 1-month program",
      cta: "Start Foundation",
      features: [
        "Live + recorded classes",
        "Social Media Marketing (Meta, Instagram, TikTok)",
        "Foundation paid ads & campaign setup",
        "Content & personal brand building",
        "Lead generation basics",
        "Templates, checklists & resources",
        "Doubt support",
        "Completion certificate",
      ],
      // Shown as a separate note (not included free)
      addonNote: "Private community access available as add-on",
    },
    premium: {
      name: "Pro Career",
      tag: "Most popular",
      price: "Rs. 19,999",
      period: "one-time",
      note: "Complete program • lifetime access",
      cta: "Go Pro",
      features: [
        "Everything in Foundation, plus:",
        "Live + recorded classes",
        "Advanced Paid Ads & Growth Hacking",
        "CRM mastery — setup, pipelines & automation",
        "Advanced tracking & analytics (pixels, attribution, dashboards)",
        "High-converting funnels & scaling systems",
        "High-ticket international client acquisition system",
        "Private community access — included FREE",
        "1-on-1 mentorship & priority support",
        "🚀 Top performers get pitched to real high-ticket clients",
        "Lifetime access + all future updates",
      ],
    },
  },

  // The team (credibility — real professionals behind DFA)
  team: {
    blurb:
      "DFA isn't a faceless course factory. It's built and taught by a team of practicing professionals — active ad buyers, agency operators and growth specialists who work with real clients every single day.",
    roles: [
      { title: "Paid Ads Specialists", desc: "Actively managing live ad budgets." },
      { title: "Agency Operators", desc: "Running real client-facing agencies." },
      { title: "Growth & Funnel Experts", desc: "Building systems that convert." },
      { title: "Client Acquisition Team", desc: "Closing international high-ticket deals." },
    ],
  },
} as const;

// WhatsApp link helper
export const waLink = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;
