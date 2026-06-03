export default function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return <section className="bg-gradient-to-br from-orange-50 via-teal-50 to-amber-100 px-4 py-16"><div className="mx-auto max-w-7xl"><p className="font-black text-orange-500">{label}</p><h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight text-slate-950 md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{text}</p></div></section>;
}
