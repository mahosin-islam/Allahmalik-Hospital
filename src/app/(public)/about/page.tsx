import AboutView from "@/components/about/AboutView";
import type { Metadata } from "next";

const siteUrl = "https://www.allahmalik-hospital.com";

// 🟢 Fully Optimized About Page SEO Metadata
export const metadata: Metadata = {
  title: "About Us | Allah Malik Hospital & Diagnostic Center Barguna",
  description:
    "আল্লাহ মালিক হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বরগুনা। অভিজ্ঞ ডাক্তার, আধুনিক ডিজিটাল ল্যাব ও ২৪/৭ জরুরি চিকিৎসাসেবা নিয়ে আপনার পাশে।",
  keywords: [
    "About Allah Malik Hospital",
    "Allah Malik Hospital Barguna history",
    "Best diagnostic center in Barguna",
    "Allah Malik Hospital chairman",
    "আল্লাহ মালিক হাসপাতাল পরিচিতি",
    "বরগুনা হাসপাতাল ইতিহাস",
    "বরগুনার সেরা ডায়াগনস্টিক সেন্টার",
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Allah Malik Hospital Barguna | Trusted Healthcare Center",
    description:
      "বরগুনায় ২৪/৭ স্বাস্থ্যসেবা ও আধুনিক প্যাথলজি নিয়ে আপনাদের পাশে রয়েছে আল্লাহ মালিক হাসপাতাল।",
    url: `${siteUrl}/about`,
    siteName: "Allah Malik Hospital",
    images: [
      {
        url: `${siteUrl}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About Allah Malik Hospital Barguna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Allah Malik Hospital & Diagnostic Center Barguna",
    description: "বরগুনায় ২৪/৭ স্বাস্থ্যসেবা ও আধুনিক প্যাথলজি সেবা।",
  },
};

export default function AboutPage() {
  // 🟢 Schema.org MedicalOrganization JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Allah Malik Hospital & Diagnostic Center Barguna",
    "url": `${siteUrl}/about`,
    "logo": `${siteUrl}/logo.png`,
    "description": "Allah Malik Hospital & Diagnostic Center is a leading healthcare provider in Barguna, Bangladesh, offering 24/7 medical services and modern digital diagnostics.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "নতুন লক্ষ্মীঘাটের সামনে",
      "addressLocality": "Barguna Sadar",
      "addressRegion": "Barguna",
      "postalCode": "8700",
      "addressCountry": "BD"
    },
    "telephone": "+8801950258025"
  };

  return (
    <>
      {/* 🎯 Schema.org Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutView />
    </>
  );
}