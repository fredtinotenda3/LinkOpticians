"use client";

import { useState, useEffect } from "react";
import { OpticianTimeOff as OpticianTimeOffType } from "@/types";

interface OpticianTimeOffProps {
  opticianId: string;
  onSave?: () => void;
}

export function OpticianTimeOff({ opticianId, onSave }: OpticianTimeOffProps) {
  const [timeOff, setTimeOff] = useState<OpticianTimeOffType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
    isAllDay: true,
  });

  // Load time off on component mount
  useEffect(() => {
    loadTimeOff();
  }, [opticianId]);

  const loadTimeOff = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/opticians/time-off?opticianId=${opticianId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTimeOff(data);
      } else {
        setError("Failed to load time off");
      }
    } catch (error) {
      setError("Failed to load time off");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/opticians/time-off", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          opticianId,
          ...formData,
        }),
      });

      if (response.ok) {
        setSuccess("Time off scheduled successfully");
        setFormData({
          startDate: "",
          endDate: "",
          reason: "",
          isAllDay: true,
        });
        setShowForm(false);
        loadTimeOff(); // Reload the list
        onSave?.();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to schedule time off");

        // Show conflicting appointments if any
        if (errorData.conflictingAppointments) {
          setError(
            `${errorData.error}. ${errorData.conflictingAppointments.length} conflicting appointment(s) found.`
          );
        }
      }
    } catch (error) {
      setError("Failed to schedule time off");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (timeOffId: string) => {
    if (!confirm("Are you sure you want to delete this time off entry?"))
      return;

    try {
      const response = await fetch(`/api/opticians/time-off?id=${timeOffId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccess("Time off deleted successfully");
        loadTimeOff(); // Reload the list
        onSave?.();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete time off");
      }
    } catch (error) {
      setError("Failed to delete time off");
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const isUpcoming = (endDate: string | Date) => {
    return new Date(endDate) >= new Date();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Time Off & Leave
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "Schedule Time Off"}
        </button>
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

      {/* Time Off Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-50 p-4 rounded-lg"
        >
          <h4 className="text-md font-medium mb-4">Schedule Time Off</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason (Optional)
            </label>
            <input
              type="text"
              value={formData.reason}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, reason: e.target.value }))
              }
              placeholder="e.g., Vacation, Sick Leave, Training"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isAllDay"
              checked={formData.isAllDay}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isAllDay: e.target.checked }))
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isAllDay" className="ml-2 text-sm text-gray-700">
              All day
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Scheduling..." : "Schedule Time Off"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Time Off List */}
      <div className="space-y-3">
        {timeOff.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No time off scheduled</p>
            <p className="text-sm">
              Click "Schedule Time Off" to add a new entry
            </p>
          </div>
        ) : (
          timeOff.map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg border ${
                isUpcoming(entry.endDate)
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        isUpcoming(entry.endDate)
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {isUpcoming(entry.endDate) ? "Upcoming" : "Past"}
                    </span>
                    {entry.isAllDay && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        All Day
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-1">
                    {entry.isAllDay ? (
                      <>
                        {formatDate(entry.startDate)} to{" "}
                        {formatDate(entry.endDate)}
                      </>
                    ) : (
                      <>
                        {formatDateTime(entry.startDate)} to{" "}
                        {formatDateTime(entry.endDate)}
                      </>
                    )}
                  </div>

                  {entry.reason && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span>{" "}
                      {entry.reason}
                    </div>
                  )}
                </div>

                {isUpcoming(entry.endDate) && (
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          • Time off periods will block appointment bookings for this optician
        </p>
        <p>
          • The system will check for conflicting appointments before scheduling
          time off
        </p>
        <p>• Past time off entries are kept for record-keeping purposes</p>
      </div>
    </div>
  );
}
