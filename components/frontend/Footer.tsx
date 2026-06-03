import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div><h2 className="text-3xl font-black">Saving Trendz</h2><p className="mt-4 text-sm leading-6 text-slate-400">Saving Trendz helps shoppers discover verified coupons, promo codes and affiliate offers from trusted online stores.</p></div>
        <div><h3 className="font-black">Quick Links</h3><ul className="mt-4 space-y-3 text-sm text-slate-400"><li><Link href="/stores">Stores</Link></li><li><Link href="/coupons">Coupons</Link></li><li><Link href="/categories">Categories</Link></li><li><Link href="/blogs">Blogs</Link></li></ul></div>
        <div><h3 className="font-black">Company</h3><ul className="mt-4 space-y-3 text-sm text-slate-400"><li><Link href="/about">About Us</Link></li><li><Link href="/contact">Contact</Link></li><li><Link href="/privacy-policy">Privacy Policy</Link></li><li><Link href="/terms-and-conditions">Terms & Conditions</Link></li></ul></div>
        <div><h3 className="font-black">Deal Alerts</h3><p className="mt-4 text-sm leading-6 text-slate-400">Subscribe to get weekly coupon roundups and exclusive shopping tips.</p><div className="mt-4 flex rounded-xl bg-white p-1"><input className="min-w-0 flex-1 px-3 text-sm text-slate-950 outline-none" placeholder="Email"/><button className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-black">Join</button></div></div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">© 2026 Saving Trendz. All rights reserved.</div>
    </footer>
  );
}
