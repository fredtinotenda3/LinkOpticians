"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwite.types";
import { StatusBadge } from "@/components/StatusBadge";
import { AppointmentModal } from "@/components/AppointmentModal";

// Fallback doctor image
const DEFAULT_DOCTOR_IMAGE = "/assets/icons/doctor-fallback.svg";

// Define an enhanced type that includes branchName
type EnhancedAppointment = Appointment & {
  branchName?: string;
};

export const columns: ColumnDef<EnhancedAppointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium ">{appointment.patient?.name || "Unknown"}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {appointment.schedule ? formatDateTime(appointment.schedule).dateTime : "Not scheduled"}
        </p>
      );
    },
  },
  {
    accessorKey: "branchName",
    header: "Branch",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular">
          {appointment.branchName || appointment.branchId || "No branch"}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;

      const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
      );

      // Use fallback image if doctor not found or image missing
      const doctorImage = doctor?.image || DEFAULT_DOCTOR_IMAGE;
      const doctorName = doctor ? `Dr. ${doctor.name}` : appointment.primaryPhysician || "Not assigned";

      return (
        <div className="flex items-center gap-3">
          <div className="relative size-8 rounded-full overflow-hidden border border-dark-500 bg-dark-400">
            <Image
              src={doctorImage}
              alt={doctorName}
              width={32}
              height={32}
              className="object-cover w-full h-full"
              unoptimized
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = DEFAULT_DOCTOR_IMAGE;
              }}
            />
          </div>
          <p className="whitespace-nowrap text-sm">
            {doctorName}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-2">
          <AppointmentModal
            patientId={appointment.patient?.$id || ""}
            appointment={appointment}
            type="schedule"
            description="Please confirm the following details to schedule."
          />
          
          <AppointmentModal
            patientId={appointment.patient?.$id || ""}
            appointment={appointment}
            type="cancel"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];