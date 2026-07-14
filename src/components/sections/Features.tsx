"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import Image from "next/image";
import {
  Clock,
  CreditCard,
  CalendarRange,
  UserPlus,
  Briefcase,
  UserCheck,
  Award,
  FileText,
  Laptop,
  Receipt,
  Network,
  ShieldCheck,
  BarChart3,
  Sparkles,
  RefreshCw,
  Grid3X3,
} from "lucide-react";

export default function Features() {
  const secondaryFeatures = [
    { title: "Leave Planner", desc: "SL, CL, EL, maternity, and custom policy limits.", icon: CalendarRange, color: "text-rose-400 bg-rose-500/10" },
    { title: "Digital Onboarding", desc: "Collect PAN/Aadhaar details and track checklist completion.", icon: Briefcase, color: "text-amber-400 bg-amber-500/10" },
    { title: "Performance & OKRs", desc: "Run appraisals and map company goals.", icon: Award, color: "text-purple-400 bg-purple-500/10" },
    { title: "Asset Assignments", desc: "Track laptop serial numbers and devices.", icon: Laptop, color: "text-emerald-400 bg-emerald-500/10" },
    { title: "Expense Snap", desc: "Upload receipts, log claims, and trigger payouts.", icon: Receipt, color: "text-indigo-400 bg-indigo-500/10" },
    { title: "Rotational Shifts", desc: "Manage 24/7 rosters and overtime automatically.", icon: RefreshCw, color: "text-amber-400 bg-amber-500/10" },
    { title: "Org Tree Chart", desc: "Visualize departments and reporting relationships.", icon: Network, color: "text-rose-400 bg-rose-500/10" },
    { title: "Presence Heatmap", desc: "Locate patterns of team late check-ins.", icon: Grid3X3, color: "text-indigo-400 bg-indigo-500/10" },
  ];

  return (
    <section id="features" className="relative py-28 border-t border-white/5 bg-[#090716]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <SectionReveal direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 font-heading">
            Feature Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white mt-3">
            Every HR tool you need, <br />
            unified in one single box.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed">
            Eliminate fragmented tools. KaramcharHR consolidates attendance tracking, localized payroll compliance, performance reviews, and team analytics.
          </p>
        </SectionReveal>

        {/* 🏢 BENTO GRID BLOCK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: AI Resume Screening (2/3 width on desktop) */}
          <div className="md:col-span-2 relative glass border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-[#100b26]/80 to-[#070412]/80">
            <div className="max-w-md space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-rose-500/20" /> AI Sourcing & Match
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">AI Candidate Screening</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Scan incoming resumes instantly, map skills alignment, and rank match scores using localized filters.
              </p>
            </div>
            
            {/* Visual illustration slot */}
            <div className="relative w-full h-[180px] mt-6 rounded-xl overflow-hidden border border-white/5 bg-zinc-950">
              <Image 
                src="/ai_resume_screening_mockup.jpg"
                alt="AI Resume Screening Screen Card"
                fill
                className="object-cover opacity-85"
              />
            </div>
          </div>

          {/* Card 2: Geo-fenced Attendance (1/3 width on desktop) */}
          <div className="relative glass border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-[#100b26]/80 to-[#070412]/80">
            <div className="space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-marigold/10 text-marigold text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" /> Geo-fencing Sync
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">Real-time Punch-In</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Seamless geofenced check-ins via employee portal. Limits clock-ins to target work hubs automatically.
              </p>
            </div>
            
            {/* Interactive checkin bubble mockup */}
            <div className="relative h-[160px] flex items-center justify-center bg-[#070412]/50 border border-white/5 rounded-xl mt-6 p-4">
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-pulse">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-white mt-2">Active Geofence verified</span>
                <span className="text-[9px] text-zinc-500 mt-1 uppercase font-mono">lat: 19.0760, long: 72.8777</span>
              </div>
            </div>
          </div>

          {/* Card 3: Document Vault (1/3 width on desktop) */}
          <div className="relative glass border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-[#100b26]/80 to-[#070412]/80">
            <div className="space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> Document Vault
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">Aadhaar & PAN Storage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Encrypted storage for employee tax documents. Ensures DPDP Act compliance with automatic data export filters.
              </p>
            </div>
            
            {/* File cards mockup */}
            <div className="space-y-2 mt-6">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono">pan_card_verification.pdf</span>
                <span className="text-[9px] text-emerald-400 font-bold">VERIFIED</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono">aadhaar_front.jpg</span>
                <span className="text-[9px] text-emerald-400 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Card 4: Indian Statutory Payroll (2/3 width on desktop) */}
          <div className="md:col-span-2 relative glass border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col justify-between min-h-[380px] bg-gradient-to-br from-[#100b26]/80 to-[#070412]/80">
            <div className="max-w-md space-y-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Statutory Slabs
              </span>
              <h3 className="text-xl font-heading font-extrabold text-white">Automated Indian Compliance</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Process monthly payroll runs with auto deductions calculated for EPF (12%), ESIC, Professional Tax, and TDS brackets.
              </p>
            </div>
            
            {/* Visual illustration slot */}
            <div className="relative w-full h-[180px] mt-6 rounded-xl overflow-hidden border border-white/5 bg-zinc-950">
              <Image 
                src="/compliance_payroll_mockup.jpg"
                alt="Payroll Deductions Sheet Card"
                fill
                className="object-cover opacity-85"
              />
            </div>
          </div>

        </div>

        {/* 📋 SECONDARY FEATURES COMPACT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {secondaryFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard key={feat.title} className="p-5 h-full flex flex-col justify-between hover:-translate-y-1 hover:border-rose-500/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className={`p-2 rounded-xl w-fit border border-white/5 ${feat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}

