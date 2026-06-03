import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError } from "@/lib/admin-utils";
import { boolValue, formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.store.findUnique({ where: { id } });
  return data ? Response.json(data) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const current = (await prisma.store.findUnique({ where: { id } })) as any;
    const form = await req.formData();
    const name = formValue(form, "name", current?.name || "Store");
    const uploaded = await saveUploadedFile(form.get("logoUrl") as File | null, "stores");

    return Response.json(
      await prisma.store.update({
        where: { id },
        data: {
          name,
          slug: formValue(form, "slug", current?.slug || slugify(name)),
          description: formValue(form, "description", current?.description || ""),
          category: formValue(form, "category", current?.category || "Fashion"),
          website: formValue(form, "website", current?.website || "#"),
          logoText: formValue(form, "logoText", current?.logoText || name.slice(0, 2).toUpperCase()),
          logoUrl: uploaded || current?.logoUrl || "",
          rating: numberValue(form, "rating", current?.rating || 4.5),
          couponCount: numberValue(form, "couponCount", current?.couponCount || 0),
          featured: boolValue(form, "featured", current?.featured || false),
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
  await prisma.store.delete({ where: { id } });
  return Response.json({ ok: true });
}
