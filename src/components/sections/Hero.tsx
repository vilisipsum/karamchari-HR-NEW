"use client";

import React from "react";
import GradientButton from "../ui/GradientButton";
import SectionReveal from "../ui/SectionReveal";
import { ArrowUpRight, Play, Sparkles, UserCheck, ShieldCheck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      {/* Background radial glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/5 via-saffron/5 to-peacock/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <SectionReveal direction="up" className="flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm mb-8 hover:border-indigo/30 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-saffron animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              India's Next-Gen AI HRMS & Payroll
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-slate-900 mb-6 max-w-4xl">
            The Intelligent HRMS Built for{" "}
            <span className="bg-gradient-to-r from-indigo via-[#6366F1] to-saffron bg-clip-text text-transparent">
              Indian Startups
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-500 font-medium mb-10 max-w-2xl leading-relaxed">
            Automate statutory payroll with EPF, ESIC, PT, and TDS compliance. Track attendance with geo-fencing, screen candidates with AI, and run employee appraisals seamlessly.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto justify-center">
            <GradientButton 
              variant="primary" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold bg-[#4338CA] hover:bg-[#3730A3] text-white shadow-lg shadow-indigo-500/10"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Free Trial <ArrowUpRight className="w-4 h-4" />
            </GradientButton>
            <GradientButton 
              variant="secondary" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="w-4 h-4 text-indigo fill-indigo" /> Book Demo
            </GradientButton>
          </div>
        </SectionReveal>

        {/* Dashboard Showcase Frame */}
        <SectionReveal direction="up" delay={0.2} className="relative w-full max-w-5xl">
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-saffron/5 rounded-2xl blur-3xl -z-10" />

          {/* Frame */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(67,56,202,0.06)] overflow-hidden">
            {/* Header controls mock */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-100 bg-slate-50/80 rounded-t-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="text-[10px] text-slate-400 font-mono ml-4">app.karamcharhr.online/dashboard</span>
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
              <div className="p-3.5 rounded-xl border border-slate-200/50 shadow-xl flex items-center gap-3 bg-white/90 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-slate-800">Aarav Patel</span>
                  <span className="text-[8px] text-slate-400 font-semibold uppercase">Checked in Mumbai Hub</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2: Indian Payroll Disbursed */}
            <motion.div
              className="hidden md:flex absolute -bottom-8 -right-8 w-[210px] z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <div className="p-3.5 rounded-xl border border-slate-200/50 shadow-xl flex items-center gap-3 bg-white/90 backdrop-blur-md">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold text-slate-800">June Payroll Disbursed</span>
                  <span className="text-xs font-bold text-emerald-600 mt-0.5">₹1,24,56,800</span>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

