"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Hospital,
  LayoutDashboard,
  UserPlus,
  LogOut,
  Menu,
  X,
  Loader2,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * Active-state rules (only ONE item is ever active):
   * - ড্যাশবোর্ড: /dashboard itself + all doctor overview/edit routes
   * - নতুন ডাক্তার যোগ: only /dashboard/doctors/new
   */
  const isNewDoctorRoute = pathname === "/dashboard/doctors/new";
  const isDashboardRoute =
    pathname === "/dashboard" ||
    (pathname.startsWith("/dashboard/doctors/") && !isNewDoctorRoute);

  const navLinks = [
    {
      name: "ড্যাশবোর্ড",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: isDashboardRoute,
    },
    {
      name: "নতুন ডাক্তার যোগ",
      href: "/dashboard/doctors/new",
      icon: UserPlus,
      active: isNewDoctorRoute,
    },
  ];

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

  const navContent = (
    <>
      {/* Brand — links back to the public website */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2.5 group" title="ওয়েবসাইটে ফিরে যান">
          <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-sm group-hover:bg-emerald-500 transition-colors">
            <Hospital className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900 block leading-tight">
              Allahmalik<span className="text-emerald-600">.</span>
            </span>
            <span className="text-[10px] font-medium text-emerald-600 tracking-wider uppercase block">
              Admin Panel
            </span>
          </div>
        </Link>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                link.active
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 ${link.active ? "text-emerald-600" : "text-slate-400"}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60 border border-transparent transition-colors"
        >
          {isLoggingOut ? (
            <Loader2 className="w-4.5 h-4.5 animate-spin" />
          ) : (
            <LogOut className="w-4.5 h-4.5" />
          )}
          <span>লগআউট</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-slate-200 h-14 flex items-center px-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <Link href="/" className="ml-3 font-bold text-slate-900" title="ওয়েবসাইটে ফিরে যান">
          Allahmalik<span className="text-emerald-600">.</span>
          <span className="text-[10px] text-emerald-600 font-semibold tracking-wider uppercase ml-2">
            Admin
          </span>
        </Link>
      </div>

      {/* Spacer for mobile top bar */}
      <div className="lg:hidden h-14" />

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-white border-r border-slate-200 sticky top-0 h-screen">
        {navContent}
      </aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-72 max-w-[85%] bg-white shadow-2xl h-full">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
