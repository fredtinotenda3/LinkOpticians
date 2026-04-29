// ===== FILE: components/LayoutHeader.tsx (UPDATED - with exact logo and better visibility) =====
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAVIGATION_LINKS } from "@/constants/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface LayoutHeaderProps {
  activePage?: string;
}

export const LayoutHeader = ({ activePage }: LayoutHeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Use the scroll lock hook
  useBodyScrollLock(isMobileMenuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            ? "bg-[#001a33]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3"
            : "bg-gradient-to-b from-[#000d1a]/60 to-transparent backdrop-blur-sm border-b border-white/5 py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">

          {/* Logo with improved visibility - using exact logo */}
          <Link 
            href="/" 
            onClick={closeMobileMenu} 
            className="group shrink-0 relative z-50"
          >
            {/* Subtle glow background behind logo */}
            <div className="absolute -inset-2 rounded-xl bg-sky-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Logo container with subtle rounded corners */}
            <div className="relative bg-white/5 rounded-lg px-2 py-1.5 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-500">
              <Image
                src="/assets/logos/link-logo.svg"
                alt="Link Opticians"
                width={160}
                height={40}
                priority
                className="h-8 w-auto transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 lg:px-5 py-2 text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full ${
                  currentPage === link.id
                    ? "text-white bg-white/10 shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex h-1 w-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-sky-500" />
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Link
              href="/book"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-black text-[11px] uppercase tracking-[0.2em] px-7 py-3 rounded-full transition-all duration-500 shadow-lg shadow-sky-900/30 hover:shadow-xl hover:shadow-sky-900/40 hover:-translate-y-0.5"
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
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
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
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-[#000d1a]/95 backdrop-blur-md transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobileMenu}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-gradient-to-b from-[#001a33] to-[#000d1a] border-l border-white/10 p-8 flex flex-col transition-transform duration-500 ease-out shadow-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Logo */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <div className="bg-white/5 rounded-lg px-3 py-2 inline-block">
              <Image
                src="/assets/logos/link-logo.svg"
                alt="Link Opticians"
                width={140}
                height={35}
                className="h-7 w-auto"
              />
            </div>
            <p className="text-white/30 text-[10px] font-medium tracking-wider mt-3">
              Est. 2008 • Registered Optometrists
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-xl font-bold tracking-tight transition-all duration-300 px-4 py-3 rounded-xl ${
                  currentPage === link.id 
                    ? "text-sky-400 bg-white/5 translate-x-2" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-auto pt-10 space-y-4">
            <Link
              href="/book"
              onClick={closeMobileMenu}
              className="block w-full bg-gradient-to-r from-sky-600 to-sky-500 text-white text-center font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-sky-900/30 active:scale-95 transition-all duration-300"
            >
              Book Appointment
            </Link>
            
            <div className="pt-4 border-t border-white/10">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">Emergency Line</p>
              <a 
                href="tel:+073 768 3090" 
                className="text-white font-bold text-lg hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                0737 683 090
              </a>
              <p className="text-white/30 text-[10px] mt-1">24/7 Emergency Eye Care</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};