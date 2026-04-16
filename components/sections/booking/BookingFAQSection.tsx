// components/sections/booking/BookingFAQSection.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
  phone?: string;
}

interface BookingFAQSectionProps {
  subtitle: string;
  title: string;
  faqs: FAQ[];
  moreButtonText: string;
  moreButtonLink: string;
}

export const BookingFAQSection = ({
  subtitle,
  title,
  faqs,
  moreButtonText,
  moreButtonLink,
}: BookingFAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const formatAnswer = (answer: string, phone?: string) => {
    if (!phone) return answer;
    const parts = answer.split(phone);
    return (
      <>
        {parts[0]}
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="text-sky-400 hover:text-white transition font-medium"
        >
          {phone}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── GRID (CONSISTENT BUT LIGHT) ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
        [background-size:80px_80px]" 
      />

      {/* ── SCAN LINES (UNIQUE HERE) ── */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
        bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:100%_6px]" 
      />

      {/* ── LEFT GLOW (TERMINAL STYLE) ── */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[300px] bg-sky-400/10 blur-[140px]" />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_left,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-5xl px-[5%]">

        {/* ── HEADER (LEFT-ALIGNED) ── */}
        <div className="mb-16 space-y-4">

          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-sky-400/40" />
            <span className="text-sky-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {subtitle}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            {title}
          </h2>

        </div>

        {/* ── FAQ STACK (NO CARDS) ── */}
        <div className="divide-y divide-white/10 border-t border-white/10">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6">

                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-6 text-left group"
                >
                  <h3 className={`text-base md:text-lg transition ${
                    isOpen ? "text-sky-400" : "text-white/80 group-hover:text-white"
                  }`}>
                    {faq.question}
                  </h3>

                  <span className={`text-sky-400 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}>
                    +
                  </span>
                </button>

                {/* ANSWER */}
                <div className={`transition-all duration-300 ${
                  isOpen ? "mt-4 opacity-100 max-h-[300px]" : "max-h-0 opacity-0 overflow-hidden"
                }`}>
                  <p className="text-white/60 text-sm leading-relaxed max-w-2xl">
                    {formatAnswer(faq.answer, faq.phone)}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

        {/* ── CTA (MINIMAL) ── */}
        <div className="mt-16">
          <Link
            href={moreButtonLink}
            className="inline-flex items-center gap-2 text-sky-400 hover:text-white text-sm transition"
          >
            {moreButtonText}
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};