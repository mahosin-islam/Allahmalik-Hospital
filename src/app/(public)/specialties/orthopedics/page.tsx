import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Award,
  ArrowRight,
} from "lucide-react";
import { doctorsData } from "@/data/doctors";

export const metadata: Metadata = {
  title: "অর্থোপেডিক্স ও হাড়-জোড় বিভাগ | Allahmalik Hospital Barguna",
  description:
    "বরগুনায় হাড় ভাঙা, জয়েন্ট পেইন, স্পাইন বা মেরুদণ্ডের সমস্যা ও ট্রমা চিকিৎসার আধুনিক সেবাকেন্দ্র। অভিজ্ঞ অর্থোপেডিক্স সার্জন ও ট্রমা বিশেষজ্ঞগণ।",
  keywords: [
    "অর্থোপেডিক্স ডাক্তার বরগুনা",
    "Orthopedics Barguna",
    "Allahmalik Hospital Orthopedics",
    "হাড় ভাঙা ডাক্তার বরগুনা",
    "ট্রমা সেন্টার বরগুনা",
  ],
};

export default function OrthopedicsSpecialityPage() {
  // Filter doctors for Orthopedics Department
  const orthopedicsDoctors = doctorsData.filter(
    (doc) =>
      doc.department.includes("অর্থোপেডিক্স") ||
      doc.department.includes("অর্থোপেডিক") ||
      doc.speciality.includes("অর্থোপেডিক্স") ||
      doc.speciality.includes("অর্থোপেডিক")
  );

  const services = [
    "জরুরি এক্সরে, প্লাস্টার ও ফ্র্যাকচার ম্যানেজমেন্ট",
    "হাড় জোড়া ও ট্রমা সার্জারি (Trauma & Fracture Surgery)",
    "হাঁটু, কোমর ও ঘাড় ব্যথার আধুনিক ফিজিওথেরাপি ও চিকিৎসা",
    "বাত-ব্যথা ও আর্থ্রাইটিস (Arthritis) রোগের বিশেষায়িত যত্ন",
    "মেরুদণ্ড বা স্পাইন (Spine) সংক্রান্ত জটিলতার চিকিৎসা",
    "জন্মগত হাড়ের বিকৃতি ও শিশুদের হাড়ের রোগ নির্ণয়",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/specialties" className="hover:text-emerald-600 transition-colors">
            স্পেশালিটি
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-emerald-600 font-medium">অর্থোপেডিক্স ও হাড়-জোড়</span>
        </nav>

        {/* 1. HERO SECTION WITH RELEVANT IMAGE */}
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1600"
              alt="Orthopedics & Bone Care"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>বিশেষায়িত স্বাস্থ্যসেবা</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              অর্থোপেডিক্স ও হাড়-জোড় বিভাগ
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              হাড় ভাঙা, জয়েন্ট পেইন, মেরুদণ্ড বা স্পাইনের সমস্যা এবং যেকোনো ধরনের দুর্ঘটনাজনিত ট্রমা চিকিৎসায় আল্লাহ মালিক হাসপাতালে রয়েছে অভিজ্ঞ অর্থোপেডিক সার্জন ও ২৪/৭ জরুরি সেবা।
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#doctors-list"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/40 text-sm"
              >
                ডাক্তার নির্বাচন করুন
              </a>
              <a
                href="tel:01950258025"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl transition-all text-sm backdrop-blur-md"
              >
                জরুরি সিরিয়াল: ০১৯৫০-২৫৮০২৫
              </a>
            </div>
          </div>
        </div>

        {/* 2. SERVICES & FEATURES SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-600" />
              <span>আমাদের বিশেষায়িত সেবাসমূহ</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              হাড়, জোড়া ও পেশির যেকোনো জটিলতায় সঠিক ডায়াগনস্টিক ও সার্জিক্যাল সুবিধা নিশ্চিত করাই আমাদের লক্ষ্য। উন্নত প্রযুক্তি ও অভিজ্ঞ চিকিৎসকদের তত্ত্বাবধানে এখানে আধুনিক অর্থোপেডিক চিকিৎসা প্রদান করা হয়।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EMERGENCY CARD */}
          <div className="bg-emerald-900 text-white rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-md">
            <div className="space-y-4">
              <div className="bg-emerald-800/60 p-3 rounded-2xl w-fit">
                <Award className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold">২৪/৭ ট্রমা ও জরুরি সার্ভিস</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                সড়ক দুর্ঘটনা, হাড় ভাঙা বা যেকোনো ইমার্জেন্সি ইনজুরিতে আমাদের ট্রমা টিম ও মেডিকেল অফিসারগণ সার্বক্ষণিক প্রস্তুত থাকেন।
              </p>
            </div>
            <div className="bg-emerald-800 p-4 rounded-2xl border border-emerald-700/50 space-y-2">
              <span className="text-xs text-emerald-300 block font-medium">হটলাইন নম্বর</span>
              <p className="text-xl font-extrabold text-white">০১৯৫০-২৫৮০২৫</p>
            </div>
          </div>
        </div>

        {/* 3. DOCTORS LIST SECTION WITH DYNAMIC DETAIL LINKS */}
        <div id="doctors-list" className="space-y-8 pt-4">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              অর্থোপেডিক্স বিশেষজ্ঞগণ
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              বিস্তারিত দেখতে ও অ্যাপয়েন্টমেন্টের জন্য ডাক্তারের প্রফাইলে ক্লিক করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orthopedicsDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Image Header */}
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-semibold">
                        {doc.experience}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Information */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                        {doc.designation}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {doc.qualification}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 pt-1">
                      <div className="flex items-start gap-2">
                        <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{doc.hospital}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-700">{doc.chamberTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link (Dynamic Detail Page Link) */}
                <div className="p-6 pt-0 border-t border-slate-50 mt-4">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-200"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>বিস্তারিত ও সিরিয়াল নিন</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}