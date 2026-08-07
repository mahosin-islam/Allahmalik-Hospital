import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allahmalik-hospital.com"),
  title: {
  default: "Allahmalik Hospital Barguna | আল্লাহ মালিক হাসপাতাল বরগুনা",
    template: "%s | Allahmalik Hospital Barguna",
  },
  description:
    "আল্লাহ মালিক হাসপাতাল ও ডায়াগনস্টিক সেন্টার, বরগুনা। ২৪/৭ জরুরি চিকিৎসা সেবা, বিশেষজ্ঞ ডাক্তার পরামর্শ এবং আধুনিক প্যাথলজি সেবা। Allahmalik Hospital Barguna.",
  keywords: [
    // English Keywords
    "Allahmalik Hospital",
    "Allahmalik Hospital Barguna",
    "Best hospital in Barguna",
    "Diagnostic Center Barguna",
    "Pathology Center Barguna",
    "Doctor list Barguna",
    "24/7 Emergency Hospital Barguna",
    // Bangla Search Keywords (For Bangladesh Local SEO)
    "আল্লাহ মালিক হাসপাতাল",
    "আল্লাহ মালিক হাসপাতাল বরগুনা",
    "বরগুনা হাসপাতাল",
    "বরগুনা ডায়াগনস্টিক সেন্টার",
    "বরগুনা ডাক্তার তালিকা",
    "বরগুনার সেরা হাসপাতাল",
  ],
  authors: [{ name: "Allahmalik Hospital" }],
  publisher: "Allahmalik Hospital",
icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/icon.png", type: "image/png" },
    { url: "/icon.svg", type: "image/svg+xml" },
  ],
  shortcut: "/favicon.ico",
  apple: "/icon.png",
},
  openGraph: {
    title: "Allahmalik Hospital Barguna | Trusted Healthcare Partner",
    description:
      "আল্লাহ মালিক হাসপাতাল, বরগুনা। অভিজ্ঞ ডাক্তার, আধুনিক প্যাথলজি ও ২৪/৭ জরুরি চিকিৎসা সেবায় আপনার বিশ্বস্ত প্রতিষ্ঠান।",
    url: "https://www.allahmalik-hospital.com",
    siteName: "Allahmalik Hospital",
    images: [
      {
        url: "https://res.cloudinary.com/rob9jlkw/image/upload/v1785994583/hospila2_jukx1v.jpg",
        width: 1200,
        height: 630,
        alt: "Allahmalik Hospital Building Barguna",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allahmalik Hospital Barguna",
    description:
      "24/7 Emergency Medical Care, Specialist Doctors & Modern Pathology in Barguna.",
    images: [
      "https://res.cloudinary.com/rob9jlkw/image/upload/v1785994583/hospila2_jukx1v.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // 🟢 এখানে গুগল ভেরিফিকেশন কোডটি বসবে
  verification: {
    google: "qmAbE_39xZhN-H6zLfVnrJ7XUW777DxrJ501--0qPdQ", 
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🟢 Enhanced Google Schema Markup for Local SEO
  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "Allahmalik Hospital",
    alternateName: "আল্লাহ মালিক হাসপাতাল",
    url: "https://www.allahmalik-hospital.com",
    logo: "https://www.allahmalik-hospital.com/icon.svg",
    image:
      "https://res.cloudinary.com/rob9jlkw/image/upload/v1785994583/hospila2_jukx1v.jpg",
    description:
      "Allahmalik Hospital provides 24/7 emergency medical care, expert doctor consultations, and diagnostic services in Barguna, Bangladesh.",
    telePhone: "+8801700000000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barguna",
      addressRegion: "Barishal Division",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.1528",
      longitude: "90.1260",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
  };

  return (
    <html lang="bn" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}