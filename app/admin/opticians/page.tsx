import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AdminOpticianTable } from "@/components/AdminOpticianTable";
import { OpticianForAdmin, BranchForSelect } from "@/types";

async function getOpticians(): Promise<OpticianForAdmin[]> {
  return await prisma.optician.findMany({
    include: {
      branch: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

async function getBranches(): Promise<BranchForSelect[]> {
  return await prisma.branch.findMany({
    select: {
      id: true,
      name: true,
      address: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export default async function OpticianManagement() {
  const [opticians, branches] = await Promise.all([
    getOpticians(),
    getBranches(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Optician Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage opticians across all branches
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <Link
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Site
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AdminOpticianTable
          initialOpticians={opticians}
          initialBranches={branches}
        />
      </div>
    </div>
  );
}
