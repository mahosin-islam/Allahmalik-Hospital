import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
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
  openGraph: {
    title: "Allahmalik Hospital | Trusted Healthcare Partner",
    description:
      "Find expert doctors and modern medical & pathology services at Allahmalik Hospital, Barguna.",
    url: "https://allahmalikhospital.com",
    siteName: "Allahmalik Hospital",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Allahmalik Hospital",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
         <Navbar
         />
        <main className="min-h-screen">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}