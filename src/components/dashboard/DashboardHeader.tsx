"use client";

import { useRouter } from "next/navigation";
import { LogOut, Loader2, UserCircle2, Bell } from "lucide-react";
import { useState } from "react";

export default function DashboardHeader({
  name,
  username,
}: {
  name: string;
  username: string;
}) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="hidden lg:flex sticky top-0 z-20 h-16 items-center justify-between px-6 bg-white border-b border-slate-200">
      <div>
        <h1 className="text-base font-bold text-slate-900">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-[11px] text-slate-500">
          Allahmalik Hospital & Diagnostic Center — বরগুনা
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="flex items-center gap-2.5">
            <UserCircle2 className="w-9 h-9 text-emerald-600" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">{name}</p>
              <p className="text-[11px] text-slate-500">@{username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors disabled:opacity-60"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>লগআউট</span>
          </button>
        </div>
      </div>
    </header>
  );
}
