"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Invalid admin email or password");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <Link href="/" className="mx-auto mb-8 flex max-w-md items-center gap-2 text-sm font-black text-slate-300 hover:text-orange-300">
        <ArrowLeft size={17} />
        Back to website
      </Link>

      <div className="mx-auto max-w-md overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-orange-400 text-white shadow-lg">
          <ShoppingBag size={30} />
        </div>

        <h1 className="mt-6 text-center text-4xl font-black tracking-tight">Admin Login</h1>
        <p className="mt-3 text-center text-sm leading-6 text-slate-400">
          Access the Saving Trendz admin dashboard to manage stores, coupons, categories and blogs.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 font-semibold text-white outline-none placeholder:text-slate-400 focus:border-orange-300"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 font-semibold text-white outline-none placeholder:text-slate-400 focus:border-orange-300"
          />
          {error && <p className="rounded-2xl bg-red-500/10 p-3 text-sm font-bold text-red-300">{error}</p>}
          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 to-orange-500 px-6 py-4 font-black text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60"
          >
            <LockKeyhole size={18} />
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
