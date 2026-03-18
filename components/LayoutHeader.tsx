// components/LayoutHeader.tsx
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

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const getActivePage = () => {
    if (activePage) return activePage;
    if (pathname === "/") return "home";
    if (pathname.startsWith("/services")) return "services";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/locations")) return "locations";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/contact")) return "contact";
    return "";
  };

  const currentPage = getActivePage();
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-400/95 backdrop-blur-md border-b border-dark-500 shadow-lg shadow-black/20"
            : "bg-dark-400/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-[5%] py-4">

          {/* Logo */}
          <Link href="/" onClick={closeMobileMenu} className="group shrink-0">
            <Image
              src="/assets/logos/link-logo.svg"
              alt="Link Opticians Logo"
              width={180}
              height={60}
              priority
              className="h-9 w-auto transition-all duration-300 group-hover:opacity-85"
            />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === link.id
                    ? "text-green-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {/* Active underline */}
                {currentPage === link.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-green-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.4)] hover:scale-[1.02]"
            >
              Book Appointment
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen((o) => !o)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-dark-400 border-l border-dark-500 flex flex-col transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-dark-500">
            <span className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase">Menu</span>
            <button
              onClick={closeMobileMenu}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentPage === "home"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  currentPage === link.id
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{link.label}</span>
                {link.description && (
                  <span className="text-[10px] text-white/25 font-normal">{link.description}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-4 pb-8 border-t border-dark-500 pt-6">
            <Link
              href="/book"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm w-full py-3.5 rounded-full transition-all duration-300"
            >
              Book Appointment
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
