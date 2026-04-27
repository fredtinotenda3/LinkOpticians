// ===== FILE: components/SuspenseBoundary.tsx (CREATE NEW) =====
"use client";

import { Suspense, ReactNode } from "react";
import { LoadingFallback } from "./ErrorBoundary";

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function SuspenseBoundary({ children, fallback }: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      {children}
    </Suspense>
  );
}