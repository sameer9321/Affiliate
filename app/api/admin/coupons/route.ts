import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { apiError, orderBySort } from "@/lib/admin-utils";
import { boolValue, formValue, numberValue } from "@/lib/upload";

export async function GET() {
  return Response.json(await prisma.coupon.findMany({ orderBy: orderBySort() }));
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const form = await req.formData();
    const store = formValue(form, "store", "");
    const total = await prisma.coupon.count({ where: { store } });
    return Response.json(
      await prisma.coupon.create({
        data: {
          title: formValue(form, "title", "New Coupon"),
          description: formValue(form, "description", ""),
          store,
          storeUrl: formValue(form, "storeUrl", ""),
          category: formValue(form, "category", ""),
          code: formValue(form, "code", "No Code Needed"),
          type: formValue(form, "type", "Code"),
          discount: formValue(form, "discount", "Special Offer"),
          expiry: formValue(form, "expiry", "Limited Time"),
          verified: boolValue(form, "verified", true),
          featured: boolValue(form, "featured", false),
          clicks: numberValue(form, "clicks", 0),
          sortOrder: numberValue(form, "sortOrder", total + 1),
        },
      })
    );
  } catch (error) {
    return apiError(error);
  }
}
