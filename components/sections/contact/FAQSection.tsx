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
    <section className="relative py-24 md:py-32">

      {/* ── UNIQUE BACKGROUND (MINIMAL / EDITORIAL) ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* subtle vertical fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-3xl px-[5%]">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-400" />
            <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-400" />
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            {title}
          </h2>
        </div>

        {/* FAQ LIST (NO CARDS) */}
        <div className="divide-y divide-white/10">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.id} className="py-6">

                {/* QUESTION */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-base md:text-lg font-medium transition ${
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
                    {faq.answer}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

        {/* CTA (MINIMAL) */}
        <div className="text-center mt-16 space-y-4">

          <p className="text-white/50 text-sm">
            {stillQuestions}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-white text-sm transition"
          >
            {contactButtonText}
            <span>→</span>
          </Link>

        </div>

      </div>
    </section>
  );
};