// components/sections/services/ServiceIcon.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ServiceIconProps {
  src: string;
  alt: string;
  className?: string;
}

export const ServiceIcon = ({ src, alt, className = "w-6 h-6 object-contain" }: ServiceIconProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-6 h-6 rounded-full bg-dark-400 flex items-center justify-center">
        <span className="text-xs text-green-400">●</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={24}
      height={24}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};