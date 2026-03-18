import Image from "next/image";
import { OutreachProgram } from "@/constants/community";

interface ProgramCardProps {
  program: OutreachProgram;
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <article className="bg-dark-400 border border-dark-500 rounded-xl overflow-hidden h-full">
      <div className="h-48 bg-dark-300 relative overflow-hidden">
        <Image
          src={program.image}
          width={400}
          height={192}
          alt={program.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-18-bold mb-3">{program.title}</h3>
        <p className="text-dark-600 text-sm mb-4">{program.description}</p>
        
        <div className="mb-4">
          <h4 className="text-12-semibold text-dark-700 mb-2">Services Available:</h4>
          <div className="flex flex-wrap gap-2">
            {program.services.slice(0, 3).map((service, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 bg-dark-300 rounded text-xs text-dark-600"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="text-dark-700 font-medium">Service Details:</p>
            <p className="text-dark-600">{program.impact}</p>
          </div>
          <div className="text-right">
            <p className="text-dark-700 font-medium">Frequency:</p>
            <p className="text-dark-600">{program.frequency}</p>
          </div>
        </div>
      </div>
    </article>
  );
};