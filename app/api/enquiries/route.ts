import { prisma } from "@/app/lib/prisma";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { professionalEmailTemplate } from "@/app/lib/email-template";

function normalizeType(value: string) {
  const cleaned = value.trim().toUpperCase();

  if (cleaned === "CANDIDATE") return "CANDIDATE";
  if (cleaned === "EMPLOYER") return "EMPLOYER";

  return "GENERAL";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const type = normalizeType(String(body.type || "GENERAL"));

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
        type,
      },
    });

    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

    if (adminEmail) {
  await sendMail({
    to: adminEmail,
    subject: `New enquiry from ${name}`,
    html: professionalEmailTemplate({
      title: "New Enquiry Received",
      previewText: `${name} submitted a new enquiry`,
      greeting: `Hello Admin,`,
      body: `
        <p style="margin:0 0 14px;">
          A new enquiry has been submitted on SCP Professional.
        </p>

        <div style="background:#f7fbff;border:1px solid #dce5f1;border-radius:8px;padding:16px;margin:18px 0;">
          <strong>User Details:</strong>
          <p style="margin:8px 0 0;">Name: ${name}</p>
          <p style="margin:4px 0;">Email: ${email}</p>
          <p style="margin:4px 0;">Type: ${type}</p>
        </div>

        <div style="background:#edf5ff;border:1px solid #dce5f1;border-radius:8px;padding:16px;">
          <strong>Enquiry Details:</strong>
          <p style="margin:8px 0 0;">Subject: ${subject || "No subject"}</p>
          <p style="margin:8px 0 0;">Message:</p>
          <p style="margin-top:6px;">${message}</p>
        </div>

        <p style="margin-top:16px;">
          Please review and respond from the admin dashboard.
        </p>
      `,
      buttonText: "Open Enquiries",
      buttonUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/enquiries`,
    }),
  });
}

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        data: enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST enquiry error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to submit enquiry";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}