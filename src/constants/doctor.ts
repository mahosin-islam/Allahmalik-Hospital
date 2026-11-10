/**
 * Hospital-wide constants for doctors.
 */

/** Shown everywhere a doctor has no photo (DTO-level default). */
export const PLACEHOLDER_DOCTOR_IMAGE = "/images/doctor-placeholder.png";

export interface DepartmentOption {
  /** Bengali label shown in the dropdown */
  label: string;
  departmentBN: string;
  departmentEN: string;
}

/** The hospital's core departments (must stay in sync with /specialties pages). */
export const CORE_DEPARTMENTS: DepartmentOption[] = [
  {
    label: "গাইনী ও প্রসূতি রোগ (Gynecology & Obstetrics)",
    departmentBN: "গাইনী ও প্রসূতি রোগ",
    departmentEN: "Gynecology & Obstetrics",
  },
  {
    label: "হাড়-ভাঙা ও অর্থোপেডিক্স (Orthopedics)",
    departmentBN: "হাড়-ভাঙা ও অর্থোপেডিক্স",
    departmentEN: "Orthopedics",
  },
  {
    label: "হৃদরোগ (কার্ডিওলজি) (Cardiology)",
    departmentBN: "হৃদরোগ (কার্ডিওলজি)",
    departmentEN: "Cardiology",
  },
  {
    label: "পাকস্থলী ও লিভার রোগ (Gastroenterology)",
    departmentBN: "পাকস্থলী ও লিভার রোগ",
    departmentEN: "Gastroenterology",
  },
  {
    label: "মেডিসিন ও ডায়াবেটিস (Medicine & Diabetes)",
    departmentBN: "মেডিসিন ও ডায়াবেটিস",
    departmentEN: "Medicine & Diabetes",
  },
  {
    label: "শিশু ও নবজাতক রোগ (Pediatrics)",
    departmentBN: "শিশু ও নবজাতক রোগ",
    departmentEN: "Pediatrics",
  },
  {
    label: "নাক, কান ও গলা (ইএনটি) (ENT)",
    departmentBN: "নাক, কান ও গলা (ইএনটি)",
    departmentEN: "ENT",
  },
];
