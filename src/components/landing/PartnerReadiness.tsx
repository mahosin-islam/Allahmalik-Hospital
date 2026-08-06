'use client';

import React from 'react';
import { BadgeCheck, Stethoscope, Heart } from 'lucide-react';
import Image from 'next/image';

interface RequirementItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function PartnerReadiness() {
  const requirements: RequirementItem[] = [
    {
      id: 1,
      title: "বিশেষজ্ঞ চিকিৎসকদের পরামর্শ ও অনুমোদন",
      description: "রোগীদের সঠিক ও নির্ভরযোগ্য চিকিৎসা সেবা নিশ্চিত করতে প্রতিটি ধাপে অভিজ্ঞ চিকিৎসকদের নিবিড় তত্ত্বাবধান প্রদান করা হয়।",
      icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: 2,
      title: "ইন-হাউস সার্বক্ষণিক চেম্বার সেবা",
      description: "হাসপাতালের নিজস্ব অভিজ্ঞ ডাক্তারদের মাধ্যমে সঠিক ডায়াগনস্টিক সাপোর্ট ও তাৎক্ষণিক পরামর্শ পাওয়ার সুব্যবস্থা।",
      icon: <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      id: 3,
      title: "আন্তরিক ও সেবাভিত্তিক পরিবেশ",
      description: "রোগীর দ্রুত সুস্থতার জন্য প্রয়োজন একটি আন্তরিক পরিবেশ। আমাদের প্রতিটি স্টাফ আন্তরিকতার সাথে আপনার সেবায় নিয়োজিত।",
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      iconBg: "bg-emerald-100 dark:bg-emerald-950/50",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white dark:bg-background transition-colors duration-300 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডট ম্যাট্রিক্স গ্রিড */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* বামপাশের সার্কুলার ইমেজ (Fixed by adding sizes) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full overflow-hidden border-4 border-white dark:border-card shadow-[0_20px_50px_rgba(18,40,60,0.12)] transition-transform duration-500 hover:scale-[1.01]">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=687&auto=format&fit=crop"
                alt="ডাক্তার ও রোগীর পরামর্শ"
                className="object-cover object-center"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 440px"
                priority
              />
            </div>
          </div>

          {/* ডানপাশের টাইপোগ্রাফি ও টাইমলাইন/স্টেপার */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">

            {/* হেডার ব্লক */}
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-emerald-600 dark:text-primary block">
                পার্টনারশিপ ও মাননিয়ন্ত্রণ
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-foreground leading-[1.25]">
                মানসম্মত সেবার জন্য আমরা <br />
                যেসব <span className="text-emerald-600 dark:text-primary">বিষয় সুনিশ্চিত করি</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-muted-foreground font-medium pt-1">
                রোগীর সঠিক চিকিৎসা ও সন্তুষ্টি নিশ্চিত করাই আমাদের প্রতিটি পদক্ষেপের মূল লক্ষ্য।
              </p>
            </div>

            {/* ভার্টিক্যাল টাইমলাইন/স্টেপার */}
            <div className="relative pl-2 space-y-8 before:absolute before:left-[23px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-[1px] before:border-l-2 before:border-dashed before:border-slate-200 dark:before:border-slate-800">
              {requirements.map((item) => (
                <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">

                  {/* সার্কুলার আইকন নোড */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                    {item.icon}
                  </div>

                  {/* টেক্সট কন্টেন্ট */}
                  <div className="space-y-1 pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-foreground tracking-tight transition-colors duration-200 group-hover:text-emerald-600 dark:group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-muted-foreground leading-relaxed max-w-xl font-medium">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}