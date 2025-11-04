// CREATE: components/BulkManagementDashboard.tsx

"use client";

import { useState } from "react";
import { BulkOpticianManager } from "./BulkOpticianManager";
import { BulkScheduleManager } from "./BulkScheduleManager";
import { BulkTimeOffManager } from "./BulkTimeOffManager";
import { BulkOperationResult, ImportResult } from "@/types";

type BulkManagementTab = "opticians" | "schedules" | "time-off";

export function BulkManagementDashboard() {
  const [activeTab, setActiveTab] = useState<BulkManagementTab>("opticians");
  const [recentResults, setRecentResults] = useState<
    Array<{
      type: string;
      result: BulkOperationResult | ImportResult;
      timestamp: Date;
    }>
  >([]);

  const handleBulkOperationComplete = (
    result: BulkOperationResult | ImportResult,
    type: string
  ) => {
    setRecentResults((prev) => [
      {
        type,
        result,
        timestamp: new Date(),
      },
      ...prev.slice(0, 4),
    ]); // Keep only last 5 results
  };

  const getResultIcon = (result: BulkOperationResult | ImportResult) => {
    if ("success" in result) {
      return result.success ? "✅" : "❌";
    }

    const hasErrors = "errors" in result && result.errors.length > 0;
    return hasErrors ? "⚠️" : "✅";
  };

  const getResultSummary = (result: BulkOperationResult | ImportResult) => {
    if ("success" in result) {
      return `${result.succeeded}/${result.processed} succeeded`;
    }

    if ("created" in result) {
      return `Created: ${result.created}, Updated: ${result.updated}, Errors: ${result.errors.length}`;
    }

    return "Completed";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bulk Management Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Efficiently manage multiple opticians, schedules, and time-off in
            bulk operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {[
                    {
                      id: "opticians" as BulkManagementTab,
                      label: "Opticians",
                      description: "Bulk create, update, import, export",
                    },
                    {
                      id: "schedules" as BulkManagementTab,
                      label: "Working Schedules",
                      description: "Apply schedules to multiple opticians",
                    },
                    {
                      id: "time-off" as BulkManagementTab,
                      label: "Time Off",
                      description: "Schedule leave for multiple opticians",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-left transition-colors ${
                        activeTab === tab.id
                          ? "border-b-2 border-blue-500 bg-blue-50"
                          : "border-b-2 border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`text-sm font-medium ${
                          activeTab === tab.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.label}
                      </div>
                      <div
                        className={`text-xs ${
                          activeTab === tab.id
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      >
                        {tab.description}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "opticians" && (
                  <BulkOpticianManager
                    onBulkOperationComplete={(result) =>
                      handleBulkOperationComplete(result, "Opticians")
                    }
                  />
                )}

                {activeTab === "schedules" && (
                  <BulkScheduleManager
                    onScheduleUpdate={(result) =>
                      handleBulkOperationComplete(result, "Schedules")
                    }
                  />
                )}

                {activeTab === "time-off" && (
                  <BulkTimeOffManager
                    onTimeOffScheduled={(result) =>
                      handleBulkOperationComplete(result, "Time Off")
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("opticians")}
                  className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="text-sm font-medium text-blue-900">
                    Import Opticians
                  </div>
                  <div className="text-xs text-blue-700">
                    Upload CSV/JSON file
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("schedules")}
                  className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="text-sm font-medium text-green-900">
                    Apply Schedule
                  </div>
                  <div className="text-xs text-green-700">
                    Set working hours in bulk
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("time-off")}
                  className="w-full text-left p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <div className="text-sm font-medium text-yellow-900">
                    Schedule Time Off
                  </div>
                  <div className="text-xs text-yellow-700">
                    Holidays, training, etc.
                  </div>
                </button>

                <a
                  href="/api/opticians/import-export?format=csv"
                  download
                  className="block w-full text-left p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="text-sm font-medium text-purple-900">
                    Export All Data
                  </div>
                  <div className="text-xs text-purple-700">
                    Download CSV backup
                  </div>
                </a>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              {recentResults.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No recent bulk operations
                </p>
              ) : (
                <div className="space-y-3">
                  {recentResults.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-2 rounded-lg bg-gray-50"
                    >
                      <span className="text-sm mt-0.5">
                        {getResultIcon(item.result)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getResultSummary(item.result)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {item.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips & Best Practices */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Best Practices
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>
                    Use CSV import for adding multiple opticians quickly
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  <span>Apply standard schedules to groups of opticians</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">•</span>
                  <span>Schedule time off in advance to avoid conflicts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-500 mt-0.5">•</span>
                  <span>Export data regularly for backup purposes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
