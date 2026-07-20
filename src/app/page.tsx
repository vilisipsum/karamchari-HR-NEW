'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import AnimatedBlobs from '@/components/ui/AnimatedBlobs'
import RangoliCanvas from '@/components/ui/RangoliCanvas'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import AISection from '@/components/sections/AISection'
import Modules from '@/components/sections/Modules'
import DashboardShowcase from '@/components/sections/DashboardShowcase'
import MobileApp from '@/components/sections/MobileApp'
import Industries from '@/components/sections/Industries'
import Integrations from '@/components/sections/Integrations'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import DynamicDrawer from '@/components/ui/DynamicDrawer'

export default function Home() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null)

  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
      {/* Background Canvas & Animated Blobs */}
      <AnimatedBlobs />
      <RangoliCanvas />

      {/* Main Content */}
      <main className="relative z-10 w-full">
        <Hero />
        <Features />
        <AISection />
        <Modules />
        <DashboardShowcase />
        <MobileApp />
        <Industries />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>

      {/* Dynamic Slide-out Drawer Panel */}
      <DynamicDrawer contentId={activeDrawer} onClose={() => setActiveDrawer(null)} />
    </div>
  )
}
