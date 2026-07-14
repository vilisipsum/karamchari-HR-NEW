'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Storytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 0.3])
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5, 0.6], [0, 1, 0.3])
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1])

  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, 0])
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [50, 0])
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [50, 0])

  return (
    <section ref={containerRef} className="py-32 h-[150vh] relative z-10">
      <div className="sticky top-1/3 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <motion.div style={{ opacity: opacity1, y: y1 }} className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
            Human Resources hasn't changed in <span className="text-[#EF4444] font-medium">two decades</span>. It's slow, manual, and disconnected.
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
            We built KaramcharHR to completely <span className="text-[#00C6FF] font-medium">reimagine</span> how companies manage their most valuable asset.
          </motion.div>

          <motion.div style={{ opacity: opacity3, y: y3 }} className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
            Powered by next-generation <span className="text-gradient-accent font-bold">Artificial Intelligence</span>.
          </motion.div>

        </div>
      </div>
    </section>
  )
}
