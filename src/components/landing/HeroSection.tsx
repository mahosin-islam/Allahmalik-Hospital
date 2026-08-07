"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  Calendar,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Slide configuration data
const slides = [
  {
    id: 1,
    tag: "বিশ্বস্ত ডায়াগনস্টিক ও হেলথকেয়ার",
    title: "আপনার ও পরিবারের স্বাস্থ্য সুরক্ষায় বিশ্বস্ত সেবা",
    description:
      "আল্লাহ মালিক হাসপাতালে পাচ্ছেন ২৪ ঘণ্টা ইমার্জেন্সি সেবা, অভিজ্ঞ ডাক্তার এবং আধুনিক প্রযুক্তির নির্ভুল প্যাথলজি ল্যাব।",
    primaryBtnText: "ডাক্তারদের সময়সূচী",
    primaryBtnLink: "/doctors",
    image:
      "https://res.cloudinary.com/rob9jlkw/image/upload/v1785992483/image.png_itjfw9.webp",
  },
  {
    id: 2,
    tag: "বিশেষজ্ঞ চিকিৎসকবৃন্দ",
    title: "অভিজ্ঞ ডাক্তারদের নিয়মিত পরামর্শ ও চিকিৎসা",
    description:
      "মেডিসিন, গাইনি, সার্জারি ও শিশু বিশেষজ্ঞ চিকিৎসকদের চেম্বার এবং নিবিড় স্বাস্থ্য পর্যবেক্ষণের সুব্যবস্থা।",
    primaryBtnText: "বিভাগসমূহ দেখুন",
    primaryBtnLink: "/specialties/gynecology",
    image:
      "https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    tag: "আধুনিক প্যাথলজি ল্যাব",
    title: "সর্বাধুনিক প্রযুক্তিতে দ্রুত ও সঠিক রিপোর্ট সুবিধা",
    description: "অটোমেটেড ল্যাব ও উন্নত ডিজিটাল এক্স-রে সহ সকল প্রকার ডায়াগনস্টিক পরীক্ষার নির্ভুল ফলাফলের নিশ্চয়তা।",
    primaryBtnText: "যোগাযোগ করুন",
    primaryBtnLink: "/contact",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function HeroSection() {
  const [isEmergencyCalled, setIsEmergencyCalled] = useState(false);

  return (
    <section className="relative w-full h-[calc(100dvh-180px)] sm:h-[calc(100dvh-120px)] md:h-[calc(100dvh-110px)] lg:h-[calc(100dvh-100px)] bg-slate-950 overflow-hidden group">
      {/* Navigation Arrow Left */}
      <button
        id="hero-prev-btn"
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 md:p-4 rounded-full bg-white/70 hover:bg-white text-slate-900 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.5]" />
      </button>

      {/* Navigation Arrow Right */}
      <button
        id="hero-next-btn"
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 md:p-4 rounded-full bg-white/70 hover:bg-white text-slate-900 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 stroke-[2.5]" />
      </button>

      {/* Main Swiper Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: "#hero-prev-btn",
          nextEl: "#hero-next-btn",
        }}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative w-full h-full flex items-center"
          >
            {/* Background Image (Fixed by adding sizes) */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              priority={slide.id === 1}
              className="object-cover object-center z-0"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 via-slate-800/70 to-slate-800/30 z-10" />

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 sm:px-4 md:px-12 lg:px-16 xl:px-20 w-full h-full flex items-center justify-center">

              <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl space-y-4 sm:space-y-6 md:space-y-7 xl:space-y-8">
                
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-sm shadow-sm transition-all duration-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{slide.tag}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight sm:leading-[1.15] md:leading-[1.1] tracking-tight drop-shadow-lg">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100/90 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                  {slide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-5 xl:gap-6">
                  <Link
                    href={slide.primaryBtnLink}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-xl transition-all hover:scale-[1.02] active:scale-100 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <a
                    href="tel:+8801700000000"
                    onClick={() => setIsEmergencyCalled(true)}
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 bg-slate-900/60 hover:bg-slate-900/80 text-white border border-white/20 rounded-xl text-sm sm:text-base font-semibold backdrop-blur-md transition-all focus:outline-none focus:ring-4 focus:ring-slate-300"
                  >
                    <PhoneCall
                      className={`w-5 h-5 text-emerald-400 ${
                        !isEmergencyCalled ? "animate-pulse" : ""
                      }`}
                    />
                    <span>জরুরি যোগাযোগ: 01965-331717</span>
                  </a>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Container */}
      <div className="custom-swiper-pagination absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2" />
    </section>
  );
}