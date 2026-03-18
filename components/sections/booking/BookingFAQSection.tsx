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
          className="text-green-400 hover:text-green-300 transition-colors underline underline-offset-2"
        >
          {phone}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {subtitle}
            </span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h2>
        </div>

        {/* ── Accordion ────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-dark-300 border-green-500/40 shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
                    : "bg-dark-300 border-dark-500 hover:border-dark-600"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <h3 className={`font-semibold text-sm md:text-base leading-snug transition-colors duration-300 ${
                    isOpen ? "text-green-400" : "text-white"
                  }`}>
                    {faq.question}
                  </h3>

                  {/* Animated +/× icon */}
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? "bg-green-500/20 border-green-500/40 text-green-400"
                      : "bg-dark-400 border-dark-500 text-white/40"
                  }`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16" />
                    </svg>
                  </div>
                </button>

                {/* Answer — smooth reveal */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 border-t border-dark-500">
                    <p className="text-white/55 text-sm leading-relaxed pt-4">
                      {formatAnswer(faq.answer, faq.phone)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div className="text-center mt-12">
          <Link
            href={moreButtonLink}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
          >
            {moreButtonText}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};
