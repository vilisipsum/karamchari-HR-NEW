'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > 150 && latest > (previous ?? 0)) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    
    if (latest > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 pt-6 px-4 md:px-8 flex justify-center transition-all duration-300`}
    >
      <div 
        className={`flex items-center justify-between w-full max-w-6xl rounded-full px-6 transition-all duration-500 ${
          isScrolled 
            ? 'py-4 glass-dark' 
            : 'py-6 bg-transparent'
        }`}
      >
        <Link href="/" className="relative z-10 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-white/80 transition-colors">
            KaramcharHR
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Product', 'Solutions', 'Customers', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#00C6FF] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="https://app.karamcharhr.online/auth/login" className="hidden md:block text-sm font-medium text-white hover:text-white/80 transition-colors">
            Log in
          </Link>
          <MagneticButton variant="primary" className="py-2.5 px-6 text-sm hidden md:flex">
            Get Started
          </MagneticButton>
          
          <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-10">
            <span className="w-6 h-0.5 bg-white rounded-full transition-all" />
            <span className="w-6 h-0.5 bg-white rounded-full transition-all" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
