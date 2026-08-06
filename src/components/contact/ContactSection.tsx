"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider block mb-2">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Contact Our Hospital & Diagnostic Center
          </h1>
          <p className="mt-4 text-base text-slate-600">
            জরুরি সেবা, ডাক্তার অ্যাপয়েন্টমেন্ট কিংবা যেকোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন। আমরা ২৪ ঘণ্টা আপনার সেবায় প্রস্তুত।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">আমাদের ঠিকানা</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  নতুন লক্ষ্মীঘাটের সামনে (ইসলামী ব্যাংকের নিচে), বরগুনা সদর, বরগুনা।
                </p>
              </div>
            </div>

            {/* Phone / Hotlines */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">হটলাইন ও ফোন</h3>
                <p className="text-sm text-slate-600">জরুরি: <a href="tel:01965331717" className="hover:underline text-emerald-600">০১৯৬৫-৩৩১৭১৭</a></p>
                <p className="text-sm text-slate-600 mt-0.5">রিসেপশন: <a href="tel:01965331717" className="hover:underline text-emerald-600">০১৯৬৫-৩৩১৭১৭</a></p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">ইমেইল এড্রেস</h3>
                <p className="text-sm text-slate-600">support@allahmalikhospital.com</p>
                <p className="text-sm text-slate-600 mt-0.5">info@allahmalikhospital.com</p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 mb-1">সেবার সময়</h3>
                <p className="text-sm text-slate-600">জরুরি বিভাগ ও ল্যাব: ২৪ ঘণ্টা খোলা</p>
                <p className="text-sm text-slate-600 mt-0.5">বহির্বিভাগ: সকাল ৮:০০ - রাত ১০:০০</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">আমাদের একটি বার্তা পাঠান</h2>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-800">বার্তা সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-sm text-emerald-700">
                  খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন। ধন্যবাদ।
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">আপনার নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মো. রহিম"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 text-sm text-slate-800 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ফোন নম্বর</label>
                    <input
                      type="tel"
                      required
                      placeholder="যেমন: ০১৭০০০০০০০০"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 text-sm text-slate-800 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 text-sm text-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">আপনার বার্তা বা সমস্যা</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="আপনার ডাক্তার বা সেবা সম্পর্কিত কিছু জানার থাকলে এখানে লিখুন..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 text-sm text-slate-800 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা পাঠান</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}