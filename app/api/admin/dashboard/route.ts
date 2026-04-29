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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalJobs,
      activeJobs,
      totalApplications,
      approvedApplications,
      totalEnquiries,
      totalUsers,
      totalSavedJobs,
      newApplicationsToday,
      latestApplications,
      latestEnquiries,
    ] = await Promise.all([
      prisma.job.count(),
      prisma.job.count({
        where: { status: "ACTIVE" },
      }),
      prisma.application.count(),
      prisma.application.count({
        where: { status: "APPROVED" },
      }),
      prisma.enquiry.count(),
      prisma.user.count(),
      prisma.savedJob.count(),
      prisma.application.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.application.findMany({
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          job: {
            select: {
              title: true,
            },
          },
        },
      }),
      prisma.enquiry.findMany({
        take: 2,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    const latestActivity = [
      ...latestApplications.map((item) => ({
        id: item.id,
        text: `New application received for ${item.job.title}`,
        createdAt: item.createdAt,
      })),
      ...latestEnquiries.map((item) => ({
        id: item.id,
        text: `New ${item.type.toLowerCase()} enquiry from ${item.name}`,
        createdAt: item.createdAt,
      })),
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          totalJobs,
          activeJobs,
          totalApplications,
          approvedApplications,
          totalEnquiries,
          totalUsers,
          totalSavedJobs,
          newApplicationsToday,
          latestActivity,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET admin dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch dashboard",
      },
      { status: 500 }
    );
  }
}