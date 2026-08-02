
import { doctorsData } from "@/data/departments";
import { Doctor } from "@/types/doctor";

// সব ডাক্তারদের ডাটা গেট করার সার্ভিস
export async function getAllDoctors(): Promise<Doctor[]> {
  return doctorsData
  ;
}

// আইডি অথবা স্লগ দিয়ে নির্দিষ্ট একজন ডাক্তারের ডাটা গেট করার সার্ভিস
export async function getDoctorById(identifier: string): Promise<Doctor | undefined> {
  return doctorsData.find(
    (doc) => doc.id === identifier || doc.slug === identifier
  );
}

// ডিপার্টমেন্ট অনুযায়ী ফিল্টার করার সার্ভিস
export async function getDoctorsByDepartment(department: string): Promise<Doctor[]> {
  if (!department || department === "All") return doctorsData;
  return doctorsData.filter(
    (doc) => doc.department.toLowerCase() === department.toLowerCase()
  );
}