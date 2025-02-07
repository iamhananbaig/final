import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/roles/edit/:id
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> } // params as a Promise
) {
  const { id } = await context.params; // Await params as per Next.js 15 dynamic APIs
  const roleId = Number(id); // Convert id to number for Prisma query

  try {
    const role = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        permissions: {
          include: { permission: true }, // Include related permissions
        },
      },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Format permissions if needed
    const formattedRole = {
      ...role,
      permissions: role.permissions.map((rp) => rp.permission),
    };

    return NextResponse.json(formattedRole);
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch role",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
