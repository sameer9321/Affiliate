"use client";
import { useState } from "react";
import { CheckCircle2, Copy, ExternalLink, Flame } from "lucide-react";

type CouponCardProps = { title:string; description?:string; store:string; storeUrl?:string; category?:string; code:string; type:string; discount:string; expiry:string; verified:boolean; featured:boolean };
export default function CouponCard({ title, description, store, storeUrl, category, code, type, discount, expiry, verified, featured }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  function copyCode() { if (code !== "No Code Needed") navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600); }
  return <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div className="mb-4 flex items-center justify-between gap-3"><span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">{store}</span>{featured && <span className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-600"><Flame size={13}/> Hot</span>}</div>
    <h3 className="text-lg font-black leading-7 text-slate-950">{title}</h3>
    {description && <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>}
    <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">{category && <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">{category}</span>}<span className="rounded-full bg-orange-100 px-3 py-1 text-orange-600">{discount}</span><span className="rounded-full bg-teal-100 px-3 py-1 text-teal-700">{type}</span></div>
    <p className="mt-4 text-sm font-medium text-slate-500">Expires: {expiry}</p>
    <div className="mt-5 flex items-center justify-between gap-3"><button onClick={copyCode} className="flex-1 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 px-4 py-3 text-sm font-black text-orange-600"><span className="inline-flex items-center gap-2"><Copy size={15}/>{copied ? "Copied!" : code}</span></button><a href={storeUrl || "#"} target="_blank" className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-black text-white"><ExternalLink size={16}/></a></div>
    {verified && <p className="mt-4 inline-flex items-center gap-1 text-xs font-black text-emerald-600"><CheckCircle2 size={14}/> Verified Coupon</p>}
  </div>;
}
