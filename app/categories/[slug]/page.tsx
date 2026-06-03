export const dynamic = "force-dynamic";

import CouponCard from "@/components/frontend/CouponCard";
import StoreCard from "@/components/frontend/StoreCard";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }){const {slug}=await params; const category=await prisma.category.findUnique({where:{slug}}); if(!category) notFound(); const [stores,coupons]=await Promise.all([prisma.store.findMany({where:{category:category.name},orderBy:[{ sortOrder: "asc" }, { createdAt: "desc" }],take:8}),prisma.coupon.findMany({where:{category:category.name},orderBy:[{ sortOrder: "asc" }, { createdAt: "desc" }],take:9})]); return <main className="mx-auto max-w-7xl px-4 py-16"><p className="text-5xl">{category.icon}</p><h1 className="mt-4 text-5xl font-black">{category.name} Deals</h1><p className="mt-4 max-w-3xl text-slate-600">{category.description}</p><h2 className="mt-12 text-3xl font-black">Stores</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{stores.map(s=><StoreCard key={s.id} {...s}/>)}</div><h2 className="mt-12 text-3xl font-black">Coupons</h2><div className="mt-6 grid gap-6 lg:grid-cols-3">{coupons.map(c=><CouponCard key={c.id} {...c}/>)}</div></main>}
