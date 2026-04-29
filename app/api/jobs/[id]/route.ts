import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const decodedId = decodeURIComponent(id);

    const job = await prisma.job.findFirst({
      where: {
        OR: [{ id: decodedId }, { slug: decodedId }],
      },
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
    console.error("GET public single job error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch job" },
      { status: 500 }
    );
  }
}