"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAVIGATION_LINKS } from "@/constants/navigation";

interface LayoutHeaderProps {
  activePage?: string;
}

export const LayoutHeader = ({ activePage }: LayoutHeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const getActivePage = () => {
    if (activePage) return activePage;
    if (pathname === "/") return "home";
    const segment = pathname.split('/')[1];
    return segment || "";
  };

  const currentPage = getActivePage();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#001a33]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40 py-3"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} className="group shrink-0 relative z-50">
            <Image
              src="/assets/logos/link-logo.svg"
              alt="Link Opticians"
              width={160}
              height={40}
              priority
              className="h-8 w-auto transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                  currentPage === link.id
                    ? "text-white bg-white/5"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {/* Active Indicator Pulse */}
                {currentPage === link.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-sky-500"></span>
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-[11px] uppercase tracking-[0.2em] px-7 py-3 rounded-full transition-all duration-500 shadow-xl shadow-sky-900/20"
            >
              Book Now
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-[#001a33]/80 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={closeMobileMenu} />
        <div className={`absolute top-0 right-0 h-full w-[300px] bg-[#002b4d] border-l border-white/5 p-8 flex flex-col transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mt-20 flex flex-col gap-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-2xl font-bold tracking-tight transition-all duration-300 ${currentPage === link.id ? "text-sky-400 translate-x-2" : "text-white/40 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              onClick={closeMobileMenu}
              className="mt-10 bg-sky-600 text-white text-center font-black uppercase tracking-widest py-5 rounded-2xl shadow-lg shadow-sky-900/20"
            >
              Book Appointment
            </Link>
          </div>
          
          <div className="mt-auto pt-10 border-t border-white/5">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Emergency Line</p>
            <p className="text-white font-bold mt-1">+263 77 340 7464</p>
          </div>
        </div>
      </div>
    </>
  );
};