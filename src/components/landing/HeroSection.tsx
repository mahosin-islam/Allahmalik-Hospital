"use client";
import Image from "next/image";
import Link from "next/link";
import { PhoneCall, Calendar, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    tag: "বিশ্বস্ত ডায়াগনস্টিক ও হেলথকেয়ার",
    title: "আপনার ও পরিবারের স্বাস্থ্য সুরক্ষায় বিশ্বস্ত সেবা",
    description: "আল্লাহ মালিক হাসপাতালে পাচ্ছেন ২৪ ঘণ্টা ইমার্জেন্সি সেবা, অভিজ্ঞ ডাক্তার এবং আধুনিক প্রযুক্তির নির্ভুল প্যাথলজি ল্যাব।",
    primaryBtnText: "ডাক্তারদের সময়সূচী",
    primaryBtnLink: "/doctors",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "বিশেষজ্ঞ চিকিৎসকবৃন্দ",
    title: "অভিজ্ঞ ডাক্তারদের নিয়মিত পরামর্শ ও চিকিৎসা",
    description: "মেডিসিন, গাইনি, সার্জারি ও শিশু বিশেষজ্ঞ চিকিৎসকদের চেম্বার এবং নিবিড় স্বাস্থ্য পর্যবেক্ষণের সুব্যবস্থা।",
    primaryBtnText: "বিভাগসমূহ দেখুন",
    primaryBtnLink: "/departments",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "আধুনিক প্যাথলজি ল্যাব",
    title: "সর্বাধুনিক প্রযুক্তিতে দ্রুত ও সঠিক রিপোর্ট সুবিধা",
    description: "অটোমেটেড ল্যাব ও উন্নত ডিজিটাল এক্স-রে সহ সকল প্রকার ডায়াগনস্টিক পরীক্ষার নির্ভুল ফলাফলের নিশ্চয়তা।",
    primaryBtnText: "যোগাযোগ করুন",
    primaryBtnLink: "/contact",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-95px)] min-h-[550px] max-h-[850px]  w-full bg-slate-950 overflow-hidden group">
      
      {/* 🔴 Custom Side Navigation Buttons */}
      <button
        id="hero-prev-btn"
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        id="hero-next-btn"
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* 🟢 Swiper Slider Container */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true} // 👈 আসল Infinite Loop (কোনো রিওয়াইন্ড হবে না)
        speed={900}
        autoplay={{
          delay: 5000,
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
          <SwiperSlide key={slide.id} className="relative w-full h-full flex items-center">
            
            {/* Slide Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={slide.id === 1}
              className="object-cover object-center z-0"
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent z-10" />

            {/* Slide Content Box */}
            <div className="relative z-20 max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 w-full h-full flex items-center">
              <div className="max-w-3xl space-y-6">
                
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{slide.tag}</span>
                </div>

                {/* Title */}
                <div className="h-[100px] sm:h-[130px] flex items-center">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>
                </div>

                {/* Subtitle */}
                <div className="h-[60px] flex items-start">
                  <p className="text-base sm:text-lg text-slate-100/90 leading-relaxed max-w-2xl font-normal drop-shadow">
                    {slide.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.primaryBtnLink}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold shadow-xl transition-all hover:scale-[1.02]"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>{slide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  <a
                    href="tel:+8801700000000"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900/60 hover:bg-slate-900/80 text-white border border-white/20 rounded-xl font-semibold backdrop-blur-md transition-all"
                  >
                    <PhoneCall className="w-5 h-5 text-emerald-400 animate-pulse" />
                    <span>জরুরি যোগাযোগ: ০১৭০০-০০০০০০</span>
                  </a>
                </div>

              </div>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔴 Custom Pagination Dots Container */}
      <div className="custom-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2" />

      {/* Swiper Custom Dots Styling */}
      <style jsx global>{`
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
          margin: 0 4px !important;
          cursor: pointer;
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background-color: #10b981; /* Emerald-500 */
          border-radius: 9999px;
        }
      `}</style>

    </section>
  );
}