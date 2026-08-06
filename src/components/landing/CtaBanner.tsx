import { PhoneCall, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-[#0A1628] rounded-3xl p-8 sm:p-14 md:p-20 text-center shadow-2xl border border-slate-800">
          
          {/* BACKGROUND GLOW EFFECTS */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8">
            
            {/* TOP PILL BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-emerald-400 text-xs sm:text-sm font-medium shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>আপনার স্বাস্থ্যই আমাদের প্রথম অগ্রাধিকার</span>
            </div>

            {/* MAIN HEADING WITH HIGHLIGHTED TEXT */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              উন্নত স্বাস্থ্যসেবা। সংযোগ{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                বিশেষজ্ঞ ডাক্তার
              </span>{" "}
              ও <span className="text-blue-400">আধুনিক সেবা</span>।
            </h2>

            {/* SUB-DESCRIPTION */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              আল্লাহ মালিক হাসপাতালে ঘরে বসেই পান অভিজ্ঞ বিশেষজ্ঞ চিকিৎসকদের চেম্বার তথ্য ও সরাসরি অ্যাপয়েন্টমেন্ট বুকিংয়ের সুবিধা।
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/doctors"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                <span>ডাক্তারদের লিস্ট দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:01950258025"
                className="w-full sm:w-auto px-8 py-4 bg-slate-800/60 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700/80 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>কল করুন: ০১৯৫০-২৫৮০২৫</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}