// app/api/roles/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all roles with their associated permissions
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true, // This will pull the actual Permission details
          },
        },
      },
    });

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching roles.",
      },
      { status: 500 }
    );
  }
}
