export interface Doctor {
  id: string;
  name: string;
  slug: string; // URL-friendly name (e.g., dr-mahedi-hasan)
  degree: string;
  specialty: string;
  department: string;
  designation: string;
  visitingHours: string;
  roomNo: string;
  image: string;
  phone?: string;
  isAvailableToday?: boolean;
}