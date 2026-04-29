import nodemailer from "nodemailer";

type MailOptions = {
  to: string;
  subject: string;
  html: string;
};

export async function sendMail({ to, subject, html }: MailOptions) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    console.error("Email config missing", {
      host: Boolean(host),
      user: Boolean(user),
      pass: Boolean(pass),
      from: Boolean(from),
    });

    return {
      success: false,
      message: "Email config missing",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  console.log("Email sent:", info.messageId);

  return {
    success: true,
    messageId: info.messageId,
  };
}