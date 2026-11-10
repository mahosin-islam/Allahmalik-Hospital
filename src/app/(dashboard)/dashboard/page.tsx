import Link from "next/link";
import {
  Stethoscope,
  Building2,
  ImageIcon,
  UserPlus,
  IndianRupee,
} from "lucide-react";
import { getAllDoctors } from "@/lib/services/doctorService";
import { PLACEHOLDER_DOCTOR_IMAGE } from "@/constants/doctor";
import DoctorTable from "@/components/dashboard/DoctorTable";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const doctors = await getAllDoctors();

  // বিভাগ সংখ্যা — unique non-empty departments across all doctors
  const uniqueDepartments = new Set(
    doctors
      .map((d) => (d.departmentBN || d.departmentEN || "").trim())
      .filter(Boolean)
  ).size;

  // ছবিসহ প্রোফাইল — only doctors with a REAL image (placeholder/empty excluded)
  const withImages = doctors.filter(
    (d) =>
      d.image &&
      d.image.trim() !== "" &&
      d.image !== PLACEHOLDER_DOCTOR_IMAGE
  ).length;

  // গড় ফি — actual average of doctors that have a fee set (0 = unset)
  const feeDoctors = doctors.filter((d) => d.fees > 0);
  const avgFees =
    feeDoctors.length > 0
      ? Math.round(feeDoctors.reduce((sum, d) => sum + d.fees, 0) / feeDoctors.length)
      : "—";

  const stats = [
    {
      label: "মোট ডাক্তার",
      value: doctors.length,
      icon: Stethoscope,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      label: "বিভাগ সংখ্যা",
      value: uniqueDepartments,
      icon: Building2,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      label: "ছবিসহ প্রোফাইল",
      value: withImages,
      icon: ImageIcon,
      color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    },
    {
      label: "গড় ফি (৳)",
      value: avgFees,
      icon: IndianRupee,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >
              <div
                className={`inline-flex p-2.5 rounded-xl border ${stat.color} mb-3`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1.5">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick action */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-600/10">
        <div>
          <h2 className="text-base font-bold text-white">
            নতুন বিশেষজ্ঞ ডাক্তার যোগ করুন
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            ছবি আপলোডসহ সম্পূর্ণ প্রোফাইল তৈরি করুন — সাথে সাথে ওয়েবসাইটে দেখা যাবে
          </p>
        </div>
        <Link
          href="/dashboard/doctors/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-colors shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          ডাক্তার যোগ করুন
        </Link>
      </div>

      {/* Doctor management table */}
      <DoctorTable doctors={doctors} />
    </div>
  );
}
