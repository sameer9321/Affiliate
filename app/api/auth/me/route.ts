import { isAdminRequest } from "@/lib/auth";
export async function GET() { return Response.json({ admin: await isAdminRequest() }); }
