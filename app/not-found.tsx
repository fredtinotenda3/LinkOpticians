// app/not-found.tsx (NOT _not-found.tsx)
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="header mb-4">Page Not Found</h1>
        <p className="text-dark-700 mb-6">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="shad-primary-btn" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button className="shad-gray-btn" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}