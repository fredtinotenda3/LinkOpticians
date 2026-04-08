// components/sections/services/ServiceCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/constants/services";

interface ServiceCardProps {
  service: Service;
  id: string;
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

const getImageSrc = (category: string) => {
  const images: Record<string, string> = {
    exams:       "/assets/images/service-exam-detail.jpg",
    contacts:    "/assets/images/service-contact-detail.jpg",
    glasses:     "/assets/images/service-glasses-detail.jpg",
    treatment:   "/assets/images/service-seniors.jpg",
    specialized: "/assets/images/service-children.jpg",
    emergency:   "/assets/images/service-emergency.jpg",
    surgical:    "/assets/images/service-seniors.jpg",
  };
  return images[category] || "/assets/images/service-exam-detail.jpg";
};

const getBadgeText = (category: string) => {
  const badges: Record<string, string> = {
    exams:       "Core Service",
    contacts:    "Contact Lenses",
    glasses:     "Frames & Lenses",
    treatment:   "Clinical Treatment",
    specialized: "Specialized Care",
    emergency:   "24/7 Emergency",
    surgical:    "Surgical Consult",
  };
  return badges[category] || "Specialty";
};

const getButtonHref = (id: string, category: string) => {
  if (category === "glasses")   return "/products";
  if (category === "emergency") return "/emergency";
  return `/book?service=${id}`;
};

const getButtonText = (category: string) => {
  if (category === "glasses")   return "Browse frames";
  if (category === "emergency") return "Get Help Now";
  if (category === "contacts")  return "Book fitting";
  return "Book appointment";
};

// ── COMPONENT ────────────────────────────────────────────────────────────────

export const ServiceCard = ({ service, id }: ServiceCardProps) => {
  const isEmergency = service.category === "emergency";

  return (
    <div
      id={id}
      className={`group relative overflow-hidden rounded-[32px] border transition-all duration-500 flex flex-col scroll-mt-32 ${
        isEmergency
          ? "bg-[#1a0505] border-red-900/30 hover:border-red-500/50 hover:shadow-[0_20px_50px_rgba(239,68,68,0.15)]"
          : "bg-[#001a33] border-white/5 hover:border-sky-500/30 hover:shadow-[0_20px_50px_rgba(14,165,233,0.12)]"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={getImageSrc(service.category)}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#001a33]/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-5 left-5">
          <span className={`inline-flex items-center gap-2 text-[9px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full backdrop-blur-xl border ${
            isEmergency 
              ? "bg-red-500/20 border-red-500/40 text-red-400" 
              : "bg-black/40 border-white/10 text-sky-400"
          }`}>
            <span className={`size-1.5 rounded-full ${isEmergency ? "bg-red-500 animate-pulse" : "bg-sky-400"}`} />
            {getBadgeText(service.category)}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        {/* Title & Icon Wrapper */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
            isEmergency 
              ? "bg-red-500/10 border-red-500/20" 
              : "bg-sky-500/10 border-sky-500/10 group-hover:border-sky-500/40"
          }`}>
            <Image 
              src={service.icon} 
              alt="" 
              width={24} 
              height={24} 
              className="opacity-80 group-hover:opacity-100 object-contain" 
            />
          </div>
          <h3 className="text-xl font-bold text-white leading-tight pt-1">
            {service.title}
          </h3>
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2">
          {service.description}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-1">
          {service.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-xs text-white/60">
              <svg className={`size-4 mt-0.5 shrink-0 ${isEmergency ? "text-red-500" : "text-sky-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Emergency Call Box */}
        {isEmergency && (
          <div className="mb-6 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 group-hover:bg-red-500/10 transition-colors">
            <p className="text-[10px] font-black uppercase tracking-widest text-red-500/60 mb-1">Direct Clinic Line</p>
            <a href="tel:+263773407464" className="text-lg font-black text-red-400 hover:text-red-300 transition-colors">
              +263 77 340 7464
            </a>
          </div>
        )}

        {/* CTA Button */}
        <Link
          href={getButtonHref(service.id, service.category)}
          className={`group/btn relative w-full overflow-hidden py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] text-center transition-all duration-500 ${
            isEmergency
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-white/5 border border-white/10 text-white hover:bg-sky-600 hover:border-sky-500"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {getButtonText(service.category)}
            <svg className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
};