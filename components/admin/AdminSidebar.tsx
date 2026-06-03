"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgePercent,
  Folder,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Stores", href: "/admin/stores", icon: Store },
  { name: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { name: "Categories", href: "/admin/categories", icon: Folder },
  { name: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    localStorage.removeItem("saving-trendz-admin");
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);
    router.replace("/");
  }

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-400 text-white shadow-lg shadow-teal-950/20">
            <Home size={23} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-white">Saving Trendz</h2>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">Admin Panel</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-2xl bg-white/10 p-2 text-white lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <div className="my-7 h-px bg-white/10" />

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-black transition-all duration-300 ${
                active
                  ? "bg-white text-slate-950 shadow-lg shadow-black/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  active ? "bg-teal-600 text-white" : "bg-white/10 text-orange-300 group-hover:bg-white/15"
                }`}
              >
                <Icon size={18} />
              </span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4 pt-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
          <p className="text-sm font-black text-white">Admin Workspace</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">
            Manage stores, coupons, categories and blogs from one clean dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 text-sm font-black text-white shadow-lg shadow-red-950/20 transition hover:scale-[1.02]"
        >
          <LogOut size={18} />
          Logout & Go Website
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-slate-950 p-3 text-white"
        >
          <Menu size={22} />
        </button>
        <p className="font-black">Admin Panel</p>
        <button
          type="button"
          onClick={logout}
          className="rounded-2xl bg-orange-500 px-4 py-3 text-xs font-black text-white"
        >
          Logout
        </button>
      </div>

      <aside className="fixed inset-y-0 left-0 z-50 hidden w-80 border-r border-white/10 bg-slate-950 p-6 text-white lg:block">
        {SidebarContent}
      </aside>

      {open && (
        <div className="fixed inset-0 z-[999] bg-slate-950/70 backdrop-blur-sm lg:hidden">
          <aside className="h-full w-[86%] max-w-80 bg-slate-950 p-6 text-white shadow-2xl">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
