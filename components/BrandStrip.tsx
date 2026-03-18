import Image from "next/image";

export const BrandStrip = () => {
  const partners = [
    { name: "PSMAS",      logo: "/assets/logos/psmas.svg"      },
    { name: "Premier",    logo: "/assets/logos/premier.svg"    },
    { name: "CIMAS",      logo: "/assets/logos/cimas.svg"      },
    { name: "Old Mutual", logo: "/assets/logos/oldmutual.svg"  },
    { name: "FMH",        logo: "/assets/logos/fmh.svg"        },
    { name: "Medichlaim", logo: "/assets/logos/medichlaim.svg" },
  ];

  const scrollingPartners = [...partners, ...partners];

  return (
    <section className="relative py-16 border-y border-dark-500 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-dark-400/90 backdrop-blur-md" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-dark-500" />
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
            <p className="text-dark-600 text-xs uppercase tracking-[0.35em] font-medium">
              Trusted Medical Aid Partners
            </p>
          </div>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-dark-500" />
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-dark-400 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-dark-400 to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex w-max gap-20 items-center">
            {scrollingPartners.map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center"
              >
                {/* Logo — fully visible at rest, green glow on hover */}
                <div className="h-10 w-auto transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_14px_rgba(34,197,94,0.6)]">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={40}
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* Partner name — fades in below on hover */}
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-widest uppercase text-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
