===============================
  app\admin\layout.tsx
===============================
`$lang
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start as null for loading state
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Use requestAnimationFrame to defer the state update
    const savedAuth = localStorage.getItem("admin-authenticated");
    if (savedAuth === "true") {
      requestAnimationFrame(() => {
        setIsAuthenticated(true);
      });
    } else {
      requestAnimationFrame(() => {
        setIsAuthenticated(false);
      });
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - replace with secure authentication in production
    if (password === "linkadmin2024") {
      localStorage.setItem("admin-authenticated", "true");
      setError("");
      // Use requestAnimationFrame to defer the state update
      requestAnimationFrame(() => {
        setIsAuthenticated(true);
      });
    } else {
      setError("Invalid password");
    }
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
              />
            </div>
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

```

===============================
  app\admin\page.tsx
===============================
`$lang
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { AdminAppointmentTable } from "@/components/AdminAppointmentTable";

async function getAppointments() {
  return await prisma.appointment.findMany({
    include: {
      service: true,
      branch: true,
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });
}

async function getStats() {
  const total = await prisma.appointment.count();
  const pending = await prisma.appointment.count({
    where: { status: "pending" },
  });
  const confirmed = await prisma.appointment.count({
    where: { status: "confirmed" },
  });
  const completed = await prisma.appointment.count({
    where: { status: "completed" },
  });
  const cancelled = await prisma.appointment.count({
    where: { status: "cancelled" },
  });

  return { total, pending, confirmed, completed, cancelled };
}

export default async function AdminDashboard() {
  const [appointments, stats] = await Promise.all([
    getAppointments(),
    getStats(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage appointments and view analytics
              </p>
            </div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Confirmed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.confirmed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cancelled
            </h3>
            <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
          </div>
        </div>

        {/* Appointments Table */}
        <AdminAppointmentTable initialAppointments={appointments} />
      </div>
    </div>
  );
}

```

===============================
  app\api\appointments\[id]\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendSMS } from "@/lib/twilio";

const updateAppointmentSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
  patientName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  notes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    const body = await request.json();

    const validationResult = updateAppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    console.log("Updating appointment:", {
      appointmentId,
      data: validationResult.data,
    });

    // Get current appointment to compare changes
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { service: true, branch: true },
    });

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: validationResult.data,
      include: {
        service: true,
        branch: true,
      },
    });

    // Send SMS if status changed
    if (
      validationResult.data.status &&
      currentAppointment &&
      currentAppointment.status !== validationResult.data.status
    ) {
      try {
        const smsMessage = `Hi ${updatedAppointment.patientName}! Your appointment status has been updated to: ${validationResult.data.status}. For questions, call ${updatedAppointment.branch.phone}.`;
        await sendSMS(updatedAppointment.phone, smsMessage);
      } catch (smsError) {
        console.error("Failed to send status update SMS:", smsError);
      }
    }

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    // Get appointment details before deletion for SMS
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { branch: true },
    });

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    // Send cancellation SMS
    if (appointment) {
      try {
        const smsMessage = `Hi ${appointment.patientName}! Your appointment has been cancelled. If this was a mistake, please call ${appointment.branch.phone}.`;
        await sendSMS(appointment.phone, smsMessage);
      } catch (smsError) {
        console.error("Failed to send cancellation SMS:", smsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\appointments\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSMS } from "@/lib/twilio";

const createAppointmentSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email().optional().or(z.literal("")),
  serviceId: z.string().cuid(),
  branchId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = createAppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const { data } = validationResult;
    const result = await appointmentService.createAppointment({
      ...data,
      scheduledAt: new Date(data.scheduledAt),
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Send real SMS notification after successful appointment creation
    if (result.success && result.data) {
      try {
        // Get service and branch details for the SMS
        const service = await prisma.service.findUnique({
          where: { id: data.serviceId },
        });

        const branch = await prisma.branch.findUnique({
          where: { id: data.branchId },
        });

        if (service && branch) {
          const smsMessage = `Hi ${data.patientName}! Your ${
            service.name
          } appointment at ${branch.name} is confirmed for ${new Date(
            data.scheduledAt
          ).toLocaleString()}. Thank you for choosing Link Opticians!`;

          await sendSMS(data.phone, smsMessage);
        }
      } catch (smsError) {
        console.error("Failed to send SMS:", smsError);
        // Don't fail the appointment creation if SMS fails
      }
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const branchId = searchParams.get("branchId");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const result = await appointmentService.getAppointmentsByDateRange(
      new Date(startDate),
      new Date(endDate),
      branchId || undefined
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\availability\route.ts
===============================
`$lang
import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";

const availabilitySchema = z.object({
  branchId: z.string().min(1, "Branch ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  date: z.string().datetime(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");

    console.log("Availability check params:", { branchId, serviceId, date });

    const validationResult = availabilitySchema.safeParse({
      branchId,
      serviceId,
      date,
    });

    if (!validationResult.success) {
      console.log("Validation error:", validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid parameters",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;
    const result = await appointmentService.checkAvailability(
      data.branchId,
      data.serviceId,
      new Date(data.date)
    );

    console.log("Availability result:", result);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\debug\route.ts
===============================
`$lang
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection and data
    const services = await prisma.service.findMany();
    const branches = await prisma.branch.findMany();
    const appointments = await prisma.appointment.findMany();

    return NextResponse.json({
      success: true,
      data: {
        services: services.length,
        branches: branches.length,
        appointments: appointments.length,
        servicesList: services.map((s) => ({ id: s.id, name: s.name })),
        branchesList: branches.map((b) => ({ id: b.id, name: b.name })),
      },
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

```

===============================
  app\api\hello\route.ts
===============================
`$lang
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "LinkOpticians API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: ["Eye", "Care", "Company", "Marketing"],
  });
}

```

===============================
  app\api\test\route.ts
===============================
`$lang
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const branches = await prisma.branch.findMany();
    const services = await prisma.service.findMany();

    return NextResponse.json({
      success: true,
      data: {
        branches: branches.length,
        services: services.length,
        branchesList: branches,
        servicesList: services,
      },
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    );
  }
}

```

===============================
  app\book\branch\page.tsx
===============================
`$lang
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getBranches() {
  return await prisma.branch.findMany();
}

async function getService(serviceId: string) {
  return await prisma.service.findUnique({
    where: { id: serviceId },
  });
}

export default async function BranchSelection({
  searchParams,
}: {
  searchParams: Promise<{ serviceId: string }>;
}) {
  // Await the searchParams Promise
  const params = await searchParams;
  const serviceId = params.serviceId;

  if (!serviceId) {
    redirect("/book/service");
  }

  const [branches, service] = await Promise.all([
    getBranches(),
    getService(serviceId),
  ]);

  if (!service) {
    redirect("/book/service");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select a Branch
          </h1>
          <p className="text-gray-600 mb-4">
            For: <span className="font-semibold">{service.name}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {branches.map(
            (branch: {
              id: string;
              name: string;
              address: string;
              phone: string;
              email: string;
              operatingHours: string;
            }) => (
              <Link
                key={branch.id}
                href={`/book/date?serviceId=${serviceId}&branchId=${branch.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {branch.name}
                </h3>
                <p className="text-gray-600 mb-3">{branch.address}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>📞 {branch.phone}</p>
                  <p>📧 {branch.email}</p>
                  <p>🕒 {branch.operatingHours}</p>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
}

```

===============================
  app\book\confirmation\page.tsx
===============================
`$lang
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getAppointment(id: string) {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      service: true,
      branch: true,
    },
  });
}

export default async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ appointmentId: string }>;
}) {
  // Await the searchParams Promise
  const params = await searchParams;
  const appointmentId = params.appointmentId;

  if (!appointmentId) {
    redirect("/book/service");
  }

  const appointment = await getAppointment(appointmentId);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Appointment Not Found
          </h1>
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800"
          >
            Book New Appointment
          </Link>
        </div>
      </div>
    );
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Your appointment has been successfully scheduled. We&apos;ve sent a
            confirmation to your phone.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{appointment.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Branch:</span>
                <span className="font-medium">{appointment.branch.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">
                  {formatDateTime(appointment.scheduledAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-medium">{appointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{appointment.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Another Appointment
            </Link>
            <br />
            <Link
              href="/"
              className="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

```

===============================
  app\book\date\page.tsx
===============================
`$lang
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface AvailabilityResponse {
  success: boolean;
  data?: string[];
  error?: string;
}

// Create a component that uses useSearchParams
function DateSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const branchId = searchParams.get("branchId");

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!serviceId || !branchId) {
      router.push("/book/service");
      return;
    }
  }, [serviceId, branchId, router]);

  const checkAvailability = useCallback(
    async (date: Date) => {
      if (!serviceId || !branchId) return;

      setLoading(true);
      setError("");

      try {
        console.log("Fetching availability for:", {
          branchId,
          serviceId,
          date: date.toISOString(),
        });

        const response = await fetch(
          `/api/availability?branchId=${branchId}&serviceId=${serviceId}&date=${date.toISOString()}`
        );

        console.log("Response status:", response.status);

        const data: AvailabilityResponse = await response.json();

        console.log("Availability response:", data);

        if (data.success && data.data) {
          setAvailableSlots(data.data);
        } else {
          setError(data.error || "Failed to load availability");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to check availability");
      } finally {
        setLoading(false);
      }
    },
    [serviceId, branchId]
  );

  useEffect(() => {
    if (selectedDate && serviceId && branchId) {
      checkAvailability(selectedDate);
    }
  }, [selectedDate, serviceId, branchId, checkAvailability]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const handleTimeSelect = (slot: string) => {
    if (!serviceId || !branchId) return;

    router.push(
      `/book/details?serviceId=${serviceId}&branchId=${branchId}&scheduledAt=${slot}`
    );
  };

  if (!serviceId || !branchId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Select Date & Time
          </h1>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {dates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Available Times for {formatDate(selectedDate)}
            </h2>

            {loading && (
              <div className="text-center py-4">Loading available slots...</div>
            )}

            {error && (
              <div className="text-center py-4 text-red-600">{error}</div>
            )}

            {!loading && !error && availableSlots.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors font-medium"
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            )}

            {!loading && !error && availableSlots.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No available slots for this date. Please select another date.
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href={`/book/branch?serviceId=${serviceId}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Branches
          </Link>
        </div>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function DateSelectionLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <p>Loading date selection...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function DateSelection() {
  return (
    <Suspense fallback={<DateSelectionLoading />}>
      <DateSelectionContent />
    </Suspense>
  );
}

```

===============================
  app\book\details\page.tsx
===============================
`$lang
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Create a component that uses useSearchParams
function BookingDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const serviceId = searchParams.get("serviceId");
  const branchId = searchParams.get("branchId");
  const scheduledAt = searchParams.get("scheduledAt");

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceId || !branchId || !scheduledAt) {
      setError("Missing required parameters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceId,
          branchId,
          scheduledAt,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/book/confirmation?appointmentId=${data.id}`);
      } else {
        setError(data.error || "Failed to create appointment");
      }
    } catch (err) {
      setError("Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!serviceId || !branchId || !scheduledAt) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p>Invalid booking parameters. Please start over.</p>
          <Link
            href="/book/service"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Information
          </h1>
          <p className="text-gray-600">
            Please provide your details to complete the booking
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Appointment Summary</h2>
          <p className="text-gray-600">
            Scheduled for:{" "}
            <span className="font-medium">{formatDateTime(scheduledAt)}</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+263 XXX XXX XXX"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requirements or notes..."
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Link
              href={`/book/date?serviceId=${serviceId}&branchId=${branchId}`}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-md text-center font-medium hover:bg-gray-600 transition-colors"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Loading component for Suspense fallback
function BookingDetailsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <p>Loading booking details...</p>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function BookingDetails() {
  return (
    <Suspense fallback={<BookingDetailsLoading />}>
      <BookingDetailsContent />
    </Suspense>
  );
}

```

===============================
  app\book\service\page.tsx
===============================
`$lang
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getServices() {
  return await prisma.service.findMany({
    where: { isActive: true },
  });
}

export default async function ServiceSelection() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Select a Service
          </h1>
          <p className="text-lg text-gray-600">
            Choose the service you need from our professional optician services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(
            (service: {
              id: string;
              name: string;
              description: string | null;
              duration: number;
              price: number | null;
              isActive: boolean;
            }) => (
              <Link
                key={service.id}
                href={`/book/branch?serviceId=${service.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {service.duration} min
                  </span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${service.price}
                  </span>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

```

===============================
  app\globals.css
===============================
`$lang
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

```

===============================
  app\layout.tsx
===============================
`$lang
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

```

===============================
  app\page.tsx
===============================
`$lang
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Link Opticians
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional eye care services across Zimbabwe. Book your
            appointment online in seconds.
          </p>
          <Link
            href="/book/service"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        {/* Services Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Eye Examinations</h3>
            <p className="text-gray-600">
              Comprehensive eye health and vision assessment by our expert
              opticians.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Contact Lenses</h3>
            <p className="text-gray-600">
              Professional fitting and training for comfortable contact lens
              wear.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Repairs & Adjustments
            </h3>
            <p className="text-gray-600">
              Quick and reliable eyewear repairs and frame adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

