import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/email";
import { generateId } from "@/lib/utils";

// RFC 5322 Compliant Email Validation Regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-Spam Honeypot Check
    if (body.hp_website || body.honeypot) {
      return NextResponse.json(
        { error: "Spam submission detected and blocked." },
        { status: 400 }
      );
    }

    const {
      clientName,
      email,
      phoneNumber,
      whatsappNumber,
      businessName,
      requiredService,
      projectDescription,
      budget,
      expectedDeadline,
      referenceWebsite,
    } = body;

    // Strict Server-Side Validation & Sanitization
    const sanitizedName = typeof clientName === "string" ? clientName.trim().slice(0, 100) : "";
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { error: "Client name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const sanitizedEmail = typeof email === "string" ? email.trim().toLowerCase().slice(0, 120) : "";
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    const sanitizedPhone = typeof phoneNumber === "string" ? phoneNumber.trim().slice(0, 30) : "";
    const digitsOnly = sanitizedPhone.replace(/[^0-9]/g, "");
    if (!sanitizedPhone || digitsOnly.length < 7) {
      return NextResponse.json(
        { error: "A valid contact telephone number is required (at least 7 digits)." },
        { status: 400 }
      );
    }

    const sanitizedService = typeof requiredService === "string" ? requiredService.trim().slice(0, 120) : "";
    if (!sanitizedService) {
      return NextResponse.json(
        { error: "Please specify a required service category." },
        { status: 400 }
      );
    }

    const sanitizedDesc = typeof projectDescription === "string" ? projectDescription.trim().slice(0, 6000) : "";
    if (!sanitizedDesc || sanitizedDesc.length < 10) {
      return NextResponse.json(
        { error: "Please provide a project description (at least 10 characters)." },
        { status: 400 }
      );
    }

    const sanitizedBusiness = typeof businessName === "string" ? businessName.trim().slice(0, 150) : undefined;
    const sanitizedWhatsapp = typeof whatsappNumber === "string" ? whatsappNumber.trim().slice(0, 30) : undefined;
    const sanitizedBudget = typeof budget === "string" ? budget.trim().slice(0, 100) : "Custom Scope";
    const sanitizedDeadline = typeof expectedDeadline === "string" ? expectedDeadline.trim().slice(0, 100) : "Standard Delivery";
    const sanitizedRef = typeof referenceWebsite === "string" ? referenceWebsite.trim().slice(0, 200) : undefined;

    const inquiryId = generateId("AWS-REQ");

    // Trigger Email Notification & Client Acknowledgment
    const emailResult = await sendInquiryEmails({
      inquiryId,
      clientName: sanitizedName,
      email: sanitizedEmail,
      phoneNumber: sanitizedPhone,
      whatsappNumber: sanitizedWhatsapp,
      businessName: sanitizedBusiness,
      requiredService: sanitizedService,
      projectDescription: sanitizedDesc,
      budget: sanitizedBudget,
      expectedDeadline: sanitizedDeadline,
      referenceWebsite: sanitizedRef,
    });

    const inquiryRecord = {
      id: inquiryId,
      clientName: sanitizedName,
      email: sanitizedEmail,
      phoneNumber: sanitizedPhone,
      whatsappNumber: sanitizedWhatsapp,
      businessName: sanitizedBusiness,
      requiredService: sanitizedService,
      projectDescription: sanitizedDesc,
      budget: sanitizedBudget,
      expectedDeadline: sanitizedDeadline,
      referenceWebsite: sanitizedRef,
      status: "New" as const,
      createdAt: new Date().toISOString(),
      notes: "Submitted via AI Website Project Planner.",
      emailSent: emailResult.success,
    };

    return NextResponse.json(
      {
        success: true,
        inquiry: inquiryRecord,
        inquiryId,
        message: "Project inquiry registered successfully.",
        emailStatus: emailResult.message,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Server API Error in /api/inquiries:", error);
    return NextResponse.json(
      { error: "Internal server error processing project inquiry." },
      { status: 500 }
    );
  }
}
