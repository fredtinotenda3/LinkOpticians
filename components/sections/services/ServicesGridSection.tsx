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
  subtitle,
  description,
  services,
}: ServicesGridSectionProps) => {

  const orderedServices = [
    services.find((s) => s.category === "exams"),
    services.find((s) => s.category === "glasses"),
    services.find((s) => s.category === "contacts"),
    services.find((s) => s.category === "specialized" && s.id === "pediatric"),
    services.find((s) => s.category === "treatment" && s.id === "dry-eye"),
    services.find((s) => s.category === "emergency"),
  ].filter(Boolean) as Service[];

  const getCardId = (service: Service) => {
    if (service.category === "specialized" && service.id === "pediatric") return "children";
    if (service.category === "treatment") return "seniors";
    return service.category;
  };

  return (
    <section id="services" className="relative py-28 bg-dark-300 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/4 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Service count pill */}
          <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-dark-400 border border-dark-500 rounded-full">
            <span className="size-2 rounded-full bg-green-500" />
            <span className="text-white/60 text-xs font-medium">
              {orderedServices.length} services available
            </span>
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              id={getCardId(service)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
