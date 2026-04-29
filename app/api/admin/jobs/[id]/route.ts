import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: Context) {
  try {
    const { id } = await context.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: job },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET single admin job error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to fetch job";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = await prisma.job.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.job.update({
      where: { id },
      data: {
        title: body.title ?? existing.title,
        category: body.category ?? existing.category,
        location: body.location ?? existing.location,
        employmentType: body.employmentType ?? existing.employmentType,
        salary: body.salary ?? existing.salary,
        shortDescription: body.shortDescription ?? existing.shortDescription,
        description: body.description ?? existing.description,
        responsibilities: body.responsibilities ?? existing.responsibilities,
        requirements: body.requirements ?? existing.requirements,
        status: body.status ?? existing.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH job error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to update job";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  context: Context
) {
  try {
    const { id } = await context.params;

    const existing = await prisma.job.findUnique({
      where: { id },
      include: {
        applications: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    await prisma.$transaction([
      prisma.application.deleteMany({
        where: { jobId: id },
      }),
      prisma.job.delete({
        where: { id },
      }),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Job deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE job error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to delete job";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
