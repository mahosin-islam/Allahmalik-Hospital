import { Star, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "রহিম উদ্দিন",
      location: "বরগুনা সদর",
      comment: "ডাক্তারদের আচরণ এবং সময়মত সিরিয়াল পাওয়ার ব্যবস্থা অসাধারণ। হাসপাতালের পরিবেশ অত্যন্ত পরিচ্ছন্ন।",
      rating: 5,
      date: "২ দিন আগে",
    },
    {
      name: "আমেনা বেগম",
      location: "আমতলী, বরগুনা",
      comment: "জরুরি অবস্থায় উনাদের অ্যাম্বুলেন্স এবং ইমার্জেন্সি টিমের দ্রুত রেসপন্সের কারণে সঠিক সময়ে চিকিৎসা পেয়েছি।",
      rating: 5,
      date: "১ সপ্তাহ আগে",
    },
    {
      name: "নজরুল ইসলাম",
      location: "পাথরঘাটা",
      comment: "বরগুনাতেই এত সুন্দর বিশেষজ্ঞ ডাক্তারদের সার্ভিস পাবো ভাবিনি। প্যাথলজি রিপোর্টও খুব দ্রুত পাওয়া যায়।",
      rating: 5,
      date: "৩ দিন আগে",
    },
    {
      name: "মো: শাহজাহান মিয়া",
      location: "বেতাগী",
      comment: "অনলাইনে অ্যাপয়েন্টমেন্ট নেওয়া অনেক সহজ হয়েছে। হাসপাতালে গিয়ে অহেতুক লাইনে দাঁড়িয়ে অপেক্ষা করতে হয়নি।",
      rating: 5,
      date: "৪ দিন আগে",
    },
    {
      name: "ফাতেমা জোহরা",
      location: "বামনা",
      comment: "শিশু বিশেষজ্ঞ ডাক্তার অনেক যত্ন সহকারে সময় নিয়ে আমাদের বাচ্চার শারীরিক পরীক্ষা করেছেন। ধন্যবাদ আল্লাহ মালিক হাসপাতালকে।",
      rating: 5,
      date: "৫ দিন আগে",
    },
    {
      name: "আব্দুল কুদ্দুস",
      location: "বরগুনা সদর",
      comment: "হৃদরোগ ও বক্ষব্যাধি ডাক্তারের পরামর্শ নিয়ে এখন আলহামদুলিল্লাহ অনেক সুস্থ বোধ করছি। খুব ভালো সার্ভিস।",
      rating: 5,
      date: "১ সপ্তাহ আগে",
    },
  ];

  // লুপ নিরবচ্ছিন্ন রাখতে অ্যারেকে দ্বিগুণ করা হয়েছে
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-10 bg-slate-50 overflow-hidden relative">
      {/* INLINE CSS FOR MARQUEE ANIMATION */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-loop:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>রোগীদের বিশ্বাস ও ভালোবাসা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            রোগীদের বাস্তব অভিজ্ঞতা
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            আমাদের বিশেষায়িত সেবায় সুস্থ হয়ে ওঠা সম্মানিত রোগীদের মূল্যবান মতামত ও প্রতিক্রিয়া
          </p>
        </div>

        {/* INFINITE MARQUEE SLIDER */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* FADE GRADIENT OVERLAYS */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* MARQUEE TRACK */}
          <div className="flex gap-6 w-max animate-marquee-loop">
            {duplicatedReviews.map((rev, index) => (
              <div
                key={index}
                className="w-[280px] sm:w-[340px] lg:w-[380px] bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between shrink-0 relative group"
              >
                <Quote className="w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors absolute top-6 right-6" />

                <div className="space-y-4">
                  {/* STAR RATING */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* REVIEW COMMENT */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic relative z-10">
                    "{rev.comment}"
                  </p>
                </div>

                {/* USER INFO & DATE */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{rev.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{rev.location}</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium">
                    {rev.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}