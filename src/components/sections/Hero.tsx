"use client";

import React from "react";
import GradientButton from "../ui/GradientButton";
import GlassCard from "../ui/GlassCard";
import AnimatedCounter from "../ui/AnimatedCounter";
import SectionReveal from "../ui/SectionReveal";
import { ArrowUpRight, Play, UserCheck, CreditCard, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Background Animated Blblobs specifically for Hero */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] bg-marigold/10 rounded-full blur-[100px] animate-blob-slow -z-10" />
      <div className="absolute top-[25%] right-[10%] w-[400px] h-[400px] bg-gulal-rose/15 rounded-full blur-[120px] animate-blob-medium -z-10" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Area */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          <SectionReveal direction="up">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md mb-6 hover:border-gulal-rose/40 transition-all self-center lg:self-start">
              <Sparkles className="w-4 h-4 text-marigold animate-pulse" />
              <span className="text-xs font-heading font-semibold uppercase tracking-wider text-indigo dark:text-zinc-200 flex items-center gap-1">
                India's Next-Gen AI HRMS
              </span>
            </div>
            
            {/* Headline */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight bg-gradient-to-r from-indigo via-indigo to-gulal-rose dark:from-indigo dark:via-gulal-rose dark:to-marigold bg-clip-text text-transparent mb-6">
              India's AI Powered <br />
              <span className="text-foreground dark:text-white">HRMS Platform</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium mb-8 max-w-xl mx-auto lg:mx-0">
              Manage Payroll, Attendance, Recruitment, Leave, Performance and Employee Experience from one intelligent cloud platform. Tailored for Indian compliance.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <GradientButton variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                Start Free Trial <ArrowUpRight className="w-4 h-4" />
              </GradientButton>
              <GradientButton variant="secondary" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-gulal-rose fill-gulal-rose" /> Book Demo
              </GradientButton>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 border-t border-zinc-200 dark:border-zinc-800/80 pt-8">
              <div>
                <h4 className="text-2xl font-bold font-heading text-indigo dark:text-marigold">
                  <AnimatedCounter value={500} suffix="+" />
                </h4>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">Companies</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-heading text-indigo dark:text-marigold">
                  <AnimatedCounter value={100} suffix="k+" />
                </h4>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">Employees</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold font-heading text-indigo dark:text-marigold">
                  <AnimatedCounter value={99} suffix=".9%" />
                </h4>
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">Uptime</p>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Visual / Dashboard Area */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <SectionReveal direction="none" delay={0.2} className="relative w-full max-w-[540px] aspect-[4/3] flex items-center justify-center">
            {/* Core Background Shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo/10 via-gulal-rose/10 to-marigold/10 rounded-[40px] blur-sm border border-indigo/[0.06] dark:border-white/5" />

            {/* Dashboard Mockup Panel (Floating Glass Card) */}
            <GlassCard className="w-[85%] aspect-[1.3] relative shadow-2xl p-4 overflow-hidden" hoverShimmer>
              {/* Fake Window Controls */}
              <div className="flex gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              {/* Dashboard Layout Preview */}
              <div className="space-y-3">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-1/3" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 bg-white/70 dark:bg-white/5 rounded-xl border border-indigo/[0.08] dark:border-white/5 p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Total Payroll</span>
                    <span className="text-xs font-bold font-numbers">₹18,45,200</span>
                  </div>
                  <div className="h-16 bg-white/70 dark:bg-white/5 rounded-xl border border-indigo/[0.08] dark:border-white/5 p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Present Today</span>
                    <span className="text-xs font-bold font-numbers">94.2%</span>
                  </div>
                  <div className="h-16 bg-white/70 dark:bg-white/5 rounded-xl border border-indigo/[0.08] dark:border-white/5 p-2 flex flex-col justify-between">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Recruiting Open</span>
                    <span className="text-xs font-bold font-numbers">12 Roles</span>
                  </div>
                </div>
                {/* Fake Graph */}
                <div className="h-24 bg-white/70 dark:bg-white/5 rounded-xl border border-indigo/[0.08] dark:border-white/5 p-3 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold">Attendance Analytics</span>
                    <TrendingUp className="w-3.5 h-3.5 text-mint-teal" />
                  </div>
                  <div className="flex items-end gap-1 h-12 pt-2">
                    {[35, 55, 45, 60, 50, 75, 90, 85, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-indigo to-gulal-rose rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Floating Element 1: Employee Check In */}
            <motion.div
              className="absolute -top-4 -left-2 w-[190px] z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <GlassCard className="p-3 shadow-lg flex items-center gap-3">
                <div className="p-2 rounded-lg bg-mint-teal/20 text-[#1A8A70] dark:text-mint-teal">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-foreground">Aarav Patel</span>
                  <span className="text-[8px] text-zinc-500 font-semibold uppercase">Checked in 9:00 AM</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Element 2: Indian Payroll Disbursed */}
            <motion.div
              className="absolute -bottom-6 right-2 w-[210px] z-20"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <GlassCard className="p-3 shadow-lg flex items-center gap-3">
                <div className="p-2 rounded-lg bg-marigold/20 text-[#C47D00] dark:text-marigold">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-foreground">June Payroll Disbursed</span>
                  <span className="text-[11px] font-numbers font-extrabold text-[#1A8A70] dark:text-mint-teal">₹1,24,56,800</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Element 3: AI Copilot Tip */}
            <motion.div
              className="absolute top-1/2 -right-12 w-[200px] z-20"
              animate={{ x: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            >
              <GlassCard className="p-3 border-gulal-rose/30 dark:border-gulal-rose/20 shadow-lg flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[#C62B54] dark:text-gulal-rose">
                  <Sparkles className="w-3.5 h-3.5 fill-[#C62B54] dark:fill-gulal-rose" />
                  <span className="text-[9px] font-heading font-extrabold uppercase tracking-wide">HR Copilot</span>
                </div>
                <p className="text-[9px] text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
                  "CL request patterns suggest high monsoon leave next week in Mumbai hub."
                </p>
              </GlassCard>
            </motion.div>

            {/* Floating Element 4: Compliance Badge */}
            <motion.div
              className="absolute -bottom-2 -left-6 z-20"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <GlassCard className="py-2 px-3 shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo dark:text-marigold" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">100% Indian Compliant</span>
              </GlassCard>
            </motion.div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
