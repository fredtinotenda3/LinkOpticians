import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Branch, Service } from "@/types";

async function getBranches(): Promise<Branch[]> {
  return await prisma.branch.findMany();
}

async function getService(serviceId: string): Promise<Service | null> {
  return await prisma.service.findUnique({
    where: { id: serviceId },
  });
}

export default async function BranchSelection({
  searchParams,
}: {
  searchParams: Promise<{ serviceId: string }>;
}) {
  const params = await searchParams;
  const serviceId = params.serviceId;

  if (!serviceId) {
    redirect("/book/service");
  }

  const [branches, service] = await Promise.all([
    getBranches(),
    getService(serviceId),
  ]);

  if (!service) {
    redirect("/book/service");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select a Branch
          </h1>
          <p className="text-gray-600 mb-4">
            For: <span className="font-semibold">{service.name}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((branch: Branch) => (
            <Link
              key={branch.id}
              href={`/book/optician?serviceId=${serviceId}&branchId=${branch.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {branch.name}
              </h3>
              <p className="text-gray-600 mb-3">{branch.address}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>📞 {branch.phone}</p>
                <p>📧 {branch.email}</p>
                <p>🕒 {branch.operatingHours}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}
