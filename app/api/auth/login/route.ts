import bcrypt from "bcryptjs";
import { createAdminToken, setAdminCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@savingtrendz.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const emailOk = String(email).toLowerCase() === adminEmail.toLowerCase();
  const passwordOk = adminPasswordHash ? await bcrypt.compare(String(password), adminPasswordHash) : String(password) === adminPassword;

  if (!emailOk || !passwordOk) return Response.json({ error: "Invalid email or password" }, { status: 401 });
  await setAdminCookie(createAdminToken(adminEmail));
  return Response.json({ ok: true });
}
