'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'

const plans = [
  {
    name: "Growth",
    price: "₹3,999",
    period: "/month",
    description: "For scaling startups building their core team.",
    features: ["Up to 50 employees", "Automated Payroll", "Leave Management", "Standard Support"],
    featured: false
  },
  {
    name: "Enterprise",
    price: "₹9,999",
    period: "/month",
    description: "For mid-market companies needing AI power.",
    features: ["Up to 250 employees", "AI Resume Screening", "Biometric Integration", "Multi-state Compliance", "Priority 24/7 Support"],
    featured: true
  },
  {
    name: "Custom",
    price: "Custom",
    period: "",
    description: "For large organizations with complex needs.",
    features: ["Unlimited employees", "Dedicated Success Manager", "Custom API Integrations", "On-premise deployment option"],
    featured: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Simple, transparent <span className="text-gradient-primary">pricing.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 font-light"
          >
            No hidden fees. No surprise charges. Just powerful HR software that scales with you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
              className={`relative rounded-3xl p-8 ${
                plan.featured 
                  ? 'bg-[#0A0A0A] border border-[#00C6FF]/30 shadow-[0_0_50px_-12px_rgba(0,198,255,0.15)]' 
                  : 'glass-panel'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-white/50 mb-8 h-10">{plan.description}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-white/40">{plan.period}</span>
              </div>

              <div className="space-y-4 mb-10 min-h-[200px]">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <MagneticButton 
                variant={plan.featured ? 'primary' : 'glass'} 
                className="w-full justify-center"
              >
                {plan.name === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
