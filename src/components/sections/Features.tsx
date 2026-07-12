"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
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
  const featureList = [
    {
      title: "Smart Attendance",
      desc: "Geofenced punch-in/out, biometric integrations, and real-time capture.",
      icon: Clock,
      color: "text-marigold bg-marigold/10",
    },
    {
      title: "Indian Payroll (₹)",
      desc: "One-click runs with automatic EPF, ESIC, PT, TDS deductions.",
      icon: CreditCard,
      color: "text-gulal-rose bg-gulal-rose/10",
    },
    {
      title: "Leave Management",
      desc: "Set policy rules for SL, CL, EL, maternity, and custom leaves.",
      icon: CalendarRange,
      color: "text-mint-teal bg-mint-teal/10",
    },
    {
      title: "AI Recruitment",
      desc: "Automated candidate sourcing, resume screening, and pipelines.",
      icon: UserPlus,
      color: "text-indigo bg-indigo/10",
    },
    {
      title: "Sleek Onboarding",
      desc: "Digital signing, document collection, and onboarding checklist flows.",
      icon: Briefcase,
      color: "text-amber bg-amber/10",
    },
    {
      title: "Self Service Portal",
      desc: "Punch-in, check payslips, apply for leaves, and track claims.",
      icon: UserCheck,
      color: "text-coral bg-coral/10",
    },
    {
      title: "Performance & OKRs",
      desc: "Set and track goals, perform 360 appraisals, and direct feedback.",
      icon: Award,
      color: "text-marigold bg-marigold/10",
    },
    {
      title: "Document Vault",
      desc: "Secure storage for PAN, Aadhaar, contracts, and company policies.",
      icon: FileText,
      color: "text-gulal-rose bg-gulal-rose/10",
    },
    {
      title: "Asset Management",
      desc: "Track company laptops, devices, and inventory assignments.",
      icon: Laptop,
      color: "text-mint-teal bg-mint-teal/10",
    },
    {
      title: "Expense Claims",
      desc: "Snap receipts, submit claims, and trigger automatic approvals.",
      icon: Receipt,
      color: "text-indigo bg-indigo/10",
    },
    {
      title: "Interactive Org Chart",
      desc: "Visualize reports, departments, and reporting hierarchies.",
      icon: Network,
      color: "text-amber bg-amber/10",
    },
    {
      title: "Automated Compliance",
      desc: "Stay fully aligned with Indian labor laws and statutory reports.",
      icon: ShieldCheck,
      color: "text-coral bg-coral/10",
    },
    {
      title: "Visual Analytics",
      desc: "Deep reports on retention, diversity, and department counts.",
      icon: BarChart3,
      color: "text-marigold bg-marigold/10",
    },
    {
      title: "HR Copilot AI",
      desc: "Chatbot powered answers, predictive analytics, and auto-scheduling.",
      icon: Sparkles,
      color: "text-gulal-rose bg-gulal-rose/10",
    },
    {
      title: "Shift Scheduling",
      desc: "Build rosters, manage rotational shifts, and overtime calculations.",
      icon: RefreshCw,
      color: "text-mint-teal bg-mint-teal/10",
    },
    {
      title: "Attendance Heatmap",
      desc: "Analyze visual patterns of absenteeism and late check-ins.",
      icon: Grid3X3,
      color: "text-indigo bg-indigo/10",
    },
  ];

  return (
    <section id="features" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gulal-rose font-heading">
            Feature Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Everything your HR department <br />
            needs, packed in one box.
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            No more logging into 10 different tools. From biometric sync to tax declarations, KaramcharHR handles it all smoothly.
          </p>
        </SectionReveal>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featureList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <SectionReveal
                key={feat.title}
                direction="up"
                delay={index * 0.05}
              >
                <GlassCard className="p-6 h-full flex flex-col gap-4 hover:-translate-y-1 hover:border-gulal-rose/30 dark:hover:border-gulal-rose/20 transition-all duration-300">
                  <div className={`p-3 rounded-xl w-fit ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </GlassCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
