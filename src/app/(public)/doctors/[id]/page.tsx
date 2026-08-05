import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { doctorsData } from "@/data/doctors";
import { Calendar, PhoneCall, Award, Clock, ChevronLeft, ShieldCheck, Stethoscope } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// 🟢 Dynamic SEO Metadata Generation Function
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const doctor = doctorsData.find((doc) => doc.id === resolvedParams.id);

  if (!doctor) {
    return {
      title: "ডাক্তার পাওয়া যায়নি",
      description: "অনুরোধকৃত ডাক্তারের তথ্য খুঁজে পাওয়া যায়নি।",
    };
  }

  return {
    title: `${doctor.name} - ${doctor.department} | বিশেষজ্ঞ ডাক্তার`,
    description: `${doctor.name} - ${doctor.qualification}, ${doctor.speciality}। ${doctor.about.substring(0, 150)}...`,
    openGraph: {
      title: `${doctor.name} - ${doctor.department}`,
      description: doctor.qualification,
      images: [
        {
          url: doctor.image,
          width: 800,
          height: 600,
          alt: doctor.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doctor.name,
      description: doctor.qualification,
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors mb-4 sm:mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>

        {/* Doctor Details Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
          
          <div className="p-5 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Left Column: Image */}
            <div className="md:col-span-5 relative">
              <div className="relative h-72 sm:h-80 md:h-96 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">যাচাইকৃত বিশেষজ্ঞ</p>
                  <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400">হাসপাতালে নিয়মিত প্র্যাকটিস করছেন</p>
                </div>
              </div>
            </div>

            {/* Right Column: Info & Appointment Button */}
            <div className="md:col-span-7 space-y-5 sm:space-y-6">
              
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full mb-2.5">
                  {doctor.department}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {doctor.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                  {doctor.qualification}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
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
                    <span>{doctor.chamberTime}</span>
                  </div>
                </div>
              </div>

              {/* About Doctor */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">চিকিৎসক সম্পর্কে:</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {doctor.about}
                </p>
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
    </div>
  );
}