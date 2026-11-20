import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cookieToken = req.cookies.get("aws_admin_session")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required to upload files." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "profile";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Validate MIME type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed formats: JPEG, PNG, WebP, GIF, SVG." },
        { status: 400 }
      );
    }

    // Max 10MB size limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File exceeds 10MB size limit." },
        { status: 400 }
      );
    }

    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    const uploadDir = path.join(process.cwd(), "public", "uploads", sanitizedFolder);
    await mkdir(uploadDir, { recursive: true });

    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueName = `${Date.now()}-${cleanName}`;
    const filePath = path.join(uploadDir, uniqueName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${sanitizedFolder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueName,
      size: file.size,
      mimeType: file.type,
      message: "File permanently saved to persistent storage.",
    });
  } catch (error: any) {
    console.error("API Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error saving uploaded image." },
      { status: 500 }
    );
  }
}
