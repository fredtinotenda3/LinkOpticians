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
          className="text-blue-400 hover:text-blue-300 transition-colors font-bold underline underline-offset-4 decoration-blue-500/30"
        >
          {phone}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative py-32 bg-[#000B18] overflow-hidden">

      {/* Background glow — Atmospheric Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-blue-500/30" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-blue-500/30" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
            {title}
          </h2>
        </div>

        {/* ── Accordion ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? "bg-white/[0.04] border-blue-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 p-7 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className={`font-bold text-sm md:text-base tracking-tight transition-colors duration-500 ${
                    isOpen ? "text-blue-400" : "text-white"
                  }`}>
                    {faq.question}
                  </h3>

                  {/* Animated +/× icon */}
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isOpen
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-white/5 border-white/5 text-white/20"
                  }`}>
                    <svg
                      className={`w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16" />
                    </svg>
                  </div>
                </button>

                {/* Answer — smooth reveal */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="px-8 pb-8 pt-0 border-t border-white/5">
                    <p className="text-white/40 text-sm leading-relaxed pt-6 font-light italic">
                      {formatAnswer(faq.answer, faq.phone)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="text-center mt-16">
          <Link
            href={moreButtonLink}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/[0.02] text-white/50 hover:text-white hover:border-blue-500/40 text-[11px] font-black uppercase tracking-widest transition-all duration-500"
          >
            {moreButtonText}
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5 text-blue-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};