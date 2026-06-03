import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "saving_trendz_admin";

function secret() {
  return process.env.AUTH_SECRET || "change-this-secret-before-production";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function createAdminToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, role: "admin", exp: Date.now() + 1000 * 60 * 60 * 24 * 7 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token?: string) {
  if (!token || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.role === "admin" && data.exp > Date.now();
  } catch { return false; }
}

export async function isAdminRequest() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAdmin() {
  if (!(await isAdminRequest())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}
