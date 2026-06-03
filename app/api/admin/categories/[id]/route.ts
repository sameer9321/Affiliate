import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError } from "@/lib/admin-utils";
import { formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.category.findUnique({ where: { id } });
  return data ? Response.json(data) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const current = (await prisma.category.findUnique({ where: { id } })) as any;
    const form = await req.formData();
    const name = formValue(form, "name", current?.name || "Category");
    const uploaded = await saveUploadedFile(form.get("imageUrl") as File | null, "categories");

    return Response.json(
      await prisma.category.update({
        where: { id },
        data: {
          name,
          slug: formValue(form, "slug", current?.slug || slugify(name)),
          icon: formValue(form, "icon", current?.icon || "🏷️"),
          imageUrl: uploaded || current?.imageUrl || "",
          description: formValue(form, "description", current?.description || ""),
          deals: numberValue(form, "deals", current?.deals || 0),
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
  await prisma.category.delete({ where: { id } });
  return Response.json({ ok: true });
}
