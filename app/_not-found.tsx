// app/not-found.tsx - FIXED FOR NEXT.JS 15
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Create a component that uses searchParams
async function NotFoundContent({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  // Await the searchParams promise (Next.js 15 pattern)
  const params = await searchParams;
  const from = params?.from as string || "unknown page";

  return (
    <div className="text-center">
      <h1 className="header mb-4">Page Not Found</h1>
      <p className="text-dark-700 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="text-dark-600 mb-8">
        You came from: {from}
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
  );
}

// Main component with Suspense boundary
export default async function NotFound({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center">
          <h1 className="header mb-4">Page Not Found</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="shad-primary-btn" asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      }>
        <NotFoundContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}