import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Optician, Service, Branch } from "@/types";

async function getOpticians(branchId: string): Promise<Optician[]> {
  const opticians = await prisma.optician.findMany({
    where: {
      branchId,
      isActive: true,
    },
    include: {
      branch: true,
    },
  });

  return opticians as Optician[];
}

async function getService(serviceId: string): Promise<Service | null> {
  return await prisma.service.findUnique({
    where: { id: serviceId },
  });
}

async function getBranch(branchId: string): Promise<Branch | null> {
  return await prisma.branch.findUnique({
    where: { id: branchId },
  });
}

export default async function OpticianSelection({
  searchParams,
}: {
  searchParams: Promise<{ serviceId: string; branchId: string }>;
}) {
  const params = await searchParams;
  const serviceId = params.serviceId;
  const branchId = params.branchId;

  if (!serviceId || !branchId) {
    redirect("/book/service");
  }

  const [opticians, service, branch] = await Promise.all([
    getOpticians(branchId),
    getService(serviceId),
    getBranch(branchId),
  ]);

  if (!service || !branch) {
    redirect("/book/service");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select an Optician
          </h1>
          <p className="text-gray-600 mb-4">
            For: <span className="font-semibold">{service.name}</span> at{" "}
            <span className="font-semibold">{branch.name}</span>
          </p>
          <p className="text-sm text-gray-500">
            Choose your preferred eye care professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opticians.map((optician: Optician) => (
            <Link
              key={optician.id}
              href={`/book/date?serviceId=${serviceId}&branchId=${branchId}&opticianId=${optician.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {optician.name}
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <span className="mr-2">📧</span>
                  {optician.email}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  {optician.phone}
                </p>
                {optician.specialty && (
                  <p className="flex items-center">
                    <span className="mr-2">🎯</span>
                    Specialty: {optician.specialty}
                  </p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Available at: {optician.branch.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {opticians.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              No opticians available at this branch for the selected service.
            </p>
            <Link
              href={`/book/branch?serviceId=${serviceId}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Choose a different branch
            </Link>
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href={`/book/branch?serviceId=${serviceId}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Branches
          </Link>
        </div>
      </div>
    </div>
  );
}
