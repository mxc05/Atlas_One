import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const businessEmail = process.env.BUSINESS_EMAIL || "hello@controve.in";

    // Styled HTML Email for Internal Team Notification
    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; color: #111111; margin: 0; padding: 20px; }
            .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #111111; color: #ffffff; padding: 24px; text-align: left; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
            .header p { margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa; }
            .content { padding: 24px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; }
            .field-group:last-child { border-bottom: none; }
            .label { font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #18181b; font-weight: 500; }
            .message-box { background: #f4f4f5; padding: 14px; border-radius: 8px; font-size: 14px; color: #27272a; line-height: 1.5; white-space: pre-wrap; }
            .footer { background: #fafafa; padding: 16px 24px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📬 New Contact Inquiry</h2>
              <p>Received via Atlas One Website</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #2383e2; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Phone / WhatsApp</div>
                <div class="value">${phone || "Not provided"}</div>
              </div>
              <div class="field-group">
                <div class="label">Message / Inquiry</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Atlas One Lead Dispatch System · Controve Technologies
            </div>
          </div>
        </body>
      </html>
    `;

    // Styled HTML Confirmation Email for User
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f6f8fa; color: #111111; margin: 0; padding: 20px; }
            .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #2383e2; color: #ffffff; padding: 28px 24px; text-align: left; }
            .header h2 { margin: 0; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 24px; line-height: 1.6; font-size: 15px; color: #27272a; }
            .footer { background: #fafafa; padding: 16px 24px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>We've Received Your Message</h2>
              <p>Thank you for reaching out to Atlas One</p>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for getting in touch with the Atlas One team! We have received your inquiry and our team is currently reviewing your message.</p>
              <p>We aim to respond to all inquiries within 24 hours.</p>
              <br>
              <p>Best regards,<br><strong>The Atlas One Team</strong><br><span style="font-size: 13px; color: #71717a;">by Controve</span></p>
            </div>
            <div class="footer">
              © 2026 Atlas One by Controve. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    // Concurrently dispatch both emails in parallel via Promise.all
    await Promise.all([
      sendEmail({
        from: businessEmail,
        to: businessEmail,
        subject: `📬 New Contact Inquiry: ${name}`,
        html: businessEmailHtml,
        replyTo: email,
      }),
      sendEmail({
        from: businessEmail,
        to: email,
        subject: `We've received your message — Atlas One`,
        html: userEmailHtml,
      }),
    ]);

    return NextResponse.json({ success: true, message: "Contact request processed successfully" });
  } catch (error) {
    console.error("Error processing contact request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
