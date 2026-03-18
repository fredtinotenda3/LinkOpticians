// components\ContactInfoCard.tsx - CORRECTED VERSION

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ContactInfo } from "@/constants/contact";

interface ContactInfoCardProps {
  info: ContactInfo;
}

export const ContactInfoCard = ({ info }: ContactInfoCardProps) => {
  const renderContent = () => (
    <div className="flex items-start gap-4 p-6 bg-dark-400 border border-dark-500 rounded-xl">
      <div className="p-2 bg-dark-300 rounded-lg">
        <Image
          src={info.icon}
          width={24}
          height={24}
          alt={info.title}
          className="size-6"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-16-semibold mb-2">{info.title}</h3>
        <p className="text-dark-600 whitespace-pre-line text-sm">
          {info.details}
        </p>
      </div>
    </div>
  );

  if (info.action) {
    switch (info.action.type) {
      case "tel":
        return (
          <Link href={`tel:${info.action.value}`}>
            {renderContent()}
          </Link>
        );
      case "mailto":
        return (
          <Link href={`mailto:${info.action.value}`}>
            {renderContent()}
          </Link>
        );
      case "url":
        return (
          <Link href={info.action.value} target="_blank">
            {renderContent()}
          </Link>
        );
    }
  }

  return renderContent();
};