import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import { hasAnyUsers } from "@/lib/services/userService";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Registration",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RegisterPage() {
  const registrationClosed = await hasAnyUsers();

  if (registrationClosed) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full text-center space-y-6 relative z-10">
          <div className="inline-flex p-4 bg-emerald-950/60 border border-emerald-900/50 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">রেজিস্ট্রেশন বন্ধ</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            প্রথম অ্যাডমিন অ্যাকাউন্ট ইতিমধ্যে তৈরি হয়েছে। নিরাপত্তার জন্য নতুন রেজিস্ট্রেশন বন্ধ
            করা হয়েছে।
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-sm transition-colors"
          >
            <Lock className="w-4 h-4" />
            লগইন পেজে যান
          </Link>
        </div>
      </main>
    );
  }

  return <RegisterForm />;
}
