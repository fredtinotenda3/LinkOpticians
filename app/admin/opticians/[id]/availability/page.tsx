import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { OpticianAvailabilityManager } from "@/components/OpticianAvailability/OpticianAvailabilityManager";
import { OpticianForAdmin } from "@/types";
import { notFound } from "next/navigation";

async function getOptician(id: string): Promise<OpticianForAdmin | null> {
  return await prisma.optician.findUnique({
    where: { id },
    include: {
      branch: {
        select: {
          id: true,
          name: true,
          address: true,
        },
      },
    },
  });
}

export default async function OpticianAvailabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const optician = await getOptician(id);

  if (!optician) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Availability Management
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Configure working hours and time off for {optician.name}
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin/opticians"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                ← Back to Opticians
              </Link>
              <Link
                href="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex text-sm text-gray-600 mb-6">
          <Link href="/admin" className="hover:text-gray-900">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <Link href="/admin/opticians" className="hover:text-gray-900">
            Opticians
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Availability</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <OpticianAvailabilityManager optician={optician} />
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              About Availability Management
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Working Hours</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Set individual daily schedules for each optician
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Override branch operating hours when needed
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Mark specific days as unavailable
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Use standard templates for quick setup
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Time Off & Leave</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Schedule vacations, sick leave, and training
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Automatic conflict detection with appointments
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    All-day or specific time periods
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Track reason and duration for reporting
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">How It Works</h4>
              <p className="text-sm text-gray-600">
                When a patient books an appointment, the system first checks the
                branch's operating hours, then applies the optician's individual
                working hours, and finally checks for any scheduled time off.
                This ensures that appointments are only booked when the optician
                is truly available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
