// components/StatusBadge.tsx
import clsx from "clsx";
import Image from "next/image";
import { StatusIcon } from "@/constants";
import { Status } from "@/types";

export const StatusBadge = ({ status }: { status: Status }) => {
  const displayText = status === "schedule" ? "scheduled" : status;

  return (
    <div
      className={clsx(
        "status-badge",
        {
          // On-brand — matches site's green/dark palette
          "bg-green-500/10 border border-green-500/25": status === "schedule",
          "bg-blue-500/10 border border-blue-500/25": status === "pending",
          "bg-red-500/10 border border-red-500/25": status === "cancelled",
        }
      )}
    >
      <Image
        src={StatusIcon[status] || StatusIcon.pending}
        alt="status"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-400": status === "schedule",
          "text-blue-400": status === "pending",
          "text-red-400": status === "cancelled",
        })}
      >
        {displayText}
      </p>
    </div>
  );
};
