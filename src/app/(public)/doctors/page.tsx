import { Metadata } from "next";
import { getAllDoctors } from "@/lib/services/doctorService";
import DoctorsClient from "@/components/doctors/DoctorsClient";

const siteUrl = "https://www.allahmalik-hospital.com";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "বরগুনা ডাক্তার তালিকা ও সিরিয়াল | Doctor List - Allahmalik Hospital",
  description:
    "আল্লাহ মালিক হাসপাতাল বরগুনার সকল বিশেষজ্ঞ ডাক্তারের তালিকা, চেম্বার সময়সূচি ও সিরিয়াল নম্বর পেতে ভিজিট করুন। Book doctor appointments online.",
  keywords: [
    "Allah Malik Hospital Doctor List",
    "Allah Malik Hospital Serial Number",
    "barguna doctor list",
    "barguna doctor number",
    "barguna doctor serial",
    "বরগুনা ডাক্তার তালিকা",
    "আল্লাহ মালিক হাসপাতাল ডাক্তার",
    "বরগুনা ডাক্তারের নম্বর",
    "doctor appointment barguna",
  ],
  alternates: {
    canonical: `${siteUrl}/doctors`,
  },
  openGraph: {
    title: "Doctor List & Serial Number | Allah Malik Hospital Barguna",
    description: "আল্লাহ মালিক হাসপাতাল বরগুনার অভিজ্ঞ ডাক্তারদের মোবাইল নম্বর ও সিরিয়াল সময়সূচি।",
    url: `${siteUrl}/doctors`,
    siteName: "Allah Malik Hospital",
  },
};

export default async function DoctorsPage() {
  const doctors = await getAllDoctors();

  // 🟢 ItemList & MedicalWebPage Schema Injection for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Doctor List & Serial Number - Allah Malik Hospital",
    "url": `${siteUrl}/doctors`,
    "description": "Allah Malik Hospital Barguna Specialist Doctors Directory and Appointment Serial Numbers.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": doctors.map((doc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Physician",
          "name": `${doc.nameEN} (${doc.nameBN})`,
          "medicalSpecialty": doc.specialityEN,
          "url": `${siteUrl}/doctors/${doc.slug}`
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DoctorsClient doctorsData={doctors} />
    </>
  );
}
