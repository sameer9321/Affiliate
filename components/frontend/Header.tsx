"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    ["Home", "/"],
    ["Stores", "/stores"],
    ["Coupons", "/coupons"],
    ["Categories", "/categories"],
    ["Blogs", "/blogs"],
    ["About", "/about"],
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#fff7ed]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg">
            <ShoppingBag size={23} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-950">Saving Trendz</h1>
            <p className="text-xs font-black text-orange-500">Smart Deals Daily</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-black text-slate-700 lg:flex">
          {links.map(([name, href]) => (
            <Link key={href} href={href} className="transition hover:text-orange-500">
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/coupons"
            className="hidden items-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-teal-800 md:flex"
          >
            <Search size={17} /> Search Deals
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg transition hover:bg-orange-500 lg:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-orange-100 bg-white/95 px-4 py-4 shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-black text-slate-700">
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl px-4 py-3 transition hover:bg-orange-50 hover:text-orange-500"
              >
                {name}
              </Link>
            ))}
            <Link
              href="/coupons"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal-700 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:bg-teal-800"
            >
              <Search size={17} /> Search Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
