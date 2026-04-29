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
    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: auth.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        job: true,
      },
    });

    return NextResponse.json(
      { success: true, data: savedJobs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch saved jobs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireUser(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: "Please login before saving a job" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const jobId = String(body.jobId || "").trim();

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Job id is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.savedJob.findFirst({
      where: {
        jobId,
        userId: auth.user.id,
      },
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json(
        { success: true, saved: false, message: "Job removed from saved jobs" },
        { status: 200 }
      );
    }

    await prisma.savedJob.create({
      data: {
        jobId,
        userId: auth.user.id,
      },
    });

    return NextResponse.json(
      { success: true, saved: true, message: "Job saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to save job",
      },
      { status: 500 }
    );
  }
}