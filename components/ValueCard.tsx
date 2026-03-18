// components\ValueCard.tsx - 
import { Value } from "@/constants/about";

interface ValueCardProps {
  value: Value;
}

export const ValueCard = ({ value }: ValueCardProps) => {
  return (
    <div className="bg-dark-400 border border-dark-500 rounded-xl p-8 text-center h-full">
      <div className="text-3xl mb-4">{value.icon}</div>
      <h3 className="text-18-bold mb-4">{value.title}</h3>
      <p className="text-dark-600">{value.description}</p>
    </div>
  );
};