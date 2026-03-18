// components/FloatingWhatsAppButton.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getWhatsAppUrl } from "@/constants/social";
import { trackWhatsAppClick } from "@/components/Analytics"; // ADDED

export const FloatingWhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Optional: Hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down, hide button
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up, show button
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    // Only add scroll behavior if you want it to hide/show on scroll
    // window.addEventListener("scroll", handleScroll);
    
    return () => {
      // window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const defaultMessage = "Hello Link Opticians, I'd like to inquire about your services.";

  const handleWhatsAppClick = (context: string) => {
    trackWhatsAppClick(context); // TRACK CLICK
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="relative">
          {/* WhatsApp Button */}
          <Link
            href={getWhatsAppUrl(defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Chat with us on WhatsApp"
            onClick={() => handleWhatsAppClick("floating_button")} // ADDED TRACKING
          >
            {/* WhatsApp Icon */}
            <div className="relative w-7 h-7">
              <Image
                src="/assets/icons/social/whatsapp.svg"
                alt="WhatsApp"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* Notification Badge (Optional - can show unread messages) */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>

            {/* Pulse Animation */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          </Link>

          {/* Tooltip/Text Label */}
          <div
            className={`absolute right-full top-1/2 transform -translate-y-1/2 mr-3 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
            }`}
          >
            <div className="bg-dark-400 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap border border-dark-500">
              <p className="text-sm font-medium">Chat on WhatsApp</p>
              <p className="text-xs text-dark-600">Quick responses</p>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1">
              <div className="w-2 h-2 bg-dark-400 border-r border-b border-dark-500 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Optional: Additional Contact Methods (Facebook Messenger, etc.) */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-3 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Link
              href="https://facebook.com/linkopticians"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-dark-400 hover:bg-dark-300 border border-dark-500 rounded-lg shadow-lg transition"
              aria-label="Message us on Facebook"
              onClick={() => handleWhatsAppClick("facebook_from_float")}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/assets/icons/social/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-white">Facebook</span>
            </Link>
            
            <Link
              href="https://instagram.com/linkopticians"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 bg-dark-400 hover:bg-dark-300 border border-dark-500 rounded-lg shadow-lg transition"
              aria-label="Message us on Instagram"
              onClick={() => handleWhatsAppClick("instagram_from_float")}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/assets/icons/social/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-white">Instagram</span>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile-friendly: Always show a simpler version on mobile if needed */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link
          href={getWhatsAppUrl(defaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg"
          aria-label="Chat on WhatsApp"
          onClick={() => handleWhatsAppClick("mobile_floating_button")}
        >
          <div className="w-5 h-5 relative">
            <Image
              src="/assets/icons/social/whatsapp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium">Chat</span>
        </Link>
      </div>
    </>
  );
};

// Alternative: Simple version without hover effects
export const SimpleFloatingWhatsAppButton = () => {
  const defaultMessage = "Hello Link Opticians, I'd like to inquire about your services.";

  const handleClick = () => {
    trackWhatsAppClick("simple_floating_button"); // ADDED TRACKING
  };

  return (
    <Link
      href={getWhatsAppUrl(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Chat with us on WhatsApp"
      onClick={handleClick} // ADDED TRACKING
    >
      <div className="relative w-7 h-7">
        <Image
          src="/assets/icons/social/whatsapp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
      
      {/* Notification dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      
      {/* Optional: Text label that appears on hover */}
      <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-dark-400 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <p className="text-sm font-medium">Message us</p>
        </div>
      </div>
    </Link>
  );
};