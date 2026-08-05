import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Clock } from "lucide-react";
import { doctorsData } from "@/data/doctors";

export default function Doctors() {
  const featuredDoctors = doctorsData;

  // 🟢 Google Structured Data (Schema.org / ItemList Markup) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "বিশেষজ্ঞ চিকিৎসকবৃন্দ",
    "itemListElement": featuredDoctors.map((doctor, index) => ({
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
    <section className="py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50 w-full overflow-hidden">
      {/* Inject Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctors Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {featuredDoctors.map((doctor) => (
            <article
              key={doctor.id}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* 🎯 Image & Badge Container (Aspect Ratio Aspect Used For Responsiveness) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <Image
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.speciality}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {doctor.department && (
                    <div className="absolute top-3 left-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md z-10">
                      {doctor.department}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {doctor.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {doctor.qualification}
                    </p>
                  </div>

                  <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md inline-block">
                    {doctor.speciality}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/50 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">{doctor.chamberTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white dark:bg-slate-700/60 dark:hover:bg-emerald-600 dark:text-slate-200 rounded-xl font-medium text-xs transition-all duration-200 group/btn"
                >
                  <span>বিস্তারিত দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}