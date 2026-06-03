import type { LucideIcon } from "lucide-react";

export default function AdminCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-orange-100 transition group-hover:bg-teal-100" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">{value}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-500">{description}</p>
        </div>
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}
