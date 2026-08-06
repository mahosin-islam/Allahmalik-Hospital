"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "কীভাবে ডাক্তারদের অ্যাপয়েন্টমেন্ট বা সিরিয়াল বুকিং করব?",
      a: "আমাদের ওয়েবসাইটের 'সিরিয়াল নিন' বাটনে ক্লিক করে অথবা সরাসরি আমাদের হটলাইন নম্বরে (০১৯৫০-২৫৮০২৫) কল করে আপনার পছন্দের ডাক্তারের সিরিয়াল বুক করতে পারবেন।",
    },
    {
      q: "হাসপাতালের চেম্বার ও ডাক্তারদের সময়সূচি কী?",
      a: "প্রতিটি ডাক্তারের নিজস্ব চেম্বার সময় রয়েছে। সংশ্লিষ্ট ডাক্তারের প্রোফাইল কার্ড অথবা বিভাগীয় পেজে বিস্তারিত দিন ও সময়সূচি দেখতে পাবেন।",
    },
    {
      q: "জরুরি ২৪/৭ অ্যাম্বুলেন্স সেবা পাওয়া যাবে কি?",
      a: "হ্যাঁ, আমাদের হটলাইন নম্বরে ২৪ ঘন্টা যোগাযোগের মাধ্যমে আইসিইউ সুবিধাসম্পন্ন জরুরি অ্যাম্বুলেন্স সার্ভিস বুক করতে পারবেন।",
    },
    {
      q: "প্যাথলজি ও টেস্ট রিপোর্ট কখন এবং কীভাবে পাবো?",
      a: "অধিকাংশ সাধারণ টেস্টের রিপোর্ট একই দিনে প্রদান করা হয়। সরাসরি হাসপাতাল থেকে অথবা অনলাইনে দ্রুত আপনার প্যাথলজি রিপোর্ট সংগ্রহ করতে পারবেন।",
    },
    {
      q: "হাসপাতালে কী কী বিশেষায়িত বিভাগ বা সেবা চালু আছে?",
      a: "আমাদের হাসপাতালে মেডিসিন, গাইনী ও স্ত্রীরোগ, শিশু রোগ, ই.এন.টি (নাক-কান-গলা), অর্থোপেডিকস এবং সার্জারিসহ একাধিক বিশেষায়িত বিভাগ চালু রয়েছে।",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-6 sm:py-10 lg:py-16 bg-slate-50/60">
      {/* Container: 7XL and 2XL/3XL responsive scaling */}
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8 sm:space-y-12">
        
        {/* HEADER SECTION */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl lg:max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100/80 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>সচরাচর জিজ্ঞাসিত প্রশ্নাবলি</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            সাধারণ কিছু প্রশ্ন (FAQ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            আমাদের চিকিৎসাসেবা, চেম্বারের সময়সূচি এবং অ্যাপয়েন্টমেন্ট সংক্রান্ত প্রয়োজনীয় উত্তর
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="max-w-5xl 2xl:max-w-6xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* QUESTION BUTTON */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-6 lg:p-7 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 leading-snug">
                    {faq.q}
                  </span>

                  {/* PLUS / MINUS CIRCLE ICON */}
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-emerald-600 text-white rotate-180"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                {/* ANSWER CONTENT WITH SMOOTH EXPAND */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5 sm:pb-7 px-4 sm:px-6 lg:px-7"
                      : "grid-rows-[0fr] opacity-0 pb-0 px-4 sm:px-6 lg:px-7"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed sm:leading-loose pt-2 sm:pt-4 border-t border-slate-100">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}