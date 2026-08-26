import nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null = null;

export function getSmtpTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const user = process.env.SMTP_USER || process.env.BUSINESS_EMAIL || "business@controve.in";
  const rawPass = process.env.GOOGLE_APP_PASSWORD || process.env.SMTP_PASSWORD || "";
  const pass = rawPass.replace(/\s+/g, "");

  if (!pass) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true, // Reuse TCP connection for maximum speed
    maxConnections: 5,
    maxMessages: 100,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
}

export interface SendMailOptions {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ from, to, subject, html, replyTo }: SendMailOptions) {
  const sender = from || process.env.BUSINESS_EMAIL || "hello@controve.in";
  const transporter = getSmtpTransporter();

  if (!transporter) {
    console.log("--------------------------------------------------");
    console.log("📧 [GMAIL SMTP — DEV MODE / NO APP PASSWORD]");
    console.log("SENDER:", sender);
    console.log("RECIPIENT:", to);
    console.log("SUBJECT:", subject);
    console.log("NOTE: Add GOOGLE_APP_PASSWORD to .env.local to send live emails.");
    console.log("--------------------------------------------------");
    return { success: true, devMode: true };
  }

  let formattedFrom = from || process.env.BUSINESS_EMAIL || "hello@controve.in";
  if (!formattedFrom.includes("<")) {
    if (formattedFrom.includes("support")) {
      formattedFrom = `Atlas One Support <${formattedFrom}>`;
    } else {
      formattedFrom = `Atlas One <${formattedFrom}>`;
    }
  }

  try {
    const info = await transporter.sendMail({
      from: formattedFrom,
      to,
      subject,
      html,
      replyTo,
    });

    console.log(`📬 [GMAIL SMTP SENT] MessageId: ${info.messageId} | Subject: "${subject}"`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ [GMAIL SMTP ERROR]:", error);
    throw error;
  }
}
