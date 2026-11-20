import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/email";
import { generateId } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    // Strict Server-Side Validation
    if (!clientName || typeof clientName !== "string" || clientName.trim().length < 2) {
      return NextResponse.json(
        { error: "Client name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!phoneNumber || typeof phoneNumber !== "string" || phoneNumber.trim().length < 7) {
      return NextResponse.json(
        { error: "A valid contact telephone number is required." },
        { status: 400 }
      );
    }

    if (!requiredService || typeof requiredService !== "string") {
      return NextResponse.json(
        { error: "Please specify a required service." },
        { status: 400 }
      );
    }

    if (!projectDescription || typeof projectDescription !== "string" || projectDescription.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief project description (at least 10 characters)." },
        { status: 400 }
      );
    }

    const inquiryId = generateId("AWS-REQ");

    // Trigger Email Notification & Client Acknowledgment
    const emailResult = await sendInquiryEmails({
      inquiryId,
      clientName: clientName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber?.trim(),
      businessName: businessName?.trim(),
      requiredService: requiredService.trim(),
      projectDescription: projectDescription.trim(),
      budget: budget || "Custom Scope",
      expectedDeadline: expectedDeadline || "Standard Delivery",
      referenceWebsite: referenceWebsite?.trim(),
    });

    const inquiryRecord = {
      id: inquiryId,
      clientName: clientName.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber?.trim() || undefined,
      businessName: businessName?.trim() || undefined,
      requiredService: requiredService.trim(),
      projectDescription: projectDescription.trim(),
      budget: budget || "Custom Scope",
      expectedDeadline: expectedDeadline || "Standard Delivery",
      referenceWebsite: referenceWebsite?.trim() || undefined,
      status: "New" as const,
      createdAt: new Date().toISOString(),
      notes: "Submitted via client booking system.",
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
