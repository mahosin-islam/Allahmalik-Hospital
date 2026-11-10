import type { Metadata } from "next";
import DoctorForm from "@/components/dashboard/DoctorForm";

export const metadata: Metadata = {
  title: "নতুন ডাক্তার যোগ | Admin",
};

export default function NewDoctorPage() {
  return <DoctorForm mode="create" />;
}
