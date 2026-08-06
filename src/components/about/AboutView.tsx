"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Users,
  HeartPulse,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  Quote,
} from "lucide-react";

export default function AboutView() {
  const stats = [
    { id: 1, name: "অভিজ্ঞ বিশেষজ্ঞ ডাক্তার", value: "২০+" },
    { id: 2, name: "সেবাগ্রাহক রোগী", value: "৫০,০০০+" },
    { id: 3, name: "২৪/৭ জরুরি ও ল্যাব সেবা", value: "৩৬৫ দিন" },
    { id: 4, name: "আধুনিক ডিজিটাল টেস্ট", value: "১০০+" },
  ];

  const features = [
    "আন্তর্জাতিক মানের ডিজিটাল ডায়াগনস্টিক ল্যাব",
    "অভিজ্ঞ ও প্রখ্যাত কনসালটেন্ট চিকিৎসকমণ্ডলী",
    "২৪ ঘণ্টা জরুরি বিভাগ ও আইসিইউ সার্পোট ব্যবস্থা",
    "সাধারণ মানুষের জন্য সাশ্রয়ী মূল্যে সেবা",
    "সম্পূর্ণ জীবাণুমুক্ত ও আধুনিক হাসপাতাল পরিবেশ",
    "দ্রুত ও শতভাগ নির্ভুল টেস্ট রিপোর্ট প্রদান",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* 1. HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block">
              About Allahmalik Hospital & Diagnostic
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
              মানবসেবায় নিবেদিত বরগুনার অন্যতম নির্ভরযোগ্য চিকিৎসা প্রতিষ্ঠান
            </h1>
            <p className="text-slate-600 leading-relaxed">
              আল্লাহ মালিক হসপিটাল এন্ড ডায়াগনস্টিক সেন্টার বরগুনা অঞ্চলের মানুষের আধুনিক ও উন্নত চিকিৎসাসেবা নিশ্চিত করতে সর্বদা প্রতিশ্রুত। উন্নত প্রযুক্তি এবং অভিজ্ঞ বিশেষজ্ঞদের সমন্বয়ে আমরা নির্ভুল রোগ নির্ণয় ও সর্বোচ্চ মানের চিকিৎসা দিয়ে থাকি।
            </p>
            <p className="text-slate-600 leading-relaxed">
              জরুরি প্রয়োজনে ২৪ ঘণ্টা অ্যাম্বুলেন্স সেবা, ডিজিটাল প্যাথলজি এবং যেকোনো সময়ে অভিজ্ঞ ডাক্তারের পরামর্শের সুযোগ রয়েছে এখানে।
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all"
              >
                বিশেষজ্ঞ ডাক্তারদের তালিকা
              </Link>
              <a
                href="tel:01950258025"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-white hover:border-emerald-600 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>জরুরি নম্বর: ০১৯৫০-২৫৮০২৫</span>
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[380px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200"
              alt="Allahmalik Hospital Building Barguna"
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

        {/* 3. OWNER / LEADERSHIP SECTION (New Added) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Owner Image */}
            <div className="lg:col-span-4 relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md border-2 border-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                alt="Chairman / Managing Director of Allahmalik Hospital"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Owner Text Details */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block">
                Leadership & Message
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                চেয়ারম্যানের বার্তা
              </h2>
              
              <div className="relative pl-6 border-l-4 border-emerald-500 py-1">
                <Quote className="w-8 h-8 text-emerald-100 absolute -top-3 -left-3 -z-10" />
                <p className="text-slate-700 italic text-base leading-relaxed">
                  &quot;আমাদের মূল উদ্দেশ্য কেবল ব্যবসা নয়, বরং বরগুনার সাধারণ ও অবহেলিত মানুষের দোরগোড়ায় উন্নত ও সঠিক চিকিৎসা পৌঁছে দেওয়া। আধুনিক ডায়াগনস্টিক সুবিধা ও সেবামূলক মানসিকতা নিয়ে আমরা প্রতিদিন কাজ করে যাচ্ছি।&quot;
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-900">ব্যবস্থাপনা পরিচালক ও পরিচালনা পর্ষদ</h3>
                <p className="text-sm text-emerald-600 font-medium">আল্লাহ মালিক হাসপাতাল এন্ড ডায়াগনস্টিক সেন্টার, বরগুনা</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">স্বচ্ছ ও সততার সাথে সেবা</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <HeartPulse className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">রোগীবান্ধব পরিবেশ নিশ্চিতকরণ</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. WHY CHOOSE US */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
                alt="Doctor Consultation at Allahmalik Hospital"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-md mt-6">
              <Image
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                alt="Diagnostic Lab Equipment Barguna"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block">
              Our Key Features 
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              কেন আমাদের সেবা গ্রহণ করবেন?
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

        {/* 5. MISSION & VISION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের মিশন</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              সাশ্রয়ী মূল্যে আধুনিক ও আন্তর্জাতিক মানের স্বাস্থ্যসেবা বরগুনার প্রতিটি মানুষের কাছে পৌঁছে দেওয়া।
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের ভিশন</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              সঠিক ডায়াগনস্টিক রিপোর্ট ও উন্নত চিকিৎসার মাধ্যমে উপকূলীয় অঞ্চলের সবচেয়ে নির্ভরযোগ্য হেলথকেয়ার সেন্টার হিসেবে গড়ে ওঠা।
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-3">
            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-fit">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">আমাদের প্রতিশ্রুতি</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              রোগীর নিরাপত্তা, সহানুভূতিশীল সেবা প্রদান এবং স্বচ্ছ ও নিরাপদ চিকিৎসা পরিবেশ বজায় রাখা।
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}