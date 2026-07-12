"use client";

import React from "react";
import GlassCard from "../ui/GlassCard";
import SectionReveal from "../ui/SectionReveal";
import { Smartphone, CheckCircle, Clock, MapPin, Sparkles, Smile, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function MobileApp() {
  return (
    <section className="relative py-24 border-t border-white/5 bg-bg-light/30 dark:bg-bg-dark/30 overflow-hidden">
      {/* Dynamic blurred glow behind */}
      <div className="absolute left-[5%] top-[20%] w-[350px] h-[350px] bg-marigold/10 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Mock Phone screen and floating cards */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          <SectionReveal direction="none" className="relative w-full max-w-[400px] aspect-[4/5] flex items-center justify-center">
            
            {/* Phone Container CSS Mockup */}
            <div className="w-[260px] h-[520px] rounded-[45px] border-[8px] border-zinc-800 dark:border-zinc-800 bg-[#0F0B22] shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">
              
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-zinc-800 z-30 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              </div>

              {/* Status bar */}
              <div className="flex justify-between items-center text-[8px] text-zinc-400 font-bold px-3 pt-2">
                <span>9:41 AM</span>
                <span className="flex items-center gap-1">5G // [|||]</span>
              </div>

              {/* Phone app body */}
              <div className="flex-1 flex flex-col justify-around py-4">
                {/* User Greeting */}
                <div className="text-center">
                  <span className="text-[10px] text-zinc-400 font-bold">Good Morning,</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Rohan Sharma</h4>
                </div>

                {/* Big Punch In button */}
                <div className="flex flex-col items-center">
                  <button className="w-24 h-24 rounded-full bg-gradient-to-tr from-marigold via-gulal-rose to-indigo p-[3px] shadow-[0_0_20px_rgba(232,87,123,0.3)] animate-pulse">
                    <div className="w-full h-full rounded-full bg-[#0F0B22] flex flex-col items-center justify-center text-white">
                      <Clock className="w-6 h-6 text-marigold" />
                      <span className="text-[8px] uppercase tracking-wider font-extrabold mt-1">Punch In</span>
                    </div>
                  </button>
                  <span className="text-[9px] text-zinc-400 font-semibold mt-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-mint-teal" /> Geofence Verified
                  </span>
                </div>

                {/* Micro menu grid */}
                <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-bold text-white px-2">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">Payslips</div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">Leaves</div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">Expenses</div>
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">Holidays</div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="w-28 h-1 rounded-full bg-zinc-600 mx-auto mt-2" />
            </div>

            {/* Floating Card 1: Geofence alert */}
            <motion.div
              className="absolute top-12 -left-12 w-[180px] z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <GlassCard className="p-3 shadow-lg flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-mint-teal/20 text-mint-teal">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-foreground">Location Verified</span>
                  <span className="text-[7px] text-zinc-500 font-semibold uppercase">BKC Hub (Noida)</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Card 2: Quick leave */}
            <motion.div
              className="absolute bottom-16 -right-12 w-[180px] z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            >
              <GlassCard className="p-3 shadow-lg flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-marigold/20 text-marigold">
                  <Smile className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-foreground">CL Request Approved</span>
                  <span className="text-[7px] text-zinc-500 font-semibold uppercase">Balance: 8 Left</span>
                </div>
              </GlassCard>
            </motion.div>

          </SectionReveal>
        </div>

        {/* Right Side: Text description */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          <SectionReveal direction="up">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo dark:text-marigold font-heading">
              Employee App
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground dark:text-white mt-2">
              HR in your pocket. <br />
              Anytime, anywhere.
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl">
              Enable your remote and hybrid workforce to check in, track leaves, verify payslips, and claim expenses seamlessly using our Android & iOS apps.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto lg:mx-0">
              {[
                { title: "Geofenced Punch-in", desc: "Verifies GPS coordinates before clock-in." },
                { title: "Face ID Attendance", desc: "Zero buddy punching with biometric checks." },
                { title: "Instant Salary slips", desc: "Download payslips directly to phone storage." },
                { title: "Push Alerts", desc: "Real-time updates on leave approvals." },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground dark:text-white flex items-center gap-1.5 justify-center lg:justify-start">
                    <span className="w-2 h-2 rounded-full bg-gulal-rose" /> {item.title}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
