'use client'

import { motion } from 'framer-motion'
import { Server, Database, Lock, Terminal } from 'lucide-react'

export default function Technology() {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="flex-1 space-y-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-white"
            >
              Enterprise-grade <br />
              <span className="text-gradient-primary">Infrastructure.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/50 leading-relaxed max-w-lg"
            >
              Built on Next.js and Supabase, KaramcharHR leverages edge computing to deliver sub-50ms latency globally. Our neural networks run on dedicated A100 clusters for real-time resume parsing and leave prediction.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-6 pt-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Server className="w-4 h-4 text-[#00C6FF]" />
                  <span className="font-medium">Edge Network</span>
                </div>
                <p className="text-sm text-white/40">Global CDN routing</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Lock className="w-4 h-4 text-[#10B981]" />
                  <span className="font-medium">SOC2 Compliant</span>
                </div>
                <p className="text-sm text-white/40">Bank-level encryption</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Database className="w-4 h-4 text-[#F59E0B]" />
                  <span className="font-medium">ACID Storage</span>
                </div>
                <p className="text-sm text-white/40">Real-time sync</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80">
                  <Terminal className="w-4 h-4 text-[#EC4899]" />
                  <span className="font-medium">Open API</span>
                </div>
                <p className="text-sm text-white/40">GraphQL & REST</p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square md:aspect-video lg:aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 glass-dark rounded-full animate-blob-slow" />
              <div className="absolute inset-4 border border-white/10 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-3xl">
                {/* Abstract Tech Visual */}
                <div className="relative w-full h-full">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-12 border border-dashed border-white/20 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-24 border border-[#00C6FF]/30 rounded-full flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] rounded-full blur-[10px]" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
