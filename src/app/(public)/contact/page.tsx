import ContactSection from "@/components/contact/ContactSection";
import type { Metadata } from "next";

const siteUrl = "https://www.allahmalik-hospital.com";

// 🟢 Fully Optimized Contact Page SEO Metadata
export const metadata: Metadata = {
  title: "Contact Us & Emergency Numbers | Allah Malik Hospital Barguna",
  description:
    "আল্লাহ মালিক হাসপাতাল বরগুনা। জরুরি চিকিৎসা সেবা, ডাক্তার অ্যাপয়েন্টমেন্ট ও হটলাইন নম্বর: ০১৯৫০-২৫৮০২৫। ২৪ ঘণ্টা সার্ভিস খোলা।",
  keywords: [
    "Allah Malik Hospital contact",
    "Allah Malik Hospital phone number",
    "Allah Malik Hospital Barguna address",
    "allahmalik hospital serial number",
    "আল্লাহ মালিক হাসপাতাল মোবাইল নম্বর",
    "আল্লাহ মালিক হাসপাতাল বরগুনা ঠিকানা",
    "বরগুনা হাসপাতাল হটলাইন",
    "বরগুনা হাসপাতাল জরুরি নম্বর",
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Allah Malik Hospital & Diagnostic Center Barguna",
    description:
      "জরুরি সেবা বা ডাক্তার অ্যাপয়েন্টমেন্টের জন্য যোগাযোগ করুন। ঠিকানা: নতুন লক্ষ্মীঘাটের সামনে, বরগুনা সদর।",
    url: `${siteUrl}/contact`,
    siteName: "Allah Malik Hospital",
    images: [
      {
        url: `${siteUrl}/og-contact.jpg`, // আপনার সাইটের OG ইমেজের পাথ
        width: 1200,
        height: 630,
        alt: "Allah Malik Hospital Barguna Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Allah Malik Hospital Barguna",
    description: "২৪ ঘণ্টা জরুরি চিকিৎসা সেবা ও অ্যাপয়েন্টমেন্ট হটলাইন: ০১৯৫০-২৫৮০২৫",
  },
};

export default function ContactPage() {
  // 🟢 Schema.org Hospital / LocalBusiness JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "Allah Malik Hospital & Diagnostic Center Barguna",
    "url": `${siteUrl}/contact`,
    "logo": `${siteUrl}/logo.png`,
    "telephone": "+8801950258025",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "নতুন লক্ষ্মীঘাটের সামনে",
      "addressLocality": "Barguna Sadar",
      "addressRegion": "Barguna",
      "postalCode": "8700",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.157, // প্রয়োজন অনুযায়ী বরগুনা ম্যাপের সঠিক Lat-Long বসাতে পারেন
      "longitude": 90.126
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <>
      {/* 🎯 Schema.org Script Injection for Search Engines & Google Maps */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactSection />
    </>
  );
}