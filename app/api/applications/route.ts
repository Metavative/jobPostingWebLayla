import { prisma } from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/user-auth";
import { sendMail } from "@/app/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { mkdir, stat, writeFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const allowedFileTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const maxFileSize = 5 * 1024 * 1024;

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^\w.\s]/g, "").replace(/\s+/g, "_");
}

async function ensureDirectoryExists(dirPath: string) {
  try {
    const existing = await stat(dirPath);

    if (!existing.isDirectory()) {
      throw new Error(`Upload path exists but is not a folder: ${dirPath}`);
    }
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await mkdir(dirPath, { recursive: true });
      return;
    }

    throw error;
  }
}

export async function POST(request: NextRequest) {
  const auth = requireUser(request);

  if (!auth.ok) {
    return NextResponse.json(
      {
        success: false,
        message: "Please login before applying for a job",
      },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    const jobId = String(formData.get("jobId") || "").trim();
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const portfolioUrl = String(formData.get("portfolioUrl") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const file = formData.get("cv") as File | null;

    if (!jobId || !fullName || !email) {
      return NextResponse.json(
        { success: false, message: "Job, name, and email are required" },
        { status: 400 }
      );
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Selected job not found" },
        { status: 404 }
      );
    }

    const alreadyApplied = await prisma.application.findFirst({
      where: {
        jobId,
        userId: auth.user.id,
      },
    });

    if (alreadyApplied) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this job",
        },
        { status: 409 }
      );
    }

    let cvFileUrl: string | null = null;
    let cvOriginalName: string | null = null;

    if (file && file.size > 0) {
      if (!allowedFileTypes.includes(file.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only PDF, DOC, and DOCX files are allowed",
          },
          { status: 400 }
        );
      }

      if (file.size > maxFileSize) {
        return NextResponse.json(
          { success: false, message: "CV size must be less than 5MB" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads", "cvs");
      await ensureDirectoryExists(uploadDir);

      const safeOriginalName = sanitizeFileName(file.name);
      const uniqueName = `${Date.now()}_${safeOriginalName}`;
      const filePath = path.join(uploadDir, uniqueName);

      await writeFile(filePath, buffer);

      cvFileUrl = `/uploads/cvs/${uniqueName}`;
      cvOriginalName = file.name;
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: auth.user.id,
        fullName,
        email,
        phone: phone || null,
        portfolioUrl: portfolioUrl || null,
        message: message || null,
        cvFileUrl,
        cvOriginalName,
      },
      include: {
        job: true,
      },
    });

    const companyName = job.companyName || "the hiring company";
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

    await Promise.allSettled([
      sendMail({
        to: email,
        subject: `Application submitted for ${job.title}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6">
            <h2>Application submitted</h2>
            <p>Hi ${fullName},</p>
            <p>You have just applied for <strong>${job.title}</strong> at <strong>${companyName}</strong>.</p>
            <p>Your application is currently marked as <strong>Pending</strong>. You can check your Applied tab for updates.</p>
            <p>Thank you for applying.</p>
          </div>
        `,
      }),

      adminEmail
        ? sendMail({
            to: adminEmail,
            subject: `New application received: ${job.title}`,
            html: `
              <div style="font-family:Arial,sans-serif;line-height:1.6">
                <h2>New job application</h2>
                <p><strong>Candidate:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
                <p><strong>Job:</strong> ${job.title}</p>
                <p><strong>Company:</strong> ${companyName}</p>
                <p><strong>Message:</strong> ${message || "No message provided"}</p>
              </div>
            `,
          })
        : Promise.resolve(),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST application error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to submit application",
      },
      { status: 500 }
    );
  }
}