"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ShieldAlert,
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  Save,
  ImageIcon,
  Trash2,
  AlertCircle,
} from "lucide-react";
import type { Doctor, DoctorInput } from "@/types/doctor";
import {
  CORE_DEPARTMENTS,
  PLACEHOLDER_DOCTOR_IMAGE,
  type DepartmentOption,
} from "@/constants/doctor";

interface DoctorFormProps {
  mode: "create" | "edit";
  doctor?: Doctor;
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/40 transition-colors";

/** Red ring shown on inputs that failed validation */
const inputErrorClass =
  "border-red-400 focus:border-red-500 focus:ring-red-500/40";

type NameField = "nameBN" | "nameEN";

interface FieldErrors {
  nameBN?: string;
  nameEN?: string;
}

const NAME_ERROR_MESSAGES: Record<NameField, string> = {
  nameBN: "ডাক্তারের নাম (বাংলা) আবশ্যক",
  nameEN: "ডাক্তারের নাম (ইংরেজি) আবশ্যক",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB — must match /api/upload
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/** Convert Bengali numerals (০-৯) to ASCII so fee parsing never yields NaN */
const toEnglishDigits = (value: string): string =>
  value.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));

/** Safe fee parser — empty/invalid input falls back to 0 */
const parseFee = (raw: string): number => {
  const normalized = toEnglishDigits(raw).trim();
  if (normalized === "") return 0;
  const n = Number(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/** Small red error line rendered directly underneath an input */
function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-red-600"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {message}
    </p>
  );
}

export default function DoctorForm({ mode, doctor }: DoctorFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const nameBNInputRef = useRef<HTMLInputElement>(null);
  const nameENInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<DoctorInput>({
    nameBN: doctor?.nameBN ?? "",
    nameEN: doctor?.nameEN ?? "",
    qualification: doctor?.qualification ?? "",
    specialityBN: doctor?.specialityBN ?? "",
    specialityEN: doctor?.specialityEN ?? "",
    designation: doctor?.designation ?? "",
    departmentBN: doctor?.departmentBN ?? "",
    departmentEN: doctor?.departmentEN ?? "",
    hospital: doctor?.hospital ?? "",
    experience: doctor?.experience ?? "",
    chamberTime: doctor?.chamberTime ?? "",
    phone: doctor?.phone ?? "",
    about: doctor?.about ?? "",
    fees: doctor?.fees ?? 0,
    // The DTO serves the placeholder for image-less doctors — treat it as "no image"
    image:
      doctor && doctor.image && doctor.image !== PLACEHOLDER_DOCTOR_IMAGE
        ? doctor.image
        : "",
    slug: doctor?.slug ?? "",
  });

  const set = <K extends keyof DoctorInput>(key: K, value: DoctorInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Typing fixes the field — clear its inline error immediately
    if (key === "nameBN" || key === "nameEN") {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  /** Validate one name field — returns the error message or undefined */
  const validateNameField = (field: NameField): string | undefined => {
    const value = form[field]?.trim() ?? "";
    return value === "" ? NAME_ERROR_MESSAGES[field] : undefined;
  };

  /** Blur handler: show the inline error as soon as the user leaves the field empty */
  const handleNameBlur = (field: NameField) => {
    const message = validateNameField(field);
    setFieldErrors((prev) => ({ ...prev, [field]: message }));
  };

  /**
   * Dropdown options = the 7 core departments.
   * When editing a doctor whose stored department is not in the core list
   * (e.g. legacy departments), keep it as an extra option so nothing is lost.
   */
  const departmentOptions: DepartmentOption[] = (() => {
    const currentBN = form.departmentBN?.trim() ?? "";
    const currentEN = form.departmentEN?.trim() ?? "";
    const matchesCore = CORE_DEPARTMENTS.some(
      (d) => d.departmentBN === currentBN || d.departmentEN === currentEN
    );
    if (!matchesCore && (currentBN || currentEN)) {
      return [
        ...CORE_DEPARTMENTS,
        {
          label: `${currentBN || currentEN} (বর্তমান বিভাগ)`,
          departmentBN: currentBN,
          departmentEN: currentEN,
        },
      ];
    }
    return CORE_DEPARTMENTS;
  })();

  const selectedDepartmentValue =
    form.departmentBN?.trim() ?? "";

  const handleDepartmentChange = (value: string) => {
    if (value === "") {
      setForm((prev) => ({ ...prev, departmentBN: "", departmentEN: "" }));
      return;
    }
    const option = departmentOptions.find((d) => d.departmentBN === value);
    if (option) {
      setForm((prev) => ({
        ...prev,
        departmentBN: option.departmentBN,
        departmentEN: option.departmentEN,
      }));
    }
  };

  const handleFileUpload = async (file: File) => {
    // Client-side pre-checks — fail fast without wasting bandwidth
    if (file.size === 0) {
      setError("ফাইলটি খালি — সঠিক ছবি নির্বাচন করুন।");
      return;
    }
    if (file.type && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("শুধু JPG, PNG বা WebP ছবি আপলোড করা যাবে।");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("ছবিটি ৫ এমবির চেয়ে বড় — ছোট করে আবার চেষ্টা করুন।");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "ছবি আপলোড করা যায়নি।");
        return;
      }

      set("image", data.url as string);
    } catch {
      setError("ছবি আপলোডে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Names are the only mandatory fields — inline red errors per field
    const errors: FieldErrors = {
      nameBN: validateNameField("nameBN"),
      nameEN: validateNameField("nameEN"),
    };
    setFieldErrors(errors);

    if (errors.nameBN || errors.nameEN) {
      // Jump straight to the first invalid field
      (errors.nameBN ? nameBNInputRef : nameENInputRef).current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      (errors.nameBN ? nameBNInputRef : nameENInputRef).current?.focus({
        preventScroll: true,
      });
      return;
    }

    setIsLoading(true);

    const isCreate = mode === "create";
    const url = isCreate ? "/api/doctors" : `/api/doctors/${doctor?.id}`;

    const payload: DoctorInput = { ...form };
    if (isCreate) {
      delete payload.slug; // auto-generated server-side
    } else if (payload.slug === doctor?.slug) {
      delete payload.slug; // unchanged — skip to avoid unique checks
    }

    try {
      const res = await fetch(url, {
        method: isCreate ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "সংরক্ষণ করা যায়নি।");
        return;
      }

      setSuccess(
        isCreate
          ? "ডাক্তার সফলভাবে যোগ হয়েছে! লিস্টে ফিরে যাচ্ছি..."
          : "পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!"
      );

      router.refresh();
      setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    } catch {
      setError("সার্ভারে সমস্যা হচ্ছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

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
            {mode === "create" ? "নতুন ডাক্তার যোগ করুন" : "ডাক্তার সম্পাদনা"}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {mode === "create"
              ? "শুধু নাম দিলেই হবে — বাকি সব তথ্য ঐচ্ছিক"
              : doctor?.nameBN}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8"
      >
        {/* Alerts */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">{success}</p>
          </div>
        )}

        {/* 1. Image Upload (optional) */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            ডাক্তারের ছবি (ঐচ্ছিক)
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Preview */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-dashed border-slate-200 bg-slate-50 shrink-0">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Doctor preview"
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              ) : (
                <Image
                  src={PLACEHOLDER_DOCTOR_IMAGE}
                  alt="Default avatar"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              )}
              {form.image && (
                <button
                  type="button"
                  onClick={() => set("image", "")}
                  title="ছবি মুছুন"
                  className="absolute top-1.5 right-1.5 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg transition-colors"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex-1 space-y-3 w-full">
              {form.image ? (
                <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                  ছবি যোগ করা হয়েছে — নতুন ছবি আপলোড করলে প্রতিস্থাপিত হবে। ছবি
                  না দিলে ডিফল্ট প্রোফাইল ছবি দেখানো হবে।
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  ছবি না দিলে ডিফল্ট প্রোফাইল ছবি ব্যবহার হবে — চাইলে এখন বা পরে
                  যোগ করতে পারবেন।
                </p>
              )}
              <label
                htmlFor="doctor-image"
                className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-slate-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition-colors"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                    <span className="text-xs font-medium text-slate-600">
                      আপলোড হচ্ছে...
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-6 h-6 text-emerald-600" />
                    <span className="text-xs font-semibold text-slate-700">
                      ছবি নির্বাচন করুন (ক্লিক করুন)
                    </span>
                    <span className="text-[10px] text-slate-500">
                      JPG/PNG/WebP — সর্বোচ্চ ৫ এমবি
                    </span>
                  </>
                )}
                <input
                  id="doctor-image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                    e.target.value = "";
                  }}
                />
              </label>

              {/* Manual URL fallback */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  অথবা ইমেজ URL সরাসরি দিন (Cloudinary)
                </label>
                <input
                  type="url"
                  value={form.image ?? ""}
                  onChange={(e) => set("image", e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Basic Identity — only names are mandatory */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Field label="নাম (বাংলা)" required>
              <input
                ref={nameBNInputRef}
                type="text"
                value={form.nameBN ?? ""}
                onChange={(e) => set("nameBN", e.target.value)}
                onBlur={() => handleNameBlur("nameBN")}
                placeholder="ডাঃ অলিউল্লাহ"
                aria-invalid={Boolean(fieldErrors.nameBN)}
                aria-describedby={fieldErrors.nameBN ? "nameBN-error" : undefined}
                className={`${inputClass} ${
                  fieldErrors.nameBN ? inputErrorClass : ""
                }`}
              />
            </Field>
            <FieldError id="nameBN-error" message={fieldErrors.nameBN} />
          </div>
          <div>
            <Field label="Name (English)" required>
              <input
                ref={nameENInputRef}
                type="text"
                value={form.nameEN ?? ""}
                onChange={(e) => set("nameEN", e.target.value)}
                onBlur={() => handleNameBlur("nameEN")}
                placeholder="Dr. Oli ullah"
                aria-invalid={Boolean(fieldErrors.nameEN)}
                aria-describedby={fieldErrors.nameEN ? "nameEN-error" : undefined}
                className={`${inputClass} ${
                  fieldErrors.nameEN ? inputErrorClass : ""
                }`}
              />
            </Field>
            <FieldError id="nameEN-error" message={fieldErrors.nameEN} />
          </div>
          <div className="sm:col-span-2">
            <Field label="যোগ্যতা / ডিগ্রি">
              <input
                type="text"
                value={form.qualification ?? ""}
                onChange={(e) => set("qualification", e.target.value)}
                placeholder="এমবিবিএস, এফসিপিএস (মেডিসিন)"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="পদবি">
            <input
              type="text"
              value={form.designation ?? ""}
              onChange={(e) => set("designation", e.target.value)}
              placeholder="সহকারী অধ্যাপক"
              className={inputClass}
            />
          </Field>
          <Field label="অভিজ্ঞতা">
            <input
              type="text"
              value={form.experience ?? ""}
              onChange={(e) => set("experience", e.target.value)}
              placeholder="১০ বছরের অভিজ্ঞ"
              className={inputClass}
            />
          </Field>
        </section>

        {/* 3. Medical Info */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="বিশেষত্ব (বাংলা)">
            <input
              type="text"
              value={form.specialityBN ?? ""}
              onChange={(e) => set("specialityBN", e.target.value)}
              placeholder="মেডিসিন ও ডায়াবেটিস বিশেষজ্ঞ"
              className={inputClass}
            />
          </Field>
          <Field label="Speciality (English)">
            <input
              type="text"
              value={form.specialityEN ?? ""}
              onChange={(e) => set("specialityEN", e.target.value)}
              placeholder="Medicine & Diabetes Specialist"
              className={inputClass}
            />
          </Field>

          {/* Department dropdown (sets both BN & EN) */}
          <div className="sm:col-span-2">
            <Field label="বিভাগ নির্বাচন করুন">
              <select
                value={selectedDepartmentValue}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className={`${inputClass} cursor-pointer ${
                  selectedDepartmentValue === "" ? "text-slate-400" : "text-slate-900"
                }`}
              >
                <option value="">— বিভাগ নির্বাচন করুন (ঐচ্ছিক) —</option>
                {departmentOptions.map((option) => (
                  <option key={option.departmentBN || option.label} value={option.departmentBN}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                হাসপাতালের মূল বিভাগগুলো তালিকাভুক্ত — নির্বাচন করলে বাংলা ও
                ইংরেজি দুটোই সংরক্ষিত হবে
              </p>
            </Field>
          </div>
        </section>

        {/* 4. Chamber & Contact */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Field label="কর্মরত হাসপাতাল / প্রতিষ্ঠান">
              <input
                type="text"
                value={form.hospital ?? ""}
                onChange={(e) => set("hospital", e.target.value)}
                placeholder="শের-ই-বাংলা মেডিকেল কলেজ, বরিশাল"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="চেম্বার সময়">
              <input
                type="text"
                value={form.chamberTime ?? ""}
                onChange={(e) => set("chamberTime", e.target.value)}
                placeholder="প্রতি শুক্রবার (সকাল ৯:০০ - দুপুর ২:০০)"
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="ফোন নম্বর">
            <input
              type="tel"
              value={form.phone ?? ""}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="01950258025"
              className={inputClass}
            />
          </Field>
          <Field label="সিরিয়াল / ভিজিট ফি (৳)">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={form.fees ?? 0}
              onChange={(e) => set("fees", parseFee(e.target.value))}
              placeholder="500"
              className={inputClass}
            />
          </Field>
        </section>

        {/* 5. About */}
        <section className="space-y-5">
          <div>
            <Field label="ডাক্তার সম্পর্কে">
              <textarea
                value={form.about ?? ""}
                onChange={(e) => set("about", e.target.value)}
                rows={3}
                placeholder="ডাক্তারের সংক্ষিপ্ত পরিচিতি লিখুন..."
                className={`${inputClass} resize-y`}
              />
            </Field>
          </div>

          {mode === "edit" && (
            <div>
              <Field label="URL Slug (ঐচ্ছিক — খালি রাখলে অপরিবর্তিত থাকবে)">
                <input
                  type="text"
                  value={form.slug ?? ""}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder={doctor?.slug}
                  className={inputClass}
                />
              </Field>
              <p className="text-[11px] text-slate-500 mt-1.5">
                পাবলিক পেজের ঠিকানা: /doctors/{form.slug || doctor?.slug}
              </p>
            </div>
          )}
        </section>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-100">
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>
                  {mode === "create" ? "ডাক্তার যোগ করুন" : "পরিবর্তন সংরক্ষণ করুন"}
                </span>
              </>
            )}
          </button>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-colors"
          >
            বাতিল
          </Link>
        </div>
      </form>
    </div>
  );
}
