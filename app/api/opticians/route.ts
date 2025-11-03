import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");

    // Build where clause with proper typing
    const whereClause: {
      isActive: boolean;
      branchId?: string;
    } = {
      isActive: true,
    };

    // Filter by branch if provided
    if (branchId) {
      whereClause.branchId = branchId;
    }

    const opticians = await prisma.optician.findMany({
      where: whereClause,
      include: {
        branch: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform the data to match the expected format
    const transformedOpticians = opticians.map((optician) => ({
      id: optician.id,
      name: optician.name,
      email: optician.email,
      branchId: optician.branchId,
      branchName: optician.branch.name,
    }));

    return NextResponse.json(transformedOpticians);
  } catch (error) {
    console.error("Error fetching opticians:", error);
    return NextResponse.json(
      { error: "Failed to fetch opticians" },
      { status: 500 }
    );
  }
}
