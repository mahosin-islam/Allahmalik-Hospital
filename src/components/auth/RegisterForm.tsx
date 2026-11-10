"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Hospital,
  Lock,
  Mail,
  Loader2,
  ShieldAlert,
  UserPlus,
  User,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/login?registered=1");
    } catch {
      setError("সার্ভারে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 transition-colors";

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Ambient background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-600/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-600/30">
              <Hospital className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-tight text-white block">
                Allahmalik<span className="text-emerald-500">.</span>
              </span>
              <span className="text-[10px] font-medium text-emerald-400 tracking-wider uppercase block">
                Hospital Admin Panel
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">অ্যাডমিন রেজিস্ট্রেশন</h1>
          <p className="text-sm text-slate-400 mt-1.5">
            নাম, ইমেইল ও পাসওয়ার্ড দিয়ে অ্যাডমিন অ্যাকাউন্ট তৈরি করুন
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-900/50 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-2">
                পূর্ণ নাম
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Hasan"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-2">
                ইমেইল
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="hasan@gmail.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300 mb-2">
                পাসওয়ার্ড (৮+ অক্ষর)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>অ্যাকাউন্ট তৈরি করুন</span>
                </>
              )}
            </button>
          </form>

          {/* Link to Login */}
          <p className="text-center text-xs text-slate-400 mt-6">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/login"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              লগইন করুন
            </Link>
          </p>
        </div>

        <p className="text-center text-[11px] text-slate-600 mt-6">
          প্রথম অ্যাডমিন তৈরি হওয়ার পর এই রেজিস্ট্রেশন স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে
        </p>
      </div>
    </main>
  );
}
