import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiError } from "@/lib/admin-utils";
import { boolValue, formValue, numberValue } from "@/lib/upload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.coupon.findUnique({ where: { id } });
  return data ? Response.json(data) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const current = (await prisma.coupon.findUnique({ where: { id } })) as any;
    const form = await req.formData();

    return Response.json(
      await prisma.coupon.update({
        where: { id },
        data: {
          title: formValue(form, "title", current?.title || "Coupon"),
          description: formValue(form, "description", current?.description || ""),
          store: formValue(form, "store", current?.store || ""),
          storeUrl: formValue(form, "storeUrl", current?.storeUrl || ""),
          category: formValue(form, "category", current?.category || ""),
          code: formValue(form, "code", current?.code || "No Code Needed"),
          type: formValue(form, "type", current?.type || "Code"),
          discount: formValue(form, "discount", current?.discount || "Special Offer"),
          expiry: formValue(form, "expiry", current?.expiry || "Limited Time"),
          verified: boolValue(form, "verified", current?.verified ?? true),
          featured: boolValue(form, "featured", current?.featured || false),
          clicks: numberValue(form, "clicks", current?.clicks || 0),
          sortOrder: numberValue(form, "sortOrder", current?.sortOrder || 0),
        },
      })
    );
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await params;
  await prisma.coupon.delete({ where: { id } });
  return Response.json({ ok: true });
}
