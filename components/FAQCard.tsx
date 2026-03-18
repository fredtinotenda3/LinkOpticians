"use client";

import { useState } from "react";
import Image from "next/image";
import { FAQ } from "@/constants/contact";

interface FAQCardProps {
  faq: FAQ;
}

export const FAQCard = ({ faq }: FAQCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-dark-400 border border-dark-500 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-dark-300/50 transition"
      >
        <h3 className="text-16-semibold pr-4">{faq.question}</h3>
        <Image
          src="/assets/icons/chevron.svg"
          width={20}
          height={20}
          alt={isExpanded ? "Collapse" : "Expand"}
          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-dark-500">
            <p className="text-dark-600">{faq.answer}</p>
            {faq.category && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-dark-300 rounded-full text-xs text-dark-700">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};