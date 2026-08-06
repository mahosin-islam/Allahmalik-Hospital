import { Activity, ShieldCheck, Clock, PhoneCall, Truck, Sparkles } from "lucide-react";

export default function Facilities() {
  const features = [
    {
      icon: Clock,
      title: "২৪ ঘন্টা জরুরি সার্ভিস",
      desc: "যেকোনো জরুরি স্বাস্থ্য সমস্যায় আমাদের ক্রিটিক্যাল কেয়ার টিম সার্বক্ষণিক প্রস্তুত।",
    },
    {
      icon: Truck,
      title: "আধুনিক অ্যাম্বুলেন্স সেবা",
      desc: "দ্রুত ও নিরাপদ রোগী পরিবহনের জন্য আইসিইউ সুবিধাসম্পন্ন অ্যাম্বুলেন্স।",
    },
    {
      icon: ShieldCheck,
      title: "নির্ভুল ডায়াগনস্টিক",
      desc: "সর্বাধুনিক ডিজিটাল ল্যাব ও প্যাথলজি টেস্টের মাধ্যমে সঠিক রোগ নির্ণয়।",
    },
    {
      icon: Activity,
      title: "অপারেশন থিয়েটার (OT)",
      desc: "জীবাণুমুক্ত ও আধুনিক মেডিকেল ইকুইপমেন্ট সমৃদ্ধ মডিউলার সার্জারি রুম।",
    },
  ];

  return (
    <section className="py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>আমাদের সুবিধাসমূহ</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-800">কেন আমাদের সেবা নেবেন?</h2>
          <p className="text-slate-600 text-sm">রোগীদের সর্বোচ্চ নিরাপত্তা ও উন্নত স্বাস্থ্যসেবা নিশ্চিত করতে আমরা সর্বদা বদ্ধপরিকর।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}