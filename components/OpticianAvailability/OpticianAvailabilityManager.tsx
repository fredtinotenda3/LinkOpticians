"use client";

import { useState, useEffect } from "react";
import { OpticianWorkingHours } from "./OpticianWorkingHours";
import { OpticianTimeOff } from "./OpticianTimeOff";
import { OpticianForAdmin } from "@/types";

interface OpticianAvailabilityManagerProps {
  optician: OpticianForAdmin;
  onUpdate?: () => void;
}

export function OpticianAvailabilityManager({
  optician,
  onUpdate,
}: OpticianAvailabilityManagerProps) {
  const [activeTab, setActiveTab] = useState<"working-hours" | "time-off">(
    "working-hours"
  );
  const [opticianDetails, setOpticianDetails] = useState(optician);
  const [loading, setLoading] = useState(!optician.branch); // Load if branch is missing

  // Refresh optician details when updates occur or if branch is missing
  useEffect(() => {
    const loadOpticianDetails = async () => {
      if (!optician.branch) {
        setLoading(true);
        try {
          const response = await fetch(`/api/opticians?id=${optician.id}`);
          if (response.ok) {
            const updatedOptician = await response.json();
            setOpticianDetails(updatedOptician);
          }
        } catch (error) {
          console.error("Failed to refresh optician details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadOpticianDetails();
  }, [optician.id, optician.branch]);

  const getCurrentAvailability = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const timeString = now.toTimeString().slice(0, 5);

    // This is a simplified check - in a real app, you'd call the API
    return {
      isAvailable: true,
      status: "Available",
      nextAvailable: "Now",
    };
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/opticians?id=${optician.id}`);
      if (response.ok) {
        const updatedOptician = await response.json();
        setOpticianDetails(updatedOptician);
      }
      onUpdate?.();
    } catch (error) {
      console.error("Failed to refresh optician details:", error);
    }
  };

  const availability = getCurrentAvailability();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {opticianDetails.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {opticianDetails.branch?.name || "Branch not assigned"} •{" "}
              {opticianDetails.specialty || "General Optician"}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  availability.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    availability.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {availability.status}
              </div>
              <div className="text-sm text-gray-500">
                Next available: {availability.nextAvailable}
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>Email: {opticianDetails.email}</div>
            <div>Phone: {opticianDetails.phone}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("working-hours")}
            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "working-hours"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Working Hours
          </button>
          <button
            onClick={() => setActiveTab("time-off")}
            className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "time-off"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Time Off & Leave
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "working-hours" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Working Hours Configuration
              </h4>
              <p className="text-sm text-blue-700">
                Set the regular working hours for this optician. These hours
                will override branch operating hours and determine when this
                optician is available for appointments.
              </p>
            </div>

            <OpticianWorkingHours
              opticianId={opticianDetails.id}
              onSave={handleUpdate}
            />
          </div>
        )}

        {activeTab === "time-off" && (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-900 mb-2">
                Time Off Management
              </h4>
              <p className="text-sm text-yellow-700">
                Schedule vacations, sick leave, training, or other time off. The
                system will automatically block appointment bookings during
                these periods and check for conflicts with existing
                appointments.
              </p>
            </div>

            <OpticianTimeOff
              opticianId={opticianDetails.id}
              onSave={handleUpdate}
            />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {opticianDetails.isActive ? "Active" : "Inactive"}
            </div>
            <div className="text-gray-500">Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {opticianDetails.branch?.name || "N/A"}
            </div>
            <div className="text-gray-500">Branch</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900">
              {opticianDetails.specialty || "General"}
            </div>
            <div className="text-gray-500">Specialty</div>
          </div>
        </div>
      </div>
    </div>
  );
}
