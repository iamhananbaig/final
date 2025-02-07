import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT /api/roles/update/:id
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> } // Ensure params is a Promise for Next.js 15
) {
  const { id } = await context.params; // Await params
  const roleId = Number(id); // Convert to number

  const { permissions } = await request.json();

  console.log("Received permissions:", permissions);
  console.log("Updating role:", roleId, "with permissions:", permissions);

  try {
    // Check if the permission IDs exist
    const existingPermissions = await prisma.permission.findMany({
      where: { id: { in: permissions } },
    });

    if (existingPermissions.length !== permissions.length) {
      return NextResponse.json(
        { error: "One or more permissions do not exist." },
        { status: 400 }
      );
    }

    // First, delete all existing permissions for the role
    await prisma.rolePermissions.deleteMany({
      where: { roleId },
    });

    // Then, insert the new permissions
    const newRolePermissions = permissions.map((permissionId: number) => ({
      roleId,
      permissionId,
    }));

    await prisma.rolePermissions.createMany({
      data: newRolePermissions,
    });

    // Fetch the updated role with permissions
    const updatedRole = await prisma.role.findUnique({
      where: { id: roleId },
      include: { permissions: true }, // This will return RolePermissions, not Permission directly
    });

    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error("Error updating role permissions:", error);
    return NextResponse.json(
      { error: "Failed to update role permissions", details: error.message },
      { status: 500 }
    );
  }
}
