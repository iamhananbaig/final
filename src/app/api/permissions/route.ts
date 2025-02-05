// app/api/permissions/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all permissions from the database
    const permissions = await prisma.permission.findMany();
    return NextResponse.json(permissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching permissions.",
      },
      { status: 500 }
    );
  }
}
