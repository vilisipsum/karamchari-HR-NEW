"use client";

import React from "react";
import GradientButton from "../ui/GradientButton";
import SectionReveal from "../ui/SectionReveal";
import { ArrowUpRight, Play, Sparkles, UserCheck, ShieldCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden min-h-screen flex flex-col items-center justify-center bg-[#070412]">
      {/* Background radial glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-rose-500/10 via-marigold/10 to-indigo/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <SectionReveal direction="up" className="flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-rose-500/30 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-marigold animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              India's Next-Gen AI HRMS & Payroll
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-6 max-w-4xl">
            The Intelligent HRMS Built for{" "}
            <span className="bg-gradient-to-r from-rose-500 via-marigold to-amber-500 bg-clip-text text-transparent">
              Indian Startups
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-zinc-400 font-medium mb-10 max-w-2xl leading-relaxed">
            Automate statutory payroll with EPF, ESIC, PT, and TDS compliance. Track attendance with geo-fencing, screen candidates with AI, and run employee appraisals seamlessly.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto justify-center">
            <GradientButton 
              variant="primary" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold shadow-lg shadow-rose-500/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Free Trial <ArrowUpRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton 
              variant="secondary" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold bg-white/5 border border-white/10 text-white hover:bg-white/10"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="w-4 h-4 text-rose-500 fill-rose-500" /> Book Demo
            </GradientButton>
          </div>
        </SectionReveal>

        {/* Dashboard Showcase Frame */}
        <SectionReveal direction="up" delay={0.2} className="relative w-full max-w-5xl">
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 to-indigo/5 rounded-2xl blur-3xl -z-10" />

          {/* Frame */}
          <div className="relative glass border border-white/10 rounded-2xl p-2.5 shadow-[0_0_50px_rgba(232,87,123,0.15)] overflow-hidden">
            {/* Header controls mock */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/5 rounded-t-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] text-zinc-500 font-mono ml-4">app.karamcharhr.online/dashboard</span>
            </div>

            {/* Dashboard Screenshot */}
            <div className="relative aspect-[16/9] w-full rounded-b-xl overflow-hidden bg-zinc-950">
              <Image 
                src="/hero_dashboard_mockup.jpg" 
                alt="KaramcharHR Platform Dashboard" 
                fill
                priority
                className="object-cover opacity-90"
              />
            </div>

            {/* Floating Card 1: Attendance Check in */}
            <motion.div
              className="hidden md:flex absolute -top-8 -left-8 w-[190px] z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <div className="glass p-3.5 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 bg-[#0a0716]/80 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-white">Aarav Patel</span>
                  <span className="text-[8px] text-zinc-500 font-semibold uppercase">Checked in Mumbai Hub</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Indian Payroll Disbursed */}
            <motion.div
              className="hidden md:flex absolute -bottom-8 -right-8 w-[210px] z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="glass p-3.5 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 bg-[#0a0716]/80 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-white">June Payroll Disbursed</span>
                  <span className="text-xs font-bold text-emerald-400 mt-0.5">₹1,24,56,800</span>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

