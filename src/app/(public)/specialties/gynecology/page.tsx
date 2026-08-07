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
  title: "গাইনী ও স্ত্রীরোগ বিভাগ বরগুনায়| Allahmalik Hospital Barguna",
  description:
    "বরগুনায় প্রসূতি সেবা, নরমাল ডেলিভারি, জরায়ুর সমস্যা ও বন্ধ্যাত্ব চিকিৎসার নির্ভরযোগ্য প্রতিষ্ঠান। অভিজ্ঞ গাইনী সার্জন ও বিশেষজ্ঞ চিকিৎসকমণ্ডলী।",
  keywords: [
    "গাইনী ডাক্তার বরগুনা",
    "Gynecology Barguna",
    "Allahmalik Hospital Gynecology",
    "স্ত্রী রোগ বিশেষজ্ঞ বরগুনা",
    "নরমাল ডেলিভারি বরগুনা",
  ],
};

export default function GynecologySpecialityPage() {
  // Filter doctors for Gynecology Department
  const gynecologyDoctors = doctorsData.filter(
    (doc) =>
      doc.department.includes("গাইনী") || doc.speciality.includes("গাইনী")
  );

  const services = [
    "গর্ভাবস্থাকালীন নিয়মিত শারীরিক পরীক্ষা ও পরিচর্যা (ANC)",
    "২৪/৭ নিরাপদ ডেলিভারি সার্ভিস ও ইমার্জেন্সি সিজারিয়ান সেকশন",
    "বন্ধ্যাত্ব রোগ নির্ণয় ও আধুনিক চিকিৎসা (Infertility Treatment)",
    "জরায়ুর টিউমার, ওভারিয়ান সিস্ট ও মাসিকের জটিলতার চিকিৎসা",
    "উন্নতমানের ৪D আল্ট্রাসোনোগ্রাফি ও ফিটাল মনিটরিং",
    "জরায়ু ক্যান্সার স্ক্রিনিং (PAP Smear & VIA Test)",
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
          <span className="text-emerald-600 font-medium">গাইনী ও স্ত্রীরোগ</span>
        </nav>

        {/* 1. HERO SECTION WITH RELEVANT IMAGE */}
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1600"
              alt="Gynecology & Obstetrics Care"
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
              গাইনী ও স্ত্রীরোগ বিভাগ
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              মা ও শিশুর সুস্বাস্থ্য নিশ্চিতকরণে আল্লাহ মালিক হাসপাতালে রয়েছে অভিজ্ঞ নারী গাইনী বিশেষজ্ঞ, আধুনিক অপারেশন থিয়েটার এবং ২৪ ঘণ্টা জরুরি প্রসূতি সেবা।
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
                জরুরি সিরিয়াল: 01965-331717
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
              নারীদের জীবনের প্রতিটি পর্যায়ে বিশেষায়িত স্বাস্থ্যসেবা প্রদান করা আমাদের অন্যতম লক্ষ্য। গর্ভাবস্থা থেকে শুরু করে জটিল গাইনী সার্জারি পর্যন্ত সকল সুবিধা এক ছাদের নিচে মিলবে।
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
              <h3 className="text-xl font-bold">২৪/৭ প্রসূতি ও জরুরি সেবা</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                গর্ভবতী মায়েদের যেকোনো জরুরি মুহূর্তে আমাদের দক্ষ নার্স ও মেডিকেল অফিসারগণ সার্বক্ষণিক প্রস্তুত থাকেন।
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
              গাইনী ও স্ত্রীরোগ বিশেষজ্ঞগণ
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              বিস্তারিত দেখতে ও অ্যাপয়েন্টমেন্টের জন্য ডাক্তারের প্রফাইলে ক্লিক করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gynecologyDoctors.map((doc) => (
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