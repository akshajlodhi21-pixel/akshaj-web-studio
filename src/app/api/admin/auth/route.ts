import { NextRequest, NextResponse } from "next/server";
import { generateAdminToken, verifyAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const masterEmail =
      process.env.ADMIN_EMAIL ||
      process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      "admin@akshajwebstudio.com";
    const masterPassword =
      process.env.ADMIN_PASSWORD ||
      process.env.NEXT_PUBLIC_ADMIN_PASSWORD ||
      "AkshajStudio@2026";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const isValid =
      email.trim().toLowerCase() === masterEmail.trim().toLowerCase() &&
      password === masterPassword;

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid administrator credentials. Access denied." },
        { status: 401 }
      );
    }

    const token = generateAdminToken(email.trim().toLowerCase());

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      token,
      admin: {
        email: masterEmail,
        role: "SuperAdmin",
        studio: "AKSHAJ WEB STUDIO",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set("aws_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Admin Auth API error:", error);
    return NextResponse.json(
      { error: "Internal authentication error." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cookieToken = req.cookies.get("aws_admin_session")?.value;
  const token = authHeader?.replace("Bearer ", "") || cookieToken;

  if (token && verifyAdminToken(token)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
