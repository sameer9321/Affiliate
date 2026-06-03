"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  date?: string | null;
  readTime?: string | null;
};

export default function BlogCards({ blogs, compact = false }: { blogs: Blog[]; compact?: boolean }) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!selectedBlog) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedBlog]);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.id} className="overflow-hidden rounded-3xl bg-white shadow-sm">
            {blog.imageUrl ? (
              <Image src={blog.imageUrl} alt={blog.title} width={800} height={420} className="h-48 w-full object-cover" />
            ) : null}
            <div className={compact ? "p-6" : "p-6"}>
              <p className="text-sm font-black text-orange-500">
                {blog.category}
                {blog.readTime ? ` • ${blog.readTime}` : ""}
              </p>
              <h3 className="mt-3 text-2xl font-black text-slate-950">{blog.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {blog.excerpt || blog.content.slice(0, compact ? 130 : 160)}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs font-bold text-slate-400">{blog.date}</p>
                <button
                  type="button"
                  onClick={() => setSelectedBlog(blog)}
                  className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-black text-teal-700 transition hover:bg-teal-700 hover:text-white"
                >
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedBlog ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedBlog(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-slate-950 hover:text-white"
              aria-label="Close blog popup"
            >
              <X size={20} />
            </button>

            {selectedBlog.imageUrl ? (
              <Image
                src={selectedBlog.imageUrl}
                alt={selectedBlog.title}
                width={1100}
                height={520}
                className="h-64 w-full rounded-t-[2rem] object-cover md:h-80"
              />
            ) : null}

            <div className="p-6 md:p-9">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">
                {selectedBlog.category}
                {selectedBlog.readTime ? ` • ${selectedBlog.readTime}` : ""}
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">{selectedBlog.title}</h2>
              {selectedBlog.date ? <p className="mt-3 text-sm font-bold text-slate-400">{selectedBlog.date}</p> : null}
              <div className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">{selectedBlog.content}</div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
