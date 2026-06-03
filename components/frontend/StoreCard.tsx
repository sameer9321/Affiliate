import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type StoreCardProps = { name:string; slug:string; description:string; category:string; logoText:string; logoUrl?:string; rating:number; couponCount:number; featured:boolean };
export default function StoreCard({ name, slug, description, category, logoText, logoUrl, rating, couponCount, featured }: StoreCardProps) {
  return <div className="group rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-start justify-between">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-teal-50 text-2xl font-black text-teal-700">
        {logoUrl ? <Image src={logoUrl} alt={name} width={80} height={80} className="h-full w-full object-cover" /> : logoText}
      </div>
      {featured && <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600">Featured</span>}
    </div>
    <h3 className="mt-5 text-xl font-black text-slate-950">{name}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{description}</p>
    <div className="mt-5 flex items-center justify-between text-sm"><span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-600">{category}</span><span className="flex items-center gap-1 font-black text-amber-500"><Star size={15} fill="currentColor"/> {rating}</span></div>
    <Link href={`/stores/${slug}`} className="mt-5 block rounded-2xl bg-teal-700 px-5 py-3 text-center text-sm font-black text-white transition group-hover:bg-orange-500">View {couponCount} Coupons</Link>
  </div>;
}
