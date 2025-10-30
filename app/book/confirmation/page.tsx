import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getAppointment(id: string) {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      service: true,
      branch: true,
    },
  });
}

export default async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ appointmentId: string }>;
}) {
  // Await the searchParams Promise
  const params = await searchParams;
  const appointmentId = params.appointmentId;

  if (!appointmentId) {
    redirect("/book/service");
  }

  const appointment = await getAppointment(appointmentId);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Appointment Not Found
          </h1>
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800"
          >
            Book New Appointment
          </Link>
        </div>
      </div>
    );
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your appointment has been successfully scheduled. We&apos;ve sent a
            confirmation to your phone.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{appointment.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch:</span>
                <span className="font-medium">{appointment.branch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {formatDateTime(appointment.scheduledAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{appointment.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Another Appointment
            </Link>
            <br />
            <Link
              href="/"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
