import { requireAdmin } from "../../../lib/admin-auth";
import { prisma } from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const auth = requireAdmin(request);

if (!auth.ok) {
  return NextResponse.json(
    { success: false, message: auth.message },
    { status: 401 }
  );
}
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: enquiries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET admin enquiries error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch enquiries";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}