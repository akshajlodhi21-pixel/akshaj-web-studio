import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";
import { generateId } from "@/lib/utils";

// RFC 5322 Compliant Email Validation Regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body.fullName || body.name || "").trim();
    const email = (body.email || "").trim();
    const subject = (body.subject || "").trim();
    const message = (body.message || "").trim();
    const phone = (body.phone || body.phoneNumber || "").trim();

    // 1. Validation: Full Name
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    // 2. Validation: Email Address & Format
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address (e.g. name@example.com)." },
        { status: 400 }
      );
    }

    // 3. Validation: Subject
    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { error: "Please provide a subject line (minimum 3 characters)." },
        { status: 400 }
      );
    }

    // 4. Validation: Message
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Please write your message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const messageId = generateId("AWS-MSG");

    // Secure server-side dispatch to official email akshajlodhi21@gmail.com
    const emailResult = await sendContactFormEmail({
      messageId,
      name,
      email,
      subject,
      message,
      phone: phone || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        messageId,
        message: "Your message has been sent successfully to akshajlodhi21@gmail.com. Akshaj Lodhi will respond within 24 hours.",
        status: emailResult.message,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Server API Error in /api/contact:", error);
    return NextResponse.json(
      { error: "Failed to dispatch message due to server error. Please try again or email akshajlodhi21@gmail.com directly." },
      { status: 500 }
    );
  }
}
