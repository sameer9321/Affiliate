"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (pathname === "/admin/login") { setReady(true); return; }
    fetch("/api/auth/me").then(r => r.json()).then(data => {
      if (!data.admin) router.replace("/admin/login"); else setReady(true);
    }).catch(() => router.replace("/admin/login"));
  }, [router, pathname]);
  if (!ready) return <div className="min-h-screen p-10 text-center font-black">Checking admin access...</div>;
  return <>{children}</>;
}
