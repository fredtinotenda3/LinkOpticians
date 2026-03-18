// components/sections/services/QuickServiceNav.tsx
"use client";

import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

interface QuickServiceNavProps {
  items: NavItem[];
}

export const QuickServiceNav = ({ items }: QuickServiceNavProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers = items.map((item) => {
      const element = document.getElementById(item.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(item.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-12 bg-dark-400 border-y border-dark-500 sticky top-20 z-40 backdrop-blur-md bg-dark-400/90">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="flex flex-wrap gap-3 justify-center">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium ${
                activeId === item.id
                  ? "bg-green-500 text-white"
                  : "bg-dark-300 hover:bg-green-500 text-white hover:text-white border border-dark-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};