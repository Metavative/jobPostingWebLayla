import { sendMail } from "@/app/lib/mailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sendMail({
      to: process.env.ADMIN_NOTIFY_EMAIL || "",
      subject: "JobNest email test",
      html: "<h2>Email is working</h2><p>This is a test email.</p>",
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Email failed",
      },
      { status: 500 }
    );
  }
}