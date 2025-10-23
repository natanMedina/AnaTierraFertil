'use client'

import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import BiographySection from '@/components/sections/BiographySection'
import CarouselSection from '@/components/sections/CarouselSection'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Biography Section */}
      <BiographySection />

      {/* Special Moments Section */}
      <CarouselSection />
    </div>
  )
}
