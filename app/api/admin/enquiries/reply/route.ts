import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-auth";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";

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

    const enquiryId = String(body.enquiryId || "").trim();
    const replyMessage = String(body.message || "").trim();

    if (!enquiryId || !replyMessage) {
      return NextResponse.json(
        { success: false, message: "Enquiry ID and message are required" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.findUnique({
      where: { id: enquiryId },
    });

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found" },
        { status: 404 }
      );
    }

    // send email to user
    await sendMail({
      to: enquiry.email,
      subject: `Reply to your enquiry`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Hello ${enquiry.name},</h2>
          <p>Thank you for reaching out.</p>

          <p><strong>Your message:</strong></p>
          <p>${enquiry.message}</p>

          <hr />

          <p><strong>Our reply:</strong></p>
          <p>${replyMessage}</p>

          <br />
          <p>Regards,<br/>JobNest Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reply sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reply error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send reply",
      },
      { status: 500 }
    );
  }
}