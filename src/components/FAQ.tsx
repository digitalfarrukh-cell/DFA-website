"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "Not at all. The program starts from zero and builds your base before taking you to an advanced, income-ready level. It's perfect for complete beginners.",
  },
  {
    q: "What's included in the Freelancer program?",
    a: "Everything you need to become income-ready: core digital marketing, deeper Meta & Google paid ads with optimization and retargeting, Shopify store setup, landing pages & lead funnels, a complete freelancing setup (winning Upwork & Fiverr profiles), direct client-hunting, a live practice campaign, client reporting, weekly group Q&A support, and all templates — for a one-time summer price of Rs. 9,999 (originally Rs. 14,999).",
  },
  {
    q: "How often are the classes?",
    a: "3 classes every week, about 1.5 hours each — a steady, doable pace that fits around study or work. Your very first class is a full introduction and orientation so you know exactly how the program runs.",
  },
  {
    q: "Are classes live or recorded?",
    a: "Both. Attend live, and get the recording of every class so you never miss a session.",
  },
  {
    q: "Can this really lead to earning?",
    a: "The program gives you the skills and roadmap our students use to reach international clients. Your earnings depend on your consistency and effort — we don't make fake guaranteed-income claims.",
  },
  {
    q: "How does the international client opportunity work?",
    a: "Top-performing students get pitched to real international clients through our network — a genuine chance to start earning with serious clients.",
  },
  {
    q: "How do I pay?",
    a: "Pay via NayaPay or bank transfer (details are in the “How to Enroll” section), then send the screenshot on WhatsApp. We add you to classes and community right away.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5e3a]">FAQ</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="dfa-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-slate-900">{f.q}</span>
                  <span
                    className={`text-[#ff5e3a] text-xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 -mt-1 text-sm text-slate-500 leading-relaxed">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
