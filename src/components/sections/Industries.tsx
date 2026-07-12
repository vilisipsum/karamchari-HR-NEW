"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Laptop, Factory, Shield, HeartPulse, ShoppingBag, GraduationCap } from "lucide-react";

export default function Industries() {
  const industries = [
    {
      title: "IT & Tech Services",
      desc: "Manage flexible hybrid schedules, remote geofenced attendance, and project-based timesheets.",
      icon: Laptop,
      color: "text-indigo bg-indigo/10",
    },
    {
      title: "Manufacturing & Factories",
      desc: "Handle rotational shifts, multi-site locations, overtime payouts, and statutory factory compliance.",
      icon: Factory,
      color: "text-marigold bg-marigold/10",
    },
    {
      title: "Healthcare & Hospitals",
      desc: "Track 24/7 staff rosters, shift handovers, emergency schedules, and automated leave allowances.",
      icon: HeartPulse,
      color: "text-gulal-rose bg-gulal-rose/10",
    },
    {
      title: "Retail & E-commerce",
      desc: "Process complex incentive-based payrolls, commission schemes, and multi-store rosters.",
      icon: ShoppingBag,
      color: "text-mint-teal bg-mint-teal/10",
    },
    {
      title: "BFSI & Finance",
      desc: "Ensure absolute data security, ISO/SOC audits, background verifications, and compliance logs.",
      icon: Shield,
      color: "text-amber bg-amber/10",
    },
    {
      title: "Education & Institutes",
      desc: "Manage faculty profiles, academic calendar leaves, research allowances, and biometric syncing.",
      icon: GraduationCap,
      color: "text-coral bg-coral/10",
    },
  ];

  return (
    <section className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading">
            Industries Served
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Engineered for every industry
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            KaramcharHR adapts to your business rules. Configured workflows tailored for high-growth tech hubs to heavy machinery factory units.
          </p>
        </SectionReveal>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <SectionReveal
                key={ind.title}
                direction="up"
                delay={index * 0.05}
              >
                <GlassCard className="p-6 h-full flex flex-col gap-4 hover:border-gulal-rose/30 dark:hover:border-gulal-rose/20 transition-all duration-300">
                  <div className={`p-3 rounded-xl w-fit ${ind.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-foreground dark:text-white">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
                      {ind.desc}
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
