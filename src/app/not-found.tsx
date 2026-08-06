import Link from "next/link";
import { Hospital, ArrowLeft, Home, PhoneCall } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex  justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Icon & Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center border border-emerald-200 dark:border-emerald-800/80 shadow-lg animate-pulse">
            <Hospital className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="absolute -bottom-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Error 404
          </span>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            পেজটি পাওয়া যায়নি!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            আপনি যেই পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল প্রবেশ করানো হয়েছে।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে যান</span>
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>যোগাযোগ করুন</span>
          </Link>
        </div>

      </div>
    </div>
  );
}