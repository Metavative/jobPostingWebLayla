import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/user-auth";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ jobId: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  const auth = requireUser(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, applied: false },
      { status: 200 }
    );
  }

  try {
    const { jobId } = await context.params;

    const application = await prisma.application.findFirst({
      where: {
        jobId,
        userId: auth.user.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        applied: Boolean(application),
        data: application,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, applied: false },
      { status: 500 }
    );
  }
}