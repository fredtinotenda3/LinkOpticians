import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schemas
const createOpticianSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  specialty: z.string().optional(),
  branchId: z.string().cuid("Invalid branch ID"),
  isActive: z.boolean().default(true),
});

const updateOpticianSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional(),
  specialty: z.string().optional(),
  branchId: z.string().cuid("Invalid branch ID").optional(),
  isActive: z.boolean().optional(),
});

// In your /api/opticians route, update the GET handler for single optician
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const id = searchParams.get("id"); // Add this to handle single optician fetch

    // If fetching a single optician
    if (id) {
      const optician = await prisma.optician.findUnique({
        where: { id },
        include: {
          branch: {
            select: {
              id: true,
              name: true,
              address: true,
              phone: true,
              email: true,
              operatingHours: true,
            },
          },
        },
      });

      if (!optician) {
        return NextResponse.json(
          { error: "Optician not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(optician);
    }

    // Rest of your existing code for multiple opticians...
    const whereClause: {
      isActive?: boolean;
      branchId?: string;
    } = {};

    if (!searchParams.has("includeInactive")) {
      whereClause.isActive = true;
    }

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
            address: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(opticians);
  } catch (error) {
    console.error("Error fetching opticians:", error);
    return NextResponse.json(
      { error: "Failed to fetch opticians" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = createOpticianSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Check if branch exists
    const branch = await prisma.branch.findUnique({
      where: { id: data.branchId },
    });

    if (!branch) {
      return NextResponse.json({ error: "Branch not found" }, { status: 404 });
    }

    // Check if email already exists - use findFirst for non-unique field search
    const existingOptician = await prisma.optician.findFirst({
      where: {
        email: data.email,
        isActive: true, // Only check active opticians
      },
    });

    if (existingOptician) {
      return NextResponse.json(
        { error: "An optician with this email already exists" },
        { status: 409 }
      );
    }

    const optician = await prisma.optician.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialty: data.specialty,
        branchId: data.branchId,
        isActive: data.isActive,
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json(optician, { status: 201 });
  } catch (error) {
    console.error("Error creating optician:", error);
    return NextResponse.json(
      { error: "Failed to create optician" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Optician ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validationResult = updateOpticianSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Check if optician exists
    const existingOptician = await prisma.optician.findUnique({
      where: { id },
    });

    if (!existingOptician) {
      return NextResponse.json(
        { error: "Optician not found" },
        { status: 404 }
      );
    }

    // If branchId is being updated, check if new branch exists
    if (data.branchId) {
      const branch = await prisma.branch.findUnique({
        where: { id: data.branchId },
      });

      if (!branch) {
        return NextResponse.json(
          { error: "Branch not found" },
          { status: 404 }
        );
      }
    }

    // If email is being updated, check for duplicates - use findFirst
    if (data.email && data.email !== existingOptician.email) {
      const emailExists = await prisma.optician.findFirst({
        where: {
          email: data.email,
          isActive: true, // Only check active opticians
          id: { not: id }, // Exclude current optician
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "An optician with this email already exists" },
          { status: 409 }
        );
      }
    }

    const updatedOptician = await prisma.optician.update({
      where: { id },
      data: {
        ...data,
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    return NextResponse.json(updatedOptician);
  } catch (error) {
    console.error("Error updating optician:", error);
    return NextResponse.json(
      { error: "Failed to update optician" },
      { status: 500 }
    );
  }
}

// Add this to the DELETE function in the existing file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const permanent = searchParams.get("permanent") === "true";

    if (!id) {
      return NextResponse.json(
        { error: "Optician ID is required" },
        { status: 400 }
      );
    }

    // Check if optician exists
    const existingOptician = await prisma.optician.findUnique({
      where: { id },
      include: {
        appointments: {
          where: {
            status: {
              in: ["pending", "confirmed"],
            },
          },
        },
      },
    });

    if (!existingOptician) {
      return NextResponse.json(
        { error: "Optician not found" },
        { status: 404 }
      );
    }

    // Check if optician has upcoming appointments
    if (existingOptician.appointments.length > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete optician with upcoming appointments. Please reassign or cancel appointments first.",
          upcomingAppointments: existingOptician.appointments.length,
        },
        { status: 409 }
      );
    }

    if (permanent) {
      // Hard delete - permanently remove from database
      await prisma.optician.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
        message: "Optician permanently deleted",
      });
    } else {
      // Soft delete by setting isActive to false (default behavior)
      await prisma.optician.update({
        where: { id },
        data: {
          isActive: false,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Optician deactivated successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting optician:", error);
    return NextResponse.json(
      { error: "Failed to delete optician" },
      { status: 500 }
    );
  }
}
