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
