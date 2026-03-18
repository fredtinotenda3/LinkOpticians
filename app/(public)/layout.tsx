// app/(public)/layout.tsx
import { LayoutHeader } from "@/components/LayoutHeader";
import { LayoutFooter } from "@/components/LayoutFooter";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <LayoutHeader />
      <main>{children}</main>
      <LayoutFooter />
      <FloatingWhatsAppButton /> 
    </div>
  );
}