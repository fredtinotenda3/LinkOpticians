// components/sections/about/TeamSection.tsx
import Image from "next/image";
import { TeamMember } from "@/constants/about";

interface TeamSectionProps {
  subtitle: string;
  title: string;
  description: string;
  members: TeamMember[];
}

export const TeamSection = ({
  subtitle,
  title,
  description,
  members
}: TeamSectionProps) => {
  return (
    <section className="py-24 bg-dark-400">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-green-500 font-semibold tracking-wider text-sm">{subtitle}</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              {title}
            </h2>
          </div>
          <p className="text-dark-600 max-w-md text-right">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-dark-300 border border-dark-500">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-green-400 text-sm mb-2">{member.role}</p>
                <p className="text-white/60 text-xs mb-3">{member.experience}</p>
                <p className="text-white/70 text-sm">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};