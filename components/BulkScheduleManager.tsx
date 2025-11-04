// CREATE: components/BulkScheduleManager.tsx

"use client";

import { useState, useEffect } from "react";
import { BulkOperationResult, ScheduleEntry, OpticianForAdmin } from "@/types";

interface BulkScheduleManagerProps {
  onScheduleUpdate?: (result: BulkOperationResult) => void;
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

export function BulkScheduleManager({
  onScheduleUpdate,
}: BulkScheduleManagerProps) {
  const [opticians, setOpticians] = useState<OpticianForAdmin[]>([]);
  const [selectedOpticianIds, setSelectedOpticianIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BulkOperationResult | null>(null);

  // Schedule template
  const [scheduleTemplate, setScheduleTemplate] = useState<ScheduleEntry[]>(
    DAYS_OF_WEEK.map((day) => ({
      dayOfWeek: day.value,
      startTime: day.value === 0 || day.value === 6 ? "09:00" : "08:00",
      endTime: day.value === 0 || day.value === 6 ? "13:00" : "17:00",
      isAvailable: day.value !== 0, // Sunday off by default
    }))
  );

  // Load opticians on component mount
  useEffect(() => {
    loadOpticians();
  }, []);

  const loadOpticians = async () => {
    try {
      const response = await fetch("/api/opticians");
      if (response.ok) {
        const data = await response.json();
        setOpticians(data);
      }
    } catch (error) {
      console.error("Failed to load opticians:", error);
    }
  };

  const handleOpticianSelection = (opticianId: string, checked: boolean) => {
    if (checked) {
      setSelectedOpticianIds((prev) => [...prev, opticianId]);
    } else {
      setSelectedOpticianIds((prev) => prev.filter((id) => id !== opticianId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOpticianIds(opticians.map((optician) => optician.id));
    } else {
      setSelectedOpticianIds([]);
    }
  };

  const updateScheduleDay = (
    dayOfWeek: number,
    field: keyof ScheduleEntry,
    value: string | boolean
  ) => {
    setScheduleTemplate((prev) =>
      prev.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day
      )
    );
  };

  const applyStandardWeek = () => {
    setScheduleTemplate(
      DAYS_OF_WEEK.map((day) => ({
        dayOfWeek: day.value,
        startTime: day.value === 0 || day.value === 6 ? "09:00" : "08:00",
        endTime: day.value === 0 || day.value === 6 ? "13:00" : "17:00",
        isAvailable: day.value !== 0, // Sunday off by default
      }))
    );
  };

  const applyWeekendOnly = () => {
    setScheduleTemplate(
      DAYS_OF_WEEK.map((day) => ({
        dayOfWeek: day.value,
        startTime: "09:00",
        endTime: "13:00",
        isAvailable: day.value === 0 || day.value === 6, // Only weekends
      }))
    );
  };

  const applyWeekdaysOnly = () => {
    setScheduleTemplate(
      DAYS_OF_WEEK.map((day) => ({
        dayOfWeek: day.value,
        startTime: "08:00",
        endTime: "17:00",
        isAvailable: day.value >= 1 && day.value <= 5, // Only weekdays
      }))
    );
  };

  const applyScheduleToSelected = async () => {
    if (selectedOpticianIds.length === 0) {
      setResult({
        success: false,
        processed: 0,
        succeeded: 0,
        failed: 0,
        errors: [{ error: "Please select at least one optician" }],
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/opticians/bulk/working-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opticianIds: selectedOpticianIds,
          schedule: scheduleTemplate,
        }),
      });

      const result: BulkOperationResult = await response.json();
      setResult(result);
      onScheduleUpdate?.(result);

      // Clear selection on success
      if (result.success) {
        setSelectedOpticianIds([]);
      }
    } catch (error) {
      console.error("Bulk schedule update error:", error);
      setResult({
        success: false,
        processed: selectedOpticianIds.length,
        succeeded: 0,
        failed: selectedOpticianIds.length,
        errors: [{ error: "Failed to update schedules" }],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Bulk Schedule Management
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Apply the same working schedule to multiple opticians
        </p>
      </div>

      {/* Result Display */}
      {result && (
        <div
          className={`px-6 py-4 border-b ${
            result.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4
                className={`text-sm font-medium ${
                  result.success ? "text-green-800" : "text-red-800"
                }`}
              >
                {result.success ? "Schedule Updated" : "Update Failed"}
              </h4>
              <p
                className={`text-sm mt-1 ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.success
                  ? `Successfully updated ${result.succeeded} of ${result.processed} opticians`
                  : `Failed to update ${result.failed} of ${result.processed} opticians`}
              </p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Optician Selection */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Select Opticians</h3>
            <div className="text-sm text-gray-500">
              {selectedOpticianIds.length} of {opticians.length} selected
            </div>
          </div>

          {/* Select All */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3">
            <input
              type="checkbox"
              id="select-all"
              checked={
                selectedOpticianIds.length === opticians.length &&
                opticians.length > 0
              }
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-gray-900"
            >
              Select All Active Opticians
            </label>
          </div>

          {/* Optician List */}
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
            {opticians
              .filter((o) => o.isActive)
              .map((optician) => (
                <div
                  key={optician.id}
                  className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-b-0"
                >
                  <input
                    type="checkbox"
                    id={`optician-${optician.id}`}
                    checked={selectedOpticianIds.includes(optician.id)}
                    onChange={(e) =>
                      handleOpticianSelection(optician.id, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`optician-${optician.id}`}
                    className="flex-1 text-sm cursor-pointer"
                  >
                    <div className="font-medium text-gray-900">
                      {optician.name}
                    </div>
                    <div className="text-gray-500">
                      {optician.specialty || "General"} • {optician.branch.name}
                    </div>
                  </label>
                </div>
              ))}

            {opticians.filter((o) => o.isActive).length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No active opticians found
              </div>
            )}
          </div>
        </div>

        {/* Schedule Template */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Schedule Template</h3>
            <div className="flex gap-2">
              <button
                onClick={applyStandardWeek}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Standard Week
              </button>
              <button
                onClick={applyWeekdaysOnly}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Weekdays Only
              </button>
              <button
                onClick={applyWeekendOnly}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Weekend Only
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {scheduleTemplate.map((daySchedule) => {
              const dayInfo = DAYS_OF_WEEK.find(
                (d) => d.value === daySchedule.dayOfWeek
              );
              return (
                <div
                  key={daySchedule.dayOfWeek}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    daySchedule.isAvailable
                      ? "bg-blue-50 border-blue-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={daySchedule.isAvailable}
                        onChange={(e) =>
                          updateScheduleDay(
                            daySchedule.dayOfWeek,
                            "isAvailable",
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span
                        className={`font-medium ${
                          daySchedule.isAvailable
                            ? "text-blue-900"
                            : "text-gray-500"
                        }`}
                      >
                        {dayInfo?.label}
                      </span>
                    </label>
                  </div>

                  {daySchedule.isAvailable && (
                    <div className="flex items-center gap-2">
                      <select
                        value={daySchedule.startTime}
                        onChange={(e) =>
                          updateScheduleDay(
                            daySchedule.dayOfWeek,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>

                      <span className="text-gray-500">to</span>

                      <select
                        value={daySchedule.endTime}
                        onChange={(e) =>
                          updateScheduleDay(
                            daySchedule.dayOfWeek,
                            "endTime",
                            e.target.value
                          )
                        }
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {TIME_SLOTS.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {!daySchedule.isAvailable && (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={applyScheduleToSelected}
            disabled={loading || selectedOpticianIds.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Applying..."
              : `Apply to ${selectedOpticianIds.length} Opticians`}
          </button>
        </div>
      </div>
    </div>
  );
}
