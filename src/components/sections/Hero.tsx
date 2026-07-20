'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '../ui/MagneticButton'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      
      {/* Central Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="glass-panel px-6 py-2 rounded-full inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00C6FF] animate-pulse" />
              <span className="text-sm font-medium text-white/90">KaramcharHR AI Copilot is now live</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-white"
          >
            Intelligence that <br />
            <span className="text-gradient-primary">powers your people.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            The luxury HR platform designed for modern enterprises. 
            Automate compliance, empower employees, and scale seamlessly with AI.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton variant="primary">
              Start Free Trial
            </MagneticButton>
            <MagneticButton variant="glass">
              Book a Demo
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating UI Elements (Parallax) */}
      <motion.div 
        className="absolute left-[5%] top-[25%] hidden xl:block z-0"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass-panel p-6 rounded-2xl w-64 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] opacity-20" />
            <div>
              <div className="w-24 h-2 bg-white/20 rounded-full mb-2" />
              <div className="w-16 h-2 bg-white/10 rounded-full" />
            </div>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-[#00C6FF]" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-[5%] bottom-[25%] hidden xl:block z-0"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass-panel p-6 rounded-2xl w-72 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white/80 font-medium">Payroll Run</span>
            <span className="text-[#10B981] text-sm">+2.4%</span>
          </div>
          <div className="flex items-end gap-2 h-20">
            {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }}>
                {h === 100 && <div className="w-full h-full bg-gradient-to-t from-[#0072FF] to-[#00C6FF] rounded-t-sm opacity-50" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
