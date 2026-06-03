import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError } from "@/lib/admin-utils";
import { formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.blog.findUnique({ where: { id } });
  return data ? Response.json(data) : Response.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const current = (await prisma.blog.findUnique({ where: { id } })) as any;
    const form = await req.formData();
    const title = formValue(form, "title", current?.title || "Blog");
    const content = formValue(form, "content", current?.content || "");
    const uploaded = await saveUploadedFile(form.get("imageUrl") as File | null, "blogs");

    return Response.json(
      await prisma.blog.update({
        where: { id },
        data: {
          title,
          slug: formValue(form, "slug", current?.slug || slugify(title)),
          excerpt: formValue(form, "excerpt", current?.excerpt || content.slice(0, 160)),
          content,
          date: formValue(form, "date", current?.date || new Date().toLocaleDateString()),
          category: formValue(form, "category", current?.category || "Shopping Guide"),
          readTime: formValue(form, "readTime", current?.readTime || "4 min read"),
          imageUrl: uploaded || current?.imageUrl || "",
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
  await prisma.blog.delete({ where: { id } });
  return Response.json({ ok: true });
}
