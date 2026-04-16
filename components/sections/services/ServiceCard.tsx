// components/sections/services/ServiceCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/constants/services";

interface ServiceCardProps {
  service: Service;
  id: string;
}

// KEEP YOUR ORIGINAL HELPERS (UNCHANGED)
const getImageSrc = (category: string) => {
  const images: Record<string, string> = {
    exams: "/assets/images/service-exam-detail.jpg",
    contacts: "/assets/images/service-contact-detail.jpg",
    glasses: "/assets/images/service-glasses-detail.jpg",
    treatment: "/assets/images/service-seniors.jpg",
    specialized: "/assets/images/service-children.jpg",
    emergency: "/assets/images/service-emergency.jpg",
    surgical: "/assets/images/service-seniors.jpg",
  };
  return images[category] || "/assets/images/service-exam-detail.jpg";
};

const getBadgeText = (category: string) => {
  const badges: Record<string, string> = {
    exams: "Core Service",
    contacts: "Contact Lenses",
    glasses: "Frames & Lenses",
    treatment: "Clinical Treatment",
    specialized: "Specialized Care",
    emergency: "24/7 Emergency",
    surgical: "Surgical Consult",
  };
  return badges[category] || "Specialty";
};

const getButtonHref = (id: string, category: string) => {
  if (category === "glasses") return "/products";
  if (category === "emergency") return "/emergency";
  return `/book?service=${id}`;
};

const getButtonText = (category: string) => {
  if (category === "glasses") return "Browse frames";
  if (category === "emergency") return "Get Help Now";
  if (category === "contacts") return "Book fitting";
  return "Book appointment";
};

export const ServiceCard = ({ service, id }: ServiceCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isEmergency = service.category === "emergency";

  return (
    <div
      id={id}
      className={`group relative overflow-hidden rounded-[28px] border transition-all duration-500 flex flex-col scroll-mt-32 hover:-translate-y-1.5 ${
        isEmergency
          ? "bg-gradient-to-b from-[#140404] to-[#020617] border-red-900/30 hover:border-red-500/50"
          : "bg-gradient-to-b from-[#001a33] to-[#020617] border-white/10 hover:border-sky-400/40"
      }`}
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={getImageSrc(service.category)}
          alt={service.title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          quality={100}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
        )}

        {/* Clean overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border border-white/20 ${
              isEmergency
                ? "bg-red-500/20 text-red-300 border-red-500/40"
                : "bg-black/40 text-sky-300"
            }`}
          >
            {getBadgeText(service.category)}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7 flex flex-col flex-1">

        <div className="flex items-center gap-3 mb-6">
          <div
            className={`size-12 rounded-xl flex items-center justify-center border ${
              isEmergency
                ? "bg-red-500/10 border-red-500/30"
                : "bg-sky-400/10 border-sky-400/20"
            }`}
          >
            <Image src={service.icon} alt="" width={24} height={24} />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-sky-400 transition">
            {service.title}
          </h3>
        </div>

        {/* CTA — ORIGINAL TEXT PRESERVED */}
        <Link
          href={getButtonHref(service.id, service.category)}
          className={`mt-auto inline-flex items-center justify-between px-5 py-3 rounded-full border text-xs font-semibold uppercase tracking-wider transition ${
            isEmergency
              ? "bg-red-600 hover:bg-red-500 text-white border-red-500/40"
              : "border-white/10 text-white/70 hover:text-white hover:border-sky-400/60"
          }`}
        >
          <span>{getButtonText(service.category)}</span>

          <span className="w-6 h-px bg-sky-400 group-hover:w-10 transition-all duration-300" />
        </Link>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400/5 to-violet-400/5 blur-2xl transition duration-500 pointer-events-none" />
    </div>
  );
};