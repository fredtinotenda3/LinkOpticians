===============================
 C:\Users\fredt\Desktop\LinkOpticians\components\AdminAppointmentTable.tsx
===============================
`$lang
"use client";

import { useState, useMemo, useEffect } from "react";

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string | null;
  service: { name: string };
  branch: { name: string; id: string };
  optician: { id: string; name: string; email: string } | null;
  scheduledAt: Date;
  status: string;
  notes: string | null;
}

interface OpticianForSelect {
  id: string;
  name: string;
  email: string;
  branchId: string;
  branchName: string;
}

interface AdminAppointmentTableProps {
  initialAppointments: Appointment[];
}

interface EditAppointmentForm {
  patientName?: string;
  phone?: string;
  email?: string;
  status?: string;
  notes?: string;
  opticianId?: string;
}

export function AdminAppointmentTable({
  initialAppointments,
}: AdminAppointmentTableProps) {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [opticians, setOpticians] = useState<OpticianForSelect[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditAppointmentForm>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");

  // Fetch opticians on component mount
  useEffect(() => {
    const fetchOpticians = async () => {
      try {
        const response = await fetch("/api/opticians");
        if (response.ok) {
          const data = await response.json();
          setOpticians(data);
        }
      } catch (error) {
        console.error("Failed to fetch opticians:", error);
      }
    };

    fetchOpticians();
  }, []);

  // Filter appointments based on search and filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm) ||
        appointment.service.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.branch.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.optician?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      const matchesBranch =
        branchFilter === "all" || appointment.branch.name === branchFilter;

      return matchesSearch && matchesStatus && matchesBranch;
    });
  }, [appointments, searchTerm, statusFilter, branchFilter]);

  // Get unique branches for filter
  const uniqueBranches = useMemo(() => {
    return [...new Set(appointments.map((apt) => apt.branch.name))];
  }, [appointments]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId ? updatedAppointment : apt
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAppointments((prev) =>
          prev.filter((apt) => apt.id !== appointmentId)
        );
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const startEdit = (appointment: Appointment) => {
    setEditingId(appointment.id);
    setEditForm({
      patientName: appointment.patientName,
      phone: appointment.phone,
      status: appointment.status,
      notes: appointment.notes || "",
      opticianId: appointment.optician?.id || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId ? updatedAppointment : apt
          )
        );
        setEditingId(null);
        setEditForm({});
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  // Get opticians for the current appointment's branch
  const getOpticiansForBranch = (branchId: string) => {
    return opticians.filter((optician) => optician.branchId === branchId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Appointments ({filteredAppointments.length})
          </h2>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search patients, phone, service, optician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Branch Filter */}
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Branches</option>
              {uniqueBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Branch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Optician
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
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
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === appointment.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.patientName || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            patientName: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Patient Name"
                      />
                      <input
                        type="text"
                        value={editForm.phone || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Phone"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment.phone}
                      </div>
                      {appointment.email && (
                        <div className="text-sm text-gray-500">
                          {appointment.email}
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.service.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.branch.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === appointment.id ? (
                    <select
                      value={editForm.opticianId || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          opticianId: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">No Optician</option>
                      {getOpticiansForBranch(appointment.branch.id).map(
                        (optician) => (
                          <option key={optician.id} value={optician.id}>
                            {optician.name}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    <div className="text-sm text-gray-900">
                      {appointment.optician?.name || "Not assigned"}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDateTime(appointment.scheduledAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === appointment.id ? (
                    <select
                      value={editForm.status || ""}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {editingId === appointment.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(appointment.id)}
                        className="text-green-600 hover:text-green-900"
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
                      <button
                        onClick={() => startEdit(appointment)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No appointments found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}

```

===============================
 C:\Users\fredt\Desktop\LinkOpticians\components\AdminOpticianTable.tsx
===============================
`$lang
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
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Optician
          </button>
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

```

===============================
 C:\Users\fredt\Desktop\LinkOpticians\components\OpticianAvailability\OpticianAvailabilityManager.tsx
===============================
`$lang
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

```

===============================
 C:\Users\fredt\Desktop\LinkOpticians\components\OpticianAvailability\OpticianTimeOff.tsx
===============================
`$lang
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

```

===============================
 C:\Users\fredt\Desktop\LinkOpticians\components\OpticianAvailability\OpticianWorkingHours.tsx
===============================
`$lang
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

```

