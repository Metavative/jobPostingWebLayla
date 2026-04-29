import { requireAdmin } from "../../lib/admin-auth";
import { prisma } from "../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, "");
}

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        location: true,
        employmentType: true,
        salary: true,
        shortDescription: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, data: jobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET jobs error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch jobs" },
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

    const {
      title,
      category,
      location,
      employmentType,
      salary,
      shortDescription,
      description,
      responsibilities,
      requirements,
      expiresAt,
    } = body;

    if (!title || !location || !employmentType || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const baseSlug = makeSlug(title);
    const uniqueSlug = `${baseSlug}_${Date.now()}`;

    const job = await prisma.job.create({
      data: {
        title,
        slug: uniqueSlug,
        category: category || null,
        location,
        employmentType,
        salary: salary || null,
        shortDescription: shortDescription || null,
        description,
        responsibilities: responsibilities || null,
        requirements: requirements || null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(
      { success: true, data: job },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST job error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create job" },
      { status: 500 }
    );
  }
}