import { Users, Award, Stethoscope, Clock } from "lucide-react";

export default function HospitalStats() {
  const stats = [
    { icon: Users, value: "৫০,০০০+", label: "সন্তুষ্ট রোগী", color: "text-blue-600 bg-blue-50" },
    { icon: Stethoscope, value: "১৫+", label: "অভিজ্ঞ বিশেষজ্ঞ ডাক্তার", color: "text-emerald-600 bg-emerald-50" },
    { icon: Award, value: "১০+", label: "বছরের অভিজ্ঞতা", color: "text-amber-600 bg-amber-50" },
    { icon: Clock, value: "২৪/৭", label: "জরুরি সেবা ব্যবস্থা", color: "text-rose-600 bg-rose-50" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center space-y-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{stat.value}</h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}