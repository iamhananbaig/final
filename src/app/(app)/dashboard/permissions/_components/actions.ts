"use server";

import prisma from "@/lib/prisma";

export async function addPermission(data: {
  name: string;
  description: string;
}) {
  try {
    const existingPermission = await prisma.permission.findUnique({
      where: { name: data.name }, // Use `data.name`
    });

    if (existingPermission) {
      return { error: "Permission already exists." };
    }

    await prisma.permission.create({
      data: { name: data.name, description: data.description },
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding permission:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}

export async function fetchPermissions() {
  try {
    // Fetch all permissions from the database
    const permissions = await prisma.permission.findMany();

    // Return the permissions list
    return permissions;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching permissions.",
    };
  }
}
