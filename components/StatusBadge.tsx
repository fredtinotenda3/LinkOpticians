// ===== FILE: components/StatusBadge.tsx (REPLACE) =====

"use client";

import clsx from "clsx";
import Image from "next/image";
import { StatusIcon } from "@/constants";
import { Status } from "@/types";
import { toDisplayStatus, isScheduled, isPending, isCancelled } from "@/lib/status-utils";

export const StatusBadge = ({ status }: { status: Status }) => {
  // Normalize status for display
  const displayStatus = toDisplayStatus(status as any);
  const displayText = displayStatus;

  // Use safe check functions
  const scheduled = isScheduled(status);
  const pending = isPending(status);
  const cancelled = isCancelled(status);

  return (
    <div
      className={clsx("status-badge", {
        "bg-green-500/10 border border-green-500/25": scheduled,
        "bg-blue-500/10 border border-blue-500/25": pending,
        "bg-red-500/10 border border-red-500/25": cancelled,
      })}
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
          "text-green-400": scheduled,
          "text-blue-400": pending,
          "text-red-400": cancelled,
        })}
      >
        {displayText}
      </p>
    </div>
  );
};