'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Clock, Stethoscope, CalendarCheck } from "lucide-react";

interface Doctor {
  id: string | number;
  name: string;
  speciality: string;
  qualification: string;
  image: string;
  department?: string;
  experience?: string;
  chamberTime?: string;
}

interface DoctorsClientProps {
  doctorsData: Doctor[];
}

export default function DoctorsClient({ doctorsData }: DoctorsClientProps) {
  // 🟢 Schema.org Structured Data (Physician & ItemList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "বিশেষজ্ঞ চিকিৎসকবৃন্দ",
    "description": "আমাদের হাসপাতালের অভিজ্ঞ ও বিশেষায়িত ডাক্তারদের তালিকা",
    "numberOfItems": doctorsData.length,
    "itemListElement": doctorsData.map((doctor, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Physician",
        "name": doctor.name,
        "medicalSpecialty": doctor.speciality,
        "description": doctor.qualification,
        "image": doctor.image,
      },
    })),
  };

  return (
    <main className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 dark:bg-slate-900/40 w-full overflow-hidden transition-colors duration-300 relative">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">
            <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>বিশেষজ্ঞ মেডিকেল টিম</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-foreground leading-tight">
            আমাদের অভিজ্ঞ <span className="text-emerald-600 dark:text-primary">চিকিৎসকবৃন্দ</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-medium leading-relaxed">
            বিশেষজ্ঞ ডাক্তারদের অ্যাপয়েন্টমেন্ট নিন খুব সহজেই। উন্নত স্বাস্থ্যসেবা ও সঠিক পরামর্শ পেতে আমাদের অভিজ্ঞ টিমের সাথে যুক্ত থাকুন।
          </p>
        </header>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {doctorsData.map((doctor) => (
            <article
              key={doctor.id}
              className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-slate-200/80 dark:border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] sm:aspect-[16/13] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.speciality}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {doctor.department && (
                    <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-md z-10">
                      {doctor.department}
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-foreground group-hover:text-emerald-600 dark:group-hover:text-primary transition-colors line-clamp-1">
                      {doctor.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5 line-clamp-1 font-medium">
                      {doctor.qualification}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-1 rounded-md inline-block">
                      {doctor.speciality}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-border/50 space-y-2 text-xs text-slate-600 dark:text-muted-foreground font-medium">
                    {doctor.experience && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{doctor.experience}</span>
                      </div>
                    )}
                    {doctor.chamberTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="truncate">{doctor.chamberTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white dark:bg-muted dark:hover:bg-emerald-600 dark:text-foreground dark:hover:text-white rounded-xl font-bold text-xs transition-all duration-200 group/btn shadow-xs hover:shadow-md"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>সিরিয়াল / অ্যাপয়েন্টমেন্ট</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}