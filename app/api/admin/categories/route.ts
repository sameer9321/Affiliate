import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError, orderBySort } from "@/lib/admin-utils";
import { formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET() {
  return Response.json(await prisma.category.findMany({ orderBy: orderBySort() }));
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const form = await req.formData();
    const name = formValue(form, "name", "New Category");
    const imageUrl = await saveUploadedFile(form.get("imageUrl") as File | null, "categories");
    const total = await prisma.category.count();

    return Response.json(
      await prisma.category.create({
        data: {
          name,
          slug: formValue(form, "slug", slugify(name)),
          icon: formValue(form, "icon", "🏷️"),
          imageUrl,
          description: formValue(form, "description", ""),
          deals: numberValue(form, "deals", 0),
          sortOrder: numberValue(form, "sortOrder", total + 1),
        },
      })
    );
  } catch (error) {
    return apiError(error);
  }
}
