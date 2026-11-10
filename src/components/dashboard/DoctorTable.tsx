"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Pencil,
  Trash2,
  Stethoscope,
  UserPlus,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Eye,
} from "lucide-react";
import type { Doctor } from "@/types/doctor";

export default function DoctorTable({ doctors }: { doctors: Doctor[] }) {
   console.log("doctors",doctors)
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setMessage(null);

    try {
      const res = await fetch(`/api/doctors/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage({
          type: "error",
          text: data.message ?? "মুছে ফেলা যায়নি।",
        });
        return;
      }

      setMessage({ type: "success", text: "ডাক্তার সফলভাবে মুছে ফেলা হয়েছে।" });
      setConfirmId(null);
      router.refresh();
    } catch {
      setMessage({ type: "error", text: "সার্ভারে সমস্যা হচ্ছে।" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-4.5 h-4.5 text-emerald-600" />
            ডাক্তার তালিকা ({doctors.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            সম্পাদনা বা মুছে ফেলার জন্য নিচের বাটন ব্যবহার করুন
          </p>
        </div>
        <Link
          href="/dashboard/doctors/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          নতুন ডাক্তার যোগ করুন
        </Link>
      </div>

      {/* Alert messages */}
      {message && (
        <div
          className={`m-5 p-3.5 rounded-xl border flex items-start gap-3 ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              message.type === "success" ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      {/* Empty state */}
      {doctors.length === 0 ? (
        <div className="py-16 text-center">
          <div className="inline-flex p-4 bg-emerald-50 rounded-2xl mb-4">
            <Stethoscope className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-900">কোনো ডাক্তার নেই</h3>
          <p className="text-sm text-slate-500 mt-1 mb-5">
            প্রথম ডাক্তারের প্রোফাইল যোগ করে শুরু করুন
          </p>
          <Link
            href="/dashboard/doctors/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            নতুন ডাক্তার যোগ করুন
          </Link>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ডাক্তার
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  বিভাগ
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ফোন
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ফি (৳)
                </th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Doctor */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-emerald-50 border border-slate-200 shrink-0">
                        {doctor.image ? (
                          <Image
                            src={doctor.image}
                            alt={doctor.nameBN}
                            fill
                            sizes="44px"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-emerald-500" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/dashboard/doctors/${doctor.id}`}
                          className="font-semibold text-slate-900 hover:text-emerald-600 transition-colors block truncate"
                        >
                          {doctor.nameBN}
                        </Link>
                        <p className="text-[11px] text-slate-500 truncate">
                          {doctor.nameEN}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-5 py-4">
                    {doctor.departmentBN ? (
                      <span className="inline-flex px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-[11px] font-semibold whitespace-nowrap">
                        {doctor.departmentBN}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        নির্দিষ্ট নয়
                      </span>
                    )}
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4">
                    {doctor.phone ? (
                      <a
                        href={`tel:${doctor.phone}`}
                        className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                      >
                        {doctor.phone}
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">—</span>
                    )}
                  </td>

                  {/* Fees — real amount when set, clean placeholder otherwise */}
                  <td className="px-5 py-4">
                    {Number(doctor.fees) > 0 ? (
                      <span className="font-semibold text-slate-900 whitespace-nowrap">
                        ৳{Number(doctor.fees)}
                      </span>
                    ) : (
                      <span
                        className="text-[11px] text-slate-400"
                        title="ফি নির্ধারিত নয়"
                      >
                        নির্ধারিত নয়
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/doctors/${doctor.id}`}
                        title="বিস্তারিত দেখুন"
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-100 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        বিস্তারিত
                      </Link>

                      <Link
                        href={`/dashboard/doctors/${doctor.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        সম্পাদনা
                      </Link>

                      {confirmId === doctor.id ? (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(doctor.id)}
                            disabled={deletingId === doctor.id}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-60"
                          >
                            {deletingId === doctor.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                            নিশ্চিত
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold transition-colors"
                          >
                            বাতিল
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(doctor.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          মুছুন
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
