import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            employmentType: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: applications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET admin applications error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch applications",
      },
      { status: 500 }
    );
  }
}