// components/sections/services/ServicesGridSection.tsx
import { ServiceCard } from "./ServiceCard";
import { Service } from "@/constants/services";

interface ServicesGridSectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  services: Service[];
}

export const ServicesGridSection = ({
  title,
  titleHighlight,
  description,
  subtitle,
  services,
}: ServicesGridSectionProps) => {

  // Logic: Prioritize core services for the main grid layout
  const orderedServices = [
    services.find((s) => s.category === "exams"),
    services.find((s) => s.category === "glasses"),
    services.find((s) => s.category === "contacts"),
    services.find((s) => s.id === "pediatric"),
    services.find((s) => s.id === "dry-eye"), // Mapping 'dry-eye' id to senior care card
    services.find((s) => s.category === "emergency"),
  ].filter(Boolean) as Service[];

  return (
    <section id="services" className="relative py-28 bg-[#000d1a] overflow-hidden">
      
      {/* Deep Ocean Glow instead of Green */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              {title} <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          <div className="shrink-0 inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="size-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            <span className="text-white/70 text-[11px] font-bold uppercase tracking-wider">
              {orderedServices.length} Specialties Available
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              // ID logic for scroll anchors
              id={service.id === "pediatric" ? "children" : service.id === "dry-eye" ? "seniors" : service.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};