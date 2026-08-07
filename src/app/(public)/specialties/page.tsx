import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Activity,
  Heart,
  Baby,
  Brain,
  Pill,
  Ear,
  Sparkles,
} from "lucide-react";

const siteUrl = "https://www.allahmalik-hospital.com";

// 🟢 Fully Optimized Dynamic & Static SEO Metadata
export const metadata: Metadata = {
  title: "বিশেষায়িত চিকিৎসা বিভাগসমূহ | Allah Malik Hospital Barguna",
  description:
    "আল্লাহ মালিক হাসপাতাল বরগুনার মেডিসিন, শিশু রোগ, গাইনী, নাক-কান-গলা, নিউরোমেডিসিন ও গ্যাস্ট্রোএন্টারোলজি বিভাগসহ সকল বিশেষায়িত সেবা ও বিশেষজ্ঞদের তালিকা।",
  keywords: [
    "Allah Malik Hospital Speciality",
    "Allah Malik Hospital Departments",
    "বরগুনা হাসপাতাল চিকিৎসা বিভাগ",
    "মেডিসিন বিভাগ বরগুনা",
    "শিশু রোগ বিভাগ বরগুনা",
    "গ্যাস্ট্রোএন্টারোলজি বরগুনা",
    "নিউরোমেডিসিন বরগুনা",
    "আল্লাহ মালিক হাসপাতাল বরগুনা",
  ],
  alternates: {
    canonical: `${siteUrl}/specialties`,
  },
  openGraph: {
    title: "বিশেষায়িত চিকিৎসা বিভাগসমূহ | Allah Malik Hospital Barguna",
    description: "অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের মাধ্যমে পরিচালিত আধুনিক স্বাস্থ্যসেবা বিভাগসমূহ।",
    url: `${siteUrl}/specialties`,
    siteName: "Allah Malik Hospital",
  },
};

export default function SpecialtiesPage() {
  const specialties = [
    {
      id: "medicine",
      title: "মেডিসিন বিভাগ",
      description: "ডায়াবেটিস, প্রেশার, জন্ডিস, জ্বর ও যেকোনো দীর্ঘমেয়াদী রোগের আধুনিক চিকিৎসা।",
      icon: Pill,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
      link: "/specialties/medicine",
    },
    {
      id: "gastroenterology",
      title: "লিভার ও গ্যাস্ট্রোএন্টারোলজি",
      description: "গ্যাস্ট্রিক, আলসার, ফ্যাটি লিভার, পেটের ব্যথা ও পরিপাকতন্ত্রের চিকিৎসা।",
      icon: Activity,
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      link: "/specialties/gastroenterology",
    },
    {
      id: "pediatrics",
      title: "শিশু রোগ বিভাগ",
      description: "নবজাতক ও শিশুদের রোগ নির্ণয়, নিউমোনিয়া, জন্ডিস ও শারীরিক বিকাশের যত্ন।",
      icon: Baby,
      color: "bg-pink-500/10 text-pink-600 border-pink-200",
      link: "/specialties/pediatrics",
    },
    {
      id: "ent",
      title: "নাক, কান ও গলা (ENT)",
      description: "কানের ব্যথা, শুনা সমস্যা, টনসিল, সাইনাস ও হেড-নেক সার্জারি সেবা।",
      icon: Ear,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
      link: "/specialties/ent",
    },
    {
      id: "neurology",
      title: "নিউরোমেডিসিন ও স্নায়ুরোগ",
      description: "ব্রেইন স্ট্রোক, মাইগ্রেন, প্যারালাইসিস, মৃগীরোগ ও স্নায়ুরোগের বিশেষায়িত চিকিৎসা।",
      icon: Brain,
      color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
      link: "/specialties/neurology",
    },
    {
      id: "urology",
      title: "ইউরোলজি ও কিডনি রোগ",
      description: "কিডনির পাথর, প্রোস্টেট ও মূত্রনালীর ইনফেকশনের আধুনিক চিকিৎসাসেবা।",
      icon: Heart,
      color: "bg-teal-500/10 text-teal-600 border-teal-200",
      link: "/specialties/urology",
    },
  ];

  // 🟢 Schema.org Structured Data Injection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Medical Specialties & Departments - Allah Malik Hospital",
    "url": `${siteUrl}/specialties`,
    "description": "Specialized medical departments and care provided at Allah Malik Hospital Barguna.",
    "about": specialties.map((s) => ({
      "@type": "MedicalSpecialty",
      "name": s.title,
      "description": s.description,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      {/* 🎯 Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">বিশেষায়িত বিভাগসমূহ</span>
        </nav>

        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>আল্লাহ মালিক হাসপাতাল বরগুনা</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            আমাদের বিশেষায়িত বিভাগসমূহ
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            অভিজ্ঞ ও নিবেদিতপ্রাণ বিশেষজ্ঞ চিকিৎসকদের মাধ্যমে আমরা নিশ্চিত করি সর্বাধুনিক ও উন্নতমানের চিকিৎসাসেবা।
          </p>
        </div>

        {/* SPECIALTIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.link}
                className="group bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>ডাক্তারদের তালিকা দেখুন</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/50 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* EMERGENCY SUPPORT BANNER */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">জরুরি চিকিৎসাসেবা বা পরামর্শ প্রয়োজন?</h3>
            <p className="text-slate-400 text-sm">
              আমাদের জরুরি বিভাগ এবং হটলাইন নম্বর আপনার সেবায় ২৪ ঘণ্টা নিয়োজিত।
            </p>
          </div>
          <a
            href="tel:01965-331717"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shrink-0 text-sm shadow-lg shadow-emerald-900/40"
          >
            কল করুন: 01965-331717
          </a>
        </div>

      </div>
    </div>
  );
}