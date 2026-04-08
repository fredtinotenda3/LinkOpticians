// components/sections/about/StatsSection.tsx
import { Stat } from "@/constants/about";

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className="relative py-24 bg-[#000B18] overflow-hidden">
      
      {/* Brand-aligned subtle glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[200px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.04]"
            >
              {/* Stat Value - Using the brand Blue */}
              <div className="text-4xl md:text-6xl font-bold text-blue-500 mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                {stat.value}
              </div>
              
              {/* Stat Label */}
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
                {stat.label}
              </p>
              
              {/* Decorative Animated Line */}
              <div className="w-8 h-[1px] bg-blue-500/20 mx-auto mt-6 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-700 ease-in-out" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};