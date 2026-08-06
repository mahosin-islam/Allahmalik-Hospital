import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.allahmalik-hospital.com"),
  title: {
    default: "Allahmalik Hospital | Diagnostic & Medical Services in Barguna",
    template: "%s | Allahmalik Hospital",
  },
  description:
    "Allahmalik Hospital provides 24/7 emergency medical care, expert doctor consultations, and modern pathology services in Barguna.",
  keywords: [
    "Allahmalik Hospital",
    "Allahmalik Hospital Barguna",
    "Best hospital in Barguna",
    "Pathology Doctor Barguna",
    "Diagnostic Center Barguna",
  ],
  authors: [{ name: "Allahmalik Hospital" }],
  icons: {
    icon: "/hospital.svg",
    shortcut: "/hospital.svg",
    apple: "/hospital.svg",
  },
  openGraph: {
    title: "Allahmalik Hospital | Trusted Healthcare Partner",
    description:
      "Find expert doctors and modern medical & pathology services at Allahmalik Hospital, Barguna.",
    url: "https://www.allahmalik-hospital.com",
    siteName: "Allahmalik Hospital",
    images: [
      {
        url: "https://res.cloudinary.com/rob9jlkw/image/upload/v1785994583/hospila2_jukx1v.jpg", // public/og-image.jpg (1200x630px)
        width: 1200,
        height: 630,
        alt: "Allahmalik Hospital Building",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🟢 Google Rich Snippet / Schema Markup for Hospital Image & Logo
  const hospitalSchema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "Allahmalik Hospital",
    url: "https://www.allahmalik-hospital.com",
    logo: "https://www.allahmalik-hospital.com/hospital.svg",
    image: "https://res.cloudinary.com/rob9jlkw/image/upload/v1785994583/hospila2_jukx1v.jpg", // সার্চ রেজাল্টের জন্য ছবি
    description:
      "Allahmalik Hospital provides 24/7 emergency medical care and expert doctor consultations in Barguna.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barguna",
      addressCountry: "BD",
    },
  };

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {/* Inject Hospital Schema */}
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