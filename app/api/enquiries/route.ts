import { prisma } from "@/app/lib/prisma";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

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
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New enquiry received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Subject:</strong> ${subject || "No subject"}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `,
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