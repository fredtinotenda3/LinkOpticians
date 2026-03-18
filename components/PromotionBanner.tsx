// components/PromotionBanner.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedPromotions, isPromotionValid } from "@/constants/offers";

export const PromotionBanner = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const featuredPromotions = getFeaturedPromotions().filter(isPromotionValid);
  
  // Auto-rotate promotions every 10 seconds
  useEffect(() => {
    if (featuredPromotions.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => 
        prev === featuredPromotions.length - 1 ? 0 : prev + 1
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [featuredPromotions.length]);
  
  if (featuredPromotions.length === 0 || !isVisible) {
    return null;
  }
  
  const currentPromo = featuredPromotions[currentPromoIndex];
  
  return (
    <div 
      className="relative overflow-hidden rounded-xl border border-dark-500 mb-8"
      style={{ 
        backgroundColor: currentPromo.backgroundColor || '#4F46E5',
        color: currentPromo.textColor || '#FFFFFF'
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        aria-label="Close promotion banner"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6L18 18" />
        </svg>
      </button>
      
      {/* Promotion Indicator Dots */}
      {featuredPromotions.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {featuredPromotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPromoIndex(index)}
              className={`size-2 rounded-full transition ${
                index === currentPromoIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`View promotion ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Left - Content */}
        <div className="p-8 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-full">
              <span className="text-lg">🎯</span>
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Limited Time Offer
            </span>
          </div>
          
          <h3 className="text-24-bold mb-3">{currentPromo.title}</h3>
          <p className="mb-6 opacity-90">{currentPromo.description}</p>
          
          {currentPromo.discount && (
            <div className="mb-8">
              <p className="text-sm font-medium mb-2">Special Offer:</p>
              <p className="text-32-bold font-bold">{currentPromo.discount}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-white hover:bg-gray-100 text-gray-900"
              asChild
            >
              <Link href={`/book?promo=${currentPromo.bookingCode}`}>
                Book Now
              </Link>
            </Button>
            <Button 
              className="border-2 border-white hover:bg-white/20"
              variant="outline"
              asChild
            >
              <Link href={`/offers/${currentPromo.id}`}>
                Learn More
              </Link>
            </Button>
            <Button 
              className="border-2 border-white hover:bg-white/20"
              variant="outline"
              asChild
            >
              <Link href="/offers">
                View All Offers
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 text-sm">
            <p>Valid until: {currentPromo.validUntil} • Code: <span className="font-mono font-bold">{currentPromo.bookingCode}</span></p>
          </div>
        </div>
        
        {/* Right - Image */}
        <div className="relative min-h-[200px] md:min-h-0">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 md:bg-gradient-to-r"></div>
          <Image
            src={currentPromo.image}
            alt={currentPromo.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

// Simple banner for homepage
export const SimplePromotionBanner = () => {
  const featuredPromotions = getFeaturedPromotions().filter(isPromotionValid);
  
  if (featuredPromotions.length === 0) return null;
  
  const promo = featuredPromotions[0];
  
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-full">
              <span className="text-lg">🎯</span>
            </div>
            <h3 className="text-20-bold text-white">{promo.title}</h3>
          </div>
          <p className="text-white/90 mb-4">{promo.description}</p>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-white hover:bg-gray-100 text-gray-900"
              size="sm"
              asChild
            >
              <Link href={`/book?promo=${promo.bookingCode}`}>
                Book Now
              </Link>
            </Button>
            <Button 
              className="border-white text-white hover:bg-white/20"
              variant="outline"
              size="sm"
              asChild
            >
              <Link href="/offers">
                View All
              </Link>
            </Button>
          </div>
        </div>
        
        {promo.discount && (
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-white/80 mb-1">Special Offer</p>
            <p className="text-24-bold text-white font-bold">{promo.discount}</p>
          </div>
        )}
      </div>
    </div>
  );
};