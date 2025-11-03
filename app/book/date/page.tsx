"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface AvailabilityResponse {
  success: boolean;
  data?: string[];
  error?: string;
}

// Create a component that uses useSearchParams
function DateSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const branchId = searchParams.get("branchId");
  const opticianId = searchParams.get("opticianId");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!serviceId || !branchId) {
      router.push("/book/service");
      return;
    }
  }, [serviceId, branchId, router]);

  const checkAvailability = useCallback(
    async (date: Date) => {
      if (!serviceId || !branchId) return;

      setLoading(true);
      setError("");

      try {
        console.log("Fetching availability for:", {
          branchId,
          serviceId,
          opticianId,
          date: date.toISOString(),
        });

        const params = new URLSearchParams({
          branchId,
          serviceId,
          date: date.toISOString(),
          ...(opticianId && { opticianId }),
        });

        const response = await fetch(`/api/availability?${params}`);

        console.log("Response status:", response.status);

        const data: AvailabilityResponse = await response.json();

        console.log("Availability response:", data);

        if (data.success && data.data) {
          setAvailableSlots(data.data);
        } else {
          setError(data.error || "Failed to load availability");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to check availability");
      } finally {
        setLoading(false);
      }
    },
    [serviceId, branchId, opticianId]
  );

  useEffect(() => {
    if (selectedDate && serviceId && branchId) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate, serviceId, branchId, checkAvailability]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const handleTimeSelect = (slot: string) => {
    if (!serviceId || !branchId) return;

    const params = new URLSearchParams({
      serviceId,
      branchId,
      scheduledAt: slot,
      ...(opticianId && { opticianId }),
    });

    router.push(`/book/details?${params}`);
  };

  if (!serviceId || !branchId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Select Date & Time
          </h1>
          {opticianId && (
            <p className="text-sm text-gray-600">
              Availability shown for your selected optician
            </p>
          )}
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {dates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Available Times for {formatDate(selectedDate)}
            </h2>

            {loading && (
              <div className="text-center py-4">Loading available slots...</div>
            )}

            {error && (
              <div className="text-center py-4 text-red-600">{error}</div>
            )}

            {!loading && !error && availableSlots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            )}

            {!loading && !error && availableSlots.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No available slots for this date. Please select another date.
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href={`/book/optician?serviceId=${serviceId}&branchId=${branchId}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Opticians
          </Link>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function DateSelectionLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p>Loading date selection...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function DateSelection() {
  return (
    <Suspense fallback={<DateSelectionLoading />}>
      <DateSelectionContent />
    </Suspense>
  );
}
