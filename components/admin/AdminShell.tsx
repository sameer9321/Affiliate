"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <section className="min-h-screen bg-[#f7f7fb] text-slate-950">
      <AdminSidebar />
      <main className="min-h-screen p-4 pb-10 lg:ml-80 lg:p-8">
        <div className="mx-auto w-full max-w-[1500px]">{children}</div>
      </main>
    </section>
  );
}
