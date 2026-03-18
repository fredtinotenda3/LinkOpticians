// components\TeamCard.tsx - CORRECTED VERSION

import Image from "next/image";
import { TeamMember } from "@/constants/about";

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="bg-dark-400 border border-dark-500 rounded-xl overflow-hidden h-full">
      <div className="h-48 bg-dark-300 relative overflow-hidden">
        <Image
          src={member.image}
          width={300}
          height={192}
          alt={`${member.name}, ${member.role}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-18-bold mb-1">{member.name}</h3>
        <p className="text-dark-600 text-sm mb-2">{member.role}</p>
        <p className="text-dark-600 text-sm mb-3">{member.experience} in practice</p>
        <p className="text-dark-700 text-sm">{member.specialty}</p>
        {member.bio && (
          <p className="text-dark-600 text-xs mt-3 line-clamp-2">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
};