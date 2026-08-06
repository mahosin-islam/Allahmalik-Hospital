"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Menu,
  X,
  Hospital,
  MapPin,
  Clock,
  Megaphone,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    {
      name: "Specialties",
      hasDropdown: true,
      subItems: [
        { name: "Gynecology & Obstetrics", href: "/specialties/gynecology" },
        { name: "Orthopedics & Trauma", href: "/specialties/orthopedics" },
        { name: "Cardiology", href: "/specialties/cardiology" },
        { name: "Gastroenterology", href: "/specialties/gastroenterology" },
        { name: "Medicine & Diabetology", href: "/specialties/medicine" },
        { name: "Pediatrics & Neonatology", href: "/specialties/pediatrics" },
        { name: "Urology", href: "/specialties/urology" },
        { name: "ENT (Ear, Nose, Throat)", href: "/specialties/ent" },
        { name: "Neurology", href: "/specialties/neurology" },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === name ? null : name);
  };

  return (
    <>
      {/* 🔴 TOP NOTICE BAR */}
      <div className="bg-emerald-900 text-slate-100 text-xs py-2 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-emerald-100/90 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Hospital Road, Barguna Sadar, Barguna</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>24/7 Open Emergency & Lab</span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-hidden w-full md:w-1/2">
            <span className="flex items-center gap-1 bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded font-semibold text-[11px] shrink-0">
              <Megaphone className="w-3 h-3 text-amber-300 animate-bounce" /> Notice
            </span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <div className="inline-block animate-marquee pl-full text-[11px] sm:text-xs">
                জরুরি প্রয়োজনে ২৪ ঘণ্টা ডাক্তার ও ডায়াগনস্টিক সেবা পাবেন। হটলাইন: ০১৭০০-০০০০০০।
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 MAIN NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 lg:gap-2.5 group shrink-0">
              <div className="bg-emerald-600 text-white p-2 md:p-2.5 rounded-xl shadow-md group-hover:bg-emerald-700 transition-colors">
                <Hospital className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold tracking-tight text-slate-800 block leading-tight">
                  Allahmalik<span className="text-emerald-600">.</span>
                </span>
                <span className="text-[10px] md:text-xs font-medium text-slate-500 tracking-wider uppercase block">
                  Hospital & Diagnostic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (md & lg adjustments) */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="relative group py-6 cursor-pointer">
                    <div className="flex items-center gap-1 text-sm lg:text-base font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-slate-500 group-hover:text-emerald-600 transition-transform group-hover:rotate-180" />
                    </div>

                    {/* Floating Dropdown Card */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block w-60 lg:w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 p-2.5 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                      <div className="flex flex-col gap-0.5">
                        {link.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-3.5 py-2 text-xs lg:text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all duration-150"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href!}
                    className="text-sm lg:text-base font-semibold text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* Emergency Call Button */}
            <div className="hidden md:flex items-center shrink-0">
              <a
                href="tel:+8801700000000"
                className="inline-flex items-center gap-1.5 lg:gap-2 px-3 py-2 lg:px-4 lg:py-2.5 bg-emerald-600 text-white rounded-xl text-xs lg:text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 lg:w-4 lg:h-4 animate-pulse shrink-0" />
                <span className="hidden lg:inline">Emergency: +880 1700-000000</span>
                <span className="lg:hidden">Emergency</span>
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name}>
                  <button
                    onClick={() => toggleMobileDropdown(link.name)}
                    className="flex items-center justify-between w-full py-2 text-base font-semibold text-slate-700 hover:text-emerald-600"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileDropdownOpen === link.name ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>

                  {mobileDropdownOpen === link.name && (
                    <div className="pl-4 py-1 space-y-1 border-l-2 border-emerald-100 my-1">
                      {link.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-sm font-medium text-slate-600 hover:text-emerald-600"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href!}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-base font-semibold text-slate-700 hover:text-emerald-600"
                >
                  {link.name}
                </Link>
              )
            )}

            <a
              href="tel:+8801700000000"
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Emergency Call</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}