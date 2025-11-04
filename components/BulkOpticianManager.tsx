// FIXED: components/BulkOpticianManager.tsx

"use client";

import { useState, useRef } from "react";
import {
  BulkOperationResult,
  ImportResult,
  BatchOperationProgress,
} from "@/types";

interface BulkOpticianManagerProps {
  onBulkOperationComplete?: (
    result: BulkOperationResult | ImportResult
  ) => void;
}

type BulkAction = "create" | "update" | "status" | "import" | "export";

export function BulkOpticianManager({
  onBulkOperationComplete,
}: BulkOpticianManagerProps) {
  const [activeTab, setActiveTab] = useState<BulkAction>("create");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<BatchOperationProgress>({
    total: 0,
    completed: 0,
    status: "idle",
  });
  const [result, setResult] = useState<
    BulkOperationResult | ImportResult | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Bulk create state
  const [bulkCreateData, setBulkCreateData] = useState({
    opticians: [
      { name: "", email: "", phone: "", specialty: "", branchId: "" },
    ],
  });

  // Bulk update state
  const [bulkUpdateData, setBulkUpdateData] = useState({
    updates: [
      {
        id: "",
        data: {
          name: "",
          email: "",
          phone: "",
          specialty: "",
          branchId: "",
          isActive: true,
        },
      },
    ],
  });

  // Bulk status state
  const [bulkStatusData, setBulkStatusData] = useState({
    opticianIds: [""],
    isActive: true,
  });

  const handleBulkCreate = async () => {
    setLoading(true);
    setProgress({
      total: bulkCreateData.opticians.length,
      completed: 0,
      status: "processing",
    });

    try {
      const response = await fetch("/api/opticians/bulk?action=create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bulkCreateData),
      });

      const result: BulkOperationResult = await response.json();
      setResult(result);
      onBulkOperationComplete?.(result);
    } catch (error) {
      console.error("Bulk create error:", error);
      setResult({
        success: false,
        processed: bulkCreateData.opticians.length,
        succeeded: 0,
        failed: bulkCreateData.opticians.length,
        errors: [{ error: "Failed to process bulk create" }],
      } as BulkOperationResult);
    } finally {
      setLoading(false);
      setProgress({ total: 0, completed: 0, status: "completed" });
    }
  };

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setProgress({ total: 0, completed: 0, status: "processing" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/opticians/import-export", {
        method: "POST",
        body: formData,
      });

      const result: ImportResult = await response.json();
      setResult(result);
      onBulkOperationComplete?.(result);
    } catch (error) {
      console.error("Import error:", error);
      setResult({
        total: 0,
        created: 0,
        updated: 0,
        errors: [{ row: 1, error: "Failed to import file", data: {} }],
      } as ImportResult);
    } finally {
      setLoading(false);
      setProgress({ total: 0, completed: 0, status: "completed" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/opticians/import-export?format=csv");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "opticians-export.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addOpticianRow = () => {
    setBulkCreateData((prev) => ({
      opticians: [
        ...prev.opticians,
        { name: "", email: "", phone: "", specialty: "", branchId: "" },
      ],
    }));
  };

  const removeOpticianRow = (index: number) => {
    setBulkCreateData((prev) => ({
      opticians: prev.opticians.filter((_, i) => i !== index),
    }));
  };

  const updateOpticianRow = (index: number, field: string, value: string) => {
    setBulkCreateData((prev) => ({
      opticians: prev.opticians.map((optician, i) =>
        i === index ? { ...optician, [field]: value } : optician
      ),
    }));
  };

  // Helper function to check if result is BulkOperationResult
  const isBulkOperationResult = (
    result: BulkOperationResult | ImportResult
  ): result is BulkOperationResult => {
    return (
      "success" in result &&
      "processed" in result &&
      "succeeded" in result &&
      "failed" in result
    );
  };

  // Helper function to check if result is ImportResult
  const isImportResult = (
    result: BulkOperationResult | ImportResult
  ): result is ImportResult => {
    return (
      "total" in result &&
      "created" in result &&
      "updated" in result &&
      "errors" in result
    );
  };

  // Get display text based on result type
  const getResultDisplay = () => {
    if (!result) return null;

    if (isBulkOperationResult(result)) {
      return {
        success: result.success,
        title: result.success ? "Operation Completed" : "Operation Failed",
        message: result.success
          ? `Successfully processed ${result.succeeded} of ${result.processed} items`
          : `Failed to process ${result.failed} of ${result.processed} items`,
        bgColor: result.success
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200",
        textColor: result.success ? "text-green-800" : "text-red-800",
      };
    }

    if (isImportResult(result)) {
      const totalProcessed = result.created + result.updated;
      const hasErrors = result.errors.length > 0;

      return {
        success: !hasErrors,
        title: hasErrors ? "Import Completed with Errors" : "Import Successful",
        message: `Created: ${result.created}, Updated: ${result.updated}, Errors: ${result.errors.length} of ${result.total}`,
        bgColor: hasErrors
          ? "bg-yellow-50 border-yellow-200"
          : "bg-green-50 border-green-200",
        textColor: hasErrors ? "text-yellow-800" : "text-green-800",
      };
    }

    return null;
  };

  const resultDisplay = getResultDisplay();

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Bulk Optician Management
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage multiple opticians at once with bulk operations
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {(
            ["create", "update", "status", "import", "export"] as BulkAction[]
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Progress Bar */}
      {loading && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">
              Processing... {progress.completed}/{progress.total}
            </span>
            <span className="text-sm text-blue-700">
              {Math.round((progress.completed / progress.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(progress.completed / progress.total) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Result Display */}
      {resultDisplay && (
        <div className={`px-6 py-4 border-b ${resultDisplay.bgColor}`}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className={`text-sm font-medium ${resultDisplay.textColor}`}>
                {resultDisplay.title}
              </h4>
              <p className={`text-sm mt-1 ${resultDisplay.textColor}`}>
                {resultDisplay.message}
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

      {/* Tab Content */}
      <div className="p-6">
        {/* Bulk Create */}
        {activeTab === "create" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Bulk Create Opticians</h3>
              <button
                onClick={addOpticianRow}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Add Row
              </button>
            </div>

            <div className="space-y-3">
              {bulkCreateData.opticians.map((optician, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 flex-1">
                    <input
                      type="text"
                      placeholder="Name"
                      value={optician.name}
                      onChange={(e) =>
                        updateOpticianRow(index, "name", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={optician.email}
                      onChange={(e) =>
                        updateOpticianRow(index, "email", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={optician.phone}
                      onChange={(e) =>
                        updateOpticianRow(index, "phone", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Specialty"
                      value={optician.specialty}
                      onChange={(e) =>
                        updateOpticianRow(index, "specialty", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Branch ID"
                      value={optician.branchId}
                      onChange={(e) =>
                        updateOpticianRow(index, "branchId", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {bulkCreateData.opticians.length > 1 && (
                    <button
                      onClick={() => removeOpticianRow(index)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleBulkCreate}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Opticians"}
            </button>
          </div>
        )}

        {/* Import */}
        {activeTab === "import" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Import Opticians</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Import Instructions
              </h4>
              <p className="text-sm text-blue-700">
                Upload a CSV file with columns: Name, Email, Phone, Specialty,
                BranchName
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileImport}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Importing..." : "Choose File & Import"}
            </button>
          </div>
        )}

        {/* Export */}
        {activeTab === "export" && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Export Opticians</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">
                Export Options
              </h4>
              <p className="text-sm text-green-700">
                Download all opticians data in CSV format for backup or
                analysis.
              </p>
            </div>

            <button
              onClick={handleExport}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Exporting..." : "Export to CSV"}
            </button>
          </div>
        )}

        {/* Update & Status tabs can be implemented similarly */}
        {(activeTab === "update" || activeTab === "status") && (
          <div className="text-center py-8 text-gray-500">
            <p>This feature is coming soon...</p>
            <p className="text-sm">Use Create, Import, or Export for now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
