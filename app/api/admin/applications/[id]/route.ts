import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-auth";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: Context) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const status = String(body.status || "").trim().toUpperCase();

    const allowedStatuses = [
      "PENDING",
      "REVIEWED",
      "SHORTLISTED",
      "APPROVED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid application status" },
        { status: 400 }
      );
    }

    const existing = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        user: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        status: status as
          | "PENDING"
          | "REVIEWED"
          | "SHORTLISTED"
          | "APPROVED"
          | "REJECTED",
      },
      include: {
        job: true,
        user: true,
      },
    });

    if (status === "APPROVED") {
      await sendMail({
        to: updated.email,
        subject: `Application approved for ${updated.job.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Application approved</h2>
            <p>Hi ${updated.fullName},</p>
            <p>Your application for <strong>${updated.job.title}</strong> at <strong>${updated.job.companyName || "the hiring company"}</strong> has been approved.</p>
            <p>You can check your Applied tab for the updated status.</p>
            <p>Thank you.</p>
          </div>
        `,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application status updated successfully",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH application status error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update application status",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  const auth = requireAdmin(request);

  if (!auth.ok) {
    return NextResponse.json(
      { success: false, message: auth.message },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;

    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    await prisma.application.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE application error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete application",
      },
      { status: 500 }
    );
  }
}