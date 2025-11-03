"use client";

import { useState, useEffect } from "react";
import { OpticianWorkingHours as OpticianWorkingHoursType } from "@/types";

interface OpticianWorkingHoursProps {
  opticianId: string;
  onSave?: () => void;
}

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const TIME_SLOTS = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

export function OpticianWorkingHours({
  opticianId,
  onSave,
}: OpticianWorkingHoursProps) {
  const [workingHours, setWorkingHours] = useState<OpticianWorkingHoursType[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load working hours on component mount
  useEffect(() => {
    loadWorkingHours();
  }, [opticianId]);

  const loadWorkingHours = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/opticians/working-hours?opticianId=${opticianId}`
      );
      if (response.ok) {
        const data = await response.json();
        setWorkingHours(data);
      } else {
        setError("Failed to load working hours");
      }
    } catch (error) {
      setError("Failed to load working hours");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (
    dayOfWeek: number,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setWorkingHours((prev) => {
      const existing = prev.find((wh) => wh.dayOfWeek === dayOfWeek);

      if (existing) {
        // Update existing working hours
        return prev.map((wh) =>
          wh.dayOfWeek === dayOfWeek ? { ...wh, [field]: value } : wh
        );
      } else {
        // Create new working hours with defaults
        return [
          ...prev,
          {
            id: `temp-${dayOfWeek}`,
            opticianId,
            dayOfWeek,
            startTime: field === "startTime" ? value : "09:00",
            endTime: field === "endTime" ? value : "17:00",
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
    });
  };

  const handleAvailabilityToggle = (
    dayOfWeek: number,
    isAvailable: boolean
  ) => {
    setWorkingHours((prev) => {
      const existing = prev.find((wh) => wh.dayOfWeek === dayOfWeek);

      if (existing) {
        // Update existing
        return prev.map((wh) =>
          wh.dayOfWeek === dayOfWeek ? { ...wh, isAvailable } : wh
        );
      } else {
        // Create new with default times
        return [
          ...prev,
          {
            id: `temp-${dayOfWeek}`,
            opticianId,
            dayOfWeek,
            startTime: "09:00",
            endTime: "17:00",
            isAvailable,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      }
    });
  };

  const saveWorkingHours = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Filter out days that are not available and have no custom times set
      const hoursToSave = workingHours.filter(
        (wh) =>
          wh.isAvailable || wh.startTime !== "09:00" || wh.endTime !== "17:00"
      );

      const response = await fetch("/api/opticians/working-hours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opticianId,
          workingHours: hoursToSave.map((wh) => ({
            dayOfWeek: wh.dayOfWeek,
            startTime: wh.startTime,
            endTime: wh.endTime,
            isAvailable: wh.isAvailable,
          })),
        }),
      });

      if (response.ok) {
        setSuccess("Working hours saved successfully");
        const updatedHours = await response.json();
        setWorkingHours(updatedHours);
        onSave?.();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save working hours");
      }
    } catch (error) {
      setError("Failed to save working hours");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = () => {
    setWorkingHours([]);
  };

  const applyStandardWeek = () => {
    const standardHours = DAYS_OF_WEEK.map((day) => ({
      id: `temp-${day.value}`,
      opticianId,
      dayOfWeek: day.value,
      startTime: day.value === 0 || day.value === 6 ? "09:00" : "08:00", // Weekend starts later
      endTime: day.value === 0 || day.value === 6 ? "13:00" : "17:00", // Weekend ends earlier
      isAvailable: day.value !== 0, // Sunday off by default
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    setWorkingHours(standardHours);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day.value}
              className="flex items-center justify-between py-3 border-b"
            >
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Working Hours</h3>
        <div className="flex gap-2">
          <button
            onClick={applyStandardWeek}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Apply Standard Week
          </button>
          <button
            onClick={resetToDefault}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      <div className="space-y-3">
        {DAYS_OF_WEEK.map((day) => {
          const dayHours = workingHours.find(
            (wh) => wh.dayOfWeek === day.value
          );
          const isAvailable = dayHours?.isAvailable ?? false;
          const startTime = dayHours?.startTime ?? "09:00";
          const endTime = dayHours?.endTime ?? "17:00";

          return (
            <div
              key={day.value}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isAvailable
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) =>
                      handleAvailabilityToggle(day.value, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span
                    className={`font-medium ${
                      isAvailable ? "text-blue-900" : "text-gray-500"
                    }`}
                  >
                    {day.label}
                  </span>
                </label>
              </div>

              {isAvailable && (
                <div className="flex items-center gap-2">
                  <select
                    value={startTime}
                    onChange={(e) =>
                      handleTimeChange(day.value, "startTime", e.target.value)
                    }
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isAvailable}
                  >
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>

                  <span className="text-gray-500">to</span>

                  <select
                    value={endTime}
                    onChange={(e) =>
                      handleTimeChange(day.value, "endTime", e.target.value)
                    }
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!isAvailable}
                  >
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {!isAvailable && (
                <span className="text-sm text-gray-500">Not available</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={saveWorkingHours}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Working Hours"}
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          • Working hours determine when this optician is available for
          appointments
        </p>
        <p>• Unavailable days will not show up in the booking system</p>
        <p>• Times are in 24-hour format</p>
      </div>
    </div>
  );
}
