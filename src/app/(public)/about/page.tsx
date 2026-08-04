"use client";

import Image from "next/image";
import Link from "next/link";
import { Hospital, Award, Users, HeartPulse, CheckCircle2, PhoneCall } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { id: 1, name: "অভিজ্ঞ ডাক্তার ও বিশেষজ্ঞ", value: "২০+" },
    { id: 2, name: "সন্তুষ্ট রোগী", value: "৫০,০০০+" },
    { id: 3, name: "২৪/৭ জরুরি সেবা", value: "৩৬৫ দিন" },
    { id: 4, name: "আধুনিক টেস্ট ও ডায়াগনস্টিক", value: "১০০+" },
  ];

  const features = [
    "আধুনিক ও নির্ভুল ডিজিটাল ডায়াগনস্টিক ল্যাব",
    "অভিজ্ঞ ও বিশেষজ্ঞ সার্জন এবং চিকিৎসকমণ্ডলী",
    "২৪ ঘণ্টা জরুরি বিভাগ ও পেশেন্ট কেয়ার",
    "সাশ্রয়ী মূল্যে উন্নতমানের স্বাস্থ্যসেবা",
    "পরিষ্কার-পরিচ্ছন্ন ও আধুনিক হসপিটাল পরিবেশ",
    "দ্রুত ও নির্ভরযোগ্য টেস্ট রিপোর্ট ডেলিভারি",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. HERO SECTION WITH IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block">
              About Allahmalik Hospital & Diagnostic
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
              মানবসেবায় নিবেদিত বরগুনার একটি বিশ্বস্ত চিকিৎসা প্রতিষ্ঠান
            </h1>
            <p className="text-slate-600 leading-relaxed">
              আল্লাহমালিক হসপিটাল এন্ড ডায়াগনস্টিক সেন্টার বরগুনা অঞ্চলের মানুষের চিকিৎসাসেবা সহজ ও উন্নত করতে সর্বদা প্রতিশ্রুতিবদ্ধ। আমরা সঠিক রোগ নির্ণয় ও নির্ভুল চিকিৎসার মাধ্যমে রোগীদের সর্বোচ্চ গুরুত্ব প্রদান করে থাকি।
            </p>
            <p className="text-slate-600 leading-relaxed">
              আমাদের আধুনিক চিকিৎসা সরঞ্জাম এবং অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকদের মাধ্যমে ২৪ ঘণ্টা জরুরি সেবা প্রদান করা হয়।
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all"
              >
                ডাক্তারদের তালিকা দেখুন
              </Link>
              <a
                href="tel:01950258025"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-white hover:border-emerald-600 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>হটলাইন: ০১৯৫০-২৫৮০২৫</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200"
              alt="Allahmalik Hospital Building"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 2. STATS SECTION */}
        <div className="bg-emerald-900 rounded-3xl p-8 sm:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="space-y-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-emerald-100">
                  {stat.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. WHY CHOOSE US & GALLERY IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Grid Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
                alt="Doctor Consultation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-md mt-6">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                alt="Diagnostic Lab Equipment"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block">
              Our Key Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              কেন আমাদের নির্বাচন করবেন?
            </h2>

            <div className="space-y-3">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. MISSION & VISION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের মিশন</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
            com খরচে আধুনিক ও আন্তর্জাতিক মানের চিকিৎসা সেবা সাধারণ মানুষের দোরগোড়ায় পৌঁছে দেওয়া।
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের ভিশন</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              সঠিক রোগ নির্ণয় ও সর্বোচ্চ মানের চিকিৎসাসেবা নিশ্চিত করে এলাকার সবচেয়ে নির্ভরযোগ্য হেলথকেয়ার হওয়া।
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের প্রতিশ্রুতি</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              রোগীর নিরাপত্তা, সহানুভূতিশীল আচরণ এবং সঠিক চিকিৎসার পরিবেশ সবসময় বজায় রাখা।
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}