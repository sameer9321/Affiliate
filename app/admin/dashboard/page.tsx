export const dynamic = "force-dynamic";

import AdminCard from "@/components/admin/AdminCard";
import { prisma } from "@/lib/prisma";
import { BadgePercent, Folder, Newspaper, Store, TrendingUp, ShieldCheck } from "lucide-react";

export default async function Dashboard() {
  const [stores, coupons, categories, blogs] = await Promise.all([
    prisma.store.count(),
    prisma.coupon.count(),
    prisma.category.count(),
    prisma.blog.count(),
  ]);

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-[34px] bg-slate-950 p-8 text-white shadow-xl md:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-300">Saving Trendz Admin</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Dashboard Overview</h1>
          <p className="mt-4 text-slate-300">
            Manage your affiliate stores, coupons, categories and saving guide blogs from one clean production dashboard.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminCard icon={Store} title="Stores" value={String(stores)} description="Affiliate store partners" />
        <AdminCard icon={BadgePercent} title="Coupons" value={String(coupons)} description="Active promo codes" />
        <AdminCard icon={Folder} title="Categories" value={String(categories)} description="Shopping categories" />
        <AdminCard icon={Newspaper} title="Blogs" value={String(blogs)} description="Saving guide posts" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <TrendingUp size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Production Ready</h2>
              <p className="text-sm font-semibold text-slate-500">Connected with Neon PostgreSQL</p>
            </div>
          </div>
          <p className="leading-7 text-slate-600">
            Stores, coupons, categories and blogs now save directly in the database. Admin APIs are protected by HTTP-only signed cookies for safer dashboard access.
          </p>
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Quick Status</h2>
              <p className="text-sm font-semibold text-slate-500">Admin system health</p>
            </div>
          </div>
          <div className="space-y-3 text-sm font-bold text-slate-600">
            <p className="flex justify-between rounded-2xl bg-slate-50 p-4"><span>Database</span><span className="text-teal-700">Active</span></p>
            <p className="flex justify-between rounded-2xl bg-slate-50 p-4"><span>Authentication</span><span className="text-teal-700">Protected</span></p>
            <p className="flex justify-between rounded-2xl bg-slate-50 p-4"><span>Dashboard UI</span><span className="text-orange-500">Updated</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
