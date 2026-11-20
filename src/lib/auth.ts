import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "akshaj_studio_secure_jwt_secret_key_2026";

export function generateAdminToken(email: string): string {
  const payload = {
    email,
    role: "admin",
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const basePayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(basePayload)
    .digest("base64url");
  return `${basePayload}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  if (!token || !token.includes(".")) return false;
  const [basePayload, signature] = token.split(".");
  if (!basePayload || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(basePayload)
    .digest("base64url");

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(basePayload, "base64url").toString());
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}
