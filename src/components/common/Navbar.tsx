"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneCall, Menu, X, Hospital, MapPin, Clock, Megaphone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Departments", href: "/departments" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* 🔴 1. TOP NOTICE & INFO BAR (এটি স্ক্রোল করলে উপরে চলে যাবে) */}
      <div className="bg-emerald-900 text-slate-100 text-xs py-2.5 px-4 border-b border-emerald-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Left Info: Location & Hours */}
          <div className="hidden sm:flex items-center gap-6 text-emerald-100/90">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hospital Road, Barguna Sadar, Barguna</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>24/7 Open Emergency & Lab</span>
            </div>
          </div>

          {/* Center: Running Emergency Marquee / Notice */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-1/2">
            <span className="flex items-center gap-1 bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded font-semibold text-[11px] shrink-0">
              <Megaphone className="w-3 h-3 text-amber-300 animate-bounce" /> Notice
            </span>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <div className="inline-block animate-marquee pl-full">
                জরুরি প্রয়োজনে ২৪ ঘণ্টা ডাক্তার ও ডায়াগনস্টিক সেবা পাবেন। হটলাইন: ০১৭০০-০০০০০০।
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🟢 2. MAIN NAVBAR (এটি স্ক্রিনের উপরে Sticky / Fixed হয়ে থাকবে) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md group-hover:bg-emerald-700 transition-colors">
                <Hospital className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-800 block">
                  Allahmalik<span className="text-emerald-600">.</span>
                </span>
                <span className="text-xs font-medium text-slate-500 tracking-wider uppercase block">
                  Hospital & Diagnostic
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Emergency Call Button */}
            <div className="hidden md:flex items-center">
              <a
                href="tel:+8801700000000"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-[1.02]"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>Emergency: +880 1700-000000</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-600"
              >
                {link.name}
              </Link>
            ))}
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