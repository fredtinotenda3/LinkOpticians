// components/sections/contact/FAQSection.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { FAQ } from "@/constants/contact";

interface FAQSectionProps {
  subtitle: string;
  title: string;
  faqs: FAQ[];
  stillQuestions: string;
  contactButtonText: string;
}

export const FAQSection = ({
  subtitle,
  title,
  faqs,
  stillQuestions,
  contactButtonText,
}: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-28 bg-[#000B18] overflow-hidden">
      {/* Brand accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-[5%]">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-blue-500" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
            <span className="w-8 h-[1px] bg-blue-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">{title}</h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-white/[0.04] border-blue-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-6 p-7 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3 className={`font-bold text-sm md:text-base leading-snug transition-colors duration-300 ${isOpen ? "text-blue-400" : "text-white/80 group-hover:text-white"}`}>
                    {faq.question}
                  </h3>
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isOpen
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "bg-white/5 border-white/5 text-white/20"
                  }`}>
                    <svg className={`w-4 h-4 transition-transform duration-500 ${isOpen ? "rotate-45" : "rotate-0"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m-8-8h16" />
                    </svg>
                  </div>
                </button>

                <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                  <div className="px-7 pb-8 pt-0 border-t border-white/[0.03]">
                    <p className="text-white/50 text-sm leading-relaxed pt-5 font-light">
                      {faq.answer}
                    </p>
                    {faq.category && (
                      <span className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="text-center mt-16 p-10 rounded-[2.5rem] bg-blue-500/[0.02] border border-blue-500/5">
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-6">{stillQuestions}</p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full transition-all duration-500 hover:shadow-[0_15px_30px_rgba(37,99,235,0.2)]"
          >
            {contactButtonText}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};