export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CouponCard from "@/components/frontend/CouponCard";
import { prisma } from "@/lib/prisma";

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = (await prisma.store.findUnique({ where: { slug } })) as any;
  if (!store) notFound();

  const coupons = await prisma.coupon.findMany({ where: { store: store.name }, orderBy: [{ sortOrder: "asc" }, { featured: "desc" }] });

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-[2rem] bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-teal-50 text-2xl font-black text-teal-700">
              {store.logoUrl ? <Image src={store.logoUrl} alt={store.name} width={80} height={80} className="h-full w-full object-cover" /> : store.logoText}
            </div>
            <h1 className="mt-5 text-5xl font-black">{store.name}</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">{store.description}</p>
            <p className="mt-3 text-sm font-black text-orange-500">{store.category} • Rating {store.rating}</p>
          </div>
          <Link href={store.website} target="_blank" className="rounded-2xl bg-teal-700 px-6 py-4 text-center font-black text-white">Visit Store</Link>
        </div>
      </div>
      <h2 className="mt-12 text-3xl font-black">{store.name} Coupons</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">{coupons.map((coupon) => <CouponCard key={coupon.id} {...coupon} />)}</div>
    </main>
  );
}
