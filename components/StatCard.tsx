// components/StatCard.tsx
import clsx from "clsx";
import Image from "next/image";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "stat-card relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5",
        {
          "bg-appointments": type === "appointments",
          "bg-pending": type === "pending",
          "bg-cancelled": type === "cancelled",
        }
      )}
    >
      {/* Subtle inner glow */}
      <div className={clsx("absolute inset-0 opacity-20 pointer-events-none", {
        "bg-gradient-to-br from-green-400/30 to-transparent": type === "appointments",
        "bg-gradient-to-br from-blue-400/30 to-transparent": type === "pending",
        "bg-gradient-to-br from-red-400/30 to-transparent": type === "cancelled",
      })} />

      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", {
            "bg-green-500/20": type === "appointments",
            "bg-blue-500/20": type === "pending",
            "bg-red-500/20": type === "cancelled",
          })}>
            <Image
              src={icon}
              height={20}
              width={20}
              alt={label}
              className="w-5 h-5"
            />
          </div>
          <h2 className="text-32-bold text-white">{count}</h2>
        </div>
        <p className="text-14-regular text-white/60">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
