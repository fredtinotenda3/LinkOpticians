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

