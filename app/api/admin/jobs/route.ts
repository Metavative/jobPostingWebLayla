import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-auth";
import { NextRequest, NextResponse } from "next/server";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
}

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            applications: true,
            savedJobs: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: jobs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin GET jobs error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch jobs",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const title = String(body.title || "").trim();
    const companyName = String(body.companyName || "").trim();
    const category = String(body.category || "").trim();
    const location = String(body.location || "").trim();
    const employmentType = String(body.employmentType || "").trim();
    const salary = String(body.salary || "").trim();
    const shortDescription = String(body.shortDescription || "").trim();
    const description = String(body.description || "").trim();
    const responsibilities = String(body.responsibilities || "").trim();
    const requirements = String(body.requirements || "").trim();
    const status = String(body.status || "ACTIVE").trim().toUpperCase();

    const allowedStatuses = ["ACTIVE", "DRAFT", "EXPIRED"];

    if (!title || !location || !employmentType || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid job status" },
        { status: 400 }
      );
    }

    const slug = `${makeSlug(title)}_${Date.now()}`;

    const job = await prisma.job.create({
      data: {
        title,
        slug,
        companyName: companyName || null,
        category: category || null,
        location,
        employmentType,
        salary: salary || null,
        shortDescription: shortDescription || null,
        description,
        responsibilities: responsibilities || null,
        requirements: requirements || null,
        status: status as "ACTIVE" | "DRAFT" | "EXPIRED",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: job,
        message: "Job created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin POST job error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create job",
      },
      { status: 500 }
    );
  }
}