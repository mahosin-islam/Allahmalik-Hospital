import CtaBanner from '@/components/landing/CtaBanner'
import DoctorsSection from '@/components/landing/DoctorsSection'
import Faq from '@/components/landing/Faq'
import Facilities from '@/components/landing/Facilities'
import HeroSection from '@/components/landing/HeroSection'

import Testimonials from '@/components/landing/Testimonials'
import PartnerReadiness from '@/components/landing/PartnerReadiness'

function Main() {
  return (
    <div>
      <HeroSection/>
      <DoctorsSection/>
      <Facilities/>
      <PartnerReadiness />
      <Testimonials/>
      <Faq />
      <CtaBanner />
    </div>
  )
}

export default Main