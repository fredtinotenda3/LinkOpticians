// components/sections/services/ServiceCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/constants/services";

interface ServiceCardProps {
  service: Service;
  id: string;
}

const getImageSrc = (category: string) => {
  const images: Record<string, string> = {
    exams:      "/assets/images/service-exam-detail.jpg",
    contacts:   "/assets/images/service-contact-detail.jpg",
    glasses:    "/assets/images/service-glasses-detail.jpg",
    treatment:  "/assets/images/service-seniors.jpg",
    specialized:"/assets/images/service-children.jpg",
    emergency:  "/assets/images/service-emergency.jpg",
    surgical:   "/assets/images/service-seniors.jpg",
  };
  return images[category] || "/assets/images/service-exam-detail.jpg";
};

const getBadgeText = (category: string) => {
  const badges: Record<string, string> = {
    exams:      "Core Service",
    contacts:   "Contact Lenses",
    glasses:    "Frames & Lenses",
    treatment:  "Treatment",
    specialized:"Specialized Care",
    emergency:  "24/7 Emergency",
    surgical:   "Surgical Consult",
  };
  return badges[category] || "Service";
};

const getButtonHref = (id: string, category: string) => {
  if (category === "glasses")   return "/products";
  if (category === "emergency") return "/emergency";
  return `/book?service=${id}`;
};

const getButtonText = (category: string) => {
  if (category === "glasses")   return "Browse frames";
  if (category === "emergency") return "Emergency information";
  if (category === "contacts")  return "Book fitting";
  return "Book appointment";
};

export const ServiceCard = ({ service, id }: ServiceCardProps) => {
  const isEmergency = service.category === "emergency";

  return (
    <div
      id={id}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 scroll-mt-32 flex flex-col ${
        isEmergency
          ? "bg-dark-400 border-red-500/20 hover:border-red-500/50 hover:shadow-[0_8px_40px_rgba(239,68,68,0.12)]"
          : "bg-dark-400 border-dark-500 hover:border-green-500/40 hover:shadow-[0_8px_40px_rgba(36,174,124,0.10)]"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image
          src={getImageSrc(service.category)}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Lighter gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400/70 via-transparent to-transparent" />

        {/* Badge — top left */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${
            isEmergency
              ? "bg-red-500/20 border border-red-500/40 text-red-400"
              : "bg-dark-400/80 border border-dark-500/60 text-green-400"
          } backdrop-blur-sm`}>
            <span className={`size-1.5 rounded-full ${isEmergency ? "bg-red-400 animate-pulse" : "bg-green-400"}`} />
            {getBadgeText(service.category)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            isEmergency ? "bg-red-500/15" : "bg-green-500/15"
          }`}>
            <Image
              src={service.icon}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
          <h3 className={`text-lg font-bold leading-tight transition-colors duration-300 ${
            isEmergency ? "text-white group-hover:text-red-400" : "text-white group-hover:text-green-400"
          }`}>
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-5 flex-1">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-white/65">
              <svg className={`w-3.5 h-3.5 shrink-0 ${isEmergency ? "text-red-400" : "text-green-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* Emergency phone */}
        {isEmergency && (
          <div className="mb-4 p-4 bg-red-500/8 rounded-xl border border-red-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
              <p className="text-white text-xs font-bold uppercase tracking-wider">24/7 Emergency Line</p>
            </div>
            <a
              href="tel:+263773407464"
              className="text-xl font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              +263 77 340 7464
            </a>
          </div>
        )}

        {/* CTA */}
        <Link
          href={getButtonHref(service.id, service.category)}
          className={`group/btn inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            isEmergency
              ? "bg-red-500 hover:bg-red-400 text-white"
              : "bg-green-500 hover:bg-green-400 text-white hover:shadow-[0_0_20px_rgba(36,174,124,0.35)]"
          }`}
        >
          {getButtonText(service.category)}
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
