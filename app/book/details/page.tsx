"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Create a component that uses useSearchParams
function BookingDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const branchId = searchParams.get("branchId");
  const opticianId = searchParams.get("opticianId");
  const scheduledAt = searchParams.get("scheduledAt");

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !branchId || !scheduledAt) {
      setError("Missing required parameters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceId,
          branchId,
          opticianId: opticianId || undefined,
          scheduledAt,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/book/confirmation?appointmentId=${data.id}`);
      } else {
        setError(data.error || "Failed to create appointment");
      }
    } catch (err) {
      setError("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
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

  if (!serviceId || !branchId || !scheduledAt) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p>Invalid booking parameters. Please start over.</p>
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Information
          </h1>
          <p className="text-gray-600">
            Please provide your details to complete the booking
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Summary</h2>
          <p className="text-gray-600">
            Scheduled for:{" "}
            <span className="font-medium">{formatDateTime(scheduledAt)}</span>
          </p>
          {opticianId && (
            <p className="text-sm text-gray-500 mt-2">
              With your selected optician
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+263 XXX XXX XXX"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or notes..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              href={`/book/date?serviceId=${serviceId}&branchId=${branchId}${
                opticianId ? `&opticianId=${opticianId}` : ""
              }`}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md text-center font-medium hover:bg-gray-600 transition-colors"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function BookingDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <p>Loading booking details...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function BookingDetails() {
  return (
    <Suspense fallback={<BookingDetailsLoading />}>
      <BookingDetailsContent />
    </Suspense>
  );
}
