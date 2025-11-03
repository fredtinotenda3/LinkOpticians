import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AdminAppointmentTable } from "@/components/AdminAppointmentTable";

async function getAppointments() {
  return await prisma.appointment.findMany({
    include: {
      service: true,
      branch: true,
      optician: true, // Include optician data
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

async function getStats() {
  const total = await prisma.appointment.count();
  const pending = await prisma.appointment.count({
    where: { status: "pending" },
  });
  const confirmed = await prisma.appointment.count({
    where: { status: "confirmed" },
  });
  const completed = await prisma.appointment.count({
    where: { status: "completed" },
  });
  const cancelled = await prisma.appointment.count({
    where: { status: "cancelled" },
  });

  return { total, pending, confirmed, completed, cancelled };
}

export default async function AdminDashboard() {
  const [appointments, stats] = await Promise.all([
    getAppointments(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage appointments and view analytics
              </p>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.confirmed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cancelled
            </h3>
            <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
          </div>
        </div>

        {/* Appointments Table */}
        <AdminAppointmentTable initialAppointments={appointments} />
      </div>
    </div>
  );
}
