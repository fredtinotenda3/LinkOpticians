// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/Analytics"; // This import is correct

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Link Opticians",
  description: "Optometry services at clinic locations in Zimbabwe. Eye examinations, contact lens services, and frame options available. Established in 2008.",
  // ... rest of your metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>
        
        {/* This will now work correctly with Suspense */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}