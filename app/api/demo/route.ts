import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, gstRegistered, workType, city, state, note } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required contact details (name, email, or phone)" },
        { status: 400 }
      );
    }

    const businessEmail = process.env.BUSINESS_EMAIL || "hello@controve.in";

    // Rich HTML email for the Business / Team
    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; line-height: 1.6; background-color: #f9f9f7; padding: 20px; }
            .card { background: #ffffff; border-radius: 12px; border: 1px solid #e5e5e0; max-width: 600px; margin: 0 auto; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
            .header { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #2383e2; margin-bottom: 8px; }
            h2 { margin: 0 0 20px 0; font-size: 22px; font-weight: 800; color: #111; border-bottom: 2px solid #f0efea; padding-bottom: 12px; }
            .field-row { display: flex; border-bottom: 1px solid #f4f4f0; padding: 10px 0; }
            .label { font-weight: 700; width: 180px; color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
            .value { font-weight: 500; color: #111; flex: 1; font-size: 15px; }
            .note-box { background: #f6f4ee; border-left: 4px solid #2383e2; padding: 14px 18px; border-radius: 4px; margin-top: 20px; font-style: italic; color: #333; }
            .footer { margin-top: 28px; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">Atlas One — New Lead Capture</div>
            <h2>🚀 New Demo Booking Request</h2>
            
            <div class="field-row">
              <div class="label">Full Name</div>
              <div class="value"><strong>${name}</strong></div>
            </div>
            <div class="field-row">
              <div class="label">Work Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field-row">
              <div class="label">Phone Number</div>
              <div class="value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            <div class="field-row">
              <div class="label">GST Registered</div>
              <div class="value">${gstRegistered || "No"}</div>
            </div>
            <div class="field-row">
              <div class="label">Work Setup</div>
              <div class="value">${workType || "N/A"}</div>
            </div>
            <div class="field-row">
              <div class="label">Location</div>
              <div class="value">${city ? `${city}, ` : ""}${state || "N/A"}</div>
            </div>

            ${
              note
                ? `
                <div style="margin-top:20px;">
                  <div class="label" style="margin-bottom:6px;">Specific Questions / Notes:</div>
                  <div class="note-box">${note}</div>
                </div>
              `
                : ""
            }

            <div class="footer">
              This demo lead request was submitted via Atlas One landing page.
            </div>
          </div>
        </body>
      </html>
    `;

    // Rich HTML email for the User (Confirmation)
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; line-height: 1.6; background-color: #f6f4ee; padding: 20px; }
            .card { background: #ffffff; border-radius: 12px; border: 1px solid #e5e3db; max-width: 580px; margin: 0 auto; padding: 36px; }
            .brand { font-size: 18px; font-weight: 800; color: #111; margin-bottom: 24px; }
            .brand span { color: #2383e2; }
            h2 { margin: 0 0 16px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #111; }
            p { margin: 0 0 16px 0; font-size: 15px; color: #444; }
            .highlight-box { background: #f7f6f3; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #ebeae7; }
            .highlight-box h4 { margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #666; }
            .footer { margin-top: 32px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="brand">Atlas <span>One</span> by Controve</div>
            <h2>We've received your demo request!</h2>
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for expressing interest in <strong>Atlas One</strong> — the financial workspace built for independent professionals and studios across India.</p>
            
            <div class="highlight-box">
              <h4>What happens next?</h4>
              <p style="margin: 0; font-weight: 500; color: #222;">
                Our team is reviewing your setup details (<strong>${workType || "Independent"}</strong> in <strong>${city || state}</strong>). We'll send a personalized 1-on-1 calendar invitation to <strong>${email}</strong> within 24 hours.
              </p>
            </div>

            <p>If you have any urgent questions before our walkthrough, feel free to reply directly to this email.</p>

            <p style="margin-top: 28px;">Best regards,<br/><strong>The Atlas One Team</strong><br/><span style="font-size: 13px; color: #666;">Controve Technologies</span></p>

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
        subject: `⚡ New Demo Booking: ${name} (${city || state})`,
        html: businessEmailHtml,
        replyTo: email,
      }),
      sendEmail({
        from: businessEmail,
        to: email,
        subject: `Your Atlas One Demo Request is Confirmed!`,
        html: userEmailHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Demo request processed successfully and notifications dispatched.",
    });
  } catch (error) {
    console.error("Error processing demo request email API:", error);
    return NextResponse.json(
      { error: "Failed to process demo request email notification" },
      { status: 500 }
    );
  }
}
