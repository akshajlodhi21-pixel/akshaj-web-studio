export interface InquiryEmailPayload {
  inquiryId: string;
  clientName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  businessName?: string;
  requiredService: string;
  projectDescription: string;
  budget: string;
  expectedDeadline: string;
  referenceWebsite?: string;
}

export async function sendInquiryEmails(payload: InquiryEmailPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  const studioEmail = process.env.STUDIO_BUSINESS_EMAIL || "contact@akshajwebstudio.com";

  // HTML Template for Business Owner Notification
  const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #030306; color: #f8fafc; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0e0e18; border: 1px solid #d4af37; border-radius: 16px; padding: 32px; }
          .header { text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding-bottom: 20px; }
          .title { color: #d4af37; font-size: 22px; font-weight: 800; margin: 0; }
          .tagline { color: #94a3b8; font-size: 12px; margin-top: 4px; }
          .badge { display: inline-block; background: rgba(212, 175, 55, 0.15); color: #fef08a; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-top: 12px; }
          .item { margin: 12px 0; border-bottom: 1px solid #1e2036; padding-bottom: 8px; }
          .label { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
          .val { color: #ffffff; font-size: 14px; font-weight: 600; margin-top: 2px; }
          .desc { background: #131422; border-left: 3px solid #d4af37; padding: 12px; border-radius: 6px; font-size: 13px; color: #e2e8f0; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">AKSHAJ WEB STUDIO</h1>
            <div class="tagline">New Client Inquiry Registered</div>
            <div class="badge">Reference ID: ${payload.inquiryId}</div>
          </div>
          <div style="margin-top: 24px;">
            <div class="item"><div class="label">Client Name</div><div class="val">${payload.clientName}</div></div>
            <div class="item"><div class="label">Email Address</div><div class="val">${payload.email}</div></div>
            <div class="item"><div class="label">Phone / WhatsApp</div><div class="val">${payload.phoneNumber} ${payload.whatsappNumber ? `| WA: ${payload.whatsappNumber}` : ""}</div></div>
            <div class="item"><div class="label">Company / Business</div><div class="val">${payload.businessName || "Not Specified"}</div></div>
            <div class="item"><div class="label">Required Service</div><div class="val" style="color: #d4af37;">${payload.requiredService}</div></div>
            <div class="item"><div class="label">Budget Range</div><div class="val">${payload.budget}</div></div>
            <div class="item"><div class="label">Expected Delivery Timeline</div><div class="val">${payload.expectedDeadline}</div></div>
            ${payload.referenceWebsite ? `<div class="item"><div class="label">Reference Link</div><div class="val"><a href="${payload.referenceWebsite}" style="color: #d4af37;">${payload.referenceWebsite}</a></div></div>` : ""}
            <div style="margin-top: 16px;">
              <div class="label" style="margin-bottom: 6px;">Project Scope & Description</div>
              <div class="desc">${payload.projectDescription}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  // HTML Template for Automatic Client Acknowledgment
  const clientAckEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #030306; color: #f8fafc; padding: 24px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #0e0e18; border: 1px solid #d4af37; border-radius: 16px; padding: 32px; }
          .header { text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding-bottom: 20px; }
          .title { color: #d4af37; font-size: 22px; font-weight: 800; margin: 0; }
          .greeting { color: #ffffff; font-size: 16px; font-weight: bold; margin-top: 20px; }
          .body-text { color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-top: 8px; }
          .box { background: #131422; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 10px; padding: 16px; margin: 20px 0; text-align: center; }
          .ref { color: #d4af37; font-size: 18px; font-weight: 800; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">AKSHAJ WEB STUDIO</h1>
            <div style="color: #94a3b8; font-size: 12px; margin-top: 4px;">Turning Ideas Into Digital Reality.</div>
          </div>
          <div class="greeting">Dear ${payload.clientName},</div>
          <p class="body-text">
            Thank you for reaching out to <strong>AKSHAJ WEB STUDIO</strong>. We have successfully logged your project request for <strong>${payload.requiredService}</strong>.
          </p>
          <div class="box">
            <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase;">Your Unique Project Reference ID</div>
            <div class="ref">${payload.inquiryId}</div>
          </div>
          <p class="body-text">
            Our principal solutions architect is actively reviewing your project specifications and technical scope. We will formulate a comprehensive proposal and reach out to you within 24 business hours.
          </p>
          <p class="body-text" style="margin-top: 20px; font-size: 13px; color: #94a3b8;">
            If you need urgent assistance, you can also reach us directly on WhatsApp at +91 98765 43210.
          </p>
          <div style="margin-top: 24px; border-top: 1px solid #1e2036; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
            © ${new Date().getFullYear()} AKSHAJ WEB STUDIO. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;

  // If Resend API key is available, send via Resend
  if (apiKey && !apiKey.includes("your-resend-api-key")) {
    try {
      // 1. Send alert to studio owner
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AKSHAJ WEB STUDIO <onboarding@resend.dev>",
          to: studioEmail,
          subject: `[New Inquiry] ${payload.requiredService} - ${payload.clientName} (${payload.inquiryId})`,
          html: adminEmailHtml,
        }),
      });

      // 2. Send acknowledgment to client
      if (payload.email && payload.email.includes("@")) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AKSHAJ WEB STUDIO <onboarding@resend.dev>",
            to: payload.email,
            subject: `We have received your project inquiry - ${payload.inquiryId}`,
            html: clientAckEmailHtml,
          }),
        });
      }

      return {
        success: true,
        message: "Notification and acknowledgment emails dispatched via Resend.",
      };
    } catch (err: any) {
      console.warn("Resend email delivery notice:", err);
      return {
        success: false,
        message: "Email dispatch logged (gateway unreachable).",
      };
    }
  }

  // Graceful simulation when Resend key is not configured yet
  console.log(`[Resend Engine]: Inquiry email simulation for ${payload.inquiryId}`);
  return {
    success: true,
    message: "Email logged in local simulator (Resend key not set in environment).",
  };
}
