// components/sections/about/FoundingTeamSection.tsx
import Image from "next/image";

interface FoundingMember {
  name: string;
  role: string;
  details: string;
  image: string;
  tags: string[];
}

interface FoundingTeamSectionProps {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  members: FoundingMember[];
}

export const FoundingTeamSection = ({
  subtitle,
  title,
  titleHighlight,
  description,
  members
}: FoundingTeamSectionProps) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="text-center mb-16">
          <span className="text-green-500 font-semibold tracking-wider text-sm">{subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            {title}<br />
            <span className="text-green-400">{titleHighlight}</span>
          </h2>
          <p className="text-dark-600 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div key={index} className="group relative overflow-hidden rounded-3xl bg-dark-400 border border-dark-500">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={600}
                  height={750}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-400 via-dark-400/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-green-400 text-sm mb-2">{member.role}</p>
                <p className="text-white/60 text-xs">{member.details}</p>
                <div className="flex gap-2 mt-4">
                  {member.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-dark-300 rounded-full text-xs text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};