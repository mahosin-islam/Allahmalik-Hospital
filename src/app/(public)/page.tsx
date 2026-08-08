import { Metadata } from 'next';
import CtaBanner from '@/components/landing/CtaBanner';
import DoctorsSection from '@/components/landing/DoctorsSection';
import Faq from '@/components/landing/Faq';
import Facilities from '@/components/landing/Facilities';
import HeroSection from '@/components/landing/HeroSection';
import Testimonials from '@/components/landing/Testimonials';
import PartnerReadiness from '@/components/landing/PartnerReadiness';

export const metadata: Metadata = {
  title: 'Allah Malik Hospital | Best Doctor in Barguna - বরগুনার সেরা ডাক্তার',
  description: 'বরগুনার সেরা বিশেষজ্ঞ ডাক্তারদের তালিকা ও অনলাইন সিরিয়াল বুকিং। আল্লাহ মালিক হাসপাতাল বরগুনা - মেডিসিন, গাইনী, শিশু, ইএনটি ও নিউরো বিশেষজ্ঞ। Call: 01965-331717',
  keywords: [
    'Best Doctor in Barguna',
    'বরগুনার সেরা ডাক্তার',
    'বরগুনা ভালো ডাক্তার',
    'Barguna Doctor List',
    'বরগুনা বিশেষজ্ঞ ডাক্তার তালিকা',
    'Allah Malik Hospital Barguna',
    'আল্লাহ মালিক হাসপাতাল বরগুনা',
    'বরগুনা ডাক্তার সিরিয়াল',
    'Best Hospital in Barguna',
  ],
  alternates: {
    canonical: 'https://www.allahmalik-hospital.com',
  },
  openGraph: {
    title: 'Allah Malik Hospital | Best Doctor in Barguna - বরগুনার সেরা ডাক্তার',
    description: 'বরগুনার সেরা বিশেষজ্ঞ ডাক্তারদের পরামর্শ ও দ্রুত সিরিয়ালের জন্য যোগাযোগ করুন।',
    url: 'https://www.allahmalik-hospital.com',
    siteName: 'Allah Malik Hospital Barguna',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function Main() {
  return (
    <main>
      <HeroSection />
      <DoctorsSection />
      <Facilities />
      <PartnerReadiness />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </main>
  );
}