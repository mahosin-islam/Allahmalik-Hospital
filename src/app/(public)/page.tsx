import { Metadata } from 'next';
import CtaBanner from '@/components/landing/CtaBanner';
import DoctorsSection from '@/components/landing/DoctorsSection';
import Faq from '@/components/landing/Faq';
import Facilities from '@/components/landing/Facilities';
import HeroSection from '@/components/landing/HeroSection';
import Testimonials from '@/components/landing/Testimonials';
import PartnerReadiness from '@/components/landing/PartnerReadiness';

export const metadata: Metadata = {
  title: {
    absolute: 'Allah Malik Hospital | Barguna Private Hospital - বরগুনা বেসরকারি হাসপাতাল',
  },
  description: 'বরগুনার সেরা প্রাইভেট হাসপাতাল ও ডায়াগনস্টিক সেন্টার। ২৪ ঘণ্টা জরুরি সেবা, অভিজ্ঞ বিশেষজ্ঞ ডাক্তার ও আধুনিক প্যাথলজি সেবা। আল্লাহ মালিক হাসপাতাল বরগুনা। Call: 01965-331717',
  keywords: [
    // Private Hospital Search Keywords
    'Barguna Private Hospital',
    'Private Hospital in Barguna',
    'বরগুনা প্রাইভেট হাসপাতাল',
    'বরগুনা বেসরকারি হাসপাতাল',
    'বরগুনা প্রাইভেট হাসপাতাল তালিকা',
    'Barguna Hospital List',
    'বরগুনা হাসপাতাল',
    'Best Hospital in Barguna',
    'Allah Malik Hospital Barguna',
    'আল্লাহ মালিক হাসপাতাল বরগুনা',
  ],
  alternates: {
    canonical: '/',
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