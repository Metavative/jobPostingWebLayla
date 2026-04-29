import { prisma } from "@/app/lib/prisma";
import { requireAdmin } from "@/app/lib/admin-auth";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { professionalEmailTemplate } from "@/app/lib/email-template";


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
  subject: "Reply to your enquiry",
  html: professionalEmailTemplate({
    title: "Reply To Your Enquiry",
    previewText: "SCP Professional has responded to your message",
    greeting: `Hi ${enquiry.name},`,
    body: `
      <p style="margin:0 0 14px;">
        Thank you for contacting SCP Professional. Our team has reviewed your enquiry.
      </p>

      <div style="background:#f7fbff;border:1px solid #dce5f1;border-radius:8px;padding:16px;margin:18px 0;">
        <strong style="color:#111827;">Your message:</strong>
        <p style="margin:8px 0 0;color:#53606f;">
          ${enquiry.message}
        </p>
      </div>

      <div style="background:#edf5ff;border:1px solid #dce5f1;border-radius:8px;padding:16px;">
        <strong style="color:#111827;">Our reply:</strong>
        <p style="margin:8px 0 0;color:#53606f;">
          ${replyMessage}
        </p>
      </div>

      <p style="margin:16px 0 0;">
        If you have any further questions, feel free to reply to this email.
      </p>
    `,
  }),
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