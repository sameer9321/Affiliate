import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { apiError, orderBySort } from "@/lib/admin-utils";
import { formValue, numberValue, saveUploadedFile } from "@/lib/upload";

export async function GET() {
  return Response.json(await prisma.blog.findMany({ orderBy: orderBySort() }));
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const form = await req.formData();
    const title = formValue(form, "title", "New Blog");
    const content = formValue(form, "content", "");
    const imageUrl = await saveUploadedFile(form.get("imageUrl") as File | null, "blogs");
    const total = await prisma.blog.count();

    return Response.json(
      await prisma.blog.create({
        data: {
          title,
          slug: formValue(form, "slug", slugify(title)),
          excerpt: formValue(form, "excerpt", content.slice(0, 160)),
          content,
          date: formValue(form, "date", new Date().toLocaleDateString()),
          category: formValue(form, "category", "Shopping Guide"),
          readTime: formValue(form, "readTime", "4 min read"),
          imageUrl,
          sortOrder: numberValue(form, "sortOrder", total + 1),
        },
      })
    );
  } catch (error) {
    return apiError(error);
  }
}
