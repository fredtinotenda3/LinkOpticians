// UPDATED: components/AdminOpticianTable.tsx

"use client";

import { useState, useEffect } from "react";
import { OpticianForAdmin, BranchForSelect, EditOpticianForm } from "@/types";
import Link from "next/link";

interface AdminOpticianTableProps {
  initialOpticians: OpticianForAdmin[];
  initialBranches: BranchForSelect[];
}

export function AdminOpticianTable({
  initialOpticians,
  initialBranches,
}: AdminOpticianTableProps) {
  const [opticians, setOpticians] =
    useState<OpticianForAdmin[]>(initialOpticians);
  const [branches] = useState<BranchForSelect[]>(initialBranches);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditOpticianForm>({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    branchId: "",
    isActive: true,
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<EditOpticianForm>({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    branchId: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const startEdit = (optician: OpticianForAdmin) => {
    setEditingId(optician.id);
    setEditForm({
      name: optician.name,
      email: optician.email,
      phone: optician.phone,
      specialty: optician.specialty || "",
      branchId: optician.branchId,
      isActive: optician.isActive,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      branchId: "",
      isActive: true,
    });
  };

  const saveEdit = async (opticianId: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/opticians?id=${opticianId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedOptician = await response.json();
        setOpticians((prev) =>
          prev.map((optician) =>
            optician.id === opticianId ? updatedOptician : optician
          )
        );
        setEditingId(null);
        setSuccess("Optician updated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update optician");
      }
    } catch (error) {
      setError("Failed to update optician");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/opticians", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });

      if (response.ok) {
        const newOptician = await response.json();
        setOpticians((prev) => [...prev, newOptician]);
        setCreateForm({
          name: "",
          email: "",
          phone: "",
          specialty: "",
          branchId: "",
          isActive: true,
        });
        setShowCreateForm(false);
        setSuccess("Optician created successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create optician");
      }
    } catch (error) {
      setError("Failed to create optician");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (opticianId: string) => {
    if (!confirm("Are you sure you want to deactivate this optician?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/opticians?id=${opticianId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOpticians((prev) =>
          prev.filter((optician) => optician.id !== opticianId)
        );
        setSuccess("Optician deactivated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to deactivate optician");
      }
    } catch (error) {
      setError("Failed to deactivate optician");
    } finally {
      setLoading(false);
    }
  };

  const handleHardDelete = async (opticianId: string) => {
    if (
      !confirm(
        "⚠️ PERMANENT DELETION\n\nThis will permanently delete the optician and cannot be undone. Are you sure?"
      )
    )
      return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/opticians?id=${opticianId}&permanent=true`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setOpticians((prev) =>
          prev.filter((optician) => optician.id !== opticianId)
        );
        setShowDeleteConfirm(null);
        setSuccess("Optician permanently deleted");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete optician");
      }
    } catch (error) {
      setError("Failed to delete optician");
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async (opticianId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/opticians?id=${opticianId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: true }),
      });

      if (response.ok) {
        const updatedOptician = await response.json();
        setOpticians((prev) =>
          prev.map((optician) =>
            optician.id === opticianId ? updatedOptician : optician
          )
        );
        setSuccess("Optician reactivated successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to reactivate optician");
      }
    } catch (error) {
      setError("Failed to reactivate optician");
    } finally {
      setLoading(false);
    }
  };

  const activeOpticians = opticians.filter((optician) => optician.isActive);
  const inactiveOpticians = opticians.filter((optician) => !optician.isActive);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Optician Management ({activeOpticians.length} active)
          </h2>
          <div className="flex gap-3">
            <Link
              href="/admin/bulk-management"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              Bulk Management
            </Link>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Optician
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mx-6 mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Create Form */}
      {showCreateForm && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Add New Optician</h3>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={createForm.name}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={createForm.email}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={createForm.phone}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Specialty"
              value={createForm.specialty}
              onChange={(e) =>
                setCreateForm((prev) => ({
                  ...prev,
                  specialty: e.target.value,
                }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={createForm.branchId}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, branchId: e.target.value }))
              }
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Opticians Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeOpticians.map((optician) => (
              <tr key={optician.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === optician.id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">
                      {optician.name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === optician.id ? (
                    <div className="space-y-2">
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm text-gray-900">
                        {optician.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {optician.phone}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === optician.id ? (
                    <input
                      type="text"
                      value={editForm.specialty}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          specialty: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {optician.specialty || "General"}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === optician.id ? (
                    <select
                      value={editForm.branchId}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          branchId: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-sm text-gray-900">
                      {optician.branch.name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {editingId === optician.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(optician.id)}
                        disabled={loading}
                        className="text-green-600 hover:text-green-900 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/admin/opticians/${optician.id}/availability`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Availability
                      </Link>
                      <button
                        onClick={() => startEdit(optician)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeactivate(optician.id)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Deactivate
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {activeOpticians.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No active opticians found.
          </div>
        )}
      </div>

      {/* Inactive Opticians Section */}
      {inactiveOpticians.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="px-6 py-4 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              Inactive Opticians ({inactiveOpticians.length})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inactiveOpticians.map((optician) => (
                  <tr key={optician.id} className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {optician.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{optician.email}</div>
                      <div>{optician.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {optician.specialty || "General"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {optician.branch.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Inactive
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleReactivate(optician.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Reactivate
                      </button>
                      {showDeleteConfirm === optician.id ? (
                        <>
                          <button
                            onClick={() => handleHardDelete(optician.id)}
                            className="text-red-600 hover:text-red-900 font-bold"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(optician.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete Permanently
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
