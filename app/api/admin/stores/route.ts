import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError, orderBySort } from "@/lib/admin-utils";
import { boolValue, formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET() {
  return Response.json(await prisma.store.findMany({ orderBy: orderBySort() }));
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const form = await req.formData();
    const name = formValue(form, "name", "New Store");
    const logoUrl = await saveUploadedFile(form.get("logoUrl") as File | null, "stores");
    const total = await prisma.store.count();

    return Response.json(
      await prisma.store.create({
        data: {
          name,
          slug: formValue(form, "slug", slugify(name)),
          description: formValue(form, "description", ""),
          category: formValue(form, "category", "Fashion"),
          website: formValue(form, "website", "#"),
          logoText: formValue(form, "logoText", name.slice(0, 2).toUpperCase()),
          logoUrl,
          rating: numberValue(form, "rating", 4.5),
          couponCount: numberValue(form, "couponCount", 0),
          featured: boolValue(form, "featured", false),
          sortOrder: numberValue(form, "sortOrder", total + 1),
        },
      })
    );
  } catch (error) {
    return apiError(error);
  }
}
