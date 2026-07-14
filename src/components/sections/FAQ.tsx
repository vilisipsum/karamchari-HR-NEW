'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "Is KaramcharHR compliant with Indian labor laws?",
    answer: "Yes, completely. Our platform automatically handles Professional Tax (across all states), TDS, EPF, and ESIC calculations according to the latest Indian regulatory frameworks."
  },
  {
    question: "Can we integrate our existing biometric attendance machines?",
    answer: "Absolutely. KaramcharHR provides secure API bridges to sync attendance data from ZKTeco, eSSL, and other major biometric hardware providers in real-time."
  },
  {
    question: "How does the AI Resume Screening work?",
    answer: "Our proprietary neural engine analyzes candidate resumes against job descriptions, extracting relevant skills, experience, and educational background to rank applicants objectively, removing human bias from the initial screening process."
  },
  {
    question: "What happens to our data security?",
    answer: "We employ enterprise-grade security. All data is encrypted at rest and in transit using AES-256. Our infrastructure is hosted on secure AWS servers located physically in Mumbai, ensuring compliance with data localization requirements."
  },
  {
    question: "Can employees access the portal on their phones?",
    answer: "Yes, the KaramcharHR portal is fully responsive and behaves like a native app on mobile browsers, allowing employees to clock in, apply for leave, and view payslips on the go."
  }
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white text-center mb-16"
          >
            Frequently asked <span className="text-white/40">questions.</span>
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-medium text-white/90">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 transition-transform duration-300">
                    {activeIndex === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-white/50 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
