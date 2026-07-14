'use client'

import Hero from '@/components/sections/Hero'
import Storytelling from '@/components/sections/Storytelling'
import Features from '@/components/sections/Features'
import Technology from '@/components/sections/Technology'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <Storytelling />
      <Features />
      <Technology />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  )
}
