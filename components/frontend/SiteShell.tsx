"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
