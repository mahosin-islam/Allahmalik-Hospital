import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import DoctorModel, { type IDoctor } from "@/models/Doctor";
import type { Doctor, DoctorInput } from "@/types/doctor";
import { deleteImage, getPublicIdFromUrl, isOwnCloudinaryUrl } from "@/lib/cloudinary";
import { PLACEHOLDER_DOCTOR_IMAGE } from "@/constants/doctor";

function toDTO(doc: IDoctor): Doctor {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    nameBN: doc.nameBN,
    nameEN: doc.nameEN,
    qualification: doc.qualification ?? "",
    specialityBN: doc.specialityBN ?? "",
    specialityEN: doc.specialityEN ?? "",
    designation: doc.designation ?? "",
    departmentBN: doc.departmentBN ?? "",
    departmentEN: doc.departmentEN ?? "",
    hospital: doc.hospital ?? "",
    experience: doc.experience ?? "",
    image: doc.image ? doc.image : PLACEHOLDER_DOCTOR_IMAGE,
    chamberTime: doc.chamberTime ?? "",
    phone: doc.phone ?? "",
    about: doc.about ?? "",
    fees: sanitizeFees(doc.fees),
  };
}

function isValidObjectId(value: string): boolean {
  return mongoose.Types.ObjectId.isValid(value) && /^[a-f\d]{24}$/i.test(value);
}

export async function getAllDoctors(): Promise<Doctor[]> {
  await dbConnect();
  const docs = await DoctorModel.find().sort({ createdAt: 1 }).lean<IDoctor[]>();
  return (docs ?? []).map(toDTO);
}

export async function getFeaturedDoctors(limit = 4): Promise<Doctor[]> {
  await dbConnect();
  const docs = await DoctorModel.find()
    .sort({ createdAt: 1 })
    .limit(limit)
    .lean<IDoctor[]>();
  return (docs ?? []).map(toDTO);
}

export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  await dbConnect();
  const doc = await DoctorModel.findOne({ slug }).lean<IDoctor | null>();
  return doc ? toDTO(doc) : null;
}

export async function getDoctorByIdOrSlug(idOrSlug: string): Promise<Doctor | null> {
  await dbConnect();
  const filter = isValidObjectId(idOrSlug)
    ? { _id: idOrSlug }
    : { $or: [{ slug: idOrSlug }, { nameEN: idOrSlug }] };
  const doc = await DoctorModel.findOne(filter).lean<IDoctor | null>();
  return doc ? toDTO(doc) : null;
}

export async function getDoctorsByKeywords(keywords: string[]): Promise<Doctor[]> {
  if (keywords.length === 0) {
    return getAllDoctors();
  }

  const doctors = await getAllDoctors();

  return doctors.filter((doc) =>
    keywords.some(
      (keyword) =>
        doc.departmentBN.includes(keyword) ||
        doc.departmentEN.includes(keyword) ||
        doc.specialityBN.includes(keyword) ||
        doc.specialityEN.includes(keyword)
    )
  );
}

export function generateSlug(nameEN: string): string {
  return nameEN
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function ensureUniqueSlug(
  desiredSlug: string,
  excludeId?: mongoose.Types.ObjectId
): Promise<string> {
  let candidate = desiredSlug || "doctor";
  let counter = 2;

  let existing = await DoctorModel.findOne({
    slug: candidate,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  }).lean<IDoctor | null>();

  while (existing) {
    candidate = `${desiredSlug}-${counter}`;
    counter += 1;
    existing = await DoctorModel.findOne({
      slug: candidate,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    }).lean<IDoctor | null>();
  }

  return candidate;
}

/** Only the doctor names are mandatory — every other field is optional. */
const REQUIRED_FIELDS: (keyof DoctorInput)[] = ["nameBN", "nameEN"];

export function validateDoctorInput(
  input: DoctorInput,
  partial = false
): string | null {
  if (!partial) {
    for (const field of REQUIRED_FIELDS) {
      const value = input[field];
      if (typeof value !== "string" || value.trim() === "") {
        return field === "nameBN"
          ? "Doctor name (Bangla) is required."
          : "Doctor name (English) is required.";
      }
    }
  } else {
    // Partial updates may omit the names entirely, but if a name IS provided
    // it must be non-empty — never allow an update to blank a name out.
    if (input.nameBN !== undefined && String(input.nameBN).trim() === "") {
      return "Doctor name (Bangla) is required.";
    }
    if (input.nameEN !== undefined && String(input.nameEN).trim() === "") {
      return "Doctor name (English) is required.";
    }
  }
  if (input.slug && !/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(input.slug)) {
    return "Slug must contain only letters, numbers and hyphens.";
  }
  if (input.fees !== undefined && (isNaN(Number(input.fees)) || Number(input.fees) < 0)) {
    return "Fees must be a non-negative number.";
  }
  if (input.image !== undefined && typeof input.image !== "string") {
    return "Image must be a URL string.";
  }
  return null;
}

async function removeOldImage(oldImage: string | undefined, newImage: string): Promise<void> {
  if (!oldImage || oldImage === newImage) return;
  // Only delete images that belong to our own Cloudinary account —
  // seeded doctor images live on a different account and must stay.
  if (!isOwnCloudinaryUrl(oldImage)) return;

  const publicId = getPublicIdFromUrl(oldImage);
  if (!publicId) return;

  try {
    await deleteImage(publicId);
  } catch {
    // Deletion failure must never block the doctor update
  }
}

/** Fees must always persist as a valid non-negative number (never NaN/null) */
function sanitizeFees(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export async function createDoctor(input: DoctorInput): Promise<Doctor> {
  await dbConnect();

  const slug = await ensureUniqueSlug(input.slug || generateSlug(input.nameEN ?? ""));

  const doc = await DoctorModel.create({
    ...input,
    slug,
    fees: input.fees === undefined ? 0 : sanitizeFees(input.fees),
    image: input.image?.trim() ?? "",
  });

  return toDTO(doc.toObject() as IDoctor);
}

export async function updateDoctor(
  idOrSlug: string,
  input: DoctorInput
): Promise<Doctor | null> {
  await dbConnect();

  const filter = isValidObjectId(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };

  const existing = await DoctorModel.findOne(filter);
  if (!existing) {
    return null;
  }

  const payload: DoctorInput = { ...input };

  // Names are required — never let an update blank them out
  if (payload.nameBN === undefined || payload.nameBN?.trim() === "") {
    delete payload.nameBN;
  }
  if (payload.nameEN === undefined || payload.nameEN?.trim() === "") {
    delete payload.nameEN;
  }

  // An empty/missing slug means "keep the existing slug"
  if (!payload.slug || !payload.slug.trim()) {
    delete payload.slug;
  } else if (payload.slug !== existing.slug) {
    payload.slug = await ensureUniqueSlug(payload.slug, existing._id);
  }

  // The placeholder is a UI concern only — persist "no image" as empty string
  if (payload.image !== undefined && !payload.image.trim()) {
    payload.image = "";
  }

  const previousImage = existing.image;

  const updated = await DoctorModel.findByIdAndUpdate(
    existing._id,
    {
      $set: {
        ...payload,
        fees:
          payload.fees === undefined
            ? sanitizeFees(existing.fees)
            : sanitizeFees(payload.fees),
      },
    },
    { new: true, runValidators: true }
  ).lean<IDoctor | null>();

  if (updated) {
    await removeOldImage(previousImage, updated.image ?? "");
  }

  return updated ? toDTO(updated) : null;
}

export async function deleteDoctor(idOrSlug: string): Promise<Doctor | null> {
  await dbConnect();

  const filter = isValidObjectId(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug };

  const deleted = await DoctorModel.findOneAndDelete(filter).lean<IDoctor | null>();
  if (!deleted) {
    return null;
  }

  if (deleted.image && isOwnCloudinaryUrl(deleted.image)) {
    const publicId = getPublicIdFromUrl(deleted.image);
    if (publicId) {
      try {
        await deleteImage(publicId);
      } catch {
        // Ignore failure — document is already removed
      }
    }
  }

  return toDTO(deleted);
}
