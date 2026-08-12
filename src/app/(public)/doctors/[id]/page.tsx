import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctorsData } from "@/data/doctors";
import { Calendar, PhoneCall, Award, Clock, ChevronLeft, ShieldCheck, Stethoscope, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 🟢 Advanced Dynamic SEO & Local Keyword Targeting
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const doctor = doctorsData.find((doc) => doc.id === resolvedParams.id);

  if (!doctor) {
    return {
      title: "Doctor Not Found | ডাক্তার পাওয়া যায়নি",
      description: "অনুরোধকৃত ডাক্তারের তথ্য খুঁজে পাওয়া যায়নি।",
    };
  }

  const siteUrl = "https://www.allahmalik-hospital.com";

  // SEO Title with explicit search intent keywords
  const pageTitle = `${doctor.name} - ${doctor.speciality} বরগুনা | ${doctor.nameEn}`;
  const pageDescription = `${doctor.name} (${doctor.speciality}) - বরগুনা। ${doctor.qualification}। ${doctor.about} চেম্বার সময়: ${doctor.chamberTime}। আল্লাহ মালিক হাসপাতাল বরগুনা।`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      doctor.name,
      doctor.nameEn,
      `${doctor.name} বরগুনা`,
      `${doctor.nameEn} Barguna`,
      doctor.speciality,
      doctor.specialityEn,
      doctor.department,
      `${doctor.speciality} বরগুনা`,
      `${doctor.specialityEn} in Barguna`,
      // Local Search Keywords for disease & treatment
      "বরগুনা বিশেষজ্ঞ ডাক্তার",
      "বরগুনা ডাক্তার সিরিয়াল",
      "Allah Malik Hospital Doctor Serial",
      "আল্লাহ মালিক হাসপাতাল বরগুনা",
    ],
    alternates: {
      canonical: `${siteUrl}/doctors/${doctor.id}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteUrl}/doctors/${doctor.id}`,
      siteName: "Allah Malik Hospital Barguna",
      locale: "bn_BD",
      type: "profile",
      images: [
        {
          url: doctor.image,
          width: 800,
          height: 600,
          alt: `${doctor.name} - ${doctor.speciality}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [doctor.image],
    },
  };
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const doctor = doctorsData.find((doc) => doc.id === resolvedParams.id);

  if (!doctor) {
    notFound();
  }

  // 🟢 Schema.org Physician JSON-LD with 'knowsAbout' for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": `${doctor.nameEn} (${doctor.name})`,
    "image": doctor.image,
    "telephone": doctor.phone,
    "medicalSpecialty": doctor.specialityEn,
    "knowsAbout": [doctor.speciality, doctor.department, doctor.about],
    "description": doctor.about,
    "url": `https://www.allahmalik-hospital.com/doctors/${doctor.id}`,
    "hospitalAffiliation": {
      "@type": "Hospital",
      "name": "Allah Malik Hospital Barguna",
      "alternateName": "আল্লাহ মালিক হাসপাতাল বরগুনা",
      "url": "https://www.allahmalik-hospital.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Barguna",
      "addressRegion": "Barishal",
      "addressCountry": "BD"
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 md:py-16">
      {/* 🎯 Schema.org Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors mb-4 sm:mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>ডাক্তারদের তালিকায় ফিরে যান</span>
        </Link>

        {/* Doctor Details Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          
          <div className="p-5 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Left Column: Image & Verification */}

        <div className="md:col-span-5 relative">
          <div className="relative h-72 sm:h-80 md:h-96 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-800">
            {doctor.image ? (
           <Image
  src={doctor.image}
  alt={`${doctor.name} - ${doctor.speciality} বরগুনা`}
  fill
  sizes="(max-width: 768px) 100vw, 40vw"
  className="object-cover object-top"
  priority
/>
            ) : (
              /* 🎨 Image null/খালি হলে Gradient Shape & Stethoscope Icon */
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-slate-200 dark:to-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-teal-500/15 blur-3xl" />
                
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-500/20 shadow-2xl flex items-center justify-center z-10">
                  <Stethoscope className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">যাচাইকৃত বিশেষজ্ঞ</p>
              <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400">আল্লাহ মালিক হাসপাতালে নিয়মিত চেম্বার করছেন</p>
            </div>
          </div>
        </div>

            {/* Right Column: Info & Appointment Section */}
            <div className="md:col-span-7 space-y-5 sm:space-y-6">
              
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full mb-2.5">
                  {doctor.department}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {doctor.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {doctor.qualification}
                </p>
                <p className="text-sm sm:text-base font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                  {doctor.speciality}
                </p>
              </div>

              {/* Quick Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Stethoscope className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{doctor.designation}</span>
                </div>
                <div className="col-span-1 sm:col-span-2 flex items-start gap-2 text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                  <Clock className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">চেম্বার সময়: </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{doctor.chamberTime}</span>
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">চিকিৎসক সম্পর্কে:</h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              {/* 🟢 NEW: SEO Keyword Booster Section (Crawled by Search Engine Bots) */}
              <div className="pt-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-2">
                  বিশেষায়িত সেবাসমূহ ও রোগ চিকিৎসা:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{doctor.speciality} পরামর্শ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>বরগুনায় নিয়মিত আধুনিক চিকিৎসা</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>জটিল ও দীর্ঘমেয়াদী রোগের সমাধান</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>অনলাইন ও সরাসরি সিরিয়াল সুবিধা</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`tel:${doctor.phone}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>সিরিয়ালের জন্য কল করুন</span>
                </a>

                <a
                  href={`tel:${doctor.phone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-semibold text-xs sm:text-sm transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" />
                  <span>{doctor.phone}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}