// components/sections/about/StatsSection.tsx
import { Stat } from "@/constants/about";

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="relative py-20 bg-dark-300 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[200px] rounded-full bg-green-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              <div className="w-8 h-px bg-green-500/30 mx-auto mt-4 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
