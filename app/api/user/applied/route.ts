import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/user-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const auth = requireUser(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: auth.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
            location: true,
            employmentType: true,
            salary: true,
            category: true,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch applied jobs",
      },
      { status: 500 }
    );
  }
}