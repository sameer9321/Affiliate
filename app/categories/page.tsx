export const dynamic = "force-dynamic";

import CategoryCard from "@/components/frontend/CategoryCard";
import { prisma } from "@/lib/prisma";
export default async function CategoriesPage(){const categories=await prisma.category.findMany({orderBy:[{ sortOrder: "asc" }, { createdAt: "asc" }]});return <main className="mx-auto max-w-7xl px-4 py-16"><p className="font-black text-orange-500">Shop By Category</p><h1 className="mt-2 text-5xl font-black text-slate-950">All Saving Categories</h1><p className="mt-4 max-w-3xl text-slate-600">Browse real shopping categories and discover affiliate coupons, direct deals and verified promo codes.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{categories.map(c=><CategoryCard key={c.id} {...c}/>)}</div></main>}
