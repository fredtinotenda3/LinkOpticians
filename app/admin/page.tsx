// app/admin/page.tsx (Admin component)
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { getAllBranches } from "@/lib/actions/branch.actions";
import { DataTable } from "./table/DataTable";
import { columns } from "./table/columns";

// Add this to prevent hydration issues
export const dynamic = "force-dynamic";

interface AppointmentData {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: any[];
}

const Admin = () => {
  const [appointments, setAppointments] = useState<AppointmentData | null>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [enhancedAppointments, setEnhancedAppointments] = useState<any>(null);

  useEffect(() => {
    // Fetch data only on client side to avoid hydration mismatch
    const fetchData = async () => {
      try {
        const [appointmentsData, branchesData] = await Promise.all([
          getRecentAppointmentList(),
          getAllBranches()
        ]);
        
        setAppointments(appointmentsData);
        setBranches(branchesData);
        
        const branchMap = branchesData.reduce((acc: any, branch: any) => {
          acc[branch.$id] = branch.name;
          return acc;
        }, {});

        setEnhancedAppointments({
          ...appointmentsData,
          documents: appointmentsData?.documents?.map((appt: any) => ({
            ...appt,
            branchName: branchMap[appt.branchId] || appt.branchId,
          })) || [],
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Show loading state while fetching
  if (isLoading || !enhancedAppointments) {
    return (
      <div className="min-h-screen bg-dark-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-300">

      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-dark-400/95 backdrop-blur-md border-b border-dark-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-[5%] py-4">
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="Link Opticians"
              className="h-8 w-fit transition-opacity duration-300 group-hover:opacity-80"
              priority
              unoptimized // Prevents image optimization issues on Vercel
            />
            <div className="h-5 w-px bg-dark-500" />
            <span className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase">
              Admin
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white text-xs font-medium transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-[5%] py-10">

        {/* Welcome */}
        <section className="mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Dashboard
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Appointments
          </h1>
          <p className="text-white/45 text-sm mt-2">
            Manage and confirm patient appointments across all clinics.
          </p>
        </section>

        {/* Stat cards */}
        <section className="admin-stat mb-10">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount || 0}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount || 0}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount || 0}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {/* Data table */}
        {enhancedAppointments?.documents && (
          <DataTable columns={columns} data={enhancedAppointments.documents} />
        )}

      </main>
    </div>
  );
};

export default Admin;