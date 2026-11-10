import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  ExternalLink,
  Stethoscope,
  BadgeCheck,
  BriefcaseMedical,
  Clock,
  Phone,
  IndianRupee,
  FileText,
  Tag,
} from "lucide-react";
import { getDoctorByIdOrSlug } from "@/lib/services/doctorService";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = await getDoctorByIdOrSlug(id);
  return {
    title: doctor ? `${doctor.nameBN} — বিস্তারিত | Admin` : "ডাক্তার বিস্তারিত | Admin",
  };
}

function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
        <Icon className="w-4 h-4 text-emerald-600" />
        {title}
      </h2>
      <div className="p-5">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="sm:w-40 shrink-0 text-xs font-semibold text-slate-500">
        {label}
      </span>
      <span className="text-sm text-slate-900 leading-relaxed break-words">
        {value ? value : "—"}
      </span>
    </div>
  );
}

export default async function DoctorOverviewPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = await getDoctorByIdOrSlug(id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 rounded-xl transition-colors shadow-sm"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            ডাক্তার বিস্তারিত তথ্য
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">{doctor.nameEN}</p>
        </div>
      </div>

      {/* Profile hero */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row items-start gap-6">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200 bg-emerald-50 shrink-0">
          {doctor.image ? (
            <Image
              src={doctor.image}
              alt={doctor.nameBN}
              fill
              sizes="128px"
              className="object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Stethoscope className="w-10 h-10 text-emerald-400" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
            {doctor.nameBN}
          </h2>
          <p className="text-sm text-slate-600">
            {doctor.nameEN} <span className="text-slate-300">•</span>{" "}
            {doctor.qualification}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold">
              <BadgeCheck className="w-3.5 h-3.5" />
              {doctor.designation}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 border border-teal-100 rounded-full text-xs font-semibold">
              <BriefcaseMedical className="w-3.5 h-3.5" />
              {doctor.specialityBN}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
          <Link
            href={`/dashboard/doctors/${doctor.id}/edit`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            সম্পাদনা করুন
          </Link>
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            পাবলিক পেজ
          </Link>
        </div>
      </section>

      {/* Medical & professional info */}
      <InfoCard title="চিকিৎসা ও পেশাগত তথ্য" icon={Stethoscope}>
        <InfoRow label="বিশেষত্ব (বাংলা)" value={doctor.specialityBN} />
        <InfoRow label="Speciality (English)" value={doctor.specialityEN} />
        <InfoRow label="বিভাগ (বাংলা)" value={doctor.departmentBN} />
        <InfoRow label="Department (English)" value={doctor.departmentEN} />
        <InfoRow label="পদবি" value={doctor.designation} />
        <InfoRow label="অভিজ্ঞতা" value={doctor.experience} />
      </InfoCard>

      {/* Chamber & contact */}
      <InfoCard title="চেম্বার ও যোগাযোগ" icon={Clock}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="কর্মরত হাসপাতাল" value={doctor.hospital} />
            <InfoRow label="চেম্বার সময়" value={doctor.chamberTime} />
          </div>
          <div>
            <InfoRow
              label="ফোন নম্বর"
              value={
                doctor.phone.trim() !== "" ? (
                  <a
                    href={`tel:${doctor.phone}`}
                    className="text-emerald-700 hover:text-emerald-600 font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {doctor.phone}
                  </a>
                ) : undefined
              }
            />
            <InfoRow
              label="সিরিয়াল / ভিজিট ফি"
              value={
                <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  ৳{doctor.fees}
                </span>
              }
            />
          </div>
        </div>
      </InfoCard>

      {/* About */}
      <InfoCard title="ডাক্তার সম্পর্কে" icon={FileText}>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {doctor.about.trim() !== "" ? doctor.about : "—"}
        </p>
      </InfoCard>

      {/* Meta */}
      <InfoCard title="অন্যান্য তথ্য" icon={Tag}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
          <InfoRow
            label="ডাক্তার আইডি"
            value={
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded-md">
                {doctor.id}
              </span>
            }
          />
          <InfoRow
            label="পাবলিক ঠিকানা (Slug)"
            value={
              <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded-md">
                /doctors/{doctor.slug}
              </span>
            }
          />
        </div>
      </InfoCard>
    </div>
  );
}
