import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDoctorByIdOrSlug } from "@/lib/services/doctorService";
import DoctorForm from "@/components/dashboard/DoctorForm";

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
    title: doctor ? `সম্পাদনা: ${doctor.nameBN} | Admin` : "ডাক্তার সম্পাদনা | Admin",
  };
}

export default async function EditDoctorPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = await getDoctorByIdOrSlug(id);

  if (!doctor) {
    notFound();
  }

  return <DoctorForm mode="edit" doctor={doctor} />;
}
