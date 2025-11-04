// CREATE: components/BulkTimeOffManager.tsx

"use client";

import { useState, useEffect } from "react";
import { BulkOperationResult, OpticianForAdmin } from "@/types";

interface BulkTimeOffManagerProps {
  onTimeOffScheduled?: (result: BulkOperationResult) => void;
}

export function BulkTimeOffManager({
  onTimeOffScheduled,
}: BulkTimeOffManagerProps) {
  const [opticians, setOpticians] = useState<OpticianForAdmin[]>([]);
  const [selectedOpticianIds, setSelectedOpticianIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BulkOperationResult | null>(null);

  // Time-off form state
  const [timeOffData, setTimeOffData] = useState({
    startDate: "",
    startTime: "09:00",
    endDate: "",
    endTime: "17:00",
    reason: "",
    isAllDay: true,
  });

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

  const handleSelectByBranch = (branchId: string) => {
    const branchOpticians = opticians.filter(
      (optician) => optician.branchId === branchId && optician.isActive
    );
    setSelectedOpticianIds(branchOpticians.map((o) => o.id));
  };

  const handleTimeOffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (!timeOffData.startDate || !timeOffData.endDate) {
      setResult({
        success: false,
        processed: 0,
        succeeded: 0,
        failed: 0,
        errors: [{ error: "Please select start and end dates" }],
      });
      return;
    }

    setLoading(true);

    try {
      // Combine date and time for full datetime
      const startDateTime = timeOffData.isAllDay
        ? `${timeOffData.startDate}T00:00:00`
        : `${timeOffData.startDate}T${timeOffData.startTime}:00`;

      const endDateTime = timeOffData.isAllDay
        ? `${timeOffData.endDate}T23:59:59`
        : `${timeOffData.endDate}T${timeOffData.endTime}:00`;

      const response = await fetch("/api/opticians/bulk/time-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opticianIds: selectedOpticianIds,
          startDate: startDateTime,
          endDate: endDateTime,
          reason: timeOffData.reason,
          isAllDay: timeOffData.isAllDay,
        }),
      });

      const result: BulkOperationResult = await response.json();
      setResult(result);
      onTimeOffScheduled?.(result);

      // Clear form on success
      if (result.success) {
        setTimeOffData({
          startDate: "",
          startTime: "09:00",
          endDate: "",
          endTime: "17:00",
          reason: "",
          isAllDay: true,
        });
        setSelectedOpticianIds([]);
      }
    } catch (error) {
      console.error("Bulk time-off error:", error);
      setResult({
        success: false,
        processed: selectedOpticianIds.length,
        succeeded: 0,
        failed: selectedOpticianIds.length,
        errors: [{ error: "Failed to schedule time off" }],
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique branches for filtering
  const uniqueBranches = Array.from(
    new Set(opticians.map((o) => o.branchId))
  ).map((branchId) => {
    const branch = opticians.find((o) => o.branchId === branchId)?.branch;
    return { id: branchId, name: branch?.name || "Unknown Branch" };
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Bulk Time Off Management
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Schedule time off for multiple opticians at once
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
                {result.success ? "Time Off Scheduled" : "Scheduling Failed"}
              </h4>
              <p
                className={`text-sm mt-1 ${
                  result.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {result.success
                  ? `Successfully scheduled time off for ${result.succeeded} of ${result.processed} opticians`
                  : `Failed to schedule time off for ${result.failed} of ${result.processed} opticians`}
              </p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2 text-sm">
                  {result.errors.map((error, index) => (
                    <div key={index} className="text-red-600">
                      {error.id && `Optician ${error.id}: `}
                      {error.error}
                    </div>
                  ))}
                </div>
              )}
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
        {/* Time Off Form */}
        <form onSubmit={handleTimeOffSubmit} className="space-y-6">
          {/* Date & Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date/Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Start</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={timeOffData.startDate}
                  onChange={(e) =>
                    setTimeOffData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!timeOffData.isAllDay && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={timeOffData.startTime}
                    onChange={(e) =>
                      setTimeOffData((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* End Date/Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">End</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={timeOffData.endDate}
                  onChange={(e) =>
                    setTimeOffData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!timeOffData.isAllDay && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={timeOffData.endTime}
                    onChange={(e) =>
                      setTimeOffData((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* All Day Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAllDay"
              checked={timeOffData.isAllDay}
              onChange={(e) =>
                setTimeOffData((prev) => ({
                  ...prev,
                  isAllDay: e.target.checked,
                }))
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isAllDay" className="ml-2 text-sm text-gray-700">
              All day
            </label>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason (Optional)
            </label>
            <input
              type="text"
              value={timeOffData.reason}
              onChange={(e) =>
                setTimeOffData((prev) => ({ ...prev, reason: e.target.value }))
              }
              placeholder="e.g., Public Holiday, Team Training, System Maintenance"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration Preview */}
          {timeOffData.startDate && timeOffData.endDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Time Off Period
              </h4>
              <p className="text-sm text-blue-700">
                {timeOffData.isAllDay ? (
                  <>
                    {formatDate(timeOffData.startDate)} to{" "}
                    {formatDate(timeOffData.endDate)}
                    <br />
                    <span className="text-blue-600">All day</span>
                  </>
                ) : (
                  <>
                    {formatDate(timeOffData.startDate)} at{" "}
                    {timeOffData.startTime} to {formatDate(timeOffData.endDate)}{" "}
                    at {timeOffData.endTime}
                  </>
                )}
              </p>
            </div>
          )}

          {/* Optician Selection */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Select Opticians</h3>
              <div className="text-sm text-gray-500">
                {selectedOpticianIds.length} of{" "}
                {opticians.filter((o) => o.isActive).length} selected
              </div>
            </div>

            {/* Quick Selection Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleSelectAll(true)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={() => setSelectedOpticianIds([])}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
              {uniqueBranches.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => handleSelectByBranch(branch.id)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  {branch.name}
                </button>
              ))}
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
                      id={`timeoff-optician-${optician.id}`}
                      checked={selectedOpticianIds.includes(optician.id)}
                      onChange={(e) =>
                        handleOpticianSelection(optician.id, e.target.checked)
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`timeoff-optician-${optician.id}`}
                      className="flex-1 text-sm cursor-pointer"
                    >
                      <div className="font-medium text-gray-900">
                        {optician.name}
                      </div>
                      <div className="text-gray-500">
                        {optician.specialty || "General"} •{" "}
                        {optician.branch.name}
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

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || selectedOpticianIds.length === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Scheduling..."
                : `Schedule Time Off for ${selectedOpticianIds.length} Opticians`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
