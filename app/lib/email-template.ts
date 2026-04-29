type EmailTemplateProps = {
  title: string;
  previewText?: string;
  greeting?: string;
  body: string;
  buttonText?: string;
  buttonUrl?: string;
};

export function professionalEmailTemplate({
  title,
  previewText,
  greeting = "Hello,",
  body,
  buttonText,
  buttonUrl,
}: EmailTemplateProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const brandName = process.env.BRAND_NAME || "SCP Professional";
  const brandEmail = process.env.BRAND_EMAIL || "info@scpprofessional.com";
  const logoUrl = `${appUrl}/app/assets/images/logo.png`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
      </head>

      <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#111827;">
        <div style="display:none;max-height:0;overflow:hidden;">
          ${previewText || title}
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:34px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce5f1;">
                
                <tr>
                  <td style="padding:28px 34px;background:#ffffff;border-bottom:1px solid #edf1f7;">
                    <img src="${logoUrl}" alt="${brandName}" style="width:130px;height:auto;display:block;" />
                  </td>
                </tr>

                <tr>
                  <td style="padding:34px;">
                    <h1 style="margin:0 0 16px;color:#111827;font-size:26px;line-height:1.3;font-weight:700;">
                      ${title}
                    </h1>

                    <p style="margin:0 0 18px;color:#111827;font-size:16px;line-height:1.7;">
                      ${greeting}
                    </p>

                    <div style="color:#53606f;font-size:15px;line-height:1.8;">
                      ${body}
                    </div>

                    ${
                      buttonText && buttonUrl
                        ? `
                          <div style="margin-top:28px;">
                            <a href="${buttonUrl}" style="background:#1967d2;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:6px;font-size:14px;font-weight:700;display:inline-block;">
                              ${buttonText}
                            </a>
                          </div>
                        `
                        : ""
                    }
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 34px;background:#f7fbff;border-top:1px solid #edf1f7;">
                    <p style="margin:0;color:#667386;font-size:13px;line-height:1.7;">
                      Regards,<br />
                      <strong style="color:#111827;">${brandName} Team</strong><br />
                      ${brandEmail}
                    </p>
                  </td>
                </tr>

              </table>

              <p style="margin:18px 0 0;color:#8a98aa;font-size:12px;">
                This is an automated email from ${brandName}.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}