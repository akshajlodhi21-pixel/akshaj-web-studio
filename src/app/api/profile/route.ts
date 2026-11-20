import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyAdminToken } from "@/lib/auth";
import { initialProfile } from "@/lib/data";

const DATA_DIR = path.join(process.cwd(), "data");
const PROFILE_FILE = path.join(DATA_DIR, "profile.json");

async function getStoredProfile() {
  try {
    const content = await readFile(PROFILE_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return initialProfile;
  }
}

async function saveStoredProfile(profile: any) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(PROFILE_FILE, JSON.stringify(profile, null, 2), "utf-8");
}

export async function GET() {
  try {
    const profile = await getStoredProfile();
    return NextResponse.json({ success: true, profile });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch profile." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const cookieToken = req.cookies.get("aws_admin_session")?.value;
    const token = authHeader?.replace("Bearer ", "") || cookieToken;

    // Verify admin authentication
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized. Valid administrator session required to update profile." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const current = await getStoredProfile();
    const updated = { ...current, ...body };

    await saveStoredProfile(updated);

    return NextResponse.json({
      success: true,
      message: "Profile permanently persisted to server storage.",
      profile: updated,
    });
  } catch (error: any) {
    console.error("Profile API save error:", error);
    return NextResponse.json(
      { error: "Failed to persist profile data." },
      { status: 500 }
    );
  }
}
