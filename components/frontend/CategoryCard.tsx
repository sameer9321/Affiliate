import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = { name:string; slug:string; icon:string; imageUrl?:string; description:string; deals:number };
export default function CategoryCard({ name, slug, icon, imageUrl, description, deals }: CategoryCardProps) {
  return <Link href={`/categories/${slug}`} className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    {imageUrl && <Image src={imageUrl} alt={name} width={715} height={400} className="h-36 w-full object-cover" />}
    <div className="p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl transition group-hover:bg-orange-500">{icon}</div>
      <h3 className="mt-5 text-xl font-black text-slate-950">{name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <p className="mt-4 text-sm font-black text-teal-700">{deals}+ deals available</p>
    </div>
  </Link>;
}
