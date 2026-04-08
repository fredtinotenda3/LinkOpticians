"use client";

import Image from "next/image";

export const BrandStrip = () => {
  const partners = [
    { name: "PSMAS",      logo: "/assets/logos/psmas.svg"      },
    { name: "Premier",    logo: "/assets/logos/premier.svg"    },
    { name: "CIMAS",      logo: "/assets/logos/cimas.svg"      },
    { name: "Old Mutual", logo: "/assets/logos/oldmutual.svg"  },
    { name: "First Mutual", logo: "/assets/logos/fmh.svg"      }, // Corrected name for FMH
    { name: "Medichlaim", logo: "/assets/logos/medichlaim.svg" },
  ];

  // Doubling the array to ensure seamless infinite scroll
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-12 border-y border-white/10 overflow-hidden bg-[#001a33]">
      
      {/* Background with subtle glass effect */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Header - Using standard medical aid terminology */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white/20" />
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] font-bold">
              Direct Medical Aid Claims Accepted
            </p>
          </div>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Side Fades for smooth entry/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#001a33] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#001a33] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex w-max gap-24 items-center animate-scroll">
            {scrollingPartners.map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center"
              >
                <div className="h-12 w-auto grayscale opacity-50 contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={48}
                    className="h-full w-auto object-contain"
                  />
                </div>
                
                {/* Subtle labeling for hover state */}
                <span className="absolute -bottom-6 text-[9px] font-bold tracking-widest uppercase text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded CSS for the marquee animation */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};