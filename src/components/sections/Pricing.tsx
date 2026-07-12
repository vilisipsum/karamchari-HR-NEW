"use client";

import React, { useState } from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import GradientButton from "../ui/GradientButton";
import { Check, Info } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter",
      desc: "For small teams looking to automate attendance & basic payroll.",
      priceMonthly: 59,
      priceAnnual: 49,
      features: [
        "Core Directory (up to 50 employees)",
        "Geofenced Mobile Punch-in/out",
        "Basic Indian Payroll calculations",
        "Standard CL/SL Leave trackers",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "Growth",
      desc: "Perfect for scaling startups needing AI features and deep automation.",
      priceMonthly: 119,
      priceAnnual: 99,
      features: [
        "Directory (unlimited employees)",
        "Biometric Scanner integration",
        "Automatic Tax declarations (TDS)",
        "AI Leave analytics warning",
        "Kanban Recruitment boards",
        "LMS Custom Course setup",
        "WhatsApp Payslip updates",
        "24/7 Priority Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Custom structures for large organizations needing SOC2, audits, and dedicated hubs.",
      priceMonthly: null,
      priceAnnual: null,
      features: [
        "Dedicated cloud server nodes",
        "Custom API integration builders",
        "Multiple company payroll branches",
        "SOC2/ISO Compliance logs audit",
        "Dedicated Account Manager",
        "Custom SLAs guarantees",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 border-t border-white/5 bg-bg-light/20 dark:bg-bg-dark/20 overflow-hidden">
      <div className="absolute left-[5%] top-[20%] w-[350px] h-[350px] bg-marigold/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal direction="up" className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
            Simple pricing, built to scale
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">
            Pay only for the active employees you manage. No hidden setup fees or long term locked commitments.
          </p>
        </SectionReveal>

        {/* Toggle Billing Option */}
        <div className="flex justify-center items-center gap-3 mb-16">
          <span className="text-xs font-semibold text-zinc-500">Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 relative p-1 flex items-center cursor-pointer transition-all"
          >
            <div
              className={`w-4 h-4 rounded-full bg-gradient-to-r from-marigold to-gulal-rose transition-transform duration-300 ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-xs font-semibold text-foreground flex items-center gap-1">
            Annual Billing <span className="px-2 py-0.5 rounded-full text-[9px] font-heading font-extrabold uppercase bg-mint-teal/20 text-mint-teal">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <SectionReveal
                key={tier.name}
                direction="up"
                delay={index * 0.05}
                className="h-full"
              >
                <GlassCard
                  className={`p-8 h-full flex flex-col justify-between relative border-t-4 transition-all duration-300
                    ${
                      tier.popular
                        ? "border-t-gulal-rose shadow-xl scale-102"
                        : "border-t-white/40 dark:border-t-white/10"
                    }
                  `}
                  hoverShimmer
                >
                  {tier.popular && (
                    <span className="absolute top-4 right-6 px-3 py-1 rounded-full text-[9px] font-heading font-extrabold uppercase bg-gulal-rose/25 text-gulal-rose">
                      Recommended
                    </span>
                  )}

                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-foreground dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 min-h-[35px] leading-relaxed">
                      {tier.desc}
                    </p>

                    {/* Price details */}
                    <div className="my-6">
                      {price !== null ? (
                        <div className="flex items-baseline">
                          <span className="text-3xl font-extrabold font-numbers text-foreground dark:text-white">₹{price}</span>
                          <span className="text-xs text-zinc-500 ml-1 font-medium">/ employee / month</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-extrabold text-foreground dark:text-white">Custom Pricing</span>
                      )}
                      {price !== null && isAnnual && (
                        <span className="text-[10px] text-zinc-400 font-bold block mt-1 uppercase">Billed annually</span>
                      )}
                    </div>

                    <hr className="border-zinc-200 dark:border-zinc-800/80 my-4" />

                    {/* Features checklist */}
                    <ul className="space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                          <Check className="w-4 h-4 text-mint-teal shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    {tier.name === "Enterprise" ? (
                      <GradientButton variant="secondary" className="w-full justify-center">
                        Contact Sales
                      </GradientButton>
                    ) : (
                      <GradientButton variant={tier.popular ? "primary" : "secondary"} className="w-full justify-center">
                        Start Free Trial
                      </GradientButton>
                    )}
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
