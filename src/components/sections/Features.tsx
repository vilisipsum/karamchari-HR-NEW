'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Fingerprint, Zap, Shield, Globe, Cpu, Clock } from 'lucide-react'

const features = [
  {
    icon: <Cpu className="w-6 h-6 text-[#00C6FF]" />,
    title: "AI-Powered Screening",
    description: "Our neural engine scans and ranks thousands of resumes in seconds, highlighting the perfect candidates without bias."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#10B981]" />,
    title: "Automated Compliance",
    description: "Stay perfectly aligned with Indian labor laws. EPF, ESIC, PT, and TDS calculations are updated automatically."
  },
  {
    icon: <Zap className="w-6 h-6 text-[#F59E0B]" />,
    title: "Instant Payroll",
    description: "Run payroll for 10 or 10,000 employees with a single click. Direct bank transfers powered by secure UPI APIs."
  },
  {
    icon: <Fingerprint className="w-6 h-6 text-[#4338CA]" />,
    title: "Biometric Integration",
    description: "Seamlessly connect with existing biometric hardware or use our mobile app for geo-fenced facial recognition clock-ins."
  },
  {
    icon: <Globe className="w-6 h-6 text-[#EC4899]" />,
    title: "Multi-State Ready",
    description: "Automatically handles state-specific professional tax slabs and regional holiday calendars out of the box."
  },
  {
    icon: <Clock className="w-6 h-6 text-[#00C6FF]" />,
    title: "Real-time Analytics",
    description: "Make decisions faster with live dashboards tracking attrition, attendance trends, and payroll expenses."
  }
]

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    }
  }

  return (
    <section id="product" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Built for the <span className="text-gradient-accent">modern workforce.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 font-light"
          >
            Every tool you need to manage your team, beautifully designed and supercharged by artificial intelligence.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="glass-panel p-8 rounded-3xl glass-panel-hover group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4">
                {feature.icon}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
