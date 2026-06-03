export const dynamic = "force-dynamic";

import BlogCards from "@/components/frontend/BlogCards";
import { prisma } from "@/lib/prisma";

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  const safeBlogs = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    category: blog.category,
    content: blog.content,
    excerpt: blog.excerpt,
    imageUrl: blog.imageUrl,
    date: blog.date,
    readTime: blog.readTime,
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <p className="font-black text-orange-500">Shopping Guides</p>
      <h1 className="mt-2 text-5xl font-black text-slate-950">Saving Trendz Blog</h1>
      <div className="mt-8">
        <BlogCards blogs={safeBlogs} />
      </div>
    </main>
  );
}
