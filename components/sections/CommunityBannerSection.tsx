// components/sections/CommunityBannerSection.tsx
import Image from "next/image";
import Link from "next/link";

interface CommunityBannerSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  overlayOpacity?: string;
  height?: string;
}

const impactStats = [
  { value: "10,000+", label: "Lives impacted" },
  { value: "50+", label: "Rural communities" },
  { value: "Free", label: "School screenings" },
];

export const CommunityBannerSection = ({
  title = "Join us in making a difference.\nEye care for every Zimbabwean.",
  description,
  buttonText = "Get involved",
  buttonHref = "/community",
  backgroundImage = "/assets/images/community-banner.png",
}: CommunityBannerSectionProps) => {

  const titleLines = title.split("\n");

  return (
    <section className="relative min-h-[520px] overflow-hidden flex items-center">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Community outreach"
          fill
          className="object-cover"
          priority
        />
        {/* Layered gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        {/* Vignette */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative w-full mx-auto max-w-7xl px-[5%] py-24 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-6 h-px bg-green-400" />
          <span className="text-green-400 text-xs font-semibold tracking-[0.25em] uppercase">
            Community Outreach
          </span>
          <span className="w-6 h-px bg-green-400" />
        </div>

        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-3xl mb-6">
          {titleLines.map((line, i) => (
            <span key={i}>
              {i === 1 ? (
                <span className="text-green-400">{line}</span>
              ) : (
                line
              )}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h2>

        {/* Description */}
        {description && (
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {/* CTA */}
        <Link
          href={buttonHref}
          className="group inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(36,174,124,0.5)] hover:scale-[1.03] mb-16"
        >
          {buttonText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Impact stats */}
        <div className="flex flex-wrap justify-center gap-px">
          {impactStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-10 py-4 ${
                i < impactStats.length - 1 ? "border-r border-white/15" : ""
              }`}
            >
              <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-white/45 text-xs mt-1 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
