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
