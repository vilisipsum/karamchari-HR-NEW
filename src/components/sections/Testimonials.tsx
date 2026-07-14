'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "KaramcharHR transformed how we handle payroll. What used to take our finance team three days now happens in minutes with absolute precision.",
    author: "Rohan Sharma",
    role: "Director of HR, TechFlow India",
    color: "#00C6FF"
  },
  {
    quote: "The AI screening feature is pure magic. We hired 40 engineers last quarter and the system correctly ranked our top hires every single time.",
    author: "Priya Patel",
    role: "VP Talent, Elevate SaaS",
    color: "#10B981"
  },
  {
    quote: "Compliance was our biggest headache across 5 state offices. The automated PT and ESIC calculations have saved us from countless regulatory fines.",
    author: "Amit Desai",
    role: "Founder, Zenith Retail",
    color: "#F59E0B"
  },
  {
    quote: "Finally, an HRMS that feels like it was designed in this decade. Our employees actually enjoy logging in to request leave and check their payslips.",
    author: "Sneha Reddy",
    role: "Chief People Officer, Nexus",
    color: "#EC4899"
  }
]

export default function Testimonials() {
  return (
    <section id="customers" className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Trusted by teams <br />
            <span className="text-white/40">building the future.</span>
          </motion.h2>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Fade Edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 px-6 whitespace-nowrap min-w-max"
        >
          {[...testimonials, ...testimonials].map((testimonial, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-3xl w-[400px] md:w-[500px] flex-shrink-0 whitespace-normal relative group"
            >
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: testimonial.color }}
              />
              <Quote className="w-8 h-8 text-white/20 mb-6" />
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
