"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Hospital,
  Lock,
  User,
  Loader2,
  ShieldAlert,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginForm({
  initialError,
  registered,
}: {
  initialError: "forbidden" | null;
  registered: boolean;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError === "forbidden"
      ? "এই অ্যাকাউন্টের ড্যাশবোর্ড অ্যাক্সেস নেই। (No dashboard access for this account.)"
      : null
  );
  const [success] = useState<string | null>(
    registered ? "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! এখন লগইন করুন।" : null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        return;
      }

      router.replace("/dashboard");
    } catch {
      setError("সার্ভারে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full  blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full  blur-3xl" />

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
          <h1 className="text-2xl font-bold text-white">অ্যাডমিন লগইন</h1>
          <p className="text-sm text-slate-400 mt-1.5">
            ড্যাশবোর্ডে প্রবেশ করতে আপনার তথ্য দিন
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-900/50 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-900/50 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                ইউজারনেম / ইমেইল
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  placeholder="email"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
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
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>লগইন করুন</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-slate-600 mt-6">
          নিরাপদ এলাকা — শুধুমাত্র অনুমোদিত প্রশাসকদের জন্য
        </p>
      </div>
    </main>
  );
}