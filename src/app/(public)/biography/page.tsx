'use client'

import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'
import { Background } from '@/components/shared/Background'

export default function BiographyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Conoce a Ana
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet...
          </p>
        </div>
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
