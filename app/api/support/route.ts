import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, paymentId, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, message)" },
        { status: 400 }
      );
    }

    const supportEmail = process.env.SUPPORT_EMAIL || "support@controve.in";
    const resendApiKey = process.env.RESEND_API_KEY;

    // Styled HTML Email for Internal Support Team
    const internalSupportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f8fa; color: #111111; margin: 0; padding: 20px; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background: #111111; color: #ffffff; padding: 24px; text-align: left; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
            .header p { margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa; }
            .content { padding: 24px; }
            .field-group { margin-bottom: 16px; border-bottom: 1px solid #f0f0f0; padding-bottom: 12px; }
            .field-group:last-child { border-bottom: none; }
            .label { font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .value { font-size: 15px; color: #18181b; font-weight: 500; }
            .code-ref { font-family: monospace; background: #f4f4f5; padding: 2px 6px; border-radius: 4px; font-size: 13px; color: #2383e2; }
            .message-box { background: #f4f4f5; padding: 16px; border-radius: 8px; font-size: 14px; color: #27272a; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
            .footer { background: #fafafa; padding: 16px 24px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #71717a; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🛠️ New Support Ticket</h2>
              <p>Atlas One Customer Support Portal</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Customer Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Customer Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #2383e2; text-decoration: none;">${email}</a></div>
              </div>
              ${
                paymentId
                  ? `
                <div class="field-group">
                  <div class="label">Payment Reference ID</div>
                  <div class="value"><span class="code-ref">${paymentId}</span></div>
                </div>
              `
                  : ""
              }
              <div class="field-group">
                <div class="label">Category / Subject</div>
                <div class="value"><strong>${category || "General Support"}</strong></div>
              </div>
              <div class="field-group">
                <div class="label">Issue / Message Details</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              Atlas One Support Desk · support@controve.in
            </div>
          </div>
        </body>
      </html>
    `;

    // Styled HTML Confirmation Email for Customer
    const customerConfirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f8fa; color: #111111; margin: 0; padding: 20px; }
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
              <h2>Support Request Received</h2>
              <p>Atlas One Customer Support</p>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>We've received your support request regarding <strong>${category || "Workspace Setup"}</strong>.</p>
              <p>Our support team is reviewing your query and will reply directly to this email within 24 hours.</p>
              ${
                paymentId
                  ? `<p style="font-size:13px; color:#666;">Reference Order ID: <code>${paymentId}</code></p>`
                  : ""
              }
              <br>
              <p>Best regards,<br><strong>Atlas One Customer Support</strong><br><span style="font-size: 13px; color: #71717a;">support@controve.in</span></p>
            </div>
            <div class="footer">
              © 2026 Atlas One by Controve. All rights reserved.
            </div>
          </div>
        </body>
      </html>
    `;

    if (resendApiKey && resendApiKey !== "your_resend_api_key_here") {
      // 1. Email to Support Team
      const resendSupport = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [supportEmail],
          subject: `🛠️ Support Ticket: ${category || "General"} - ${name}`,
          html: internalSupportHtml,
        }),
      });

      // 2. Email to Customer
      const resendCustomer = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: [email],
          subject: `Support Request Received — Atlas One`,
          html: customerConfirmationHtml,
        }),
      });

      console.log("📬 [SUPPORT TICKET DISPATCH]");
      console.log("Support Desk Email Status:", resendSupport.status);
      console.log("Customer Confirmation Email Status:", resendCustomer.status);
    } else {
      console.log("--------------------------------------------------");
      console.log("📧 [SUPPORT TICKET SUBMITTED — DEV MODE]");
      console.log("DESTINATION:", supportEmail);
      console.log("CUSTOMER:", email);
      console.log("DETAILS:", { name, email, paymentId, category, message });
      console.log("--------------------------------------------------");
    }

    return NextResponse.json({ success: true, message: "Support ticket created successfully" });
  } catch (error) {
    console.error("Error submitting support ticket:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
